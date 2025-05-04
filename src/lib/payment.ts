
import { createPaymentIntent } from "./stripe";

/**
 * Helper function to create a payment intent for one-time payments
 * @param amount Amount in cents
 * @param currency Currency code (default: 'usd')
 * @returns Payment intent data including client secret
 */
export const processPayment = async (amount: number, currency: string = 'usd') => {
  try {
    // Create a payment intent with Stripe via Supabase Edge Function
    const paymentIntent = await createPaymentIntent(amount, currency);
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Format amount to display as currency
 * @param amount Amount in cents
 * @param currency Currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'usd') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  
  return formatter.format(amount / 100);
};
