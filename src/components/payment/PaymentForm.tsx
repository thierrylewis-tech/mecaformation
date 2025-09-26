import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../utils/stripe';
import { Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  description: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

const PaymentFormContent: React.FC<PaymentFormProps> = ({ amount, description, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Erreur de chargement du formulaire de paiement');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment intent
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'eur',
        description,
        metadata: {
          service_type: 'formation',
          platform: 'mecaformation'
        }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur création Payment Intent');
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Client secret manquant');
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Client MécaFormation'
          }
        }
      });

      if (stripeError) {
        setError(stripeError.message || 'Erreur de paiement');
        onError(stripeError.message || 'Erreur de paiement');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent);
      } else {
        setError('Paiement non confirmé');
        onError('Paiement non confirmé');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de paiement';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800 text-sm">{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Informations de paiement
        </label>
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: 'system-ui, sans-serif',
                  lineHeight: '24px',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: false,
            }}
          />
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600">Service :</span>
          <span className="font-semibold text-slate-800">{description}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total à payer :</span>
          <span className="text-2xl font-bold text-green-600">{amount}€</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <Lock className="h-5 w-5 mr-2" />
            Payer {amount}€ en sécurité
          </>
        )}
      </button>

      <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
        <div className="flex items-center">
          <Lock className="h-3 w-3 mr-1" />
          Paiement sécurisé SSL
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          Satisfait ou remboursé
        </div>
      </div>
    </form>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm;