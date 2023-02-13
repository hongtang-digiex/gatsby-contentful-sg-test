const db = require("./db/connection");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const FinviCredentialsRouter = require("./routes/FinviCredentialsRoutes");
const WewoCredentialsRouter = require("./routes/WewoCredentialsRoutes");
const LatLongRouter = require("./routes/LatLongRoutes");
// db connect

db();
// local host

const port = process.env.PORT || 4003;

//json converter

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// call
app.use("/auth", FinviCredentialsRouter);
app.use("/api/wewo/auth/", WewoCredentialsRouter);
app.use(LatLongRouter);

app.listen(port, () => console.log(`server starting ${port}`));
