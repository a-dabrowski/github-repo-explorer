import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import {
  selectIsResolved,
  selectIsError,
  selectSearchQuery
} from "./listSlice";

const useStyles = makeStyles(() =>
  createStyles({
    statusWrapper: {
      margin: '12px 0'
    },
    statusError: {
      color: 'red'
    }
  })
);

export function SearchStatus() {
  const searchQuery = useSelector(selectSearchQuery);
  const isSearchResolved = useSelector(selectIsResolved);
  const isSearchError = useSelector(selectIsError);
  const classes = useStyles();

  return (
    <div className={classes.statusWrapper}>
      {isSearchResolved && (
        <Typography variant="subtitle1">Showing users for "{searchQuery}"</Typography>
      )}
      {isSearchError && (
        <Typography variant="subtitle1" className={classes.statusError}>Failed fetching for query: "{searchQuery}"</Typography>
      )}
    </div>
  );
}
