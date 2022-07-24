const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser,
    verifyToken
} = require('../controllers/authorization.controller');

router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/verifyToken', verifyToken);

module.exports =  router;