import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Switch
} from "@material-ui/core";

import QuestList from "./QuestList";
import {
  getQuests,
  getQuestsType,
  getQuestsStatusCleared
} from "./questsAction";
import isEmpty from "../common/isEmpty";
import LoadingComponent from "../../app/layout/LoadingComponent";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const questTypes = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" }
];

class QuestDashboard extends Component {
  state = { statusClear: false };
  componentDidMount() {
    this.props.getQuests();
  }
  handleChange(event) {
    console.log(this.state.statusClear === false);
    if (event.target.value === "all" && this.state.statusClear === false) {
      // this.props.getQuests();
      this.props.getQuestsStatusCleared();
    } else if (
      event.target.value === "all" &&
      this.state.statusClear === true
    ) {
      this.props.getQuests();
    } else {
      this.props.getQuestsType(event.target.value);
    }
  }

  handleChangeCheck(event) {
    this.setState({ statusClear: event.target.checked });
    console.log(event.target.checked);
  }
  render() {
    const { classes, quests, user } = this.props;

    if (isEmpty(quests)) {
      return <LoadingComponent />;
    }

    if (isEmpty(user)) {
      return <LoadingComponent />;
    }
    return (
      <div className={classes.root}>
        <Paper>
          <QuestList quests={quests} user={user} />
          <Divider variant="middle" />
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/quest_add"
          >
            Add Quest
          </Button>
          <Divider variant="middle" />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.statusClear}
                onChange={event => this.handleChangeCheck(event)}
                value="checkA"
                color="primary"
              />
            }
            label="Primary"
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              onChange={event => this.handleChange(event)}
            >
              {questTypes &&
                questTypes.map(type => (
                  <FormControlLabel
                    key={type.value}
                    value={type.value}
                    control={<Radio />}
                    label={type.label}
                  />
                ))}
              <FormControlLabel
                key="all"
                value="all"
                control={<Radio />}
                label="All"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { quests: state.quests.quests, user: state.user.user };
};

export default connect(
  mapStateToProps,
  { getQuests, getQuestsType, getQuestsStatusCleared }
)(withStyles(styles)(withRouter(QuestDashboard)));
