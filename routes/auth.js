
const express = require('express');
const { handleLogin, handleLogout } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signin', handleLogin);
router.get('/signout', handleLogout);

module.exports = router;

//  Project ID: secure-approach-438112-s1