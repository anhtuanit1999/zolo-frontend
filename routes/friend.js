var express = require('express');
const { anthentication } = require('../middlerware/authen');
const friendController = require('../controller/friend.controller');
var router = express.Router();

/* Post friend page. */
router.post('/unban', anthentication, function(req, res, next) {
  friendController.unBan(req, res);
});

router.post('/add', anthentication, function(req, res, next) {
  friendController.accept(req, res);
});

router.post('/deny', anthentication, function(req, res, next) {
  friendController.deny(req, res);
});

router.post('/ban', anthentication, function(req, res, next) {
  friendController.ban(req, res);
});

router.post('/finduser', anthentication, function(req, res, next) {
  friendController.findUser(req, res);
});

router.post('/invite', anthentication, function(req, res, next) {
  friendController.invite(req, res);
});

router.post('/unfriend', anthentication, function(req, res, next) {
  friendController.unFriend(req, res);
});

module.exports = router;