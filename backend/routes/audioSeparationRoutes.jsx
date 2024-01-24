const express = require("express");
const {
  processAudio,
} = require("../controllers/audioSeparationController.jsx");

const router = express.Router();
router.route("/processAudio").post(processAudio);

module.exports = router;
