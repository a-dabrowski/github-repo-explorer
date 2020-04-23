import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import {
  selectIsError,
  selectIsLoading,
  selectIsResolved,
  selectSearchQuery
} from "./listSlice";

const PROGRESS_SIZE = 60;

const useStyles = makeStyles(() =>
  createStyles({
    statusWrapper: {
      position: 'relative',
      margin: '12px 0'
    },
    loadingCircle: {
      position: 'relative',
      left: `calc(50% - ${PROGRESS_SIZE / 2}px)`
    },
    statusError: {
      color: 'red'
    }
  })
);

export function SearchStatus() {
  const classes = useStyles();
  const isSearchError = useSelector(selectIsError);
  const isSearchLoading = useSelector(selectIsLoading);
  const isSearchResolved = useSelector(selectIsResolved);
  const searchQuery = useSelector(selectSearchQuery);

  return (
    <div className={classes.statusWrapper}>
      {isSearchLoading && (
      <CircularProgress className={classes.loadingCircle} size={PROGRESS_SIZE} />
      )}
      {isSearchResolved && (
        <Typography variant="subtitle1">Showing users for "{searchQuery}"</Typography>
      )}
      {isSearchError && (
        <Typography variant="subtitle1" className={classes.statusError}>Failed fetching for query: "{searchQuery}"</Typography>
      )}
    </div>
  );
}
