import { scheduleJob } from 'node-schedule';
import { fetchExchangeRates } from '../controller/requests/exchangeRatesReq.js';
import { connectToDatabase } from '../database/connection.js';
import serverApp from './settings.js';

/**
 * Method to start the server.
 */
export const startServer = async () => {
	const port = serverApp.get('port');

	if (port) {
		connectToDatabase();
		serverApp.listen(port, () => {
			console.log(`server on port ${port}`);
		});
	}

	await fetchExchangeRates();
};

/**
 * Schedule the task to fetch exchange rates daily at midnight
 */
scheduleJob('0 0 * * *', async () => {
  console.log('Fetching exchange rates...');
  await fetchExchangeRates();
});
