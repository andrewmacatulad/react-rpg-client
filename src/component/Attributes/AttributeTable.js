import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography, Container } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

import { getAttributes, setAttributes } from "./attributesAction";
import isEmpty from "../common/isEmpty";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing(3),
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 650
//   }
// }));
const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  button: {
    margin: theme.spacing(3)
  },
  buttonAdd: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  buttonMinus: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

class AttributeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remainingStat: 0,
      strength: 0,
      totalStrength: 0,
      statLevelStrength: 1,
      vitality: 0,
      totalVitality: 0,
      statLevelVitality: 1,
      intelligence: 0,
      totalIntelligence: 0,
      statLevelIntelligence: 1,
      spirit: 0,
      totalSpirit: 0,
      statLevelSpirit: 1,
      luck: 0,
      totalLuck: 0,
      statLevelLuck: 1
    };
  }
  componentDidMount() {
    this.props.getAttributes();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.attributes)) {
      this.setState({
        remainingStat: nextProps.attributes.stats.statPointsRemaining,
        totalStrength: nextProps.attributes.stats.strength,
        totalVitality: nextProps.attributes.stats.vitality,
        totalIntelligence: nextProps.attributes.stats.intelligence,
        totalSpirit: nextProps.attributes.stats.spirit,
        totalLuck: nextProps.attributes.stats.luck
      });
    }
  }

  minusStat(type) {
    const { strength, vitality, intelligence, spirit, luck } = this.state;
    const { attributes } = this.props;

    switch (type) {
      case "strength":
        if (strength !== 0) {
          this.setState(
            prevState => {
              // if (prevState.totalStrength % 10 === 9) {
              //   return {
              //     statLevelStrength: prevState.statLevelStrength - 1,
              //     strength: prevState.strength - 1
              //   };
              // } else {
              //   return { strength: prevState.strength - 1 };
              // }
              return { strength: prevState.strength - 1 };
            },

            () => {
              this.setState(
                prevState => {
                  return {
                    totalStrength:
                      attributes.stats.strength + prevState.strength,
                    remainingStat:
                      prevState.remainingStat + prevState.statLevelStrength
                  };
                },
                () => {
                  this.setState(prevState => {
                    if (prevState.totalStrength % 10 === 9) {
                      return {
                        statLevelStrength: prevState.statLevelStrength - 1
                      };
                    }
                  });
                }
              );
            }
          );
        }
        break;
      case "vitality":
        if (vitality !== 0) {
          this.setState(
            prevState => {
              // const statCount = prevState.statLevelVitality * 10;
              // if (
              //   prevState.totalVitality % 10 === 0 &&
              //   prevState.totalVitality !== statCount
              // ) {
              //   return {
              //     statLevelVitality: prevState.statLevelVitality - 1,
              //     vitality: prevState.vitality - 1
              //   };
              // } else {
              //   return { vitality: prevState.vitality - 1 };
              // }
              return { vitality: prevState.vitality - 1 };
            },

            () => {
              this.setState(
                prevState => {
                  // const statCount = prevState.statLevel * 10;

                  return {
                    totalVitality:
                      attributes.stats.vitality + prevState.vitality,
                    remainingStat:
                      prevState.remainingStat + prevState.statLevelVitality
                  };
                },
                () => {
                  this.setState(prevState => {
                    if (prevState.totalVitality % 10 === 9) {
                      return {
                        statLevelVitality: prevState.statLevelVitality - 1
                      };
                    }
                  });
                }
              );
            }
          );
        }
        break;
      case "intelligence":
        if (intelligence !== 0) {
          this.setState(
            prevState => {
              // const statCount = prevState.statLevelIntelligence * 10;
              // if (
              //   prevState.totalIntelligence % 10 === 0 &&
              //   prevState.totalIntelligence !== statCount
              // ) {
              //   return {
              //     statLevelIntelligence: prevState.statLevelIntelligence - 1,
              //     intelligence: prevState.intelligence - 1
              //   };
              // } else {
              //   return { intelligence: prevState.intelligence - 1 };
              // }
              return { intelligence: prevState.intelligence - 1 };
            },

            () => {
              this.setState(
                prevState => {
                  // const statCount = prevState.statLevel * 10;

                  return {
                    totalIntelligence:
                      attributes.stats.intelligence + prevState.intelligence,
                    remainingStat:
                      prevState.remainingStat + prevState.statLevelIntelligence
                  };
                },
                () => {
                  this.setState(prevState => {
                    if (prevState.totalIntelligence % 10 === 9) {
                      return {
                        statLevelIntelligence:
                          prevState.statLevelIntelligence - 1
                      };
                    }
                  });
                }
              );
            }
          );
        }
        break;
      case "spirit":
        if (spirit !== 0) {
          this.setState(
            prevState => {
              // const statCount = prevState.statLevelSpirit * 10;
              // if (
              //   prevState.totalSpirit % 10 === 0 &&
              //   prevState.totalSpirit !== statCount
              // ) {
              //   return {
              //     statLevelSpirit: prevState.statLevelSpirit - 1,
              //     spirit: prevState.spirit - 1
              //   };
              // } else {
              //   return { spirit: prevState.spirit - 1 };
              // }
              return { spirit: prevState.spirit - 1 };
            },

            () => {
              this.setState(
                prevState => {
                  // const statCount = prevState.statLevel * 10;

                  return {
                    totalSpirit: attributes.stats.spirit + prevState.spirit,
                    remainingStat:
                      prevState.remainingStat + prevState.statLevelSpirit
                  };
                },
                () => {
                  this.setState(prevState => {
                    if (prevState.totalSpirit % 10 === 9) {
                      return {
                        statLevelSpirit: prevState.statLevelSpirit - 1
                      };
                    }
                  });
                }
              );
            }
          );
        }
        break;
      case "luck":
        if (luck !== 0) {
          this.setState(
            prevState => {
              // const statCount = prevState.statLevelLuck * 10;
              // if (
              //   prevState.totalLuck % 10 === 0 &&
              //   prevState.totalLuck !== statCount
              // ) {
              //   return {
              //     statLevelLuck: prevState.statLevelLuck - 1,
              //     luck: prevState.luck - 1
              //   };
              // } else {
              //   return { luck: prevState.luck - 1 };
              // }
              return { luck: prevState.luck - 1 };
            },

            () => {
              this.setState(
                prevState => {
                  // const statCount = prevState.statLevel * 10;

                  return {
                    totalLuck: attributes.stats.luck + prevState.luck,
                    remainingStat:
                      prevState.remainingStat + prevState.statLevelLuck
                  };
                },
                () => {
                  this.setState(prevState => {
                    if (prevState.totalLuck % 10 === 0) {
                      return {
                        statLevelLuck: prevState.statLevelLuck - 1
                      };
                    }
                  });
                }
              );
            }
          );
        }
        break;
      default:
        break;
    }
  }

  addStat(type) {
    const {
      remainingStat,
      statLevelStrength,
      statLevelVitality,
      statLevelIntelligence,
      statLevelSpirit,
      statLevelLuck
    } = this.state;
    const { attributes } = this.props;

    switch (type) {
      case "strength":
        if (remainingStat >= statLevelStrength) {
          this.setState(
            prevState => {
              console.log(prevState.statLevelStrength);
              if (prevState.totalStrength % 10 === 9) {
                return {
                  statLevelStrength: prevState.statLevelStrength + 1,
                  strength: prevState.strength + 1
                };
              } else {
                return { strength: prevState.strength + 1 };
              }
            },
            () => {
              this.setState(prevState => {
                return {
                  totalStrength: attributes.stats.strength + prevState.strength,
                  remainingStat:
                    prevState.remainingStat - prevState.statLevelStrength
                };
              });
            }
          );
        }
        break;
      case "vitality":
        if (remainingStat >= statLevelVitality) {
          this.setState(
            prevState => {
              // return {
              //   strength: prevState.strength + 1
              // };
              if (
                // prevState.totalVitality !== 0 &&
                prevState.totalVitality % 10 ===
                9
              ) {
                return {
                  statLevelVitality: prevState.statLevelVitality + 1,
                  vitality: prevState.vitality + 1
                };
              } else {
                return { vitality: prevState.vitality + 1 };
              }
            },
            () => {
              this.setState(prevState => {
                return {
                  totalVitality: attributes.stats.vitality + prevState.vitality,
                  remainingStat:
                    prevState.remainingStat - prevState.statLevelVitality
                };
              });
            }
          );
        }
        break;
      case "intelligence":
        if (remainingStat >= statLevelIntelligence) {
          this.setState(
            prevState => {
              if (
                // prevState.totalIntelligence !== 0 &&
                prevState.totalIntelligence % 10 ===
                9
              ) {
                return {
                  statLevelIntelligence: prevState.statLevelIntelligence + 1,
                  intelligence: prevState.intelligence + 1
                };
              } else {
                return { intelligence: prevState.intelligence + 1 };
              }
            },
            () => {
              this.setState(prevState => {
                return {
                  totalIntelligence:
                    attributes.stats.intelligence + prevState.intelligence,
                  remainingStat:
                    prevState.remainingStat - prevState.statLevelIntelligence
                };
              });
            }
          );
        }
        break;
      case "spirit":
        if (remainingStat >= statLevelSpirit) {
          this.setState(
            prevState => {
              if (
                // prevState.totalSpirit !== 0 &&
                prevState.totalSpirit % 10 ===
                9
              ) {
                return {
                  statLevelSpirit: prevState.statLevelSpirit + 1,
                  spirit: prevState.spirit + 1
                };
              } else {
                return { spirit: prevState.spirit + 1 };
              }
            },
            () => {
              this.setState(prevState => {
                return {
                  totalSpirit: attributes.stats.spirit + prevState.spirit,
                  remainingStat:
                    prevState.remainingStat - prevState.statLevelSpirit
                };
              });
            }
          );
        }
        break;
      case "luck":
        if (remainingStat >= statLevelLuck) {
          this.setState(
            prevState => {
              if (
                // prevState.totalLuck !== 0 &&
                prevState.totalLuck % 10 ===
                0
              ) {
                return {
                  statLevelLuck: prevState.statLevelLuck + 1,
                  luck: prevState.luck + 1
                };
              } else {
                return { luck: prevState.luck + 1 };
              }
            },
            () => {
              this.setState(prevState => {
                return {
                  totalLuck: attributes.stats.luck + prevState.luck,
                  remainingStat:
                    prevState.remainingStat - prevState.statLevelLuck
                };
              });
            }
          );
        }
        break;
      default:
        break;
    }
  }

  selectAttribute = attribute => {
    const { classes } = this.props;
    const {
      strength,
      statLevelStrength,
      vitality,
      statLevelVitality,
      intelligence,
      statLevelIntelligence,
      spirit,
      statLevelSpirit,
      luck,
      statLevelLuck,
      remainingStat
    } = this.state;
    switch (attribute) {
      case "strength":
        return (
          <div>
            {strength === 0 ? (
              <Fab
                onClick={this.minusStat.bind(this, "strength")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
                disabled
              >
                <MinusIcon />
              </Fab>
            ) : (
              <Fab
                onClick={this.minusStat.bind(this, "strength")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
              >
                <MinusIcon />
              </Fab>
            )}
            {remainingStat >= statLevelStrength ? (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "strength")}
              >
                <AddIcon />
              </Fab>
            ) : (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "strength")}
                disabled
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        );
      case "vitality":
        return (
          <div>
            {vitality === 0 ? (
              <Fab
                onClick={this.minusStat.bind(this, "vitality")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
                disabled
              >
                <MinusIcon />
              </Fab>
            ) : (
              <Fab
                onClick={this.minusStat.bind(this, "vitality")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
              >
                <MinusIcon />
              </Fab>
            )}
            {remainingStat >= statLevelVitality ? (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "vitality")}
              >
                <AddIcon />
              </Fab>
            ) : (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "vitality")}
                disabled
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        );
      case "intelligence":
        return (
          <div>
            {intelligence === 0 ? (
              <Fab
                onClick={this.minusStat.bind(this, "intelligence")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
                disabled
              >
                <MinusIcon />
              </Fab>
            ) : (
              <Fab
                onClick={this.minusStat.bind(this, "intelligence")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
              >
                <MinusIcon />
              </Fab>
            )}
            {remainingStat >= statLevelIntelligence ? (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "intelligence")}
              >
                <AddIcon />
              </Fab>
            ) : (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "intelligence")}
                disabled
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        );
      case "spirit":
        return (
          <div>
            {spirit === 0 ? (
              <Fab
                onClick={this.minusStat.bind(this, "spirit")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
                disabled
              >
                <MinusIcon />
              </Fab>
            ) : (
              <Fab
                onClick={this.minusStat.bind(this, "spirit")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
              >
                <MinusIcon />
              </Fab>
            )}
            {remainingStat >= statLevelSpirit ? (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "spirit")}
              >
                <AddIcon />
              </Fab>
            ) : (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "spirit")}
                disabled
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        );
      case "luck":
        return (
          <div>
            {luck === 0 ? (
              <Fab
                onClick={this.minusStat.bind(this, "luck")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
                disabled
              >
                <MinusIcon />
              </Fab>
            ) : (
              <Fab
                onClick={this.minusStat.bind(this, "luck")}
                color="primary"
                aria-label="Minus"
                className={classes.buttonMinus}
              >
                <MinusIcon />
              </Fab>
            )}
            {remainingStat >= statLevelLuck ? (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "luck")}
              >
                <AddIcon />
              </Fab>
            ) : (
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.buttonAdd}
                onClick={this.addStat.bind(this, "luck")}
                disabled
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        );
      default:
        return (
          <div>
            <Fab
              onClick={this.minusStat.bind(this, "strength")}
              color="primary"
              aria-label="Minus"
              className={classes.buttonMinus}
            >
              <MinusIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.buttonAdd}
              onClick={this.addStat.bind(this, "strength")}
            >
              <AddIcon />
            </Fab>
          </div>
        );
    }
  };

  addAttributes() {
    const {
      totalStrength,
      totalVitality,
      totalIntelligence,
      totalSpirit,
      totalLuck,
      remainingStat
    } = this.state;
    const stats = {
      strength: totalStrength,
      vitality: totalVitality,
      intelligence: totalIntelligence,
      spirit: totalSpirit,
      luck: totalLuck,
      statPointsRemaining: remainingStat
    };
    this.props.setAttributes(stats);
    // prevState.totalStrength !== 9 &&
    // prevState.totalStrength % 10 === 9
    // console.log(9 !== 9);
    // console.log(9 % 10 === 9);
    this.setState({
      strength: 0,
      vitality: 0,
      intelligence: 0,
      luck: 0,
      spirit: 0
    });
  }
  render() {
    const { attributes } = this.props;

    const {
      strength,
      totalStrength,
      remainingStat,
      vitality,
      totalVitality,
      intelligence,
      totalIntelligence,
      spirit,
      totalSpirit,
      luck,
      totalLuck
    } = this.state;

    if (isEmpty(attributes)) {
      return <h2>Loading.....</h2>;
    }

    // this.setState({ remainingStat: attributes.stats.statPointsRemaining });

    const rows = [
      createData(
        "Strength",
        attributes.stats.strength,
        strength,
        totalStrength,
        "strength"
      ),
      createData(
        "Vitality",
        attributes.stats.vitality,
        vitality,
        totalVitality,
        "vitality"
      ),
      createData(
        "Intelligence",
        attributes.stats.intelligence,
        intelligence,
        totalIntelligence,
        "intelligence"
      ),
      createData(
        "Spirit",
        attributes.stats.spirit,
        spirit,
        totalSpirit,
        "spirit"
      ),
      createData("Luck", attributes.stats.luck, luck, totalLuck, "luck")
    ];

    return (
      <Container>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attributes</TableCell>
                {/* <TableCell align="right">Strength</TableCell>
              <TableCell align="right">Vitality</TableCell>
              <TableCell align="right">Intelligence</TableCell>
              <TableCell align="right">Spirit</TableCell>
              <TableCell align="right">Luck</TableCell> */}
                <TableCell align="right">Old</TableCell>
                <TableCell align="right">Plus</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Add</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                // console.log(row.protein === "vitality");
                return (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">
                      {/* {row.protein === "vitality" ? (
                        <Button onClick={this.addStat.bind(this, "vitality")}>
                          Add
                        </Button>
                      ) : (
                        <Button onClick={this.addStat.bind(this, "strength")}>
                          Add
                        </Button>
                      )} */}
                      {this.selectAttribute(row.protein)}
                      {/* <Button onClick={this.addStat.bind(this, "vitality")}>
                        Add
                      </Button> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Typography component="h2">
            {/* Remaining Points: {attributes.stats.statPointsRemaining} */}
            Remaining Points: {remainingStat}
          </Typography>
          <Button color="primary" onClick={this.addAttributes.bind(this)}>
            Confirm
          </Button>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return { attributes: state.attributes };
};

export default connect(
  mapStateToProps,
  { getAttributes, setAttributes }
)(withStyles(styles)(AttributeTable));
