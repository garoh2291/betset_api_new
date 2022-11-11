const HistorySchema = require("../schemas/history.schema");
const errorConfig = require("../../config/error.config");

class HistoryController {
  create = async (req, res, next) => {
    try {
      const football = await new HistorySchema(req.body).save();
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  getBatch = async (req, res, next) => {
    try {
      const { userId } = res.locals,
        { query } = req;

      const dbQuery = {
        //fixme
        // owner: userId
      };

      const sort = {};
      if (query.sort) {
        switch (query.sort) {
          case "a-z":
            sort.name = 1;
            break;
          case "z-a":
            sort.name = -1;
            break;
        }
      }

      const football = await HistorySchema.find(dbQuery).sort(sort).exec();
      // if (!forms) throw errorConfig.taskNotFound;

      res.json(football);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new HistoryController();
