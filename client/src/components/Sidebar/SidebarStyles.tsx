import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  sidebar: {
    height: "100vh",
  },
  mainTitle: {
    minHeight: "58px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 5s ease-in-out",
  },
  active: {
    color: "#fcfcfc",
    backgroundColor: "red",
  },
  textLink: {
    color: "inherit",
    textDecoration: "inherit",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));
