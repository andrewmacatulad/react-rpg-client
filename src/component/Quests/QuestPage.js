import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import isEmpty from "../common/isEmpty";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { getQuestSingle, updateQuestStatus } from "./questsAction";
import { Typography, Paper, Button } from "@material-ui/core";

class QuestPage extends Component {
  componentDidMount() {
    this.props.getQuestSingle(this.props.match.params.questId);
  }
  handleCompleted = () => {
    this.props.updateQuestStatus(
      this.props.match.params.questId,
      {
        status: "finished"
      },
      this.props.history
    );
  };
  handleCancelled = () => {
    this.props.updateQuestStatus(
      this.props.match.params.questId,
      {
        status: "cancelled"
      },
      this.props.history
    );
  };
  render() {
    const { quest, user } = this.props;

    if (isEmpty(quest)) {
      return <LoadingComponent />;
    }

    if (parseInt(this.props.match.params.userId) !== quest.userId) {
      // return <Redirect to="/" />;

      return (
        <Paper>
          <Typography variant="h2" component="h2">
            Unauthorized user you can't access this Page
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper>
        <Button
          onClick={() => this.props.history.go(-1)}
          variant="contained"
          color="secondary"
        >
          Back
        </Button>
        <Typography variant="h2" component="h2">
          {quest.questTitle}
        </Typography>
        <Typography variant="body2" component="p">
          {quest.questObjective}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {quest.questStatus}
        </Typography>
        <Button
          onClick={() => this.handleCompleted()}
          variant="contained"
          color="primary"
        >
          Complete
        </Button>
        <Button
          onClick={() => this.handleCancelled()}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return { quest: state.quests.quest };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getQuestSingle, updateQuestStatus }
  )(QuestPage)
);
