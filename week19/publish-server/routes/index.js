var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  let body = [];
  console.log('---------------get req----------------');
  fs.writeFileSync('../server/public/1.html', '<div>test</div>');
  
  res.send('success');
  res.end();
});

router.post('/', function (req, res, next) {
  console.log('---------------post req----------------');
  fs.writeFileSync('../server/public/' + req.query.filename, req.body.content);

  res.send('success');
  res.end();
});

module.exports = router;
