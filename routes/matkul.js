var express = require('express');
var router = express.Router();
const { stores, lists, info } = require('../controllers/matkul.js')

router
.post('/stores', stores)
.get('/lists', lists)
.get("/info", info)

module.exports = router;
