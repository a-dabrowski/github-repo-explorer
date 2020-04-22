import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import { findUser } from "api";

interface iExplorer {
  query: string;
  isLoading: boolean;
  isResolved: boolean;
  usersFound: [] | Array<any>
}

const initialStateExplorer: iExplorer = {
  query: '',
  isLoading: false,
  isResolved: false,
  usersFound: [],
};

export const slice = createSlice({
  name: "explorer",
  initialState: initialStateExplorer,
  reducers: {
    changeQuery: (state, action) => {
      console.log(action);
      state.query = action.payload;
    },
    requestResolved: (state) => {
      state.isResolved = true;
    },
    setFoundUsers: (state, action) => {
      state.usersFound = action.payload
    },

  }
});

export const selectSearchQuery = (state: RootState): string => state.explorer.query;
export const selectIsLoading= (state: RootState): boolean => state.explorer.isLoading;
export const selectIsResolved = (state: RootState): boolean => state.explorer.isResolved;
export const selectUsersFound = (state: RootState): Array<any> => state.explorer.usersFound;

export const {
  changeQuery,
  requestResolved,
  setFoundUsers
} = slice.actions;

export default slice.reducer;

export const searchForUsers = (
  query: string
): AppThunk => async (dispatch) => {
  const searchResult = await findUser(query);
  console.log(searchResult);
  if (searchResult.status < 400) {
    dispatch(setFoundUsers(searchResult.data.items.slice(0,5))); // TODO other
    dispatch(requestResolved())
  } else {
  // TODO on error display some feedback to user that it is not possible to delete ticker
  }
};
