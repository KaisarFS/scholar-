var express = require('express');
var router = express.Router();
const { stores, lists, info, deleteMatkul } = require('../controllers/matkul.js')

router
.post('/stores', stores)
.get('/lists', lists)
.get("/info", info)
.delete('/delete', deleteMatkul)


module.exports = router;
