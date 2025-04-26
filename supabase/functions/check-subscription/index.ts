
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno"
import { corsHeaders } from "../_shared/cors.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  // CORS preflight handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Processing subscription check request");

    // Validate auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { email } = await req.json();
    
    if (!email) {
      throw new Error('Email is required');
    }

    console.log(`Checking subscription for email: ${email}`);
    
    // Check if user has a Stripe customer ID
    const customers = await stripe.customers.list({ email, limit: 1 });
    
    if (customers.data.length === 0) {
      console.log(`No customer found for email: ${email}`);
      return new Response(JSON.stringify({ 
        subscribed: false,
        message: 'No customer record found'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const customer = customers.data[0];
    console.log(`Found customer: ${customer.id}`);
    
    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });
    
    const hasActiveSubscription = subscriptions.data.length > 0;
    console.log(`Active subscription: ${hasActiveSubscription}`);
    
    let subscriptionDetails = null;
    if (hasActiveSubscription) {
      const sub = subscriptions.data[0];
      subscriptionDetails = {
        id: sub.id,
        status: sub.status,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        plan: sub.items.data[0].plan.nickname || 'Unknown plan',
      };
    }
    
    return new Response(JSON.stringify({
      subscribed: hasActiveSubscription,
      customer_id: customer.id,
      subscription: subscriptionDetails,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error checking subscription:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
