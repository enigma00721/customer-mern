import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CssBaseline, Grid } from "@material-ui/core";

// library
import { Route, Switch } from "react-router";
import axios from "axios";
import clsx from "clsx";

// styles
import useStyles from "./DashbaordStyles";
// component
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Client from "../components/Content/Client/Client";
import Branch from "../components/Content/Branch/Branch";
import ContactPerson from "../components/Content/ContactPerson/ContactPerson";
import Contract from "../components/Content/Contract/Contract";
import Count from "../components/Content/Count";
import Profile from "../components/Content/Profile/Profile";
// import MainContent from "../components/Content/MainContent";

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/auth/refreshtoken")
      .then((response) => {})
      .catch((err) => history.push("/"));
  }, [history]);

  const [open, setOpen] = useState<boolean>(true);

  return (
    <Grid container className={classes.grid}>
      <CssBaseline />

      <div className={clsx(classes.sidebar, !open && classes.smallSidebar)}>
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div
        className={clsx(classes.mainContent, !open && classes.bigMainContent)}
      >
        <Navbar open={open} setOpen={setOpen} />

        <Switch>
          <Route path="/client">
            <Client />
          </Route>
          <Route path="/branch">
            <Branch />
          </Route>
          <Route path="/contactPerson">
            <ContactPerson />
          </Route>
          <Route path="/contract">
            <Contract />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Count />
          </Route>
        </Switch>
      </div>
    </Grid>
  );
};

export default Dashboard;
