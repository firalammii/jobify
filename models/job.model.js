const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		text: true
	},

	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'companies',
	},

	jobType: {
		type: String,
		required: true,
		trim: true,
		enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Freelance'],
		default: "Full-time"
	},

	jobCategory: {
		type: String,
		required: true,
		trim: true
	},

	experience: {
		minYears: {
			type: Number,
			trim: true,
			default: 0
		},
		maxYears: {
			type: Number,
			trim: true,
			default: Infinity
		}
	},

	salary: {
		currency: {
			type: String,
			trim: true,
			default: 'USD'
		},
		minSalary: {
			type: Number,
			trim: true,
			default: 0
		},
		maxSalary: {
			type: Number,
			trim: true,
			default: Infinity
		}
	},

	location: {
		country: {
			type: String,
			required: true,
			trim: true
		},
		state: {
			type: String,
			trim: true
		},
		city: {
			type: String,
			required: true,
			trim: true
		},
		zipCode: {
			type: String,
			trim: true
		}
	},

	remoteOption: {
		type: String,
		trim: true,
		enum: ['Remote', 'On-site', 'Hybrid'],
		default: "On-site"
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	skills: [{
		type: String,
		trim: true
	}],

	status: {
		type: String,
		enum: ['Active', 'Inactive', 'Closed'],
		default: 'Active'
	},

	applicationDeadline: {
		type: Date
	},
	postingDate: {
		type: Date,
		default: Date.now
	},
	applyURL: {
		type: String,
		required: true,
		trim: true
	},
	slug: {
		type: String,
		unique: true,
		slug: 'title'
	},

},

	{
		timestamps: true
	}
);

jobSchema.pre('save', function (next) {
	this.slug = slugify(this.title, {
		lower: true,
		strict: true,
		trim: true
	});

	const extraInfo = `${this.location.city.toLowerCase().replace(/\s+/g, '-')}`;
	this.slug = `${this.slug}-${extraInfo}`;
	next();
});

jobSchema.index({
	title: 'text',
	company: 'text',
	jobCategory: 'text',
	location: 'text',
});

const JobModel = mongoose.model('jobs', jobSchema);

module.exports = {
	JobModel,
};