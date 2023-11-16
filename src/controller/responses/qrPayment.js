import { post } from 'axios';
const PORT = 3001;

export const getQrPayment = async (req, res) => {
    // BNB API endpoint for generating QR code
    const BNB_API_ENDPOINT = 'https://api.bnb.com/DirectDebit/GetQRVariableAmount';

    try {
        // Make API request to BNB to initiate payment
        const response = await post(BNB_API_ENDPOINT, {

        });
    

        res.json({ status: 'success' });
      } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
      }

};