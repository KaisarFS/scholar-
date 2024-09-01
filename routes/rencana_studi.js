var express = require('express');
var router = express.Router();
const { stores, lists, info, deleteRencanaStudi } = require('../controllers/rencana_studi.js')

router
.get('/lists', lists)
.post('/stores', stores)
// .get('/detail', info)
.delete('/:id', deleteRencanaStudi)

module.exports = router;
