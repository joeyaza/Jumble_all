var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var articlesController = require('../controllers/articlesController');

var User = require('../models/user');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/articles')
  .get(articlesController.addArticle);

module.exports = router