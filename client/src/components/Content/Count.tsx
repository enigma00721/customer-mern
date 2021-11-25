import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

interface CountType {
  branchCount: number;
  clientCount: number;
  contractCount: number;
  contactCount: number;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  root: {
    minWidth: "275px",
    minHeight: "120px",
    margin: "10px",
    display: "flex",
    padding: "0 10px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chart: {
    marginTop: "100px",
    // float: "left",
    textAlign: "center",
  },
});
const Count = () => {
  const classes = useStyles();
  const [count, setCount] = useState<CountType>(null);

  useEffect(() => {
    axios
      .get("/api/count/getDashboardData")
      .then(({ data }) => {
        setCount(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(count);

  const chartData = {
    labels: ["Branch", "Client", "ContactPerson", "Contract"],
    datasets: [
      {
        label: "# of count",
        data: [
          count?.branchCount,
          count?.clientCount,
          count?.contractCount,
          count?.contactCount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box m={5}>
      <div className={classes.container}>
        <Paper className={classes.root} elevation={3}>
          <Typography
            color="textSecondary"
            gutterBottom
            component="h1"
            variant="h5"
          >
            Branch
          </Typography>
          <Typography component="span" variant="h4" color="textPrimary">
            {count?.branchCount}
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={3}>
          <Typography
            color="textSecondary"
            gutterBottom
            component="h1"
            variant="h5"
          >
            Client
          </Typography>
          <Typography component="span" variant="h4" color="textPrimary">
            {count?.clientCount}
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={3}>
          <Typography
            color="textSecondary"
            gutterBottom
            component="h1"
            variant="h5"
          >
            ContactPerson
          </Typography>
          <Typography component="span" variant="h4" color="textPrimary">
            {count?.contractCount}
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={3}>
          <Typography
            color="textSecondary"
            gutterBottom
            component="h1"
            variant="h5"
          >
            Contract
          </Typography>
          <Typography component="span" variant="h4" color="textPrimary">
            {count?.contractCount}
          </Typography>
        </Paper>
      </div>

      <div className={classes.chart}>
        {count && (
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            style={{ height: "400px" }}
          />
        )}
      </div>
    </Box>
  );
};

export default Count;
