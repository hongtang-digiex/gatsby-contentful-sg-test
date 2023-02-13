const db = require("./db/connection");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const storeRouter = [
  require("./routes/addStoreRoutes"),
  require("./routes/getStoreRoutes"),
  require("./routes/updateStoreRoutes"),
  require("./routes/deleteStoreRoutes"),
  require('./routes/findNearestStoreRoutes'),
];
// db connect

db();
// local host

const port = process.env.PORT || 4004;

//json converter

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// call
app.use(storeRouter[0]);
app.use(storeRouter[1]);
app.use(storeRouter[2]);
app.use(storeRouter[3]);
app.use(storeRouter[4]);

app.listen(port, () => console.log(`server starting ${port}`));
