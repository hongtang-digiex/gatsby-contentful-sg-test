const { Store } = require("../model/storeModel");
const { jwt_decode } = require("../utils/checkValidToken");
const asyncHandler = require("express-async-handler");

const CREATE = "/store/add-store";
const UPDATE = "/store/update-store";
const READ = "/api/seller/get-store-by-sellerid";
const DELETE = "/store/remove-store";
const FIND_NEAREST_STORES = "/store/find-nearest-store";

const create = {
  action: CREATE,
  method: asyncHandler(async (req, res) => {
    try {
      const { token, type } = req.body;

      if (type) {
        let store = {
          type,
          product_ids: new Array(),
        };
        console.log(jwt_decode(token));

        if (jwt_decode(token)?.status == true) {
          const newStore = new Store({
            ...store,
            creator_id: jwt_decode(token)?.decoded?.data?.id,
            seller_id: null,
          });
          console.log(newStore);
          await newStore
            .save()
            .then(() => {
              res
                .status(200)
                .json({ status: true, message: "Store added successfully" });
            })
            .catch((err) => {
              res.status(401).json({
                status: false,
                message: err,
              });
            });
        } else {
          res.status(401).json({
            status: false,
            message: jwt_decode(token)?.message,
          });
        }
      } else {
        res.status(400).json({ status: false, message: "Bad Request" });
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }),
};

const update = {
  action: UPDATE,
  method: asyncHandler(async (req, res) => {
    try {
      const { token, type, store_id } = req.body;

      // Kiểm tra xem seller đó có phải chủ cửa hàng đó hay không và store_id có tòn tại hay không
      const isIDIncluded = await Store.findOne({
        _id: store_id,
        creator_id: jwt_decode(token)?.decoded?.data?.id,
      });

      if (jwt_decode(token)?.decoded?.data?.id && isIDIncluded) {
        const updatedStore = {
          $set: { type },
        };

        await Store.findByIdAndUpdate(
          { _id: store_id, creator_id: jwt_decode(token)?.decoded?.data?.id }, // store_id to update
          updatedStore // payload
        );

        res.status(200).json({
          status: true,
          udpatedData: updatedStore,
          message: "Update store successfully",
        });
      } else {
        if (!jwt_decode(token)?.decoded?.data?.id)
          res.status(400).json({
            status: false,
            message: "You are not allowed to update store",
          });
        if (!isIDIncluded)
          res.status(400).json({
            status: false,
            message: "No store found!",
          });
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }),
};

const read = {
  action: READ,
  method: asyncHandler(async (req, res) => {
    try {
      const { seller_id } = req.query;
      const store = await Store.find({ creator_id: seller_id });
      if (store) res.status(200).json({ status: true, data: store });
      else
        res.status(400).json({ status: false, message: "No seller_id found" });
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }),
};

const _delete = {
  action: DELETE,
  method: asyncHandler(async (req, res) => {
    try {
      const { token, store_id } = req.body;
      if (jwt_decode(token)?.decoded?.data?.id) {
        const store = await Store.findOne({ _id: store_id });
        if (store?._id) {
          await Store.deleteOne({ _id: store_id });

          res.status(200).json({
            status: true,
            message: "Delete store successfully",
            data: store,
          });
        } else
          res.status(400).json({
            status: false,
            message: "Store not found",
          });
      } else {
        res.status(400).json({
          status: false,
          message: "You are not allowed to update store",
        });
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }),
};

const findNearestStore = {
  action: FIND_NEAREST_STORES,
  method: asyncHandler(async (req, res) => {
    try {
      const { long, lat } = req.query;// current location of user
      const distance = 20; // find stores in 20km radius
      const unitValue = 1000;

      const stores = await Store.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [long, lat]
            },
            maxDistance: distance * unitValue,
            distanceField: 'distance',
            distanceMultiplier: 1 / unitValue
          }
        },
        {
          $project: {
            name: 1,
            distance: 1
          }
        },
        {
          $sort: {
            distance: 1
          }
        },
        { $limit: 10 }
      ]);

      if (stores)
        res.status(200).json(stores)
      else res.status(400).json({
        status: false,
        message: "Cannot get stores",
      })
    } catch (e) {
      res.status(500).json({ status: false, message: e.message })
    }
  })
}

module.exports = {
  create,
  update,
  read,
  _delete,
  findNearestStore
};
