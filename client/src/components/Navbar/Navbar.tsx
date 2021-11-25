import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
// icons
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./NavbarStyles";
// authentication context
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../AuthenticationProvider";
import clsx from "clsx";

const Navbar = ({ open, setOpen }) => {
  const { setAuthenticationStatus } = useContext(AuthenticationContext);

  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    axios.get("auth/logout").then((response) => {
      setAuthenticationStatus("loggedOut");
      history.push("/");
    });
  };
  const [name, setName] = useState<string>(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  history.listen(() => {
    const cleanName = history.location.pathname.replace(/[^\w ]/, "");
    setName(capitalizeFirstLetter(cleanName));
  });

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            {/* FIXME:fix style hide here also on click on iconbutton */}
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {name}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {/* logout button */}
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Tooltip title="Logout" aria-label="logout">
                <ExitToAppIcon onClick={handleLogout} />
              </Tooltip>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Tooltip title="Profile" aria-label="Profile">
                <AccountCircle
                  onClick={() => {
                    history.push("/profile");
                  }}
                />
              </Tooltip>
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
