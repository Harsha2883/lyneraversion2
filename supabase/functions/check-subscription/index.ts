
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno"
import { corsHeaders } from "../_shared/cors.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    // Validate auth header with detailed logging
    const authHeader = req.headers.get('Authorization');
    logStep("Auth header present:", !!authHeader);
    
    if (!authHeader) {
      logStep("ERROR: Missing authorization header");
      throw new Error('Missing authorization header. Please make sure you are logged in.');
    }

    const token = authHeader.replace("Bearer ", "");
    logStep("Processing request with token");

    // Parse request body for user information
    const requestBody = await req.json();
    const { email, userId } = requestBody;

    if (!email) {
      logStep("ERROR: Email is required");
      throw new Error('Email is required');
    }

    logStep("Request received for user", { email, userId });

    // Check if user exists as a customer in Stripe
    logStep("Checking for existing Stripe customer");
    const customers = await stripe.customers.list({ email });
    
    if (customers.data.length === 0) {
      logStep("No Stripe customer found for email", { email });
      
      // Update database to reflect no subscription
      logStep("User has no subscription");
      
      return new Response(JSON.stringify({ 
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found customer", { customerId });
    
    // Check if user has active subscription
    logStep("Checking for active subscriptions");
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionTier = null;
    let subscriptionEnd = null;
    
    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });
      
      // Determine subscription tier based on price
      const priceId = subscription.items.data[0].price.id;
      logStep("Checking price ID", { priceId });
      
      // Map price IDs to subscription tiers
      if (priceId === 'price_1RHjtuCYeyFKliobSLSGzC7z' || priceId === 'price_1RHjv5CYeyFKliobSfzfuJ6m') {
        subscriptionTier = 'pro-learner';
      } else if (priceId === 'price_1RHjwDCYeyFKliob2YYPbwa8' || priceId === 'price_1RHjyJCYeyFKliob2mUDSPLm') {
        subscriptionTier = 'pro-creator';
      }
      
      logStep("Determined subscription tier", { subscriptionTier });
    } else {
      logStep("No active subscriptions found");
    }
    
    // Return subscription status information
    logStep("Returning subscription info", { subscribed: hasActiveSub, subscriptionTier, subscriptionEnd });
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      customer_id: customerId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
