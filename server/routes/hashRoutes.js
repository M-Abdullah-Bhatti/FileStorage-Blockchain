const express = require("express");
const { getPrivateKey, createHash } = require("../controllers/hashController");
const router = express.Router();

router.route("/getPrivateKey").post(getPrivateKey);
router.route("/").post(createHash);

module.exports = router;
