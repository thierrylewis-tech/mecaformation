import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageCircle, X, Send, Mic, MicOff, Volume2, User, Zap, Battery, Fuel, Droplets, Leaf, Settings } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  category?: string;
}

interface KnowledgeBase {
  [key: string]: {
    keywords: string[];
    responses: string[];
    category: string;
  };
}

const AIAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis Alex, votre assistant IA spécialisé en mécanique automobile 🚗. Je suis disponible 24h/24 et 7j/7 pour répondre à toutes vos questions sur les véhicules thermiques, électriques, hybrides, hydrogène, GPL et éthanol. Comment puis-je vous aider ?',
      isBot: true,
      timestamp: new Date(),
      category: 'accueil'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const knowledgeBase: KnowledgeBase = {
    // Enseignement général
    enseignement_general: {
      keywords: ['mathématiques', 'français', 'anglais', 'enseignement général', 'bases', 'remise à niveau'],
      responses: [
        'Notre plateforme inclut un enseignement général complet : mathématiques appliquées à l\'automobile, français technique, anglais professionnel.',
        'Les mathématiques couvrent : calculs de puissance, conversions d\'unités, géométrie pour alignement, statistiques de maintenance.',
        'Le français technique inclut : rédaction de rapports, communication client, vocabulaire professionnel automobile.',
        'L\'anglais professionnel couvre : terminologie technique internationale, documentation constructeurs, certifications.'
      ],
      category: 'Enseignement Général'
    },

    // Plateforme e-learning
    plateforme: {
      keywords: ['plateforme', 'e-learning', 'en ligne', 'numérique', 'cours en ligne', 'formation distance'],
      responses: [
        'Notre plateforme e-learning offre un accès 24h/24 avec contenus interactifs : vidéos HD, simulations 3D, quiz adaptatifs.',
        'Suivi personnalisé en temps réel : progression, points faibles détectés, exercices de renforcement automatiques.',
        'Bibliothèque complète : 500+ vidéos techniques, 1000+ schémas interactifs, base documentaire constructeurs.',
        'Compatible tous supports : PC, tablette, smartphone avec synchronisation automatique des progressions.'
      ],
      category: 'Plateforme E-Learning'
    },

    // Véhicules électriques
    electrique: {
      keywords: ['électrique', 'batterie', 'lithium', 'charge', 'autonomie', 'moteur électrique', 'BEV', 'tesla', 'nissan leaf'],
      responses: [
        'Les véhicules électriques utilisent un ou plusieurs moteurs électriques alimentés par une batterie rechargeable. L\'autonomie varie de 150 à 600 km selon le modèle.',
        'La batterie lithium-ion est le cœur du véhicule électrique. Elle nécessite une maintenance spécifique et des précautions de sécurité lors des interventions.',
        'Le diagnostic des véhicules électriques nécessite des outils spécialisés et une habilitation électrique pour travailler en sécurité sur la haute tension.',
        'Les systèmes de charge peuvent être AC (courant alternatif) ou DC (courant continu). La charge rapide DC peut atteindre 350 kW sur certains modèles.'
      ],
      category: 'Véhicules Électriques'
    },

    // Véhicules hybrides
    hybride: {
      keywords: ['hybride', 'toyota prius', 'HEV', 'moteur thermique', 'moteur électrique', 'batterie hybride', 'récupération'],
      responses: [
        'Un véhicule hybride combine un moteur thermique et un moteur électrique. Il existe plusieurs architectures : série, parallèle et mixte.',
        'La batterie hybride (NiMH ou Li-ion) se recharge par récupération d\'énergie au freinage et par le moteur thermique. Pas de recharge externe.',
        'Le système hybride optimise automatiquement l\'utilisation des deux moteurs selon les conditions de conduite pour réduire la consommation.',
        'La maintenance hybride nécessite des compétences spécifiques sur les deux technologies : thermique et électrique.'
      ],
      category: 'Véhicules Hybrides'
    },

    // Véhicules hydrogène
    hydrogene: {
      keywords: ['hydrogène', 'pile à combustible', 'FCEV', 'H2', 'toyota mirai', 'hyundai nexo'],
      responses: [
        'Les véhicules à hydrogène utilisent une pile à combustible qui convertit l\'hydrogène en électricité pour alimenter un moteur électrique.',
        'L\'hydrogène est stocké sous haute pression (700 bars) dans des réservoirs spéciaux en fibre de carbone.',
        'La pile à combustible produit uniquement de l\'eau comme déchet, faisant du véhicule hydrogène une solution zéro émission.',
        'Le plein d\'hydrogène prend 3-5 minutes et offre une autonomie de 400-600 km, similaire aux véhicules thermiques.'
      ],
      category: 'Véhicules Hydrogène'
    },

    // Véhicules GPL
    gpl: {
      keywords: ['GPL', 'gaz', 'propane', 'butane', 'bi-carburation', 'réservoir GPL'],
      responses: [
        'Le GPL (Gaz de Pétrole Liquéfié) est un mélange de propane et butane. Le véhicule peut fonctionner au GPL ou à l\'essence.',
        'L\'installation GPL comprend un réservoir, un détendeur, des injecteurs gaz et un calculateur spécifique.',
        'Le GPL réduit les émissions de CO2 de 10-15% et les particules fines de 90% par rapport à l\'essence.',
        'La maintenance GPL nécessite un contrôle périodique du système gaz et du réservoir (contrôle décennal obligatoire).'
      ],
      category: 'Véhicules GPL'
    },

    // Véhicules éthanol
    ethanol: {
      keywords: ['éthanol', 'E85', 'bioéthanol', 'flex fuel', 'superéthanol'],
      responses: [
        'L\'E85 contient 65-85% d\'éthanol et 15-35% d\'essence. C\'est un biocarburant produit à partir de betteraves ou céréales.',
        'Les véhicules Flex Fuel peuvent fonctionner avec tout mélange d\'essence et d\'éthanol de 0 à 85%.',
        'L\'éthanol a un indice d\'octane élevé (104) mais un pouvoir calorifique inférieur, augmentant la consommation de 15-25%.',
        'Le boîtier E85 modifie les paramètres d\'injection pour adapter le moteur au bioéthanol. Installation par un professionnel agréé.'
      ],
      category: 'Véhicules Éthanol'
    },

    // Diagnostic général
    diagnostic: {
      keywords: ['diagnostic', 'panne', 'voyant', 'OBD', 'scanner', 'défaut', 'code erreur'],
      responses: [
        'Le diagnostic moderne utilise la prise OBD pour lire les codes défauts stockés dans les calculateurs du véhicule.',
        'Un diagnostic complet inclut : lecture des codes, paramètres temps réel, tests d\'actionneurs et effacement des défauts.',
        'Les outils de diagnostic évoluent : valises multimarques, oscilloscopes, multimètres spécialisés pour l\'automobile.',
        'Chaque technologie (thermique, électrique, hybride) nécessite des procédures de diagnostic spécifiques.'
      ],
      category: 'Diagnostic Automobile'
    },

    // Aides à la conduite ADAS
    adas: {
      keywords: ['adas', 'aide conduite', 'radar', 'caméra', 'lidar', 'autonome', 'acc', 'aeb', 'lka', 'calibrage'],
      responses: [
        'Les systèmes ADAS (Advanced Driver Assistance Systems) incluent l\'AEB (freinage d\'urgence), l\'ACC (régulateur adaptatif), le LKA (maintien de voie).',
        'Le calibrage des capteurs ADAS est crucial après tout remplacement de pare-brise ou intervention sur la géométrie du véhicule.',
        'Les capteurs radar, lidar et caméras nécessitent un environnement contrôlé et des outils spécialisés pour l\'étalonnage.',
        'Le diagnostic ADAS implique la vérification des capteurs, des calculateurs et des communications entre systèmes.'
      ],
      category: 'Aides à la Conduite'
    },

    // Climatisation moderne
    climatisation: {
      keywords: ['climatisation', 'clim', 'r1234yf', 'pompe chaleur', 'fluide', 'frigorigène', 'compresseur'],
      responses: [
        'Le nouveau fluide R1234yf remplace le R134a pour réduire l\'impact environnemental. Il nécessite des équipements spécifiques.',
        'Les pompes à chaleur sur véhicules électriques optimisent l\'autonomie en récupérant les calories de l\'air extérieur.',
        'Les systèmes multi-zones permettent un contrôle indépendant de la température pour chaque passager.',
        'La manipulation des fluides frigorigènes nécessite une habilitation spécifique et le respect de la réglementation environnementale.'
      ],
      category: 'Climatisation Automobile'
    },

    // Mécanique générale
    mecanique: {
      keywords: ['moteur', 'transmission', 'freinage', 'suspension', 'embrayage', 'distribution'],
      responses: [
        'La mécanique automobile évolue avec l\'électrification : moins de pièces mobiles mais plus d\'électronique.',
        'Les moteurs thermiques modernes intègrent de nombreux capteurs et actionneurs pour optimiser performances et émissions.',
        'La maintenance préventive reste essentielle : vidanges, filtres, courroies, plaquettes de frein selon le carnet d\'entretien.',
        'Les nouvelles technologies nécessitent une formation continue pour maîtriser les évolutions techniques.'
      ],
      category: 'Mécanique Générale'
    },

    // Coaching et accompagnement
    coaching: {
      keywords: ['coaching', 'accompagnement', 'primo-arrivant', 'insertion', 'garage', 'équipe', 'formation équipe'],
      responses: [
        'Notre coaching primo-arrivants offre un accompagnement personnalisé 24h/24 avec plateforme e-learning complète incluant enseignement général (maths, français, anglais) à tarif social.',
        'Le coaching garages inclut la formation de toute l\'équipe (jusqu\'à 8 personnes) avec plateforme e-learning dédiée et audit d\'optimisation.',
        'Tarifs spéciaux : 890€ pour primo-arrivants (financement 0%) et 1490€/garage complet avec support technique permanent.',
        'L\'accompagnement inclut l\'enseignement général renforcé, l\'aide à l\'insertion professionnelle et un suivi post-formation de 6 mois pour garantir la réussite.'
      ],
      category: 'Coaching & Accompagnement'
    }
  };

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
        setInputText(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = () => {
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { text: string; category: string } => {
    const message = userMessage.toLowerCase();
    
    // Recherche dans la base de connaissances
    for (const [key, knowledge] of Object.entries(knowledgeBase)) {
      if (knowledge.keywords.some(keyword => message.includes(keyword))) {
        const randomResponse = knowledge.responses[Math.floor(Math.random() * knowledge.responses.length)];
        return { text: randomResponse, category: knowledge.category };
      }
    }

    // Réponses contextuelles spécifiques
    if (message.includes('formation') || message.includes('cours')) {
      return {
        text: 'Nous proposons des formations complètes sur toutes les technologies automobiles : CAP MVA, Bac Pro, BTS, et des modules spécialisés (électrique, hybride, hydrogène, GPL, éthanol). Quelle formation vous intéresse ?',
        category: 'Formation'
      };
    }

    if (message.includes('primo-arrivant') || message.includes('primo arrivant') || message.includes('débutant')) {
      return {
        text: 'Notre coaching primo-arrivants est spécialement conçu pour vous ! Tarif social 890€ avec financement 0%, accompagnement 24h/24, plateforme e-learning avec enseignement général (maths, français, anglais technique) et aide à l\'insertion. Parfait pour débuter dans l\'automobile !',
        category: 'Coaching Primo-Arrivants'
      };
    }

    if (message.includes('garage') || message.includes('équipe') || message.includes('patron')) {
      return {
        text: 'Notre coaching garages pro forme votre équipe complète (jusqu\'à 8 personnes) pour seulement 1490€ ! Inclus : plateforme e-learning, audit atelier, support permanent. ROI garanti !',
        category: 'Coaching Garages Pro'
      };
    }

    if (message.includes('tarif') || message.includes('prix') || message.includes('coût') || message.includes('financement')) {
      return {
        text: 'Tarifs spéciaux : Primo-arrivants 890€ (financement 0% sur 12 mois), Garages 1490€/équipe complète. Formations éligibles CPF, Pôle Emploi, OPCO. Contactez-nous sur WhatsApp +33 6 89 45 72 31 pour un devis personnalisé !',
        category: 'Tarification'
      };
    }

    if (message.includes('stage') || message.includes('entreprise')) {
      return {
        text: 'Nos partenaires incluent des garages spécialisés dans toutes les technologies : concessions traditionnelles, centres de maintenance électrique, stations hydrogène. 95% de placement en stage garanti !',
        category: 'Stages'
      };
    }

    if (message.includes('emploi') || message.includes('débouché')) {
      return {
        text: 'Les débouchés sont excellents dans toutes les technologies : technicien électrique/hybride, spécialiste hydrogène, expert GPL/éthanol. Le marché recherche ces compétences nouvelles !',
        category: 'Emploi'
      };
    }

    if (message.includes('sécurité') || message.includes('habilitation')) {
      return {
        text: 'La sécurité est primordiale, surtout sur les véhicules électriques/hybrides (haute tension). Nos formations incluent les habilitations électriques B0L, B1VL, B2VL selon les niveaux.',
        category: 'Sécurité'
      };
    }

    // Réponse par défaut
    return {
      text: 'Je suis spécialisé en mécanique automobile toutes technologies. Posez-moi des questions sur les moteurs thermiques, électriques, hybrides, hydrogène, GPL, éthanol, diagnostic, ou nos formations !',
      category: 'Général'
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isBot: true,
        timestamp: new Date(),
        category: aiResponse.category
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Véhicules Électriques': return <Zap className="h-3 w-3" />;
      case 'Véhicules Hybrides': return <Battery className="h-3 w-3" />;
      case 'Véhicules Hydrogène': return <Droplets className="h-3 w-3" />;
      case 'Véhicules GPL': return <Fuel className="h-3 w-3" />;
      case 'Véhicules Éthanol': return <Leaf className="h-3 w-3" />;
      case 'Aides à la Conduite': return <Zap className="h-3 w-3" />;
      case 'Climatisation Automobile': return <Settings className="h-3 w-3" />;
      default: return <Bot className="h-3 w-3" />;
    }
  };

  return (
    <>
      {/* AI Avatar button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        } animate-pulse`}
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* AI Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold">Alex - Assistant IA</h3>
                <p className="text-xs text-purple-100">Spécialiste Auto • En ligne 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.isBot ? 'bg-gradient-to-r from-purple-100 to-blue-100' : 'bg-orange-100'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-purple-600" />
                    ) : (
                      <User className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl shadow-sm ${
                    message.isBot 
                      ? 'bg-white border border-slate-200 text-slate-800' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  }`}>
                    {message.category && message.isBot && (
                      <div className="flex items-center text-xs text-purple-600 mb-1 font-medium">
                        {getCategoryIcon(message.category)}
                        <span className="ml-1">{message.category}</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.isBot && (
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => speakText(message.text)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                        <span className="text-xs text-slate-400">
                          {message.timestamp.toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full">
                    <Bot className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-4 py-2 border-t border-slate-100">
            <div className="flex flex-wrap gap-1">
              {['Coaching primo-arrivants', 'Plateforme e-learning', 'Enseignement général', 'Tarifs spéciaux'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputText(suggestion)}
                  className="text-xs bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 px-2 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question technique..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
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
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-full hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              🤖 IA spécialisée • Disponible 24h/24 • Base de données automobile complète
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAvatar;