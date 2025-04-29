
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno"
import { corsHeaders } from "../_shared/cors.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Define your price IDs here - make sure these match your Stripe dashboard
const PRICES = {
  'pro-learner-monthly': 'price_1RHjtuCYeyFKliobSLSGzC7z',
  'pro-learner-annual': 'price_1RHjv5CYeyFKliobSfzfuJ6m',
  'pro-creator-monthly': 'price_1RHjwDCYeyFKliob2YYPbwa8',
  'pro-creator-annual': 'price_1RHjyJCYeyFKliob2mUDSPLm'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Processing checkout request");

    // Validate auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { priceId, email, userId, userType } = await req.json();
    
    // Enhanced validation
    if (!priceId) {
      throw new Error('Price ID is required');
    }
    
    if (!PRICES[priceId]) {
      throw new Error(`Invalid price ID: ${priceId}`);
    }

    if (!email) {
      throw new Error('Email is required');
    }

    // Log the provided information
    console.log(`Creating checkout for ${email}, priceId: ${priceId}, userId: ${userId || 'none'}`);
    
    // Create or retrieve customer
    let customer;
    try {
      const customers = await stripe.customers.list({ email });
      if (customers.data.length) {
        customer = customers.data[0];
        console.log(`Using existing customer: ${customer.id}`);
      } else {
        console.log(`Creating new customer for: ${email}`);
        customer = await stripe.customers.create({ email });
      }
    } catch (stripeError) {
      console.error("Stripe customer error:", stripeError);
      throw new Error(`Failed to process customer: ${stripeError.message}`);
    }

    // Create checkout session with better error handling
    try {
      const sessionConfig = {
        customer: customer.id,
        line_items: [{ price: PRICES[priceId], quantity: 1 }],
        mode: 'subscription',
        success_url: `${req.headers.get('origin')}/pricing?success=true`,
        cancel_url: `${req.headers.get('origin')}/pricing?canceled=true`,
        metadata: {
          userId,
          userType,
        },
      };
      
      console.log("Creating checkout session with config:", JSON.stringify(sessionConfig));
      const session = await stripe.checkout.sessions.create(sessionConfig);

      console.log("Checkout session created:", session.id);
      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (stripeError) {
      console.error("Stripe session error:", stripeError);
      throw new Error(`Failed to create checkout session: ${stripeError.message}`);
    }
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
