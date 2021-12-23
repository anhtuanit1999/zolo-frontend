var express = require('express');
const { anthentication } = require('../middlerware/authen');
const messageController = require('../controller/message.controller');
var router = express.Router();
const multer = require('multer');
const converseJson = multer();

/* GET home page. */
router.post('/create', anthentication, converseJson.fields([]), function(req, res, next) {
  messageController.saveMessage(req, res);
});

router.post('/getall', anthentication, converseJson.fields([]), function(req, res, next) {
  messageController.getAllMessages(req, res);
});

module.exports = router;