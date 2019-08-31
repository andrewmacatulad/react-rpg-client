import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
  card: {
    padding: theme.spacing(2),
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    fontColor: "red"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing(3)
  }
});

function QuestListItem({ quest, classes, badgeColor, user }) {
  return (
    <Grid item xs={3}>
      <Badge
        className={classes.margin}
        badgeContent={quest.questStatus}
        color={badgeColor}
      >
        <Card>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {quest.questTitle}
            </Typography>
            <Typography variant="h5" component="h2">
              {quest.questObjective}
            </Typography>
            <Typography color="error">{quest.questType}</Typography>
            <Typography variant="body2" component="p">
              {moment(quest.questStarted).format("h:mm a, MMMM Do YYYY, dddd ")}
            </Typography>
          </CardContent>
          <CardActions>
            {user.id === quest.userId ? (
              <Button
                component={Link}
                to={`/${quest.userId}/quest/${quest.id}`}
                size="small"
              >
                Click to Complete
              </Button>
            ) : (
              <Button disabled size="small">
                Click to Complete
              </Button>
            )}
          </CardActions>
        </Card>
      </Badge>
    </Grid>
  );
}

export default withStyles(styles)(QuestListItem);
