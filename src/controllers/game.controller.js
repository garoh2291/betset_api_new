const errorConfig = require("../../config/error.config"),
  ObjectId = require("mongoose").Types.ObjectId,
  gameSchema = require("../schemas/game.schema");

class GameController {
  create = async (req, res, next) => {
    try {
      const gameData = {
        owner: ObjectId(res.locals.userId),
        ...req.body,
      };

      const game = await gameSchema.create(gameData);
      res.json(game);
    } catch (err) {
      next(err);
    }
  };

  getSingle = async (req, res, next) => {
    try {
      const game = await gameSchema.findOne({
        _id: req.params.id,
        // owner: res.locals.userId
        //fixme
      });
      if (!game) throw errorConfig.gameNotFound;
      res.json(game.toObject());
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const game = await gameSchema.findOne({
        _id: req.params.id,
        // owner: res.locals.userId
        //fixme
      });
      if (!game) throw errorConfig.gameNotFound;

      const {
        team1,
        team2,
        sport,
        coeff,
        league,
        position,
        description,
        risk,
      } = req.body;
      team1 && (game.team1 = team1);
      team2 && (game.team2 = team2);
      sport && (game.sport = sport);
      risk && (game.risk = risk);
      coeff && (game.coeff = coeff);
      league && (game.league = league);
      position && (game.position = position);
      description && (game.description = description);

      await game.save();
      res.json(game.toObject());
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const game = await gameSchema.findOneAndDelete({
        _id: req.params.id,
        // owner: res.locals.userId
        //fixme
      });

      if (!game) throw errorConfig.gameNotFound;
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  deleteBatch = async (req, res, next) => {
    try {
      const result = await gameSchema.remove({
        _id: {
          $in: req.body.games.map(ObjectId),
        },
      });
      if (result.deletedCount === 0) throw errorConfig.nothingToRemove;
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

      const { risk } = query;
      if (risk && /^extreme$|^medium$|^high$|^low$|^best$/gi.test(risk)) {
        dbQuery.risk = risk;
      }

      const { sport } = query;
      if (
        sport &&
        /^football$|^basketball$|^volleyball$|^Regby$|^tennis$|^tableTennis|$^hockey$/gi.test(
          sport
        )
      ) {
        dbQuery.sport = sport;
      }

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbQuery.$or = [{ team1: searchReg }, { team2: searchReg }];
      }

      if (query.create_lte || query.create_gte) {
        const createdAtQuery = {};
        query.create_lte && (createdAtQuery.$lte = new Date(query.create_lte));
        query.create_gte && (createdAtQuery.$gte = new Date(query.create_gte));
        dbQuery.created_at = createdAtQuery;
      }

      if (query.complete_lte || query.complete_gte) {
        const dateQuery = {};
        query.complete_lte && (dateQuery.$lte = new Date(query.complete_lte));
        query.complete_gte && (dateQuery.$gte = new Date(query.complete_gte));
        dbQuery.date = dateQuery;
      }

      const sort = {};
      if (query.sort) {
        switch (query.sort) {
          case "a-z":
            sort.team1.en = 1;
            break;
          case "z-a":
            sort.team1.en = -1;
            break;
          case "creation_date_oldest":
            sort.created_at = 1;
            break;
          case "creation_date_newest":
            sort.created_at = -1;
            break;
          case "completion_date_oldest":
            sort.date = 1;
            break;
          case "completion_date_newest":
            sort.date = -1;
        }
      }

      const games = await gameSchema.find(dbQuery).sort(sort).exec();
      if (!games) throw errorConfig.gameNotFound;

      res.json(games);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new GameController();
