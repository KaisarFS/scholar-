var express = require('express');
var router = express.Router();
const { stores, lists, info, deleteMahasiswa } = require('../controllers/mahasiswa.js');

router
  .get('/lists', lists)
  .post('/stores', stores)
  .get('/info', info)
  .delete('/:id', deleteMahasiswa) // disini saya sengaja menggunakan /:id (params), ketimbang query seperti routes /info. hanya utk contoh / metode lain


module.exports = router;