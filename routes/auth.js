const express = require('express');
const { handleLogin, handleLogout, handleRefresh } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signin', handleLogin);
router.get('/signout', handleLogout);
router.get('/refresh', handleRefresh);

module.exports = router;

//  Project ID: secure-approach-438112-s1