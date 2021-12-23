var express = require('express');
const { anthentication } = require('../middlerware/authen');
const groupController = require('../controller/group.controller');
var router = express.Router();
const multer = require('multer');
const converseJson = multer();

/* Post friend page. */
router.post('/getall', anthentication, converseJson.fields([]), function(req, res, next) {
  groupController.getAll(req, res);
});

router.post('/getorcreatesingle', anthentication, converseJson.fields([]), function(req, res, next) {
  groupController.getOrCreateSingleGroup(req, res);
});

router.post('/create', anthentication, converseJson.fields([]), function(req, res, next) {
  groupController.creategroup(req, res);
});

module.exports = router;