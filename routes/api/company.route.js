
const express = require('express');
const path = require('path');
// const multer = require('multer');
const { ROLES_LIST } = require('../../config/roles');
const { authorize } = require('../../middlewares/authorize');
const { getAllCompanies, createCompany, updateCompany, deleteCompany, getCompany } = require('../../controllers/company.controller');

const router = express.Router();

router.route('/')
	.get(getAllCompanies)
	.post([createCompany]);

router.route('/:id')
	.get([getCompany])
	.put([updateCompany])
	.delete([deleteCompany]);

// router.route('/')
//   .get([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), getAllCompanies])
// 	.post([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), createCompany]);
// 
// router.route('/:id')
// 	.get([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), getCompany])
// 	.put([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), updateCompany])
// 	.delete([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN),deleteCompany]);


module.exports = router;