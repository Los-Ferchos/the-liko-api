import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51OCBE7IJLm2DQzDdB4eAcQFC5DH2ffavB9meM8OSl44THDK68bHr8qz0xXKeOEOmBtcrmLOrtHFq1mXuppsLFUZp00G99phDsw';
const stripeClient = new stripe(stripeSecretKey);

/**
 * Generates a payment code for checkout.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the payment code is generated.
 * @throws {Error} - If there is an error generating the payment code.
 */
export const getCodeCheckout = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al generar el código de pago:', error);
    res.status(500).send('Error interno del servidor');
  }
};


/**
 * Process payment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the payment is processed.
 */
export const processPayment = async (req, res) => {
  const { payment_method_data, amount } = req.body;
  const amountInCents = Math.round(amount * 100);

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        card: {
          token: payment_method_data.card.token,
        },
      },
      confirm: true,
      return_url: 'http://localhost:5174/products',
    });

 
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};


/**
 * Validates the user information provided in the request.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @property {Object} req.body - The body of the HTTP request.
 * @property {string} req.body.FirstName - The user's first name.
 * @property {string} req.body.LastName - The user's last name.
 * @property {string} req.body.telephone - The user's telephone number.
 * @property {string} req.body.deliberyAddress - The user's delivery address.
 * @property {string} req.body.nit - The user's NIT.
 *
 * @returns {void} Does not return anything.
 *
 * @throws {Error} Throws an error with a message and a 400 status code if any of the fields are empty or if the `deliberyAddress` or `nit` fields have less than 10 characters.
 */
export const validateUserInformation = async (req, res) => {
  const { FirstName, LastName, telephone, deliberyAddress, nit } = req.body;

  if (!FirstName.trim() || !LastName.trim() || !telephone.trim() || !deliberyAddress.trim() || !nit.trim()) {
    res.status(400).json({ error: 'All fields must be filled in correctly' });
    return;
  }

  if (deliberyAddress.length < 10 ) {
    res.status(400).json({ error: 'All fields must be filled in correctly' });
    return;
  }
  res.status(200).json({ success: true });
};