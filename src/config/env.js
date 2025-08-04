export const env = {
	port: process.env.PORT || 3300,
	mongodbUri: process.env.DB_URI || "mongodb://127.0.0.1:27017/ipvt-backend",
};