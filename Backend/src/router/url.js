const express = require('express')
const router = express.Router();
const {handelgenretedshorturl,handelshortid,handelanalytics} = require('../controllers/handelgenretedshorturl.js')

router.post('/',handelgenretedshorturl);

router.get('/:shortID',handelshortid);

router.get('/analytics/:shortID', handelanalytics);


module.exports = router;