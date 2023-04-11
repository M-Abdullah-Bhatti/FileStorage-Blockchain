const Hash = require("../models/hashModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Get Pk by hash
exports.getPrivateKey = catchAsyncErrors(async (req, res, next) => {
  console.log("hashvalue: ", req.body.hashvalue);
  const hash = await Hash.findOne({ hashvalue: req.body.hashvalue });
  const privateKey = await hash?.privatekey;

  if (!hash) {
    res.status(400).json({
      message: "This hash can't be found",
    });
  }
  // console.log("hashpk: ", hash?.privatekey);

  res.status(200).json({
    sucess: true,
    privateKey,
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
