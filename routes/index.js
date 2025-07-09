var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 
    name: 'Devoir-api',
    version: '1.0',
    message: 'Bienbvenue sur l\'API Devoir',
  });
});

module.exports = router;
