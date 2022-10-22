const express = require('express'),
  validator = require('../middlewares/validator.middleware'),
  auth = require('../middlewares/auth.middleware'),
  gameRouter = express.Router(),
  gameController = require('../controllers/game.controller');

/**
 * Аll routes start with '/game'
 **/
//todo please fix the auth middleware later

// create game
gameRouter.post('/', /*auth,*/ validator('game-create'), gameController.create);

// get one game
gameRouter.get('/:id', /*auth,*/ gameController.getSingle);

// get batch games
gameRouter.get('/', /*auth,*/ gameController.getBatch);

// update game
gameRouter.put('/:id',/* auth,*/ validator('game-update'), gameController.update);

// delete batch games
gameRouter.patch('/', /*auth,*/ validator('game-delete-batch'), gameController.deleteBatch);

// delete single game
gameRouter.delete('/:id', /*auth,*/ gameController.delete);



module.exports = gameRouter;
