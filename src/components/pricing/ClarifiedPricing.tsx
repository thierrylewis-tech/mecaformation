import React, { useState } from 'react';
import { Check, Star, Zap, Award, Users, Clock, Shield, Crown, CreditCard, Calendar } from 'lucide-react';
import PaymentModal from '../payment/PaymentModal';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { useAuth } from '../../contexts/AuthContext';

const ClarifiedPricing = () => {
  const [pricingMode, setPricingMode] = useState<'subscription' | 'complete'>('subscription');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const { user } = useAuth();

  // Abonnements mensuels (accès plateforme)
  const subscriptions = [
    {
      id: 'cap-monthly',
      name: 'Accès CAP',
      subtitle: 'Plateforme e-learning',
      price: 13,
      originalPrice: 57,
      savings: 77,
      icon: Award,
      color: 'from-green-500 to-green-600',
      features: [
        'Accès cours CAP Maintenance Véhicules',
        'Vidéos HD et schémas interactifs',
        'Exercices pratiques en ligne',
        'Support pédagogique par email',
        'Suivi progression personnalisé'
      ],
      limitations: [
        'Pas de certification officielle',
        'Pas de coaching individuel',
        'Pas de stage garanti'
      ]
    },
    {
      id: 'bac-monthly',
      name: 'Accès BAC PRO',
      subtitle: 'Plateforme complète',
      price: 15,
      originalPrice: 67,
      savings: 78,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      features: [
        'Tout le contenu CAP inclus',
        'Cours Bac Pro complets',
        'Modules management inclus',
        'Support téléphonique',
        'Webinaires live mensuels'
      ],
      limitations: [
        'Pas de certification officielle',
        'Coaching limité'
      ]
    },
    {
      id: 'premium-monthly',
      name: 'Accès Premium',
      subtitle: 'Toutes technologies',
      price: 22,
      originalPrice: 97,
      savings: 77,
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      premium: true,
      features: [
        'Accès complet : CAP + BAC + BTS',
        'Toutes les spécialisations incluses',
        'Diagnostic avancé',
        'Technologies futures (électrique, hydrogène)',
        'Support WhatsApp 24h/7j'
      ],
      limitations: []
    }
  ];

  // Formations complètes (certification officielle)
  const completeFormations = [
    {
      id: 'cap-complete',
      name: 'CAP MVA Complet',
      subtitle: 'Certification officielle',
      price: 890,
      monthlyPrice: 13,
      duration: '24 mois',
      icon: Award,
      color: 'from-green-500 to-green-600',
      features: [
        'Formation CAP complète certifiante',
        'Coaching personnalisé inclus',
        'Stage en entreprise garanti',
        'Préparation examens officiels',
        'Diplôme d\'État reconnu',
        'Accompagnement insertion pro',
        'Financement 0% possible'
      ]
    },
    {
      id: 'coaching-primo',
      name: 'Coaching Primo-Arrivants',
      subtitle: 'Accompagnement total',
      price: 890,
      monthlyPrice: 74,
      duration: '12 mois',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      features: [
        'Accompagnement 24h/24',
        'Plateforme e-learning complète',
        'Enseignement général intégré',
        'Aide insertion professionnelle',
        'Financement 0% sur 12 mois',
        'Support WhatsApp permanent'
      ]
    },
    {
      id: 'coaching-garage',
      name: 'Coaching Garages Pro',
      subtitle: 'Formation équipe complète',
      price: 1490,
      monthlyPrice: 124,
      duration: '12 mois',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      premium: true,
      features: [
        'Formation équipe (8 personnes max)',
        'Plateforme e-learning dédiée',
        'Audit et optimisation atelier',
        'Support technique permanent',
        'ROI garanti',
        'Certification équipe'
      ]
    }
  ];

  const diagnosticServices = [
    {
      id: 'diagnostic-express',
      name: 'Diagnostic Express',
      description: 'Diagnostic automobile express',
      price: 15,
      duration: '15 min',
      features: ['Diagnostic rapide', 'Rapport PDF', 'Support chat']
    },
    {
      id: 'diagnostic-complet',
      name: 'Diagnostic Complet',
      description: 'Diagnostic automobile complet',
      price: 59,
      duration: '45 min',
      features: ['Diagnostic approfondi', 'Rapport détaillé', 'Recommandations', 'Support téléphonique']
    },
    {
      id: 'diagnostic-mercedes',
      name: 'Diagnostic Mercedes Expert',
      description: 'Diagnostic Mercedes par expert certifié',
      price: 89,
      duration: '60 min',
      features: ['Expert Mercedes certifié', 'Accès codes constructeur', 'Diagnostic STAR', 'Garantie 30j']
    }
  ];

  const handleServiceSelect = (service: any) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setSelectedService(service);
    setShowPayment(true);
  };

  const currentPlans = pricingMode === 'subscription' ? subscriptions : completeFormations;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Tarification Clarifiée
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Choisissez Votre
            <span className="text-orange-500"> Formule</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            <strong>Deux options adaptées à vos besoins :</strong> accès mensuel à la plateforme 
            ou formation complète avec certification officielle.
          </p>

          {/* Mode Toggle */}
          <div className="inline-flex items-center bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setPricingMode('subscription')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                pricingMode === 'subscription'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Abonnement Mensuel
            </button>
            <button
              onClick={() => setPricingMode('complete')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                pricingMode === 'complete'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="h-4 w-4 inline mr-2" />
              Formation Certifiante
            </button>
          </div>
        </div>

        {/* Explanation Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border-l-4 border-orange-500">
          <div className="flex items-start">
            <div className="bg-orange-100 p-2 rounded-lg mr-4">
              {pricingMode === 'subscription' ? (
                <Calendar className="h-6 w-6 text-orange-600" />
              ) : (
                <Award className="h-6 w-6 text-orange-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {pricingMode === 'subscription' 
                  ? '📚 Abonnement Mensuel - Accès Plateforme'
                  : '🎓 Formation Complète - Certification Officielle'
                }
              </h3>
              <p className="text-slate-600">
                {pricingMode === 'subscription' 
                  ? 'Accès illimité à notre plateforme e-learning avec cours, vidéos et exercices. Idéal pour l\'auto-formation et la préparation personnelle.'
                  : 'Formation complète avec coaching personnalisé, stage en entreprise garanti, préparation aux examens officiels et diplôme d\'État reconnu.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {currentPlans.map((plan) => {
            const IconComponent = plan.icon;
            
            return (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Plus Populaire
                    </div>
                  </div>
                )}

                <div className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                  plan.popular ? 'border-orange-200 scale-105' : 'border-slate-200'
                } hover:border-orange-300`}>
                  
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${plan.color} text-white p-6 text-center`}>
                    <div className="bg-white/20 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{plan.subtitle}</p>
                    
                    <div className="mb-4">
                      {pricingMode === 'subscription' ? (
                        <>
                          <div className="text-4xl font-bold mb-1">
                            {plan.price}€
                            <span className="text-lg font-normal opacity-80">/mois</span>
                          </div>
                          {'originalPrice' in plan && (
                            <div className="text-sm opacity-90">
                              <span className="line-through">{plan.originalPrice}€</span>
                              <span className="ml-2 bg-white/20 px-2 py-1 rounded">
                                -{plan.savings}%
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-4xl font-bold mb-1">
                            {plan.price}€
                          </div>
                          {'monthlyPrice' in plan && (
                            <div className="text-sm opacity-90">
                              ou {plan.monthlyPrice}€/mois sur 12 mois
                            </div>
                          )}
                          {'duration' in plan && (
                            <div className="text-sm opacity-90">
                              Durée: {plan.duration}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations && plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start opacity-60">
                          <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                            <div className="w-3 h-3 border border-slate-400 rounded-full"></div>
                          </div>
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleServiceSelect({
                        id: plan.id,
                        name: plan.name,
                        price: plan.price,
                        description: plan.subtitle
                      })}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg' 
                          : plan.premium
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                          : 'bg-slate-800 text-white hover:bg-slate-900'
                      }`}
                    >
                      {pricingMode === 'subscription' ? 'S\'abonner maintenant' : 'Commencer la formation'}
                    </button>

                    <div className="text-center mt-3">
                      <div className="flex items-center justify-center text-xs text-slate-500">
                        <Shield className="h-3 w-3 mr-1" />
                        Satisfait ou remboursé 30 jours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Services de Diagnostic */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Services de Diagnostic à la Demande
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {diagnosticServices.map(service => (
              <div key={service.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-slate-800">{service.price}€</div>
                  <div className="text-sm text-slate-500">{service.duration}</div>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{service.name}</h4>
                <ul className="space-y-1 mb-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-center">
                      <Check className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleServiceSelect(service)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Commander maintenant
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              {pricingMode === 'subscription' ? 'Abonnements' : 'Formations'} - Comparaison Détaillée
            </h3>
            <p className="text-slate-300">
              {pricingMode === 'subscription' 
                ? 'Accès mensuel à la plateforme e-learning'
                : 'Formations complètes avec certification officielle'
              }
            </p>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-800">
                      {pricingMode === 'subscription' ? 'Fonctionnalités' : 'Inclus dans la formation'}
                    </th>
                    {currentPlans.map(plan => (
                      <th key={plan.id} className="text-center p-4 font-semibold text-slate-800">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(pricingMode === 'subscription' ? (
                    [
                      ['Cours en ligne', true, true, true],
                      ['Vidéos HD', true, true, true],
                      ['Exercices pratiques', true, true, true],
                      ['Support pédagogique', 'Email', 'Email + Tel', 'WhatsApp 24/7'],
                      ['Spécialisations', false, false, true],
                      ['Certification officielle', false, false, false],
                      ['Stage garanti', false, false, false]
                    ]
                  ) : (
                    [
                      ['Certification officielle', true, true, true],
                      ['Coaching personnalisé', true, true, true],
                      ['Stage en entreprise', true, true, true],
                      ['Insertion professionnelle', true, true, true],
                      ['Financement 0%', true, true, false],
                      ['Support permanent', 'Standard', '24h/24', 'Équipe complète']
                    ]
                  )).map((row, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-800">{row[0]}</td>
                      {row.slice(1).map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-4 text-center">
                          {typeof cell === 'boolean' ? (
                            cell ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 mx-auto flex items-center justify-center">
                                <div className="w-3 h-3 border border-slate-400 rounded-full"></div>
                              </div>
                            )
                          ) : (
                            <span className="text-slate-700 text-sm">{cell}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPayment && selectedService && (
          <PaymentModal
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            service={selectedService}
          />
        )}

        {/* Auth Modals */}
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />

        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      </div>
    </section>
  );
};

export default ClarifiedPricing;