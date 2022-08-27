const express = require('express');

const userController=require('../controllers/user');
const isAuth=require('../middleware/is-auth');

const router = express.Router();

router.get('/userShow', isAuth, userController.getUserShow);
router.post('/userShowPost', isAuth, userController.postUserShow);
router.get('/myshowlist', isAuth, userController.getMyShowList);



module.exports = router;