import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import explorerReducer from 'components/repoExplorer/explorerSlice';

export const store = configureStore({
  reducer: {
    explorer: explorerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
