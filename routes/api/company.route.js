const express = require('express');
const { upload } = require('../../middlewares/fileUpload');
const { ROLES } = require('../../config/roles');
const { authorize } = require('../../middlewares/authorize');
const { getAllCompanies, createCompany, updateCompany, deleteCompany, getCompany } = require('../../controllers/company.controller');

const router = express.Router();

router.route('/')
	.get(getAllCompanies)
	.post(createCompany);
// .post([
// 	upload.fields([
// 		{ name: "companyLogo", maxCount: 1 },
// 		{ name: "description", maxCount: 1 },
// 	]),
// 	createCompany]);

router.route('/:id')
	.get([getCompany])
	.put([updateCompany])
	.delete([deleteCompany]);

// router.route('/')
//   .get([authorize(ROLES.super, ROLES.admin), getAllCompanies])
// 	.post([authorize(ROLES.super, ROLES.admin), createCompany]);
// 
// router.route('/:id')
// 	.get([authorize(ROLES.super, ROLES.admin), getCompany])
// 	.put([authorize(ROLES.super, ROLES.admin), updateCompany])
// 	.delete([authorize(ROLES.super, ROLES.admin),deleteCompany]);


module.exports = router;