import React from "react";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import {
  selectIsResolved,
  selectIsError,
  selectSearchQuery,
} from "./listSlice";

export function SearchStatus() {
  const searchQuery = useSelector(selectSearchQuery);
  const isSearchResolved = useSelector(selectIsResolved);
  const isSearchError = useSelector(selectIsError);
  if (isSearchResolved) {
  } else if (isSearchError) {
  
  }
  return (
    <div>{isSearchResolved && <Typography>Showing users for "{searchQuery}"</Typography>}
  </div>
  )
}
