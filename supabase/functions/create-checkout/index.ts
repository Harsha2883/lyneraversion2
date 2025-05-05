
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

// Helper for more detailed logging
function logStep(message: string, data?: any) {
  if (data) {
    console.log(`[CREATE-CHECKOUT] ${message}:`, JSON.stringify(data));
  } else {
    console.log(`[CREATE-CHECKOUT] ${message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    logStep("Handling CORS preflight request");
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    logStep("Processing checkout request");

    // Validate Stripe API key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Stripe API key is not configured');
    }
    
    const isLiveKey = stripeKey.startsWith('sk_live_');
    logStep(`Using ${isLiveKey ? 'LIVE' : 'TEST'} mode Stripe key`);
    
    // Validate auth header with detailed logging
    const authHeader = req.headers.get('Authorization');
    logStep("Auth header present:", !!authHeader);
    
    if (!authHeader) {
      logStep("ERROR: Missing authorization header");
      throw new Error('Missing authorization header. Please make sure you are logged in.');
    }

    try {
      const requestBody = await req.json();
      logStep("Request body received", requestBody);
      
      const { priceId, email, userId, userType } = requestBody;
      
      // Enhanced validation with logging
      if (!priceId) {
        logStep("ERROR: Price ID is missing in request");
        throw new Error('Price ID is required');
      }
      
      logStep("Checking price ID validity", { priceId, availablePrices: Object.keys(PRICES) });
      
      if (!PRICES[priceId]) {
        logStep(`ERROR: Invalid price ID: ${priceId}`);
        throw new Error(`Invalid price ID: ${priceId}`);
      }

      if (!email) {
        logStep("ERROR: Email is missing in request");
        throw new Error('Email is required');
      }

      // Log the provided information
      logStep(`Creating checkout for user`, { email, priceId, userId: userId || 'none', userType: userType || 'none' });
      
      // Create or retrieve customer with error handling
      let customer;
      try {
        logStep("Looking up existing customer with email", { email });
        const customers = await stripe.customers.list({ email });
        if (customers.data.length) {
          customer = customers.data[0];
          logStep(`Using existing customer`, { customerId: customer.id });
        } else {
          logStep(`Creating new customer for email`, { email });
          customer = await stripe.customers.create({ email });
          logStep("New customer created", { customerId: customer.id });
        }
      } catch (stripeError: any) {
        logStep("ERROR: Stripe customer error", stripeError);
        throw new Error(`Failed to process customer: ${stripeError.message}`);
      }

      // Create checkout session with better error handling
      try {
        const origin = req.headers.get('origin');
        logStep("Using origin for redirect URLs", { origin });

        const sessionConfig = {
          customer: customer.id,
          line_items: [{ price: PRICES[priceId], quantity: 1 }],
          mode: 'subscription',
          success_url: `${origin}/pricing?success=true`,
          cancel_url: `${origin}/pricing?canceled=true`,
          metadata: {
            userId,
            userType,
          },
        };
        
        logStep("Creating checkout session with config", sessionConfig);
        const session = await stripe.checkout.sessions.create(sessionConfig);

        logStep("Checkout session created", { sessionId: session.id, url: session.url });
        
        return new Response(JSON.stringify({ url: session.url }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (stripeError: any) {
        logStep("ERROR: Stripe session error", { 
          message: stripeError.message, 
          type: stripeError.type,
          code: stripeError.code 
        });
        throw new Error(`Failed to create checkout session: ${stripeError.message}`);
      }
    } catch (parseError: any) {
      logStep("ERROR: Failed to parse request body", parseError);
      throw new Error(`Failed to parse request body: ${parseError.message}`);
    }
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR creating checkout session", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
