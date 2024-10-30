const express = require('express');
const { authorize } = require('../../middlewares/authorize');
const { getAllUsers, createUser, updateUser, deleteUser, getUser } = require('../../controllers/user.controller');
const { ROLES } = require('../../config/roles');

const router = express.Router();

router.route('/')
  .get(getAllUsers)
	.post([createUser]);

router.route('/:id')
	.get([getUser])
	.put([updateUser])
	.delete([deleteUser]);

// router.route('/')
// 	.get([authorize(ROLES.super), getAllUsers])
// 	.post([authorize(ROLES.super), createUser]);
// 
// router.route('/:id')
// 	.get([authorize(ROLES.super), getUser])
// 	.put([authorize(ROLES.super), updateUser])
// 	.delete([authorize(ROLES.super), deleteUser]);

module.exports = router;