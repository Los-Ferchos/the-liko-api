import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51OCBE7IJLm2DQzDdB4eAcQFC5DH2ffavB9meM8OSl44THDK68bHr8qz0xXKeOEOmBtcrmLOrtHFq1mXuppsLFUZp00G99phDsw'; // Reemplázalo con tu clave secreta de Stripe
const stripeClient = new stripe(stripeSecretKey);

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
