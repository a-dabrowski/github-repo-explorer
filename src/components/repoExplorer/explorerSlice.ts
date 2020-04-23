import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import { findUser, iFetchedUser, fetchUserRepos } from "api";

interface iExplorer {
  query: string;
  isLoading: boolean;
  isResolved: boolean;
  isError: boolean;
  usersFound: [] | Array<any>;
}

const initialStateExplorer: iExplorer = {
  query: "",
  isLoading: false,
  isResolved: false,
  isError: false,
  usersFound: []
};

export const slice = createSlice({
  name: "explorer",
  initialState: initialStateExplorer,
  reducers: {
    changeQuery: (state, action) => {
      console.log(action);
      state.query = action.payload;
      state.isError = false;
      state.isResolved = false;
    },
    requestResolved: (state) => {
      state.isLoading = false;
      state.isResolved = true;
    },
    requestFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setFoundUsers: (state, action) => {
      state.usersFound = action.payload;
    },
    waitForFetch: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isResolved = false;
    }
  }
});

export const selectSearchQuery = (state: RootState): string =>
  state.explorer.query;
export const selectIsLoading = (state: RootState): boolean =>
  state.explorer.isLoading;
export const selectIsResolved = (state: RootState): boolean =>
  state.explorer.isResolved;
export const selectIsError = (state: RootState): boolean =>
  state.explorer.isError;
export const selectUsersFound = (state: RootState): Array<any> =>
  state.explorer.usersFound;

export const { changeQuery, requestResolved, requestFailed, setFoundUsers, waitForFetch } = slice.actions;

export default slice.reducer;

export const searchForUsers = (query: string): AppThunk => async dispatch => {
  dispatch(waitForFetch());
  const searchResult = await findUser(query).catch(() => {dispatch(requestFailed())});
  if (
    searchResult &&
    searchResult.status < 400
  ) {
    const usersChunk = async () =>
      Promise.all(
        searchResult.data.items.slice(0, 5).map(async (el: iFetchedUser) => {
          const repos = await fetchUserRepos(el.repos_url); // TODO handle Error
          console.log(repos);
          const mappedRepos = repos.data.map((el: any) => ({
            name: el.name,
            starsCount: el.stargazers_count,
            description: el.description
          }));
          return {
            id: el.id,
            login: el.login,
            repositories: mappedRepos
          };
        })
      );
    usersChunk().then(resolve => {
      dispatch(setFoundUsers(resolve));
    }).catch(() => dispatch(requestFailed()));
    dispatch(requestResolved());
  } else {
    dispatch(requestFailed())
  }
};
