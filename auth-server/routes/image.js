const express = require("express");
const ExpressFormidable = require("express-formidable");
const { imageUploadController } = require("../controller/ImageUpload");

const router = express.Router();

router.post(
  "/upload-image",
  ExpressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
  imageUploadController
);

module.exports = router;
