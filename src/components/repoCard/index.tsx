import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

interface iRepoCard {
  name: string;
  starsCount: number;
  description: string | null;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "auto",
      margin: 16,
      marginLeft: 24,
      padding: 24,
      paddingBottom: 36,
      borderRadius: 8,
      backgroundColor: "#E8E8E8"
    },
    repoName: {
      fontWeight: 800,
      marginRight: "auto"
    },
    starCount: {
      fontWeight: 800,
      textAlign: "right",
      display: 'inline-block'
    },
    starIcon: {
      verticalAlign: "text-bottom"
    },
    description: {
      marginTop: 16
    }
  })
);

export function RepoCard(props: iRepoCard) {
  const classes = useStyles();
  const { name, starsCount, description } = props;
  return (
    <Grid container className={classes.card}>
      <Grid item xs={10}>
        <Typography className={classes.repoName} variant="h6">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h6">
          {starsCount}
        <StarIcon className={classes.starIcon} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.description} variant="body1">
          {description || "No description"}
        </Typography>
      </Grid>
    </Grid>
  );
}
