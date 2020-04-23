import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { SearchStatus } from "./searchStatus";
import { RepoCard } from "components/repoCard";

import {
  changeQuery,
  searchForUsers,
  selectSearchQuery,
  selectUsersFound
} from "./explorerSlice";

const useStyles = makeStyles(() =>
  createStyles({
    userBar: {
      backgroundColor: '#EFEFEF'
    },
    formParent: {
      padding: 16
    },
    formElement: {
      width: "100%",
      marginBottom: 24
    },
    searchButton: {
      width: "100%",
      textTransform: "capitalize"
    }
  })
);

export function RepoExplorer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const searchQuery = useSelector(selectSearchQuery);
  const users = useSelector(selectUsersFound);

  const handleQueryChange = (event: any) => {
    dispatch(changeQuery(event.target.value));
  };

  const handleSubmit = (event: any) => {
    !!searchQuery && dispatch(searchForUsers(searchQuery));
    event.preventDefault();
  };

  return (
    <Paper className={classes.formParent}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.formElement}
          label="Username"
          variant="filled"
          onChange={handleQueryChange}
          value={searchQuery}
          placeholder="Enter username"
        />
        <Button
          className={classes.searchButton}
          size="large"
          variant="contained"
          color="primary"
          disabled={!searchQuery}
          onClick={() => dispatch(searchForUsers(searchQuery))}
        >
          Search
        </Button>
      </form>
      <SearchStatus />
      {users && (
        <div>
          {users.map(el => (
            <ExpansionPanel key={el.id}>
              <ExpansionPanelSummary
                className={classes.userBar}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${el.id}-content`}
                id={`panel${el.id}-header`}
              >
                <Typography>{el.login}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  {el.repositories.length > 0 ? (
                    el.repositories.map((el: any) => (
                      <RepoCard
                        key={el.name}
                        name={el.name}
                        starsCount={el.starsCount}
                        description={el.description}
                      />
                    ))
                  ) : (
                    <Typography variant="h6">No repositories</Typography>
                  )}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      )}
    </Paper>
  );
}
