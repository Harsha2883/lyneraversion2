
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno"
import { corsHeaders } from "../_shared/cors.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Helper logging function
function logStep(message: string, data?: any) {
  const detailsStr = data ? ` - ${JSON.stringify(data)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${message}${detailsStr}`);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    // Validate Stripe API key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Stripe API key is not configured');
    }
    
    const isLiveKey = stripeKey.startsWith('sk_live_');
    logStep(`Using ${isLiveKey ? 'LIVE' : 'TEST'} mode Stripe key`);

    // Validate auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      logStep("ERROR: Missing authorization header");
      throw new Error('Missing authorization header');
    }

    const { customerId } = await req.json();
    if (!customerId) {
      logStep("ERROR: Missing customer ID");
      throw new Error('Customer ID is required');
    }
    
    logStep("Creating portal session for customer", { customerId });

    // Create the portal session with origin-based return URL
    const origin = req.headers.get('origin') || 'https://oshwukedwbortdxknolz.lovable.app';
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/settings`,
    });

    logStep("Portal session created", { sessionId: session.id });
    
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer portal", { message: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
