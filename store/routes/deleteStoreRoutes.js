const express = require("express");
const storeRouter = express.Router();
const { _delete } = require("../controller/storeController");
const { deleteAllProducts } = require("../controller/storeProductsController");
storeRouter.post(_delete.action, _delete.method);

storeRouter.post("/store/delete-all-products", deleteAllProducts);
module.exports = storeRouter;
