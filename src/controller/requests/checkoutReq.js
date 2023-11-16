import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51OCBE7IJLm2DQzDdB4eAcQFC5DH2ffavB9meM8OSl44THDK68bHr8qz0xXKeOEOmBtcrmLOrtHFq1mXuppsLFUZp00G99phDsw';
const stripeClient = new stripe(stripeSecretKey);
//const stripe = require('stripe')('sk_test_51OCBE7IJLm2DQzDdB4eAcQFC5DH2ffavB9meM8OSl44THDK68bHr8qz0xXKeOEOmBtcrmLOrtHFq1mXuppsLFUZp00G99phDsw');

export const getCodeCheckout = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Crear un pago en Stripe
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
    });

    // Enviar el clientSecret al cliente
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al generar el código de pago:', error);
    res.status(500).send('Error interno del servidor');
  }
};

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

    // Si llegamos aquí, el pago fue exitoso
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    // Manejar el error y enviar una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};