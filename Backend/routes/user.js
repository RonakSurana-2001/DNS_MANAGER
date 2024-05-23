const express = require("express");
const router = express.Router();

const {sampleFunc}  = require("../controllers/userController");
const {sampleFunc2}  = require("../controllers/userController");

router.get("/welcome", sampleFunc);

module.exports = router;
