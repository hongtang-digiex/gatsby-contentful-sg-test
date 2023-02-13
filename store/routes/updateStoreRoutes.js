const express = require("express");
const { update } = require("../controller/storeController");
const storeRouter = express.Router();

// Update store

storeRouter.post(update.action, update.method);

module.exports = storeRouter;
