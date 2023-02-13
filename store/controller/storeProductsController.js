const { Store } = require("../model/storeModel");
const { jwt_decode } = require("../utils/checkValidToken");

const query = (token, store_id) => ({
  _id: store_id,
  creator_id: jwt_decode(token)?.decoded?.data?.id,
});

const addProductToStore = async (req, res) => {
  try {
    const { token, product_id, store_id } = req.body;

    const testingQuery = query(token, store_id);
    const instance = await Store.findOne(testingQuery);

    // console.log(instance.product_ids);
    const updatedProductQuery = {
      $set: { product_ids: [...instance.product_ids, product_id] },
    };

    if (testingQuery && product_id) {
      (await Store.findByIdAndUpdate(testingQuery, updatedProductQuery)) &&
        res.status(200).json({
          status: true,
          message: "Add product to store successfully",
          data: updatedProductQuery.$set,
        });
    } else {
      res.status(400).json({
        status: false,
        message: "Add products failed",
      });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const { token, store_id } = req.body;

    const testingQuery = query(token, store_id);

    // console.log(instance.product_ids);
    const deleteProductQuery = {
      $set: { product_ids: [] },
    };

    if (testingQuery) {
      (await Store.findByIdAndUpdate(testingQuery, deleteProductQuery)) &&
        res.status(200).json({
          status: true,
          message: "Delete products successfully",
        });
    } else {
      res.status(400).json({
        status: false,
        message: "Delete products failed+",
      });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
};

module.exports = {
  addProductToStore,
  deleteAllProducts,
};
