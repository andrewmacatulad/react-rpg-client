import React from "react";

import Grid from "@material-ui/core/Grid";
import QuestListItem from "./QuestListItem";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Badge from "@material-ui/core/Badge";

function QuestList({ quests, user }) {
  let badgeColor = "";
  return (
    <Grid container spacing={3}>
      {quests &&
        quests.map(quest => {
          if (quest.questStatus === "finished") {
            badgeColor = "primary";
          } else {
            badgeColor = "secondary";
          }
          return (
            <QuestListItem
              key={quest.id}
              quest={quest}
              badgeColor={badgeColor}
              user={user}
            />
          );
        })}
    </Grid>
  );
}

export default QuestList;
