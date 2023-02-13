const express = require("express");
const storeRouter = express.Router();
const { create } = require("../controller/storeController");
const { addProductToStore } = require("../controller/storeProductsController");
// Add store
storeRouter.post(create.action, create.method);

storeRouter.post("/store/add-product", addProductToStore);
// Get all your products

module.exports = storeRouter;
