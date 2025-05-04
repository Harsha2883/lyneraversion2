
import { supabase } from "@/integrations/supabase/client";
import Stripe from "stripe";

// We'll use the existing Supabase client from the project
// and create a Stripe instance with proper API version

// Note: We're not storing the Stripe secret key in the frontend code
// Instead, we'll use Supabase Edge Functions for secure operations
const stripePublishableKey = "pk_live_51PWvFWCYeyFKliobMknyrMiORbTqcnTnRUlu3QIWzJQopnjkr46qadDfgOvfQUYJXrGCq6Ji1ppJzlXrrpZqvEvl00BgHf0rMY";

// This creates a Stripe instance that can be used for frontend operations
// (client-side only operations like creating payment elements)
export const stripePromise = Promise.resolve(Stripe(stripePublishableKey));

// Helper functions for interacting with Stripe via Supabase Edge Functions
export async function createCheckoutSession(priceId: string, userEmail: string, userId: string, userType?: string) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  
  if (!session) {
    throw new Error('You must be logged in to make a purchase');
  }
  
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body: {
      priceId,
      email: userEmail,
      userId: userId,
      userType: userType
    }
  });
  
  if (error) {
    throw new Error(`Failed to create checkout session: ${error.message}`);
  }
  
  return data;
}

export async function getCustomerPortal(customerId: string) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  
  if (!session) {
    throw new Error('You must be logged in to access the customer portal');
  }
  
  const { data, error } = await supabase.functions.invoke('customer-portal', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body: {
      customerId
    }
  });
  
  if (error) {
    throw new Error(`Failed to create customer portal session: ${error.message}`);
  }
  
  return data;
}

export async function checkSubscription() {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  
  if (!session) {
    return { subscribed: false };
  }
  
  const { data, error } = await supabase.functions.invoke('check-subscription', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    }
  });
  
  if (error) {
    console.error('Error checking subscription:', error);
    return { subscribed: false, error: error.message };
  }
  
  return data;
}

// New function to create a payment intent via Edge Function
export async function createPaymentIntent(amount: number, currency: string = 'usd') {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  
  if (!session) {
    throw new Error('You must be logged in to create a payment');
  }
  
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body: {
      amount,
      currency
    }
  });
  
  if (error) {
    throw new Error(`Failed to create payment intent: ${error.message}`);
  }
  
  return data;
}
