
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno"
import { corsHeaders } from "../_shared/cors.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Helper for more detailed logging
function logStep(message: string, data?: any) {
  if (data) {
    console.log(`[CREATE-PAYMENT-INTENT] ${message}:`, JSON.stringify(data));
  } else {
    console.log(`[CREATE-PAYMENT-INTENT] ${message}`);
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    logStep("Handling CORS preflight request");
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    logStep("Processing payment intent request");

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
      
      const { amount, currency = 'usd', metadata = {} } = requestBody;
      
      // Enhanced validation with logging
      if (!amount || amount <= 0) {
        logStep("ERROR: Invalid amount");
        throw new Error('A valid amount greater than 0 is required');
      }
      
      // Create payment intent with error handling
      try {
        logStep("Creating payment intent", { amount, currency });
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: currency,
          metadata: metadata, // Optional metadata for the payment
          automatic_payment_methods: {
            enabled: true,  // Automatically enable payment methods for the customer
          },
        });

        logStep("Payment intent created", { 
          id: paymentIntent.id, 
          clientSecret: paymentIntent.client_secret ? "provided" : "missing" 
        });
        
        return new Response(JSON.stringify({ 
          clientSecret: paymentIntent.client_secret,
          id: paymentIntent.id
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (stripeError) {
        logStep("ERROR: Stripe payment intent error", stripeError);
        throw new Error(`Failed to create payment intent: ${stripeError.message}`);
      }
    } catch (parseError) {
      logStep("ERROR: Failed to parse request body", parseError);
      throw new Error(`Failed to parse request body: ${parseError.message}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR creating payment intent", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
