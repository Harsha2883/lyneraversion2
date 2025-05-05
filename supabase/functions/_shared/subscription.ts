
// Helper functions for checking subscription status
export async function isUserSubscribed(
  stripe: any,
  email: string
): Promise<{
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  customer_id: string | null;
}> {
  // Find customer by email
  const customers = await stripe.customers.list({ email, limit: 1 });
  
  if (customers.data.length === 0) {
    return {
      subscribed: false,
      subscription_tier: null,
      subscription_end: null,
      customer_id: null
    };
  }
  
  const customerId = customers.data[0].id;
  
  // Check for active subscription
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });
  
  if (subscriptions.data.length === 0) {
    return {
      subscribed: false,
      subscription_tier: null,
      subscription_end: null,
      customer_id: customerId
    };
  }
  
  const subscription = subscriptions.data[0];
  const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
  
  // Get price ID to determine tier
  const priceId = subscription.items.data[0].price.id;
  let subscriptionTier = null;
  
  if (priceId === 'price_1RHjtuCYeyFKliobSLSGzC7z' || priceId === 'price_1RHjv5CYeyFKliobSfzfuJ6m') {
    subscriptionTier = 'pro-learner';
  } else if (priceId === 'price_1RHjwDCYeyFKliob2YYPbwa8' || priceId === 'price_1RHjyJCYeyFKliob2mUDSPLm') {
    subscriptionTier = 'pro-creator';
  }
  
  return {
    subscribed: true,
    subscription_tier: subscriptionTier,
    subscription_end: subscriptionEnd,
    customer_id: customerId
  };
}
