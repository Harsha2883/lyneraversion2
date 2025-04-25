
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { corsHeaders } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

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
    const { priceId, email, userId, userType } = await req.json();
    
    if (!priceId) {
      throw new Error('Price ID is required');
    }
    
    if (!PRICES[priceId]) {
      throw new Error(`Invalid price ID: ${priceId}`);
    }

    // Create or retrieve customer
    let customer;
    
    if (email) {
      const customers = await stripe.customers.list({ email });
      if (customers.data.length) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({ email });
      }
    } else {
      throw new Error('Email is required');
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [{ price: PRICES[priceId], quantity: 1 }],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${req.headers.get('origin')}/pricing?canceled=true`,
      metadata: {
        userId,
        userType,
      },
    });

    console.log("Checkout session created:", session.id);
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
