
const express = require('express');
const createJobDescAI = require('../../controllers/geminiAI');
const router = express.Router();

router.route('/')
	.post(createJobDescAI);

module.exports = router;