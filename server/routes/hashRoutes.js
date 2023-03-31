const express = require("express");
const {
    getPrivateKey,
    createHash
} = require("../controllers/hashController");
const router = express.Router();

router.route("/").get(getPrivateKey);
router.route("/").post(createHash);


module.exports = router;