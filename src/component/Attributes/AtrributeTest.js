import React, { Component } from "react";
import { Button, Typography, Container } from "@material-ui/core";

class AtrributeTest extends Component {
  constructor(props) {
    super(props);
    this.state = { remainingStat: 100, strength: 0, count: 1 };
  }

  addStat() {
    const { remainingStat, strength } = this.state;
    // console.log(values);
    if (remainingStat > 0) {
      // this.setState({ strength: 1 });
      this.setState(prevState => {
        return {
          strength: prevState.strength + 1,
          remainingStat: prevState.remainingStat - 1
        };
      });
    }
  }
  minusStat() {
    const { remainingStat, strength } = this.state;
    // console.log(values);
    if (remainingStat < 100) {
      // this.setState({ strength: 1 });
      this.setState(prevState => {
        return {
          strength: prevState.strength - 1,
          remainingStat: prevState.remainingStat + 1
        };
      });
    }
  }
  render() {
    return (
      <Container>
        <Typography component="h1">Strength {this.state.strength}</Typography>
        <Button onClick={this.addStat.bind(this)}>Add</Button>
        <Button onClick={this.minusStat.bind(this)}>Minus</Button>
        <Typography component="h2">
          Remaining Stat {this.state.remainingStat}
        </Typography>
      </Container>
    );
  }
}

export default AtrributeTest;
