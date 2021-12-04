var express = require('express');
const { anthentication } = require('../middlerware/authen');
const homeController = require('../controller/home.controller');
var router = express.Router();

/* GET home page. */
router.get('/', anthentication, function(req, res, next) {
  homeController.getHome(req, res);
});

router.get('/creategroup', anthentication, function(req, res, next) {
  homeController.getCreateGroup(req, res);
});

module.exports = router;