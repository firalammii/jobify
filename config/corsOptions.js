const allowedOrigins = [
	"http://localhost:3000",
	// "http://localhost:3500",
	// "http://localhost:5500",
	"http://localhost:5173",
	"https://www.jobify.onrender.com",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin)
			callback(null, true);
		else callback(new Error("Not allowed by cors"));
	},
	credentials: true, 
	optionsSuccessStatus: 200
};

module.exports = corsOptions;