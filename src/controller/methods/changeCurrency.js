import { getExchangeRates } from "../requests/exchangeRatesReq.js";

/**
 * Helper function to convert a given price from one currency to a new currency.
 *
 * @param {number} priceInCurrency - The price to be converted.
 * @param {string} currentCurrency - The current currency of the price.
 * @param {string} newCurrency - The target currency for conversion (Bolivians - BOB).
 * @returns {number} - The converted price in the new curency.
 */
export const convertToCurrency = (priceInCurrency, currentCurrency, newCurrency) => {
    return (getExchangeRates()[newCurrency] / getExchangeRates()[currentCurrency]) * priceInCurrency;
}

export const getProductsWithNewCurrency = (products, newCurrency) => {
    const productsWithConvertedPrices = products.map(product => {
        const convertedPrice = convertToCurrency(product.price.value, product.price.currency, newCurrency);
        return { ...product._doc, price: { ...product._doc.price, value: convertedPrice, currency: newCurrency } };
      });
    return productsWithConvertedPrices
}
  