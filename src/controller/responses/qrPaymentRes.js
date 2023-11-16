import axios from 'axios';


export const getQrPayment = async (req, res) => {
  // BNB API endpoint for generating QR code
  const BNB_API_ENDPOINT = "https://api.mastercard.com/qr/generate";

  try {
      // Make API request to BNB to initiate payment
      const payload = {
          "userKey": "e8k7crKA9S0:APA91bGDZ76NccQkYXIzS5",
          "sourceAccountNumber": "1520468087",
          "destinationAccountNumber": "1520468060",
          "currency": "2003",
          "ammount": "10",
          "reference": "TEST",
          "onlyUse": "false"
      };

      const data = {
        amount,
        currency,
        transactionId,
        description,
        returnURL,
      };

      const userkey = {
        "currency": "BOB",
        "gloss":"Prueba BOA",
        "amount":"20",
        "singleUse":"true",
        "expirationDate":"2019-09-10"};

      const apiKey = 'F4k29lMMHxbS20Be4Zq0eaCNlJKj9teI_z1RMKKR45329b76!f2a5f48eee814ea99ad04eb8f20e61430000000000000000';

      const response = await axios.post("https://api.mastercard.com/qr/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });

      console.log("yeah");

      try {
        const response = await fetch(request);
        const data = await response.json();
        console.log(data.success);
      } catch (error) {
        throw new Error("Error al confirmar el pago");
      }
      // Send the response to the frontend
      res.status(200).json(responseData);
  } catch (error) {
      console.error('Error initiating payment:', error);
      res.status(500).json({ status: 'error', error: error });
  }
};
