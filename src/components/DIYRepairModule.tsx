import React, { useState, useRef, useEffect } from 'react';
import { Wrench, Play, Pause, RotateCcw, Search, Filter, Star, Clock, User, Bot, Send, Mic, MicOff, Volume2, Camera, Image, FileText, CheckCircle, AlertTriangle, PenTool as Tool, Zap, Settings, Car, Battery, Gauge, X, ChevronRight, Download, Heart, Share2 } from 'lucide-react';

interface RepairGuide {
  id: string;
  title: string;
  category: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: string;
  tools: string[];
  steps: RepairStep[];
  videoUrl?: string;
  images: string[];
  tips: string[];
  warnings: string[];
  rating: number;
  views: number;
  likes: number;
}

interface RepairStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
  tips?: string[];
  warnings?: string[];
  completed?: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'video' | 'guide';
    url: string;
    title?: string;
  }[];
}

const DIYRepairModule = () => {
  const [activeTab, setActiveTab] = useState<'guides' | 'chat' | 'diagnostic'>('guides');
  const [selectedGuide, setSelectedGuide] = useState<RepairGuide | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis Alex, votre expert en mécanique automobile 🔧. Je peux vous guider pas à pas pour réparer votre véhicule. Décrivez-moi votre problème ou dites-moi ce que vous souhaitez réparer !',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'Toutes catégories', icon: Wrench },
    { id: 'moteur', name: 'Moteur', icon: Settings },
    { id: 'electrique', name: 'Électrique', icon: Zap },
    { id: 'freinage', name: 'Freinage', icon: Car },
    { id: 'batterie', name: 'Batterie', icon: Battery },
    { id: 'diagnostic', name: 'Diagnostic', icon: Gauge }
  ];

  const repairGuides: RepairGuide[] = [
    {
      id: '1',
      title: 'Changer les plaquettes de frein avant',
      category: 'freinage',
      difficulty: 3,
      duration: '45 min',
      tools: ['Clé à molette', 'Tournevis', 'Pince', 'Cric', 'Chandelles'],
      rating: 4.8,
      views: 15420,
      likes: 1240,
      images: [
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      tips: [
        'Toujours travailler sur un sol plat et stable',
        'Vérifier l\'épaisseur des disques en même temps',
        'Nettoyer les étriers avant remontage'
      ],
      warnings: [
        'Ne jamais travailler sous un véhicule seulement supporté par un cric',
        'Porter des gants de protection',
        'Vérifier le niveau de liquide de frein après intervention'
      ],
      steps: [
        {
          id: '1',
          title: 'Préparation et sécurité',
          description: 'Garez le véhicule sur terrain plat, serrez le frein à main et placez des cales derrière les roues arrière.',
          image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
          tips: ['Laissez refroidir les freins si vous venez de rouler'],
          warnings: ['Assurez-vous que le véhicule ne peut pas bouger']
        },
        {
          id: '2',
          title: 'Dépose de la roue',
          description: 'Desserrez les boulons de roue, levez le véhicule avec le cric et placez une chandelle. Retirez complètement la roue.',
          image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
          tips: ['Desserrez les boulons avant de lever le véhicule'],
          warnings: ['Utilisez toujours des chandelles, jamais seulement le cric']
        },
        {
          id: '3',
          title: 'Dépose de l\'étrier',
          description: 'Retirez les vis de fixation de l\'étrier et soulevez-le délicatement. Suspendez-le avec un fil de fer.',
          tips: ['Ne laissez pas l\'étrier pendre par le flexible'],
          warnings: ['Attention à ne pas endommager le flexible de frein']
        },
        {
          id: '4',
          title: 'Remplacement des plaquettes',
          description: 'Retirez les anciennes plaquettes et nettoyez l\'étrier. Repoussez le piston et installez les nouvelles plaquettes.',
          tips: ['Graissez légèrement les points de contact'],
          warnings: ['Vérifiez le sens de montage des plaquettes']
        },
        {
          id: '5',
          title: 'Remontage',
          description: 'Remontez l\'étrier, serrez aux couples prescrits. Remontez la roue et descendez le véhicule.',
          tips: ['Pompez plusieurs fois la pédale avant de rouler'],
          warnings: ['Vérifiez le niveau de liquide de frein']
        }
      ]
    },
    {
      id: '2',
      title: 'Remplacer la batterie de voiture',
      category: 'batterie',
      difficulty: 2,
      duration: '20 min',
      tools: ['Clés plates', 'Gants isolants', 'Brosse métallique'],
      rating: 4.9,
      views: 8750,
      likes: 890,
      images: [
        'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      tips: [
        'Toujours débrancher la borne négative en premier',
        'Nettoyer les cosses avant branchement',
        'Vérifier la date de fabrication de la nouvelle batterie'
      ],
      warnings: [
        'Porter des gants et lunettes de protection',
        'Éviter les étincelles près de la batterie',
        'Ne pas fumer pendant l\'intervention'
      ],
      steps: [
        {
          id: '1',
          title: 'Préparation',
          description: 'Coupez le contact, ouvrez le capot et localisez la batterie. Portez vos équipements de protection.',
          warnings: ['Assurez-vous que le moteur est froid']
        },
        {
          id: '2',
          title: 'Débranchement',
          description: 'Débranchez d\'abord la borne négative (-) puis la borne positive (+). Retirez la fixation de la batterie.',
          warnings: ['Ordre important : négative puis positive']
        },
        {
          id: '3',
          title: 'Remplacement',
          description: 'Sortez l\'ancienne batterie et installez la nouvelle. Reconnectez positive puis négative.',
          tips: ['La nouvelle batterie doit avoir les mêmes caractéristiques']
        }
      ]
    },
    {
      id: '3',
      title: 'Diagnostic panne électrique',
      category: 'diagnostic',
      difficulty: 4,
      duration: '30 min',
      tools: ['Multimètre', 'Schéma électrique', 'Lampe témoin'],
      rating: 4.6,
      views: 12300,
      likes: 980,
      images: [
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      tips: [
        'Commencer par vérifier les fusibles',
        'Tester la continuité des câbles',
        'Vérifier les masses'
      ],
      warnings: [
        'Débrancher la batterie avant intervention',
        'Ne pas court-circuiter les circuits',
        'Respecter les valeurs de tension'
      ],
      steps: [
        {
          id: '1',
          title: 'Vérification préliminaire',
          description: 'Contrôlez l\'état de la batterie et des fusibles principaux.',
          tips: ['Une batterie faible peut causer de nombreux dysfonctionnements']
        },
        {
          id: '2',
          title: 'Test des circuits',
          description: 'Utilisez le multimètre pour tester la continuité et les tensions.',
          warnings: ['Respectez les calibres du multimètre']
        }
      ]
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
    
    if (message.includes('plaquette') || message.includes('frein')) {
      return {
        id: Date.now().toString(),
        text: 'Je vais vous guider pour changer vos plaquettes de frein ! C\'est une intervention de niveau intermédiaire qui prend environ 45 minutes. Voici le guide complet :',
        isBot: true,
        timestamp: new Date(),
        attachments: [{
          type: 'guide',
          url: '1',
          title: 'Guide: Changer les plaquettes de frein avant'
        }]
      };
    }
    
    if (message.includes('batterie')) {
      return {
        id: Date.now().toString(),
        text: 'Problème de batterie ? Je peux vous aider ! Voici comment remplacer votre batterie en toute sécurité :',
        isBot: true,
        timestamp: new Date(),
        attachments: [{
          type: 'guide',
          url: '2',
          title: 'Guide: Remplacer la batterie de voiture'
        }]
      };
    }
    
    if (message.includes('diagnostic') || message.includes('panne') || message.includes('électrique')) {
      return {
        id: Date.now().toString(),
        text: 'Pour diagnostiquer une panne électrique, il faut procéder méthodiquement. Voici ma méthode éprouvée :',
        isBot: true,
        timestamp: new Date(),
        attachments: [{
          type: 'guide',
          url: '3',
          title: 'Guide: Diagnostic panne électrique'
        }]
      };
    }
    
    if (message.includes('outils') || message.includes('matériel')) {
      return {
        id: Date.now().toString(),
        text: 'Voici les outils essentiels pour débuter en mécanique automobile :\n\n🔧 Clés plates et à pipe (8-19mm)\n🔨 Tournevis plats et cruciformes\n⚡ Multimètre\n🚗 Cric et chandelles\n🧤 Gants de protection\n\nQuelle réparation souhaitez-vous effectuer ?',
        isBot: true,
        timestamp: new Date()
      };
    }
    
    return {
      id: Date.now().toString(),
      text: 'Je peux vous aider avec de nombreuses réparations : freinage, batterie, diagnostic électrique, vidange, courroies, etc. Décrivez-moi votre problème ou dites-moi "outils" pour connaître le matériel nécessaire !',
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

  const filteredGuides = repairGuides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-slate-300'
        }`}
      />
    ));
  };

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ['', 'Très facile', 'Facile', 'Moyen', 'Difficile', 'Expert'];
    return labels[difficulty];
  };

  const handleStepComplete = (stepIndex: number) => {
    if (selectedGuide) {
      const updatedSteps = [...selectedGuide.steps];
      updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], completed: true };
      setSelectedGuide({ ...selectedGuide, steps: updatedSteps });
    }
  };

  return (
    <section id="auto-reparation" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Wrench className="h-4 w-4 mr-2" />
            Auto-Réparation Guidée
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Réparez Votre Véhicule
            <span className="text-orange-500"> Vous-Même !</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Guides pas à pas avec expert IA</strong> pour réparer votre voiture en toute autonomie. 
            <em>Vidéos HD, photos détaillées, conseils personnalisés</em> et assistance 24h/7j. 
            <strong>Économisez jusqu'à 70% sur vos réparations !</strong>
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('guides')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'guides'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Guides Réparation
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bot className="h-4 w-4 inline mr-2" />
                Expert IA
              </button>
              <button
                onClick={() => setActiveTab('diagnostic')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'diagnostic'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Gauge className="h-4 w-4 inline mr-2" />
                Diagnostic
              </button>
            </div>
          </div>
        </div>

        {/* Guides Tab */}
        {activeTab === 'guides' && !selectedGuide && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une réparation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-orange-100'
                        }`}
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredGuides.map(guide => (
                <div key={guide.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                     onClick={() => setSelectedGuide(guide)}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={guide.images[0]} 
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {getDifficultyLabel(guide.difficulty)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {guide.duration}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">
                      {guide.title}
                    </h3>
                    
                    {/* Difficulty */}
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-slate-500 mr-2">Difficulté:</span>
                      <div className="flex items-center">
                        {getDifficultyStars(guide.difficulty)}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="mb-4">
                      <span className="text-sm font-medium text-slate-700">Outils requis:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {guide.tools.slice(0, 3).map((tool, index) => (
                          <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                            {tool}
                          </span>
                        ))}
                        {guide.tools.length > 3 && (
                          <span className="text-slate-400 text-xs">+{guide.tools.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                          {guide.rating}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {guide.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-400" />
                          {guide.likes}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center group">
                      Commencer la réparation
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Guide Detail */}
        {activeTab === 'guides' && selectedGuide && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex items-center text-orange-100 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                  Retour aux guides
                </button>
                <div className="flex items-center space-x-4">
                  <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{selectedGuide.title}</h1>
              <div className="flex items-center space-x-6 text-orange-100">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {selectedGuide.duration}
                </div>
                <div className="flex items-center">
                  {getDifficultyStars(selectedGuide.difficulty)}
                  <span className="ml-2">{getDifficultyLabel(selectedGuide.difficulty)}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-300 fill-current" />
                  {selectedGuide.rating}
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Tools Required */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <Tool className="h-5 w-5 mr-2 text-orange-500" />
                  Outils requis
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedGuide.tools.map((tool, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-3 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-slate-700">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Warnings */}
              {selectedGuide.warnings.length > 0 && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Consignes de sécurité
                  </h3>
                  <ul className="space-y-2">
                    {selectedGuide.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start text-red-700">
                        <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Steps */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Étapes de réparation</h3>
                <div className="space-y-6">
                  {selectedGuide.steps.map((step, index) => (
                    <div key={step.id} className={`border rounded-xl p-6 transition-all ${
                      step.completed ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                            step.completed 
                              ? 'bg-green-500 text-white' 
                              : index === currentStep 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-slate-200 text-slate-600'
                          }`}>
                            {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          <h4 className="text-lg font-semibold text-slate-800">{step.title}</h4>
                        </div>
                        {!step.completed && (
                          <button
                            onClick={() => handleStepComplete(index)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            Marquer terminé
                          </button>
                        )}
                      </div>
                      
                      <p className="text-slate-600 mb-4">{step.description}</p>
                      
                      {step.image && (
                        <div className="mb-4">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-full max-w-md rounded-lg shadow-md"
                          />
                        </div>
                      )}
                      
                      {step.tips && step.tips.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h5 className="font-semibold text-blue-800 mb-2">💡 Conseils</h5>
                          <ul className="space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-blue-700 text-sm">• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.warnings && step.warnings.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h5 className="font-semibold text-red-800 mb-2">⚠️ Attention</h5>
                          <ul className="space-y-1">
                            {step.warnings.map((warning, warningIndex) => (
                              <li key={warningIndex} className="text-red-700 text-sm">• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              {selectedGuide.tips.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">💡 Conseils d'expert</h3>
                  <ul className="space-y-2">
                    {selectedGuide.tips.map((tip, index) => (
                      <li key={index} className="flex items-start text-blue-700">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Alex - Expert Mécanique IA</h3>
                  <p className="text-blue-100">Assistance 24h/7j • Spécialiste toutes marques</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.isBot ? 'bg-blue-100' : 'bg-orange-100'
                    }`}>
                      {message.isBot ? (
                        <Bot className="h-5 w-5 text-blue-600" />
                      ) : (
                        <User className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      message.isBot 
                        ? 'bg-slate-100 text-slate-800' 
                        : 'bg-orange-500 text-white'
                    }`}>
                      <p className="whitespace-pre-line">{message.text}</p>
                      
                      {message.attachments && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="bg-white/10 rounded-lg p-3">
                              {attachment.type === 'guide' && (
                                <button
                                  onClick={() => {
                                    const guide = repairGuides.find(g => g.id === attachment.url);
                                    if (guide) {
                                      setSelectedGuide(guide);
                                      setActiveTab('guides');
                                    }
                                  }}
                                  className="flex items-center text-sm hover:underline"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  {attachment.title}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {message.isBot && (
                        <button
                          onClick={() => speakText(message.text)}
                          className="mt-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Décrivez votre problème ou demandez conseil..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-3 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Tab */}
        {activeTab === 'diagnostic' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Gauge className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Diagnostic Intelligent</h3>
              <p className="text-slate-600">Décrivez les symptômes, notre IA vous aide à identifier le problème</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Symptômes courants :</h4>
                {[
                  'Le moteur ne démarre pas',
                  'Bruit anormal au freinage',
                  'Voyant moteur allumé',
                  'Batterie qui se décharge',
                  'Vibrations au volant',
                  'Consommation excessive'
                ].map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setChatInput(symptom);
                      setActiveTab('chat');
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="w-full text-left p-4 bg-slate-50 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-slate-200 transition-colors"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-800 mb-4">Comment ça marche ?</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                    <p className="text-slate-600">Décrivez les symptômes observés</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                    <p className="text-slate-600">Notre IA analyse et propose des causes probables</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                    <p className="text-slate-600">Recevez un guide de réparation personnalisé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DIYRepairModule;