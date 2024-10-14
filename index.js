const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');


const { logger } = require('./middlewares/logger');
const { authenticate } = require('./middlewares/authenticate');
const authRoute = require('./routes/auth');
const refreshRoute = require('./routes/refresh');
// const geminiAIRoute = require('./routes/api/geminiAI');
const usersRoute = require('./routes/api/user.route');
const jobsRoute = require('./routes/api/job.route');
const companiesRoute = require('./routes/api/company.route');
const rootRoute = require('./routes/root');
const connectDB = require('./config/db_conn');
const { authorize } = require('./middlewares/authorize');
const { ROLES_LIST } = require('./config/roles');
const { createJobDescAI } = require('./controllers/geminiAI');

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, 'public')));

app.use(logger);

app.get('/api', rootRoute);
app.use('/api/auth', authRoute);
app.use('/api/refresh', refreshRoute);

// app.use(authenticate);
// app.use(authorize(ROLES_LIST.ADMIN));
app.post('/api/gemini', createJobDescAI);
// app.use('/api/gemini', geminiAIRoute);
app.use('/api/jobs', jobsRoute);
app.use('/api/companies', companiesRoute);
// app.use(authorize(ROLES_LIST.SUPER));
app.use('/api/users', usersRoute);



app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'public', 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ "error": "404 Not Found" });
	} else {
		res.type('txt').send("404 Not Found");
	}
});

const PORT = process.env.PORT || 3500;

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server succesfully running on port ${PORT}`));
});