const express = require('express');

const mainControllers=require('../controllers/main');

const router = express.Router();



router.get('/', mainControllers.getMain);
router.get('/guestshow', mainControllers.guetShowGet);
router.post('/guetShowPost', mainControllers.guetShowPost)

module.exports = router;