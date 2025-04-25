
import React from 'react';

export function FAQSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
          <p className="text-muted-foreground">Yes, you can change your plan at any time. When upgrading, you'll get immediate access to premium features. When downgrading, you'll retain premium access until your current billing period ends.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">How do tokens work?</h3>
          <p className="text-muted-foreground">Tokens are earned by completing courses and engaging with content. They can be redeemed for additional premium content, certificates, or discounts on your subscription. Creators use tokens to enhance courses with AI features.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">What are blockchain-enabled certificates?</h3>
          <p className="text-muted-foreground">Blockchain-enabled certificates provide an immutable record of your achievement on a blockchain, offering enhanced security and verification capabilities that standard digital certificates don't have.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Is there a refund policy?</h3>
          <p className="text-muted-foreground">Yes, we offer a 14-day money-back guarantee if you're not satisfied with your Pro subscription. Contact our support team for assistance with refunds.</p>
        </div>
      </div>
    </div>
  );
}
