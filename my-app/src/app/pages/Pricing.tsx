import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check } from 'lucide-react';
import { initializePaddle } from '@paddle/paddle-js';
import type { Paddle } from '@paddle/paddle-js';

interface Session {
  user?: {
    id: string;
    email: string;
  };
}

interface PricingTier {
  name: string;
  priceId: string;
  description: string;
  features: string[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Pro',
    priceId: 'pri_pro_12345', // Replace with your actual Paddle price ID
    description: 'Perfect for growing brands',
    features: [
      'Up to 5 brand profiles',
      'Real-time monitoring',
      'Basic sentiment analysis',
      'Weekly reports',
      'Email support',
    ],
  },
  {
    name: 'Agency',
    priceId: 'pri_agency_12345', // Replace with your actual Paddle price ID
    description: 'For agencies managing multiple brands',
    features: [
      'Unlimited brand profiles',
      '24/7 real-time monitoring',
      'Advanced sentiment analysis',
      'Daily reports + custom dashboards',
      'Priority support',
      'Team collaboration',
      'Custom integrations',
    ],
  },
];

export default function Pricing() {
  const { session } = useOutletContext<{ session: Session | null }>();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize Paddle
    initializePaddle({
      environment: 'sandbox', // Change to 'production' when ready
      token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN || 'test_token',
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const handleCheckout = (priceId: string) => {
    if (!paddle) {
      console.error('Paddle not initialized');
      return;
    }

    if (!session?.user) {
      console.error('User not logged in');
      alert('Please log in to subscribe');
      return;
    }

    setLoading(true);

    paddle.Checkout.open({
      items: [{ priceId }],
      customData: {
        user_id: session.user.id,
        email: session.user.email,
      },
      customer: {
        email: session.user.email,
      },
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400">
            Choose the perfect plan for your brand monitoring needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 mb-6">{tier.description}</p>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleCheckout(tier.priceId)}
                disabled={loading || !session?.user}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {!session?.user ? 'Sign in to Subscribe' : 'Subscribe Now'}
              </button>

              {tier.name === 'Agency' && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and Apple Pay through Paddle.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Contact our sales team for information about trial periods and custom enterprise solutions.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
