
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		// required: true,
	},
	roles: [{
		type: String,
	}],
	refreshToken: {
		type: String,
		default: ''
	},
	avatar: {
		type: String,
		default: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
	},
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;