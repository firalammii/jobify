
const express = require('express');
const { ROLES_LIST } = require('../../config/roles');
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
//   .get([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), getAllJobs])
// 	.post([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), createJob]);
// 
// router.route('/:id')
// 	.get([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), getJob])
// 	.put([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN), updateJob])
// 	.delete([authorize(ROLES_LIST.SUPER, ROLES_LIST.ADMIN),deleteJob]);


module.exports = router;