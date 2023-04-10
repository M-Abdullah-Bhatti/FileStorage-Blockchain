const Hash = require("../models/hashModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Get Pk by hash
exports.getPrivateKey = catchAsyncErrors(async (req, res, next) => {
  const hash = await Hash.findOne({ hashvalue: req.body.hashvalue });
  const primaryKey = hash?.privatekey;
  res.status(200).json({
    sucess: true,
    primaryKey,
  });
});

//Create Hash
exports.createHash = catchAsyncErrors(async (req, res, next) => {
  const hash = await Hash.create(req.body);
  res.status(201).json({
    success: true,
    hash,
  });
});

// "address": "0xbd7e9Eb33F6f289754C9ad9586286452e7558c22",
