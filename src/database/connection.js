import { set, connect } from 'mongoose';

set('strictQuery', true);
const MONGO_URI = 'mongodb+srv://Backend:0VYyi8776OlO6ps3@clusterdev.v10d7k7.mongodb.net/TheLiko?retryWrites=true&w=majority';

/**
 * Method to connect server to the database.
 */
export const connectToDatabase = async () => {
	await connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then((db) => {
			console.log('database connected');
		})
		.catch((error) => {
			console.log('connection failed');
		});
};
