import React, { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, CheckCircle } from 'lucide-react';
import PaymentForm from './PaymentForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, service }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sepa' | 'transfer'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = (paymentIntent: any) => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onClose();
      setPaymentSuccess(false);
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    console.error('Erreur de paiement:', error);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Paiement Sécurisé</h2>
              <p className="text-blue-100 text-sm">{service.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {paymentSuccess ? (
            <div className="text-center py-8">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Paiement Réussi !</h3>
              <p className="text-slate-600 mb-4">
                Votre {service.name.toLowerCase()} a été confirmé.
              </p>
              <p className="text-sm text-slate-500">
                Vous allez recevoir un email de confirmation dans quelques minutes.
              </p>
            </div>
          ) : (
            <>
              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-4">Choisissez votre mode de paiement</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2 text-slate-600" />
                    <div className="text-sm font-medium">Carte</div>
                    <div className="text-xs text-slate-500">Immédiat</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('sepa')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'sepa'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Banknote className="h-6 w-6 mx-auto mb-2 text-slate-600" />
                    <div className="text-sm font-medium">SEPA</div>
                    <div className="text-xs text-slate-500">3-5 jours</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="h-6 w-6 mx-auto mb-2 text-slate-600" />
                    <div className="text-sm font-medium">Virement</div>
                    <div className="text-xs text-slate-500">1-3 jours</div>
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' && (
                <PaymentForm
                  amount={service.price}
                  description={service.description}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}

              {paymentMethod === 'sepa' && (
                <div className="text-center py-8">
                  <Banknote className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Prélèvement SEPA</h3>
                  <p className="text-slate-600 mb-4">
                    Contactez-nous pour configurer le prélèvement automatique.
                  </p>
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Contacter un conseiller
                  </button>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="text-center py-8">
                  <Smartphone className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Virement Bancaire</h3>
                  <p className="text-slate-600 mb-4">
                    Nous vous enverrons les coordonnées bancaires par email.
                  </p>
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Recevoir les coordonnées
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;