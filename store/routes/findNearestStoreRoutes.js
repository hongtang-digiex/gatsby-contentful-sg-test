const express = require("express");
const storeRouter = express.Router();
const { findNearestStore } = require("../controller/storeController");

storeRouter.get(findNearestStore.action, findNearestStore.method);

module.exports = storeRouter;