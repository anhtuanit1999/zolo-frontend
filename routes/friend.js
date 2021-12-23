var express = require('express');
const { anthentication } = require('../middlerware/authen');
const friendController = require('../controller/friend.controller');
var router = express.Router();
const multer = require('multer');
const converseJson = multer();

/* Post friend page. */
router.post('/unban', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.unBan(req, res);
});

router.post('/add', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.accept(req, res);
});

router.post('/deny', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.deny(req, res);
});

router.post('/ban', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.ban(req, res);
});

router.post('/finduser', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.findUser(req, res);
});

router.post('/invite', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.invite(req, res);
});

router.post('/unfriend', anthentication, converseJson.fields([]), function(req, res, next) {
  friendController.unFriend(req, res);
});

module.exports = router;