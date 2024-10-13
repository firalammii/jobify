
const express = require('express');
const { authorize } = require('../../middlewares/authorize');
const { getAllUsers, createUser, updateUser, deleteUser, getUser } = require('../../controllers/user.controller');
const { ROLES_LIST } = require('../../config/roles');

const router = express.Router();

router.route('/')
  .get(getAllUsers)
	.post([createUser]);

router.route('/:id')
	.get([getUser])
	.put([updateUser])
	.delete([deleteUser]);

// router.route('/')
// 	.get([authorize(ROLES_LIST.SUPER), getAllUsers])
// 	.post([authorize(ROLES_LIST.SUPER), createUser]);
// 
// router.route('/:id')
// 	.get([authorize(ROLES_LIST.SUPER), getUser])
// 	.put([authorize(ROLES_LIST.SUPER), updateUser])
// 	.delete([authorize(ROLES_LIST.SUPER), deleteUser]);

module.exports = router;