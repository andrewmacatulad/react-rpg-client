import React, { Component } from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import { Link } from "react-router-dom";

class ProfileNav extends Component {
  render() {
    return (
      <Paper>
        <MenuList>
          <Link to="/profile/info">
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography variant="inherit">Info</Typography>
            </MenuItem>
          </Link>
          <Link to="/profile/basic">
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography variant="inherit">Basic</Typography>
            </MenuItem>
          </Link>

          <Link to="/profile/about">
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography variant="inherit">About</Typography>
            </MenuItem>
          </Link>
          <Link to="/profile/test">
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography variant="inherit">Test Form</Typography>
            </MenuItem>
          </Link>
        </MenuList>
      </Paper>
    );
  }
}

export default ProfileNav;
