import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import {
  changeQuery,
  searchForUsers,
  selectIsResolved,
  selectSearchQuery,
  selectUsersFound
} from "./listSlice";

export function List() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const isSearchResolved = useSelector(selectIsResolved);
  const users = useSelector(selectUsersFound);

  const handleQueryChange = (event: any) =>
    dispatch(changeQuery(event.target.value));

  return (
    <Paper>
      <form>
        <TextField
          variant="filled"
          onChange={handleQueryChange}
          placeholder="Enter username"
        />
        <Button onClick={() => dispatch(searchForUsers(searchQuery))}>
          Search
        </Button>
        {isSearchResolved && <span>Showing users for "{searchQuery}"</span>}
        {users && (
          <div>
            {users.map(el => (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{el.login}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{el.repos_url}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        )}
      </form>
    </Paper>
  );
}
