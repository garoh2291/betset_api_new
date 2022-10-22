const FormSchema = require("../schemas/form.schema");
const errorConfig = require("../../config/error.config");
class FormController {
  create = async (req, res, next) => {
    try {
      const form = await new FormSchema(req.body).save();
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

      const forms = await FormSchema.find(dbQuery).sort(sort).exec();
      // if (!forms) throw errorConfig.taskNotFound;

      res.json(forms);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new FormController();
