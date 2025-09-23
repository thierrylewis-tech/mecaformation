import React, { useState } from 'react';
import { Check, Star, Zap, Award, Users, Clock, Shield, Crown } from 'lucide-react';

const SubscriptionPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'cap',
      name: 'Formation CAP',
      subtitle: 'Maintenance des Véhicules',
      monthlyPrice: 13,
      yearlyPrice: 130, // 2 mois offerts
      icon: Award,
      color: 'from-green-500 to-green-600',
      popular: false,
      features: [
        'Cours CAP Maintenance Véhicules complets',
        'Vidéos HD et schémas interactifs',
        'Exercices pratiques corrigés',
        'Suivi personnalisé de progression',
        'Accès plateforme e-learning 24h/7j',
        'Support pédagogique par email',
        'Préparation aux examens officiels',
        'Certificat de formation inclus'
      ],
      limitations: [
        'Accès limité aux formations spécialisées',
        'Pas de coaching individuel'
      ]
    },
    {
      id: 'bac',
      name: 'Formation BAC PRO',
      subtitle: 'Maintenance Automobile',
      monthlyPrice: 15,
      yearlyPrice: 150, // 2 mois offerts
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      features: [
        'Tout le contenu CAP inclus',
        'Formation Bac Pro complète (3 ans)',
        'Modules management et gestion',
        'Stages en entreprise facilités',
        'Coaching mensuel personnalisé',
        'Accès aux webinaires live',
        'Préparation concours et examens',
        'Réseau professionnel alumni',
        'Support téléphonique prioritaire'
      ],
      limitations: [
        'Formations spécialisées en option'
      ]
    },
    {
      id: 'bts',
      name: 'Formation BTS',
      subtitle: 'Maintenance Véhicules',
      monthlyPrice: 18,
      yearlyPrice: 180, // 2 mois offerts
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      popular: false,
      features: [
        'Tout le contenu CAP + Bac Pro inclus',
        'Formation BTS niveau supérieur',
        'Management d\'équipe et leadership',
        'Gestion d\'atelier automobile',
        'Technologies de pointe incluses',
        'Coaching hebdomadaire personnalisé',
        'Accès prioritaire aux stages',
        'Mentorat par experts secteur',
        'Garantie insertion professionnelle',
        'Support téléphonique illimité'
      ],
      limitations: []
    },
    {
      id: 'premium',
      name: 'Diagnostic Avancé+',
      subtitle: 'Accès Complet + Spécialisations',
      monthlyPrice: 22,
      yearlyPrice: 220, // 2 mois offerts
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      popular: false,
      premium: true,
      features: [
        '🏆 ACCÈS COMPLET : CAP + BAC + BTS',
        'Diagnostic électronique avancé',
        'Formations véhicules électriques/hybrides',
        'Spécialisation hydrogène et GPL',
        'Systèmes ADAS et aide à la conduite',
        'Climatisation moderne R1234yf',
        'Coaching individuel hebdomadaire',
        'Accès aux outils de diagnostic pro',
        'Sessions live avec experts Mercedes',
        'Certification multi-constructeurs',
        'Garantie emploi sous 6 mois',
        'Support WhatsApp 24h/7j'
      ],
      limitations: []
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingPeriod === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      return monthlyCost - yearlyCost;
    }
    return 0;
  };

  return (
    <section id="abonnements" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Formules d'Abonnement
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Formules
            <span className="text-orange-500"> Révolutionnaires</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            <strong>Tarifs disruptifs</strong> pour démocratiser la formation automobile. 
            <em>77% moins cher que la concurrence</em> avec la même qualité pédagogique. 
            <strong>Accès immédiat</strong> à toutes les ressources.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                billingPeriod === 'yearly'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Annuel
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const price = getPrice(plan);
            const savings = getSavings(plan);
            
            return (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Plus Populaire
                    </div>
                  </div>
                )}
                
                {plan.premium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      🏆 Premium
                    </div>
                  </div>
                )}

                <div className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                  plan.popular ? 'border-orange-200 scale-105' : 
                  plan.premium ? 'border-yellow-200' : 'border-slate-200'
                } hover:border-orange-300`}>
                  
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${plan.color} text-white p-8 text-center`}>
                    <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm opacity-90 mb-6">{plan.subtitle}</p>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-bold mb-1">
                        {price}€
                        <span className="text-lg font-normal opacity-80">
                          /{billingPeriod === 'monthly' ? 'mois' : 'an'}
                        </span>
                      </div>
                      {billingPeriod === 'yearly' && savings > 0 && (
                        <div className="text-sm opacity-90">
                          Économisez {savings}€/an
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start opacity-60">
                          <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                            <div className="w-3 h-3 border border-slate-400 rounded-full"></div>
                          </div>
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl' 
                        : plan.premium
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
                        : 'bg-slate-800 text-white hover:bg-slate-900'
                    }`}>
                      Commencer maintenant
                    </button>

                    {/* Money back guarantee */}
                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center text-sm text-slate-500">
                        <Shield className="h-4 w-4 mr-1" />
                        Satisfait ou remboursé 30 jours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Comparaison Détaillée</h3>
            <p className="text-slate-300">Trouvez la formule qui vous correspond</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-800">Fonctionnalités</th>
                  <th className="text-center p-4 font-semibold text-slate-800">CAP</th>
                  <th className="text-center p-4 font-semibold text-slate-800">BAC PRO</th>
                  <th className="text-center p-4 font-semibold text-slate-800">BTS</th>
                  <th className="text-center p-4 font-semibold text-slate-800">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cours théoriques complets', true, true, true, true],
                  ['Vidéos HD et schémas', true, true, true, true],
                  ['Exercices pratiques', true, true, true, true],
                  ['Support pédagogique', 'Email', 'Email + Tel', 'Illimité', 'WhatsApp 24/7'],
                  ['Coaching personnalisé', false, 'Mensuel', 'Hebdo', 'Hebdo'],
                  ['Formations spécialisées', false, 'Payant', 'Payant', true],
                  ['Diagnostic avancé', false, false, false, true],
                  ['Véhicules électriques', false, false, false, true],
                  ['Certification Mercedes', false, false, false, true],
                  ['Garantie emploi', false, false, true, true]
                ].map((row, index) => (
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

        {/* Market Analysis */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">🏆 Pourquoi Nos Tarifs Révolutionnent le Marché</h3>
            <p className="text-blue-100 max-w-3xl mx-auto">
              Analyse comparative avec les leaders du marché de la formation automobile
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-300 mb-2">77%</div>
              <div className="text-blue-100">Moins cher que la concurrence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-300 mb-2">13€</div>
              <div className="text-blue-100">Prix d'entrée CAP vs 68€ ailleurs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-300 mb-2">100%</div>
              <div className="text-blue-100">Même qualité pédagogique</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Questions Fréquentes</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Puis-je changer de formule ?</h4>
              <p className="text-slate-600 text-sm">Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Y a-t-il des frais cachés ?</h4>
              <p className="text-slate-600 text-sm">Aucun frais caché. Le prix affiché est tout compris.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Puis-je annuler à tout moment ?</h4>
              <p className="text-slate-600 text-sm">Oui, résiliation possible à tout moment sans frais.</p>
            </div>
            <div>
              <h4 className="font-semibent text-slate-800 mb-2">Les diplômes sont-ils reconnus ?</h4>
              <p className="text-slate-600 text-sm">Oui, tous nos diplômes sont reconnus par l'État et les professionnels.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;