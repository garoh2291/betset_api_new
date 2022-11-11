const express = require("express"),
  validator = require("../middlewares/validator.middleware"),
  auth = require("../middlewares/auth.middleware"),
  HistoryController = require("../controllers/history.controller"),
  historyRouter = express.Router();

historyRouter.post("/", validator("history"), HistoryController.create);

historyRouter.get("/", /*auth,*/ HistoryController.getBatch);

module.exports = historyRouter;
