import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  grid: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "white",
  },
  sidebar: {
    height: "100vh",
    width: "15%",
    transition: "width .3s ease-out",
  },
  smallSidebar: {
    width: "5%",
    transition: "all .3s ease ",
  },
  // normal
  mainContent: {
    width: "85%",
    flex: 2,
  },
  // when small menu appears it is active
  bigMainContent: {
    width: "95%",
    flex: 4,
  },
}));
