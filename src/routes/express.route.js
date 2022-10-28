const express = require("express"),
  validator = require("../middlewares/validator.middleware"),
  auth = require("../middlewares/auth.middleware"),
  expressRouter = express.Router(),
  expressController = require("../controllers/express.controller");

// create game
expressRouter.post(
  "/",
  /*auth,*/ validator("express-create"),
  expressController.create
);

// get one game
expressRouter.get("/:id", /*auth,*/ expressController.getSingle);

// get batch games
expressRouter.get("/", /*auth,*/ expressController.getBatch);

// update game
expressRouter.put(
  "/:id",
  /* auth,*/ validator("express-update"),
  expressController.update
);

// delete single game
expressRouter.delete("/:id", /*auth,*/ expressController.delete);

module.exports = expressRouter;
