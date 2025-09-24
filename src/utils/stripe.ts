import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

export const stripePromise = loadStripe(stripePublishableKey);

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface SubscriptionData {
  priceId: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export const createPaymentIntent = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du paiement');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur paiement:', error);
    throw error;
  }
};

export const createSubscription = async (subscriptionData: SubscriptionData) => {
  try {
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'abonnement');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur abonnement:', error);
    throw error;
  }
};

export const formatPrice = (amount: number, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};