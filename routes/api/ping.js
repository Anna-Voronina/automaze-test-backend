const express = require("express");

const ctrl = require("../../controllers/ping");

const router = express.Router();

router.get("/", ctrl.getPing);

module.exports = router;
