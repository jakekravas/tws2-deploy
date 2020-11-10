const express = require('express');
const router = express.Router();

const TrailerWashWo = require('../../models/TrailerWashWo');

// @route      GET api/locations
// @desc       Get all locations
// @access     Public
router.get("/", async (req, res) => {
  try {
    const trailer_wash_wos = await TrailerWashWo.findAll();

    res.json({ trailer_wash_wos });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;