var express = require('express');
const { anthentication } = require('../middlerware/authen');
const groupController = require('../controller/group.controller');
var router = express.Router();

/* Post friend page. */
router.post('/getall', anthentication, function(req, res, next) {
  groupController.getAll(req, res);
});

router.post('/getorcreatesingle', anthentication, function(req, res, next) {
  groupController.getOrCreateSingleGroup(req, res);
});

router.post('/create', anthentication, function(req, res, next) {
  groupController.creategroup(req, res);
});

module.exports = router;