import React, { useState, useRef, useEffect } from 'react';
import { 
  Wifi, 
  Car, 
  Zap, 
  Settings, 
  Monitor, 
  Phone, 
  Video, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  User, 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Camera, 
  FileText, 
  Download, 
  Star,
  Shield,
  Wrench,
  Battery,
  Gauge,
  Search,
  Play,
  Pause,
  RotateCcw,
  X,
  ChevronRight,
  Award,
  Target,
  Users,
  Calendar
} from 'lucide-react';

interface DiagnosticSession {
  id: string;
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
    vin?: string;
    mileage: number;
  };
  symptoms: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'scheduled';
  technicianId?: string;
  startTime?: Date;
  estimatedDuration: number;
  price: number;
  priority: 'normal' | 'urgent' | 'emergency';
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  isTechnician?: boolean;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'video' | 'report' | 'code';
    url: string;
    title?: string;
  }[];
}

const RemoteDiagnosticModule = () => {
  const [activeTab, setActiveTab] = useState<'booking' | 'live' | 'reports' | 'preventive'>('booking');
  const [selectedService, setSelectedService] = useState<string>('');
  const [vehicleForm, setVehicleForm] = useState({
    brand: '',
    model: '',
    year: '',
    vin: '',
    mileage: '',
    symptoms: ''
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis Alex, votre expert en diagnostic automobile 🚗. Je peux vous aider à identifier les problèmes de votre véhicule à distance. Spécialiste Mercedes-Benz, je travaille avec des techniciens certifiés pour vous offrir un diagnostic précis.',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLiveSession, setIsLiveSession] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const diagnosticServices = [
    {
      id: 'mercedes-expert',
      title: 'Diagnostic Mercedes Expert',
      description: 'Diagnostic spécialisé Mercedes-Benz par technicien certifié',
      duration: '45-60 min',
      price: '89€',
      features: [
        'Technicien certifié Mercedes-Benz',
        'Accès aux codes constructeur',
        'Diagnostic STAR complet',
        'Rapport détaillé PDF',
        'Garantie diagnostic 30 jours'
      ],
      icon: '🏆',
      color: 'from-blue-600 to-blue-700',
      popular: true
    },
    {
      id: 'universal-diagnostic',
      title: 'Diagnostic Toutes Marques',
      description: 'Diagnostic universel pour tous véhicules',
      duration: '30-45 min',
      price: '59€',
      features: [
        'Compatible toutes marques',
        'Diagnostic OBD standard',
        'Analyse IA avancée',
        'Rapport complet',
        'Support technique inclus'
      ],
      icon: '🔧',
      color: 'from-green-600 to-green-700'
    },
    {
      id: 'preventive-check',
      title: 'Contrôle Préventif',
      description: 'Diagnostic préventif pour éviter les pannes',
      duration: '20-30 min',
      price: '39€',
      features: [
        'Analyse préventive complète',
        'Détection pannes futures',
        'Planning maintenance',
        'Conseils personnalisés',
        'Suivi régulier'
      ],
      icon: '🛡️',
      color: 'from-orange-600 to-orange-700'
    },
    {
      id: 'emergency-diagnostic',
      title: 'Diagnostic Urgence',
      description: 'Diagnostic immédiat pour panne critique',
      duration: '15-20 min',
      price: '129€',
      features: [
        'Intervention immédiate',
        'Technicien disponible 24h/7j',
        'Diagnostic express',
        'Solution temporaire',
        'Priorité absolue'
      ],
      icon: '🚨',
      color: 'from-red-600 to-red-700'
    }
  ];

  const mercedesSpecialties = [
    {
      system: 'Moteur & Transmission',
      codes: ['P0XXX', 'P1XXX', 'P2XXX'],
      description: 'Diagnostic moteur, boîte automatique 7G-TRONIC, 9G-TRONIC',
      icon: Settings
    },
    {
      system: 'Systèmes Électroniques',
      codes: ['B0XXX', 'B1XXX', 'U0XXX'],
      description: 'COMAND, MBUX, systèmes d\'assistance, multiplexage CAN',
      icon: Zap
    },
    {
      system: 'Châssis & Suspension',
      codes: ['C0XXX', 'C1XXX'],
      description: 'AIRMATIC, ADS+, ESP, systèmes de freinage',
      icon: Car
    },
    {
      system: 'Climatisation & Confort',
      codes: ['B2XXX', 'B3XXX'],
      description: 'THERMOTRONIC, sièges chauffants, toit ouvrant',
      icon: Monitor
    }
  ];

  const technicians = [
    {
      id: 'tech-1',
      name: 'Marc Dubois',
      specialty: 'Expert Mercedes-Benz',
      certifications: ['Mercedes STAR', 'Diagnostic Électronique', 'Systèmes Hybrides'],
      experience: '15 ans',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      languages: ['Français', 'Anglais']
    },
    {
      id: 'tech-2',
      name: 'Sophie Martin',
      specialty: 'Diagnostic Toutes Marques',
      certifications: ['ASE Master', 'Bosch Diagnostic', 'Électronique Automobile'],
      experience: '12 ans',
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      languages: ['Français', 'Allemand']
    },
    {
      id: 'tech-3',
      name: 'Pierre Leroy',
      specialty: 'Systèmes Électriques',
      certifications: ['Mercedes EQS', 'Haute Tension', 'Diagnostic Hybride'],
      experience: '10 ans',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: false,
      languages: ['Français']
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fr-FR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = () => setIsRecording(false);
      recognitionInstance.onend = () => setIsRecording(false);

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const getBotResponse = (userMessage: string): ChatMessage => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('mercedes') || message.includes('classe') || message.includes('amg')) {
      return {
        id: Date.now().toString(),
        text: 'Excellent ! Je suis spécialisé Mercedes-Benz 🏆. Je peux diagnostiquer tous les systèmes : COMAND, MBUX, AIRMATIC, 7G-TRONIC, systèmes d\'assistance. Quel est le problème que vous rencontrez ? Décrivez-moi les symptômes.',
        isBot: true,
        timestamp: new Date()
      };
    }
    
    if (message.includes('voyant') || message.includes('témoin') || message.includes('allumé')) {
      return {
        id: Date.now().toString(),
        text: 'Un voyant allumé indique un problème détecté par l\'électronique. Pour un diagnostic précis, j\'ai besoin de connaître :\n\n🔍 Quel voyant exactement ?\n🚗 Marque et modèle du véhicule ?\n📅 Depuis quand ?\n⚠️ Autres symptômes ?',
        isBot: true,
        timestamp: new Date()
      };
    }
    
    if (message.includes('bruit') || message.includes('claquement') || message.includes('grincement')) {
      return {
        id: Date.now().toString(),
        text: 'Les bruits anormaux peuvent révéler plusieurs problèmes. Pouvez-vous me préciser :\n\n🔊 Type de bruit (grincement, claquement, sifflement) ?\n🚗 À quel moment (démarrage, freinage, virage) ?\n📍 Localisation approximative ?\n\nJe peux organiser un diagnostic audio en direct !',
        isBot: true,
        timestamp: new Date()
      };
    }
    
    if (message.includes('panne') || message.includes('problème') || message.includes('dysfonctionnement')) {
      return {
        id: Date.now().toString(),
        text: 'Je vais vous aider à identifier le problème ! Pour un diagnostic efficace :\n\n1️⃣ **Décrivez les symptômes** précisément\n2️⃣ **Indiquez la marque/modèle** de votre véhicule\n3️⃣ **Précisez le contexte** (quand, comment)\n\nPour Mercedes-Benz, je peux accéder aux codes constructeur spécifiques !',
        isBot: true,
        timestamp: new Date()
      };
    }
    
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
      return {
        id: Date.now().toString(),
        text: 'Nos tarifs de diagnostic à distance :\n\n🏆 **Mercedes Expert** : 89€ (technicien certifié)\n🔧 **Toutes marques** : 59€ (diagnostic universel)\n🛡️ **Préventif** : 39€ (contrôle santé)\n🚨 **Urgence** : 129€ (intervention immédiate)\n\nTous incluent un rapport détaillé PDF !',
        isBot: true,
        timestamp: new Date()
      };
    }
    
    return {
      id: Date.now().toString(),
      text: 'Je suis votre expert en diagnostic automobile à distance ! Je peux vous aider avec :\n\n🏆 Diagnostic Mercedes spécialisé\n🔧 Diagnostic toutes marques\n🛡️ Contrôles préventifs\n🚨 Interventions urgence\n\nQuel est votre besoin ?',
      isBot: true,
      timestamp: new Date()
    };
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isBot: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(chatInput);
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setActiveTab('booking');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking confirmation
    alert('Diagnostic réservé ! Un technicien vous contactera dans les 15 minutes.');
  };

  return (
    <section id="diagnostic-distance" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Wifi className="h-4 w-4 mr-2" />
            Diagnostic à Distance
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Diagnostic Auto
            <span className="text-blue-500"> à Distance</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Diagnostic professionnel à distance</strong> par nos experts certifiés. 
            <em>Spécialiste Mercedes-Benz</em> avec accès aux codes constructeur. 
            <strong>Intervention en 15 minutes</strong>, rapport détaillé inclus.
          </p>
        </div>

        {/* Mercedes Specialty Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-12 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/10 p-4 rounded-full mr-6">
                <Car className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">🏆 Spécialiste Mercedes-Benz Certifié</h3>
                <p className="text-slate-300">
                  Accès exclusif aux systèmes STAR, codes constructeur, diagnostic COMAND/MBUX
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">89€</div>
              <div className="text-slate-300">Diagnostic Expert</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'booking'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Réserver
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'live'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Video className="h-4 w-4 inline mr-2" />
                Session Live
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'reports'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Rapports
              </button>
              <button
                onClick={() => setActiveTab('preventive')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'preventive'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Shield className="h-4 w-4 inline mr-2" />
                Préventif
              </button>
            </div>
          </div>
        </div>

        {/* Booking Tab */}
        {activeTab === 'booking' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Choisissez votre service</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {diagnosticServices.map(service => (
                  <div key={service.id} className={`relative cursor-pointer ${
                    selectedService === service.id ? 'ring-2 ring-blue-500' : ''
                  }`} onClick={() => handleServiceSelect(service.id)}>
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                          Populaire
                        </div>
                      </div>
                    )}
                    <div className={`bg-gradient-to-r ${service.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{service.icon}</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{service.price}</div>
                          <div className="text-sm opacity-80">{service.duration}</div>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                      <p className="text-sm opacity-90 mb-4">{service.description}</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Form */}
              {selectedService && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h4 className="text-xl font-bold text-slate-800 mb-6">Informations véhicule</h4>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Marque *
                        </label>
                        <select
                          value={vehicleForm.brand}
                          onChange={(e) => setVehicleForm({...vehicleForm, brand: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Sélectionnez</option>
                          <option value="Mercedes-Benz">Mercedes-Benz</option>
                          <option value="BMW">BMW</option>
                          <option value="Audi">Audi</option>
                          <option value="Volkswagen">Volkswagen</option>
                          <option value="Peugeot">Peugeot</option>
                          <option value="Renault">Renault</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Modèle *
                        </label>
                        <input
                          type="text"
                          value={vehicleForm.model}
                          onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ex: Classe C, A3, 320d..."
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Année *
                        </label>
                        <input
                          type="number"
                          value={vehicleForm.year}
                          onChange={(e) => setVehicleForm({...vehicleForm, year: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="2020"
                          min="1990"
                          max="2024"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Kilométrage
                        </label>
                        <input
                          type="number"
                          value={vehicleForm.mileage}
                          onChange={(e) => setVehicleForm({...vehicleForm, mileage: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="150000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Numéro de châssis (VIN) - Optionnel
                      </label>
                      <input
                        type="text"
                        value={vehicleForm.vin}
                        onChange={(e) => setVehicleForm({...vehicleForm, vin: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="WDD1234567890123456"
                        maxLength={17}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Décrivez le problème *
                      </label>
                      <textarea
                        value={vehicleForm.symptoms}
                        onChange={(e) => setVehicleForm({...vehicleForm, symptoms: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={4}
                        placeholder="Décrivez les symptômes, bruits, voyants allumés, comportement anormal..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg"
                    >
                      Réserver le diagnostic - {diagnosticServices.find(s => s.id === selectedService)?.price}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Technicians */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Nos experts disponibles</h3>
              <div className="space-y-4">
                {technicians.map(tech => (
                  <div key={tech.id} className={`bg-white rounded-xl p-6 shadow-lg border-2 ${
                    tech.available ? 'border-green-200' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center mb-4">
                      <img 
                        src={tech.avatar} 
                        alt={tech.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{tech.name}</h4>
                        <p className="text-sm text-slate-600">{tech.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{tech.rating}</span>
                          <span className="text-xs text-slate-500 ml-2">{tech.experience}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tech.available 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {tech.available ? 'Disponible' : 'Occupé'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-slate-500">Certifications:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tech.certifications.map((cert, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-slate-500">Langues:</span>
                        <span className="text-xs text-slate-600 ml-2">{tech.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Session Tab */}
        {activeTab === 'live' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Session Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Video className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Session Diagnostic Live</h3>
                    <p className="text-green-100">Technicien: Marc Dubois • Mercedes Expert</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <span className="text-sm">EN DIRECT</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 h-[600px]">
              {/* Video Area */}
              <div className="lg:col-span-2 bg-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <h4 className="text-xl font-semibold mb-2">Session Vidéo</h4>
                  <p className="text-slate-300 mb-6">Partagez votre écran ou caméra pour le diagnostic</p>
                  <div className="flex justify-center space-x-4">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                      <Camera className="h-5 w-5 inline mr-2" />
                      Activer Caméra
                    </button>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                      <Monitor className="h-5 w-5 inline mr-2" />
                      Partager Écran
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="border-l border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                  <h4 className="font-semibold text-slate-800">Chat avec l'expert</h4>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot || message.isTechnician ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.isBot || message.isTechnician ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          message.isTechnician ? 'bg-green-100' :
                          message.isBot ? 'bg-blue-100' : 'bg-orange-100'
                        }`}>
                          {message.isTechnician ? (
                            <User className="h-4 w-4 text-green-600" />
                          ) : message.isBot ? (
                            <Bot className="h-4 w-4 text-blue-600" />
                          ) : (
                            <User className="h-4 w-4 text-orange-600" />
                          )}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          message.isTechnician ? 'bg-green-50 text-green-800' :
                          message.isBot ? 'bg-slate-100 text-slate-800' : 'bg-orange-500 text-white'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          {(message.isBot || message.isTechnician) && (
                            <button
                              onClick={() => speakText(message.text)}
                              className="mt-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Volume2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Posez votre question..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 rounded-full transition-colors ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Rapports de Diagnostic</h3>
              <div className="space-y-4">
                {[
                  {
                    id: 'RPT-001',
                    vehicle: 'Mercedes Classe C 220d',
                    date: '15 Jan 2024',
                    technician: 'Marc Dubois',
                    status: 'Complété',
                    issues: 3,
                    severity: 'Moyen'
                  },
                  {
                    id: 'RPT-002',
                    vehicle: 'BMW 320d',
                    date: '12 Jan 2024',
                    technician: 'Sophie Martin',
                    status: 'Complété',
                    issues: 1,
                    severity: 'Faible'
                  }
                ].map((report, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-800">{report.id}</h4>
                        <p className="text-sm text-slate-600">{report.vehicle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-800">{report.date}</div>
                        <div className="text-xs text-slate-500">{report.technician}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{report.status}</span>
                        <span className="text-slate-600">{report.issues} problème(s)</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          report.severity === 'Faible' ? 'bg-green-100 text-green-700' :
                          report.severity === 'Moyen' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {report.severity}
                        </span>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        <Download className="h-4 w-4 inline mr-1" />
                        PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Exemple de Rapport</h3>
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-slate-800">RAPPORT DE DIAGNOSTIC</h4>
                  <p className="text-sm text-slate-600">Mercedes Classe C 220d - 2020</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">🔍 Codes Défauts Détectés</h5>
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="flex justify-between mb-1">
                        <span>P0401 - Débit EGR insuffisant</span>
                        <span className="text-yellow-600">Moyen</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>B1234 - Capteur température</span>
                        <span className="text-green-600">Faible</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">🔧 Recommandations</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Nettoyage vanne EGR</li>
                      <li>• Remplacement capteur température</li>
                      <li>• Contrôle dans 1000 km</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">💰 Estimation Coûts</h5>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Main d'œuvre:</span>
                        <span>120€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pièces:</span>
                        <span>85€</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                        <span>Total estimé:</span>
                        <span>205€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preventive Tab */}
        {activeTab === 'preventive' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-green-500" />
                Diagnostic Préventif
              </h3>
              <p className="text-slate-600 mb-6">
                Anticipez les pannes avec notre diagnostic préventif intelligent. 
                Notre IA analyse l'état de votre véhicule et prédit les problèmes futurs.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Avantages du diagnostic préventif</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Évite les pannes coûteuses</li>
                    <li>• Optimise la durée de vie du véhicule</li>
                    <li>• Planifie la maintenance</li>
                    <li>• Réduit les coûts de réparation</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🔍 Ce que nous analysons</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• État des systèmes électroniques</li>
                    <li>• Usure des composants mécaniques</li>
                    <li>• Performance du moteur</li>
                    <li>• Historique des codes défauts</li>
                  </ul>
                </div>
              </div>
              
              <button className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                Programmer un contrôle préventif - 39€
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Planning de Maintenance</h3>
              <div className="space-y-4">
                {[
                  {
                    component: 'Plaquettes de frein',
                    status: 'À surveiller',
                    nextCheck: '2000 km',
                    severity: 'medium'
                  },
                  {
                    component: 'Courroie de distribution',
                    status: 'OK',
                    nextCheck: '15000 km',
                    severity: 'low'
                  },
                  {
                    component: 'Batterie',
                    status: 'Attention',
                    nextCheck: '500 km',
                    severity: 'high'
                  },
                  {
                    component: 'Filtres',
                    status: 'À remplacer',
                    nextCheck: 'Maintenant',
                    severity: 'medium'
                  }
                ].map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-800">{item.component}</h4>
                        <p className="text-sm text-slate-600">Prochain contrôle: {item.nextCheck}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.severity === 'low' ? 'bg-green-100 text-green-700' :
                        item.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-800 mb-2">📅 Rappels Automatiques</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Recevez des notifications automatiques pour vos contrôles et maintenances.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                    Activer les rappels
                  </button>
                  <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    Configurer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mercedes Specialties Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            🏆 Spécialités Mercedes-Benz
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mercedesSpecialties.map((specialty, index) => {
              const IconComponent = specialty.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-slate-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-slate-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">{specialty.system}</h4>
                  <p className="text-sm text-slate-600 mb-3">{specialty.description}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {specialty.codes.map((code, codeIndex) => (
                      <span key={codeIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Diagnostic Immédiat Disponible</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nos experts sont disponibles 24h/7j pour diagnostiquer votre véhicule à distance. 
            Intervention en 15 minutes, rapport détaillé inclus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Diagnostic Immédiat - 59€
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold">
              Mercedes Expert - 89€
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoteDiagnosticModule;