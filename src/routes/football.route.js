const express = require("express"),
  validator = require("../middlewares/validator.middleware"),
  auth = require("../middlewares/auth.middleware"),
  footballController = require("../controllers/football.controller"),
  footballRouter = express.Router();

/**
 * Аll routes start with '/form'
 **/

// Send contact form
footballRouter.post("/", validator("football"), footballController.create);

/// add this item
// get batch forms
footballRouter.get("/", /*auth,*/ footballController.getBatch);

module.exports = footballRouter;
