var express = require('express');
const { anthentication } = require('../middlerware/authen');
const messageController = require('../controller/message.controller');
var router = express.Router();

/* GET home page. */
router.post('/create', anthentication, function(req, res, next) {
  messageController.saveMessage(req, res);
});

router.post('/getall', anthentication, function(req, res, next) {
  messageController.getAllMessages(req, res);
});

module.exports = router;