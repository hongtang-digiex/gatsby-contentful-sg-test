const express = require("express");
const LatLongRouter = express.Router();
const axios = require("axios");

const apiKey = `B1x4sLwdJz0vCCv0pEYsXMW1jSuKH_pPdB4a7QNwUu0`;

// Using callback

LatLongRouter.get("/user/get-lat-long", async (req, res) => {
  try {
    const { lat, long } = req.query;

    var config = {
      method: "get",
      url: `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${apiKey}&at=${lat}%2C${long}&lang=en-US`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        res.status(200).json({ status: true, ...response?.data });
      })
      .catch(function (error) {
        res.status(400).json({ status: false, message: error?.message });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
});

module.exports = LatLongRouter;
