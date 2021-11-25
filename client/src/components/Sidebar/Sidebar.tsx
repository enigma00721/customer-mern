import useStyles from "./SidebarStyles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { Home } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.sidebar}>
      <Typography
        variant="h5"
        className={classes.mainTitle + " " + classes.textLink}
        component={NavLink}
        to="/"
      >
        {open ? "Dashboard" : <Home />}
      </Typography>
      <hr />
      {open && (
        <List component="ul" aria-label="main mailbox folders">
          <ListItem
            component={NavLink}
            className={classes.textLink}
            to="/client"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Client" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={classes.textLink}
            to="/branch"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Branch" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={classes.textLink}
            to="/contactPerson"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Person" />
          </ListItem>
          <ListItem
            component={NavLink}
            className={classes.textLink}
            to="/contract"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Contract" />
          </ListItem>
        </List>
      )}

      {!open && (
        <List component="ul" aria-label="main mailbox folders">
          <Tooltip title="Client" placement="right">
            <ListItem
              component={NavLink}
              className={classes.textLink}
              to="/client"
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
          <Tooltip title="Branch" placement="right">
            <ListItem
              component={NavLink}
              className={classes.textLink}
              to="/branch"
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
          <Tooltip title="Contact Person" placement="right">
            <ListItem
              component={NavLink}
              className={classes.textLink}
              to="/contactPerson"
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
          <Tooltip title="Contract" placement="right">
            <ListItem
              component={NavLink}
              className={classes.textLink}
              to="/contract"
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        </List>
      )}
    </Paper>
  );
};

export default Sidebar;
