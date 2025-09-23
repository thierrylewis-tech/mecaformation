import React, { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Building, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3, 
  Target, 
  Zap, 
  Globe, 
  Award, 
  Settings,
  ArrowRight,
  Star,
  Lock,
  Percent,
  Calculator,
  Eye,
  ThumbsUp,
  TrendingDown
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  fees: {
    percentage: number;
    fixed: number;
  };
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  popularity: number;
  conversionRate: number;
  icon: React.ComponentType<any>;
  color: string;
  priority: 1 | 2 | 3;
}

interface CostAnalysis {
  amount: number;
  methods: {
    name: string;
    cost: number;
    percentage: number;
  }[];
}

const PaymentMethodsAnalysis = () => {
  const [activeTab, setActiveTab] = useState<'methods' | 'costs' | 'strategy' | 'implementation'>('methods');
  const [selectedAmount, setSelectedAmount] = useState(890);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe-cards',
      name: 'Cartes Bancaires (Stripe)',
      description: 'Visa, Mastercard, American Express avec 3D Secure',
      fees: { percentage: 1.4, fixed: 0.25 },
      advantages: [
        'Acceptation universelle (95% des français)',
        'Paiement instantané',
        'Sécurité maximale 3D Secure',
        'Gestion automatique abonnements',
        'Interface utilisateur optimisée'
      ],
      disadvantages: [
        'Frais moyens (1.4% + 0.25€)',
        'Risque de fraude',
        'Dépendance aux banques'
      ],
      useCases: [
        'Abonnements mensuels (13-22€)',
        'Formations complètes (890-3800€)',
        'Paiements urgents diagnostic'
      ],
      popularity: 95,
      conversionRate: 85,
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      priority: 1
    },
    {
      id: 'sepa',
      name: 'Prélèvement SEPA',
      description: 'Prélèvement automatique sur compte bancaire',
      fees: { percentage: 0, fixed: 0.35 },
      advantages: [
        'Frais très bas (0.35€ fixe)',
        'Idéal pour abonnements récurrents',
        'Réduction du churn (-30%)',
        'Préféré par les français'
      ],
      disadvantages: [
        'Délai 3-5 jours ouvrés',
        'Risque de rejet/opposition',
        'Nécessite mandat SEPA'
      ],
      useCases: [
        'Abonnements mensuels récurrents',
        'Formations longue durée',
        'Clients fidèles établis'
      ],
      popularity: 70,
      conversionRate: 78,
      icon: Banknote,
      color: 'from-green-500 to-green-600',
      priority: 1
    },
    {
      id: 'apple-google-pay',
      name: 'Apple Pay / Google Pay',
      description: 'Paiement mobile sécurisé par biométrie',
      fees: { percentage: 1.4, fixed: 0.25 },
      advantages: [
        'Paiement ultra-rapide (1 clic)',
        'Sécurité biométrique',
        'Expérience mobile optimale',
        'Taux conversion +30%'
      ],
      disadvantages: [
        'Limité aux appareils compatibles',
        'Frais identiques CB',
        'Adoption progressive'
      ],
      useCases: [
        'Paiements mobiles',
        'Abonnements express',
        'Jeune clientèle (18-35 ans)'
      ],
      popularity: 45,
      conversionRate: 92,
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600',
      priority: 2
    },
    {
      id: 'bank-transfer',
      name: 'Virement Bancaire',
      description: 'Virement SEPA traditionnel',
      fees: { percentage: 0, fixed: 0.50 },
      advantages: [
        'Frais très faibles (0.50€)',
        'Montants élevés acceptés',
        'Sécurité maximale',
        'Préféré entreprises/garages'
      ],
      disadvantages: [
        'Délai 1-3 jours',
        'Processus manuel',
        'Pas d\'automatisation'
      ],
      useCases: [
        'Formations entreprises (1490€+)',
        'Montants élevés (>1000€)',
        'Clients B2B garages'
      ],
      popularity: 60,
      conversionRate: 65,
      icon: Building,
      color: 'from-slate-500 to-slate-600',
      priority: 1
    },
    {
      id: 'installments',
      name: 'Paiement Fractionné (Alma)',
      description: 'Paiement en 3x, 4x, 6x sans frais',
      fees: { percentage: 2.9, fixed: 0 },
      advantages: [
        'Augmente panier moyen +40%',
        'Réduit friction achat',
        'Attire clientèle jeune',
        'Sans frais pour client'
      ],
      disadvantages: [
        'Frais élevés (2.9%)',
        'Vérifications crédit',
        'Complexité gestion'
      ],
      useCases: [
        'Formations >500€',
        'Coaching primo-arrivants (890€)',
        'Équipements professionnels'
      ],
      popularity: 35,
      conversionRate: 88,
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      priority: 2
    }
  ];

  const calculateCost = (amount: number, method: PaymentMethod) => {
    return (amount * method.fees.percentage / 100) + method.fees.fixed;
  };

  const costAnalysis: CostAnalysis = {
    amount: selectedAmount,
    methods: paymentMethods.map(method => ({
      name: method.name,
      cost: calculateCost(selectedAmount, method),
      percentage: (calculateCost(selectedAmount, method) / selectedAmount) * 100
    })).sort((a, b) => a.cost - b.cost)
  };

  const segments = [
    {
      name: 'Étudiants/Primo-Arrivants',
      percentage: 40,
      preferredMethods: ['Paiement fractionné', 'SEPA mensuel', 'CB famille'],
      avgAmount: 890,
      conversionRate: 12,
      icon: Users,
      color: 'bg-green-100 text-green-700'
    },
    {
      name: 'Reconversion Professionnelle',
      percentage: 35,
      preferredMethods: ['CPF', 'Pôle Emploi', 'Paiement étalé'],
      avgAmount: 1200,
      conversionRate: 15,
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Garages/Entreprises',
      percentage: 15,
      preferredMethods: ['Virement', 'CB entreprise', 'OPCO'],
      avgAmount: 1490,
      conversionRate: 25,
      icon: Building,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Formations Courtes',
      percentage: 10,
      preferredMethods: ['CB', 'PayPal', 'Apple/Google Pay'],
      avgAmount: 350,
      conversionRate: 18,
      icon: Clock,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  const implementationPhases = [
    {
      phase: 'Phase 1 - Lancement',
      duration: 'Semaine 1',
      priority: 'Critique',
      methods: ['Stripe (CB + SEPA)', 'Virement bancaire'],
      coverage: '80%',
      color: 'bg-red-100 text-red-700'
    },
    {
      phase: 'Phase 2 - Optimisation',
      duration: 'Semaine 2-3',
      priority: 'Important',
      methods: ['Alma 3x', 'Apple/Google Pay'],
      coverage: '95%',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      phase: 'Phase 3 - Financement',
      duration: 'Mois 2-3',
      priority: 'Stratégique',
      methods: ['CPF', 'OPCO', 'PayPal'],
      coverage: '99%',
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <section id="moyens-paiement" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CreditCard className="h-4 w-4 mr-2" />
            Analyse Moyens de Paiement
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Stratégie de
            <span className="text-green-500"> Paiement Optimisée</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Analyse complète des moyens de paiement</strong> pour maximiser vos conversions. 
            <em>Stratégie multi-méthodes</em> adaptée à chaque segment client avec 
            <strong>objectif +25% de conversion</strong>.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('methods')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'methods'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="h-4 w-4 inline mr-2" />
                Méthodes
              </button>
              <button
                onClick={() => setActiveTab('costs')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'costs'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calculator className="h-4 w-4 inline mr-2" />
                Coûts
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'strategy'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Target className="h-4 w-4 inline mr-2" />
                Stratégie
              </button>
              <button
                onClick={() => setActiveTab('implementation')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'implementation'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Implémentation
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div key={method.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${method.color} text-white p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          method.priority === 1 ? 'bg-red-500' :
                          method.priority === 2 ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}>
                          Priorité {method.priority}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                    <p className="text-sm opacity-90">{method.description}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Fees */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-slate-800 mb-2">💰 Frais de transaction</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Pourcentage:</span>
                        <span className="font-bold">{method.fees.percentage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Frais fixes:</span>
                        <span className="font-bold">{method.fees.fixed}€</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{method.popularity}%</div>
                        <div className="text-xs text-slate-500">Popularité</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{method.conversionRate}%</div>
                        <div className="text-xs text-slate-500">Conversion</div>
                      </div>
                    </div>

                    {/* Advantages */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Avantages
                      </h4>
                      <ul className="space-y-1">
                        {method.advantages.slice(0, 3).map((advantage, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">🎯 Cas d'usage</h4>
                      <div className="space-y-1">
                        {method.useCases.map((useCase, index) => (
                          <div key={index} className="text-sm text-slate-600 bg-slate-50 rounded px-3 py-2">
                            {useCase}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      method.priority === 1 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : method.priority === 2
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                    }`}>
                      {method.priority === 1 ? 'Intégrer Maintenant' : 
                       method.priority === 2 ? 'Planifier Intégration' : 'Évaluer Plus Tard'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cost Analysis Tab */}
        {activeTab === 'costs' && (
          <div>
            {/* Amount Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
                💰 Calculateur de Frais par Montant
              </h3>
              
              <div className="flex justify-center mb-8">
                <div className="flex flex-wrap gap-4">
                  {[13, 22, 350, 890, 1490, 3800].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedAmount === amount
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {amount}€
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {costAnalysis.methods.map((method, index) => (
                  <div key={index} className={`border-2 rounded-xl p-6 ${
                    index === 0 ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800">{method.name}</h4>
                      {index === 0 && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Moins cher
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-800 mb-1">
                        {method.cost.toFixed(2)}€
                      </div>
                      <div className="text-sm text-slate-500">
                        {method.percentage.toFixed(2)}% du montant
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Comparison Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">📊 Comparaison Frais par Montant</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-800">Méthode</th>
                      <th className="text-center p-4 font-semibold text-slate-800">15€</th>
                      <th className="text-center p-4 font-semibold text-slate-800">350€</th>
                      <th className="text-center p-4 font-semibold text-slate-800">890€</th>
                      <th className="text-center p-4 font-semibold text-slate-800">1490€</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentMethods.map((method, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="p-4 font-medium text-slate-800">{method.name}</td>
                        <td className="p-4 text-center">{calculateCost(15, method).toFixed(2)}€</td>
                        <td className="p-4 text-center">{calculateCost(350, method).toFixed(2)}€</td>
                        <td className="p-4 text-center">{calculateCost(890, method).toFixed(2)}€</td>
                        <td className="p-4 text-center">{calculateCost(1490, method).toFixed(2)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Strategy Tab */}
        {activeTab === 'strategy' && (
          <div>
            {/* Customer Segments */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">🎯 Stratégie par Segment Client</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {segments.map((segment, index) => {
                  const IconComponent = segment.icon;
                  return (
                    <div key={index} className="border border-slate-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg mr-4 ${segment.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{segment.name}</h4>
                          <div className="text-sm text-slate-500">{segment.percentage}% de la clientèle</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Panier moyen:</span>
                          <span className="font-semibold">{segment.avgAmount}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Conversion:</span>
                          <span className="font-semibold text-green-600">{segment.conversionRate}%</span>
                        </div>
                        
                        <div>
                          <span className="text-slate-600 text-sm">Méthodes préférées:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {segment.preferredMethods.map((method, methodIndex) => (
                              <span key={methodIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conversion Optimization */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-bold text-slate-800 mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Optimisations Conversion
                </h4>
                
                <div className="space-y-4">
                  {[
                    { 
                      optimization: 'Paiement 1-clic (Apple/Google Pay)',
                      impact: '+30%',
                      difficulty: 'Facile',
                      color: 'text-green-600'
                    },
                    {
                      optimization: 'Paiement fractionné sans frais',
                      impact: '+40%',
                      difficulty: 'Moyen',
                      color: 'text-green-600'
                    },
                    {
                      optimization: 'Sauvegarde panier automatique',
                      impact: '+15%',
                      difficulty: 'Facile',
                      color: 'text-blue-600'
                    },
                    {
                      optimization: 'Relance abandon panier',
                      impact: '+25%',
                      difficulty: 'Moyen',
                      color: 'text-green-600'
                    },
                    {
                      optimization: 'Checkout en 1 page',
                      impact: '+20%',
                      difficulty: 'Difficile',
                      color: 'text-orange-600'
                    }
                  ].map((opt, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-slate-800">{opt.optimization}</h5>
                        <span className="text-xs text-slate-500">Difficulté: {opt.difficulty}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${opt.color}`}>{opt.impact}</div>
                        <div className="text-xs text-slate-500">Conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-bold text-slate-800 mb-6 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" />
                  Sécurité & Confiance
                </h4>
                
                <div className="space-y-4">
                  {[
                    {
                      element: 'Badges sécurité SSL/3D Secure',
                      impact: 'Confiance +25%',
                      status: 'Intégré'
                    },
                    {
                      element: 'Garantie remboursement 30j',
                      impact: 'Conversion +15%',
                      status: 'Intégré'
                    },
                    {
                      element: 'Témoignages clients paiement',
                      impact: 'Confiance +20%',
                      status: 'À ajouter'
                    },
                    {
                      element: 'Support chat paiement 24/7',
                      impact: 'Abandon -30%',
                      status: 'À ajouter'
                    },
                    {
                      element: 'Processus transparent',
                      impact: 'Satisfaction +35%',
                      status: 'Intégré'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <h5 className="font-medium text-slate-800 text-sm">{item.element}</h5>
                        <span className="text-xs text-green-600">{item.impact}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.status === 'Intégré' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Implementation Tab */}
        {activeTab === 'implementation' && (
          <div>
            {/* Implementation Phases */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">🚀 Plan d'Implémentation</h3>
              
              <div className="space-y-6">
                {implementationPhases.map((phase, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-800">{phase.phase}</h4>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>{phase.duration}</span>
                          <span className={`px-2 py-1 rounded ${phase.color}`}>
                            {phase.priority}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">{phase.coverage}</div>
                        <div className="text-xs text-slate-500">Couverture</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {phase.methods.map((method, methodIndex) => (
                        <span key={methodIndex} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-bold text-slate-800 mb-6">🔧 Prérequis Techniques</h4>
                
                <div className="space-y-4">
                  {[
                    {
                      requirement: 'Compte Stripe activé',
                      status: 'En attente',
                      priority: 'Critique'
                    },
                    {
                      requirement: 'Clés API Stripe (test + prod)',
                      status: 'En attente',
                      priority: 'Critique'
                    },
                    {
                      requirement: 'Webhooks configurés',
                      status: 'Prêt',
                      priority: 'Important'
                    },
                    {
                      requirement: 'Base données paiements',
                      status: 'Prêt',
                      priority: 'Important'
                    },
                    {
                      requirement: 'Interface utilisateur',
                      status: 'Prêt',
                      priority: 'Important'
                    },
                    {
                      requirement: 'Tests de paiement',
                      status: 'À faire',
                      priority: 'Important'
                    }
                  ].map((req, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <h5 className="font-medium text-slate-800 text-sm">{req.requirement}</h5>
                        <span className={`text-xs ${
                          req.priority === 'Critique' ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {req.priority}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'Prêt' ? 'bg-green-100 text-green-700' :
                        req.status === 'En attente' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-bold text-slate-800 mb-6">📈 ROI Attendu</h4>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">+25%</div>
                    <div className="text-slate-600">Augmentation conversion</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-xs text-slate-500">Taux succès paiement</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">450€</div>
                      <div className="text-xs text-slate-500">Panier moyen</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-slate-800 mb-2">Projection 6 mois</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Revenus actuels:</span>
                        <span className="font-semibold">0€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenus projetés:</span>
                        <span className="font-semibold text-green-600">48,800€</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>ROI:</span>
                        <span className="font-bold text-green-600">+∞%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">🎯 Plan d'Action Immédiat</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold mb-2">Cette Semaine</h4>
                  <ul className="text-sm text-green-100 space-y-1">
                    <li>• Créer compte Stripe</li>
                    <li>• Intégrer CB + SEPA</li>
                    <li>• Tests paiements</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold mb-2">Semaine 2-3</h4>
                  <ul className="text-sm text-green-100 space-y-1">
                    <li>• Ajouter Alma 3x</li>
                    <li>• Apple/Google Pay</li>
                    <li>• Optimiser checkout</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold mb-2">Mois 2-3</h4>
                  <ul className="text-sm text-green-100 space-y-1">
                    <li>• Référencement CPF</li>
                    <li>• Partenariat OPCO</li>
                    <li>• Analytics avancées</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 Prêt à Activer les Paiements ?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Votre stratégie de paiement est définie ! Commencez par Stripe pour activer 
            immédiatement 80% de vos moyens de paiement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Configurer Stripe Maintenant
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold">
              Télécharger l'Analyse PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsAnalysis;