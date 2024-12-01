
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logger = (req, res, next) => {
	const date = format(new Date(), 'dd-mm-yyyy  hh:mm:ss');
	const logData = `date: ${date.split(' ')[0]} time: ${date.split(' ')[1]}  pid:${uuid()}  ${req.url}  ${req.method}`;
	console.log(logData);
	next();
};


module.exports = {
	logger,
};