const express = require('express');
const { ROLES } = require('../../config/roles');
const { authorize } = require('../../middlewares/authorize');
const { getAllJobs, createJob, updateJob, deleteJob, getJob, searchJobs } = require('../../controllers/jobs.controller');

const router = express.Router();

router.route('/')
	.get(getAllJobs)
	.post([createJob]);

router.route('/:id')
	.get([getJob])
	// .get([eitherAdminOrEditor, getJob])
	.put([updateJob])
	.delete([deleteJob]);


// router.route('/')
//   .get([authorize(ROLES.super, ROLES.admin), getAllJobs])
// 	.post([authorize(ROLES.super, ROLES.admin), createJob]);
// 
// router.route('/:id')
// 	.get([authorize(ROLES.super, ROLES.admin), getJob])
// 	.put([authorize(ROLES.super, ROLES.admin), updateJob])
// 	.delete([authorize(ROLES.super, ROLES.admin),deleteJob]);


module.exports = router;