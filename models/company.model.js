
const mongoose = require('mongoose');
const slugify = require('slugify');

const companiesSchema = mongoose.Schema({
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

	description: {
		type: String,
		required: true,
		trim: true
	},
	telNumber: {
		mobile: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		line: {
			type: String,
			required: true,
			unique: true,
			trim: true
		}
	},

	jobs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'jobs',
		},
	],

	companyName: {
		type: String,
		required: true,
		trim: true
	},
	website: {
		type: String,
		trim: true
	},
	companyType: {
		type: String,
		trim: true,
		enum: ['Public', 'Private', 'Government', 'Non-Profit']
	},
	companyLogo: {
		type: String,
	},

	slug: {
		type: String,
		unique: true,
		slug: 'companyName'
	},
},
	{
		timestamps: true
	}
);

companiesSchema.pre('save', function (next) {
	this.slug = slugify(this.companyName, {
		lower: true,
		strict: true,
		trim: true
	});

	const extraInfo = `${this.location.city.toLowerCase().replace(/\s+/g, '-')}`;
	this.slug = `${this.slug}-${extraInfo}`;
	next();
});

companiesSchema.index({
	companyName: 'text',
	companyType: 'text',
	location: 'text',
});

const CompanyModel = mongoose.model('companies', companiesSchema);

module.exports = CompanyModel;