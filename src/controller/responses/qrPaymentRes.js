import axios from 'axios';


export const getQrPayment = async (req, res) => {
  // BNB API endpoint for generating QR code
  // const BNB_API_ENDPOINT = "https://api.mastercard.com/qr/generate";

  // try {
  //     // Make API request to BNB to initiate payment
  //     const payload = {
  //         "userKey": "e8k7crKA9S0:APA91bGDZ76NccQkYXIzS5",
  //         "sourceAccountNumber": "1520468087",
  //         "destinationAccountNumber": "1520468060",
  //         "currency": "2003",
  //         "ammount": "10",
  //         "reference": "TEST",
  //         "onlyUse": "false"
  //     };

  //     const data = {
  //       amount,
  //       currency,
  //       transactionId,
  //       description,
  //       returnURL,
  //     };

  //     const userkey = {
  //       "currency": "BOB",
  //       "gloss":"Prueba BOA",
  //       "amount":"20",
  //       "singleUse":"true",
  //       "expirationDate":"2019-09-10"};

  //     const apiKey = 'F4k29lMMHxbS20Be4Zq0eaCNlJKj9teI_z1RMKKR45329b76!f2a5f48eee814ea99ad04eb8f20e61430000000000000000';

  //     const response = await axios.post("https://api.mastercard.com/qr/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${apiKey}`,
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     console.log("yeah");

  //     try {
  //       const response = await fetch(request);
  //       const data = await response.json();
  //       console.log(data.success);
  //     } catch (error) {
  //       throw new Error("Error al confirmar el pago");
  //     }
  //     // Send the response to the frontend
  //     res.status(200).json(responseData);
  // } catch (error) {
  //     console.error('Error initiating payment:', error);
  //     res.status(500).json({ status: 'error', error: error });
  // }


   const partnerId = "ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo"; // Replace with your actual partner ID
//   const consumerKey = "F4k29lMMHxbS20Be4Zq0eaCNlJKj9teI_z1RMKKR45329b76!f2a5f48eee814ea99ad04eb8f20e61430000000000000000";
//   const keyId = 'f2a5f48eee814ea99ad04eb8f20e61430000000000000000';

  

// const requestBody = {
//   amount: 1.00, // Replace with the actual amount
//   currency: "BOB", // Replace with the actual currency
//   transactionId: "123456789", // Replace with a unique transaction ID
//   description: "Purchase of goods", // Replace with the transaction description
//   returnURL: "https://google.com", // Replace with your return URL
// };

// const OAuth = {
//   oauth_body_hash:'94cOcstEzvTvyBcNV94PCbo1b5IA35XgPf5dWR4OamU=',
//   oauth_nonce:"32lqGrI0f0nQEW85",
//   oauth_signature:"MhfaStcHU0vlIoeaBLuP14(...)qqd99lI56XuCk8RM5dDA%3D%3D",
//   oauth_consumer_key:consumerKey,
//   oauth_signature_method:"RSA-SHA256",
//   oauth_timestamp:"1558370962",
//   oauth_version:"1.0"
// }

// const timestamp = Math.floor(new Date().getTime() / 1000);

// // URL for the API endpoint
// const apiUrl = "https://sandbox.api.mastercard.com/send/static/v1/partners/" + partnerId + "/merchant/transfers/payment";

// // Function to send the QR code request
//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `OAuth ${consumerKey}:${keyId}`,
//           "PartnerID": partnerId,
//           "oauth_nonce": '32lqGrI0f0nQEW85',
//           "oauth_timestamp": timestamp,
//           "oauth_consumer_key": consumerKey
//         },
//       body: JSON.stringify(requestBody),
//       }
//     );

//     const data = await response.json();
//     res.status(200).json(data);

//     // if (response.ok) {
//     //   // QR code request successful, you can now use the data
//     //   console.log("QR code request successful:", data);
//     // } else {
//     //   // QR code request failed, handle the error
//     //   console.error("QR code request failed:", data);
//     //   res.status(500).json({ status: 'error', error: error });
//     // }
//   } catch (error) {
//     console.error("Error sending QR code request:", error);
//     res.status(500).json({ status: 'error', error: error });
//   }



const merchantId = "YOUR_SANDBOX_MERCHANT_ID";
const apiKey = "YOUR_SANDBOX_API_KEY";
const amount = 100.00;
const currency = "USD";
const transactionId = "12345678";
const description = "Payment for goods and services";
const returnURL = "https://www.yourwebsite.com/return";

const data = {
  amount,
  currency,
  transactionId,
  description,
  returnURL,
};

const request = new Request("https://sandbox.api.mastercard.com/send/static/v1/partners/ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo/merchant/transfers/payment", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `OAuth ${apiKey}`,
  },
  body: JSON.stringify(data),
});

fetch(request)
  .then(response => response.json())
  .then(data => {
    console.log("QR code generated:", data.qrCode);
    res.status(200).json(data)
  })
  .catch(error => {
    console.error("Error generating QR code:", error);
  });

};



