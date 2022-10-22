"use strict";

module.exports = (app) => {
  app.use("/", require("../routes/index.route"));

  app.use("/user", require("../routes/user.route"));
  app.use("/game", require("../routes/game.route"));
  app.use("/form", require("../routes/form.route"));
  app.use("/football", require("../routes/football.route"));
};
