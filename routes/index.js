var express = require('express');
const { anthentication } = require('../middlerware/authen');
var router = express.Router();

/* GET home page. */
router.get('/', anthentication, function(req, res, next) {
  res.render('index', { title: 'Chat app' });
});

module.exports = router;