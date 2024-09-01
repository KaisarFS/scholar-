var express = require('express');
var router = express.Router();
const { stores, lists, info } = require('../controllers/rencana_studi.js')

router
.get('/lists', lists)
.post('/stores', stores)
// .get('/info', info)

module.exports = router;
