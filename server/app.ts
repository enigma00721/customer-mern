import express from "express";
// routers
import userRoutes from "./routes/users";
import clientRoutes from "./routes/clients";
import branchRoutes from "./routes/branch";
import contractRoutes from "./routes/contract";
import contactRoutes from "./routes/contact";
import dashboardRoutes from "./routes/dashboard";
// config
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
// db config
require("./config/db.ts");

// config
const app = express();
const port = 3030;
dotenv.config();

// use setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30000000000 },
  })
);

// -------------- routes---------------
app.use("/auth", userRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/contract", contractRoutes);
// app.use('api/contact' , contactRoutes);
app.use("/api/person", contactRoutes);
app.use("/api/count", dashboardRoutes);

// port listen
app.listen(port, () => {
  console.log(`node server running on port ${port}`);
});
