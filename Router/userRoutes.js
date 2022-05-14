const express = require('express');
const { checkAuth } = require('../config/checkauth.config');
const isAuthenticated = require('../config/isAutheniticated.config');
const { registerUser, loginUser, allUser, userData, } = require('../Controller/auth.controller');
const router = express.Router();


router.post('/register' , registerUser);
router.post('/login' , checkAuth ,loginUser);
router.get("/alluser",isAuthenticated , allUser);
router.get('/private',isAuthenticated,userData)


module.exports = router;