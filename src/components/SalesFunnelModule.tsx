import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  ArrowRight, 
  Gift, 
  Clock, 
  Shield, 
  Star,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Zap,
  Mail,
  Phone,
  Download,
  Play,
  Eye,
  MousePointer,
  CreditCard,
  UserCheck,
  Repeat,
  Award,
  Lightbulb,
  Settings,
  Calendar,
  MessageSquare,
  FileText,
  Smartphone,
  Globe,
  Heart,
  ThumbsUp
} from 'lucide-react';

interface FunnelStep {
  id: string;
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
}

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  format: string;
  conversionRate: number;
  downloads: number;
  icon: React.ComponentType<any>;
}

const SalesFunnelModule = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leadmagnets' | 'emails' | 'pages' | 'metrics'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const funnelSteps: FunnelStep[] = [
    {
      id: 'traffic',
      name: 'Trafic Website',
      visitors: 10000,
      conversions: 10000,
      conversionRate: 100,
      revenue: 0
    },
    {
      id: 'leads',
      name: 'Génération Leads',
      visitors: 10000,
      conversions: 2500,
      conversionRate: 25,
      revenue: 0
    },
    {
      id: 'nurturing',
      name: 'Email Nurturing',
      visitors: 2500,
      conversions: 1250,
      conversionRate: 50,
      revenue: 0
    },
    {
      id: 'sales',
      name: 'Pages de Vente',
      visitors: 1250,
      conversions: 100,
      conversionRate: 8,
      revenue: 1300
    },
    {
      id: 'checkout',
      name: 'Processus Commande',
      visitors: 100,
      conversions: 85,
      conversionRate: 85,
      revenue: 1105
    },
    {
      id: 'customers',
      name: 'Clients Payants',
      visitors: 85,
      conversions: 85,
      conversionRate: 100,
      revenue: 1105
    }
  ];

  const leadMagnets: LeadMagnet[] = [
    {
      id: 'guide-cap',
      title: 'Guide "Réussir son CAP MVA 2024"',
      description: 'PDF 25 pages avec nouveau référentiel, planning révision, 50 questions types',
      format: 'PDF + Bonus',
      conversionRate: 25,
      downloads: 1250,
      icon: FileText
    },
    {
      id: 'diagnostic-gratuit',
      title: 'Diagnostic Véhicule Gratuit',
      description: 'Quiz interactif 10 questions avec rapport personnalisé et conseils',
      format: 'Quiz + Rapport',
      conversionRate: 35,
      downloads: 875,
      icon: Settings
    },
    {
      id: 'webinaire-metiers',
      title: 'Webinaire "Métiers d\'Avenir Auto"',
      description: 'Live 45min sur évolution secteur, véhicules électriques, débouchés 2030',
      format: 'Webinaire Live',
      conversionRate: 45,
      downloads: 450,
      icon: Play
    },
    {
      id: 'kit-outils',
      title: 'Kit "Outils Indispensables"',
      description: 'Liste 50 outils essentiels + vidéos utilisation + budget débutant',
      format: 'PDF + Vidéos',
      conversionRate: 30,
      downloads: 600,
      icon: Award
    }
  ];

  const emailSequence = [
    {
      day: 0,
      subject: '🎁 Votre guide "Réussir son CAP MVA 2024" est prêt !',
      type: 'Livraison',
      openRate: 65,
      clickRate: 25,
      goal: 'Livrer le lead magnet et présenter l\'offre'
    },
    {
      day: 2,
      subject: '💰 Formation automobile à 13€/mois ? C\'est possible !',
      type: 'Présentation',
      openRate: 45,
      clickRate: 18,
      goal: 'Présenter les tarifs révolutionnaires'
    },
    {
      day: 4,
      subject: '🎓 "J\'ai décroché mon CDI grâce à MécaFormation" - Thomas',
      type: 'Témoignage',
      openRate: 52,
      clickRate: 22,
      goal: 'Preuves sociales et crédibilité'
    },
    {
      day: 6,
      subject: '❓ "13€/mois, c\'est trop beau pour être vrai ?"',
      type: 'Objection',
      openRate: 48,
      clickRate: 20,
      goal: 'Lever les objections sur le prix'
    },
    {
      day: 8,
      subject: '⏰ Plus que 48h pour profiter de -50% !',
      type: 'Urgence',
      openRate: 58,
      clickRate: 28,
      goal: 'Créer l\'urgence et pousser à l\'action'
    }
  ];

  const trafficSources = [
    { name: 'Google Ads', visitors: 4000, cost: 2000, conversions: 320, roi: 12 },
    { name: 'Facebook Ads', visitors: 3000, cost: 1500, conversions: 180, roi: 10 },
    { name: 'SEO Organique', visitors: 2000, cost: 500, conversions: 240, roi: 999 },
    { name: 'LinkedIn Ads', visitors: 1000, cost: 800, conversions: 150, roi: 8 }
  ];

  const getStepColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-yellow-500 to-yellow-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-purple-500 to-purple-600'
    ];
    return colors[index] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="tunnel-vente" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tunnel de Vente Optimisé
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Workflow
            <span className="text-green-500"> Tunnel de Vente</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Processus de conversion optimisé</strong> pour transformer vos visiteurs en clients payants. 
            <em>Taux de conversion 2% global</em> avec <strong>ROI de 225%</strong> sur 6 mois.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'overview'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('leadmagnets')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'leadmagnets'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Gift className="h-4 w-4 inline mr-2" />
                Lead Magnets
              </button>
              <button
                onClick={() => setActiveTab('emails')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'emails'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Séquences Email
              </button>
              <button
                onClick={() => setActiveTab('pages')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'pages'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Globe className="h-4 w-4 inline mr-2" />
                Pages de Vente
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'metrics'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Target className="h-4 w-4 inline mr-2" />
                Métriques
              </button>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Funnel Visualization */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                Entonnoir de Conversion Global
              </h3>
              
              <div className="space-y-6">
                {funnelSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className={`bg-gradient-to-r ${getStepColor(index)} rounded-xl p-6 text-white shadow-lg`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2">{step.name}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="opacity-80">Visiteurs</div>
                              <div className="text-lg font-semibold">{step.visitors.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="opacity-80">Conversions</div>
                              <div className="text-lg font-semibold">{step.conversions.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="opacity-80">Taux</div>
                              <div className="text-lg font-semibold">{step.conversionRate}%</div>
                            </div>
                            <div>
                              <div className="opacity-80">Revenus</div>
                              <div className="text-lg font-semibold">{step.revenue}€</div>
                            </div>
                          </div>
                        </div>
                        
                        {index < funnelSteps.length - 1 && (
                          <div className="ml-6">
                            <ArrowRight className="h-8 w-8 opacity-80" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Conversion Rate Indicator */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white border-2 border-slate-200 rounded-full px-3 py-1 text-sm font-semibold text-slate-700">
                        {step.conversionRate}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">10,000</div>
                <div className="text-slate-600">Visiteurs/mois</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">2%</div>
                <div className="text-slate-600">Conversion globale</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">1,105€</div>
                <div className="text-slate-600">CA mensuel</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">225%</div>
                <div className="text-slate-600">ROI 6 mois</div>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Sources de Trafic</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trafficSources.map((source, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-3">{source.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Visiteurs:</span>
                        <span className="font-medium">{source.visitors.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Coût:</span>
                        <span className="font-medium">{source.cost}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Conversions:</span>
                        <span className="font-medium">{source.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">ROI:</span>
                        <span className={`font-medium ${source.roi > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                          {source.roi === 999 ? '∞' : `${source.roi}:1`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lead Magnets Tab */}
        {activeTab === 'leadmagnets' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Aimants à Prospects</h3>
              <div className="space-y-6">
                {leadMagnets.map((magnet) => {
                  const IconComponent = magnet.icon;
                  return (
                    <div key={magnet.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-3 rounded-lg mr-4">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{magnet.title}</h4>
                            <p className="text-sm text-slate-600">{magnet.format}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{magnet.conversionRate}%</div>
                          <div className="text-xs text-slate-500">Conversion</div>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4 text-sm">{magnet.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500">
                          <Download className="h-4 w-4 mr-1" />
                          {magnet.downloads.toLocaleString()} téléchargements
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Performance Lead Magnets</h3>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                  {leadMagnets.map((magnet, index) => (
                    <div key={magnet.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{magnet.title}</h4>
                        <div className="text-xs text-slate-500">{magnet.downloads} téléchargements</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{magnet.conversionRate}%</div>
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(magnet.conversionRate / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mt-6">
                <h4 className="font-bold mb-4">💡 Optimisations Recommandées</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Tester nouveau lead magnet "Calculateur Salaire"
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    A/B tester titres des lead magnets actuels
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Ajouter urgence "Offre limitée dans le temps"
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Email Sequences Tab */}
        {activeTab === 'emails' && (
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Séquence Email Nurturing (14 jours)</h3>
              
              <div className="space-y-6">
                {emailSequence.map((email, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                          J{email.day === 0 ? '+0' : `+${email.day}`}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{email.subject}</h4>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              email.type === 'Livraison' ? 'bg-green-100 text-green-700' :
                              email.type === 'Présentation' ? 'bg-blue-100 text-blue-700' :
                              email.type === 'Témoignage' ? 'bg-purple-100 text-purple-700' :
                              email.type === 'Objection' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {email.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <div className="font-semibold text-slate-800">{email.openRate}%</div>
                            <div className="text-xs text-slate-500">Ouverture</div>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{email.clickRate}%</div>
                            <div className="text-xs text-slate-500">Clic</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4">{email.goal}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${email.openRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-500">Ouverture</span>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Voir l'email →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Performance */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">53%</div>
                <div className="text-slate-600">Taux ouverture moyen</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <MousePointer className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">22%</div>
                <div className="text-slate-600">Taux clic moyen</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">12%</div>
                <div className="text-slate-600">Conversion finale</div>
              </div>
            </div>
          </div>
        )}

        {/* Sales Pages Tab */}
        {activeTab === 'pages' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Pages de Vente Optimisées</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="font-bold text-slate-800 mb-4">🎯 Page CAP MVA - 13€/mois</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Visiteurs uniques</span>
                      <span className="font-semibold">1,250/mois</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Taux de conversion</span>
                      <span className="font-semibold text-green-600">8%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Conversions</span>
                      <span className="font-semibold">100/mois</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Revenus générés</span>
                      <span className="font-semibold text-green-600">1,300€/mois</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Voir la page de vente
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="font-bold text-slate-800 mb-4">🏆 Page Premium - 22€/mois</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Visiteurs uniques</span>
                      <span className="font-semibold">800/mois</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Taux de conversion</span>
                      <span className="font-semibold text-green-600">12%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Conversions</span>
                      <span className="font-semibold">96/mois</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Revenus générés</span>
                      <span className="font-semibold text-green-600">2,112€/mois</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                    Voir la page premium
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Structure Page de Vente</h3>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                  {[
                    { section: 'Headline Accrocheur', status: 'Optimisé', color: 'green' },
                    { section: 'Problème/Solution', status: 'Optimisé', color: 'green' },
                    { section: 'Preuves Sociales', status: 'À améliorer', color: 'orange' },
                    { section: 'Offre Irrésistible', status: 'Optimisé', color: 'green' },
                    { section: 'Garanties', status: 'Optimisé', color: 'green' },
                    { section: 'Call-to-Action', status: 'À tester', color: 'orange' },
                    { section: 'Urgence/Scarcité', status: 'Manquant', color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-800">{item.section}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.color === 'green' ? 'bg-green-100 text-green-700' :
                        item.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white mt-6">
                <h4 className="font-bold mb-4">🚀 Tests A/B en Cours</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Headline: "13€/mois" vs "77% d'économies"</span>
                    <span className="bg-white/20 px-2 py-1 rounded">En cours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CTA: "Commencer" vs "Démarrer maintenant"</span>
                    <span className="bg-green-500 px-2 py-1 rounded">+15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Prix: 6.50€ vs 9.90€ premier mois</span>
                    <span className="bg-white/20 px-2 py-1 rounded">Planifié</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Tab */}
        {activeTab === 'metrics' && (
          <div>
            {/* Period Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-lg">
                <div className="flex space-x-1">
                  {['7d', '30d', '90d'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period as any)}
                      className={`px-4 py-2 rounded-md font-medium transition-all ${
                        selectedPeriod === period
                          ? 'bg-green-500 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {period === '7d' ? '7 jours' : period === '30d' ? '30 jours' : '90 jours'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-green-600 text-sm font-medium">+12%</div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">10,000</div>
                <div className="text-slate-600 text-sm">Visiteurs uniques</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-green-600 text-sm font-medium">+8%</div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">2,500</div>
                <div className="text-slate-600 text-sm">Leads générés</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-green-600 text-sm font-medium">+15%</div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">85</div>
                <div className="text-slate-600 text-sm">Clients payants</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-green-600 text-sm font-medium">+22%</div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">1,105€</div>
                <div className="text-slate-600 text-sm">Revenus mensuels</div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-bold text-slate-800 mb-6">Conversion par Étape</h4>
                <div className="space-y-4">
                  {[
                    { step: 'Visiteur → Lead', rate: 25, color: 'blue' },
                    { step: 'Lead → Prospect qualifié', rate: 50, color: 'green' },
                    { step: 'Prospect → Page vente', rate: 50, color: 'yellow' },
                    { step: 'Page vente → Commande', rate: 8, color: 'orange' },
                    { step: 'Commande → Paiement', rate: 85, color: 'purple' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-700 text-sm">{item.step}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${item.color}-500`}
                            style={{ width: `${item.rate}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-800 w-8">{item.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-bold text-slate-800 mb-6">Objectifs vs Réalisé</h4>
                <div className="space-y-4">
                  {[
                    { metric: 'Visiteurs', target: 10000, actual: 10000, unit: '' },
                    { metric: 'Leads', target: 2000, actual: 2500, unit: '' },
                    { metric: 'Clients', target: 100, actual: 85, unit: '' },
                    { metric: 'CA', target: 1500, actual: 1105, unit: '€' },
                    { metric: 'ROI', target: 200, actual: 225, unit: '%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-700">{item.metric}</span>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-slate-500">Objectif: {item.target}{item.unit}</div>
                          <div className={`font-semibold ${
                            item.actual >= item.target ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            Réalisé: {item.actual}{item.unit}
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          item.actual >= item.target ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projections */}
            <div className="mt-8 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
              <h4 className="text-xl font-bold mb-6">📈 Projections 6 Mois</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">48,800€</div>
                  <div className="text-green-100">CA Total Prévisionnel</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">900</div>
                  <div className="text-green-100">Clients Actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">225%</div>
                  <div className="text-green-100">ROI Attendu</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 Prêt à Optimiser Votre Tunnel de Vente ?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Implémentez ce workflow complet pour transformer vos visiteurs en clients payants 
            avec un taux de conversion de 2% et un ROI de 225%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Implémenter le Tunnel
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold">
              Télécharger le Guide PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesFunnelModule;