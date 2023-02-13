const express = require("express");
const storeRouter = express.Router();
const { read } = require("../controller/storeController");
storeRouter.get(read.action, read.method);
module.exports = storeRouter;
