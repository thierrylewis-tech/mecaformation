import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  User, 
  Search,
  BookOpen,
  Wrench,
  Zap,
  Car,
  Settings,
  Award,
  Calculator,
  Globe,
  FileText,
  Video,
  Download,
  Star,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Database
} from 'lucide-react';
import { supabase, searchAutomotiveKnowledge, searchGeneralEducation, getDiagnosticCode } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  category?: string;
  attachments?: {
    type: 'knowledge' | 'code' | 'exercise' | 'video';
    data: any;
    title: string;
  }[];
  confidence?: number;
}

interface KnowledgeContext {
  lastQuery: string;
  userProfile: {
    level?: string;
    interests: string[];
    preferredLanguage: string;
  };
  conversationHistory: string[];
}

const AdvancedChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis Alex, votre assistant IA expert en mécanique automobile 🚗. J\'ai accès à une base de données complète avec plus de 1000 articles techniques, codes de diagnostic, procédures de maintenance et cours d\'enseignement général. Comment puis-je vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date(),
      category: 'Accueil',
      confidence: 100
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [context, setContext] = useState<KnowledgeContext>({
    lastQuery: '',
    userProfile: {
      interests: [],
      preferredLanguage: 'fr'
    },
    conversationHistory: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  }, [messages]);

  const analyzeUserIntent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Détection codes de diagnostic
    const codePattern = /[PBUC]\d{4}/gi;
    const codes = message.match(codePattern);
    
    // Détection intentions
    const intents = {
      diagnostic_code: codes && codes.length > 0,
      technical_question: /comment|pourquoi|qu'est-ce|expliquer|fonctionnement/.test(lowerMessage),
      maintenance: /maintenance|entretien|vidange|révision|contrôle/.test(lowerMessage),
      problem_solving: /problème|panne|défaut|dysfonctionnement|ne marche pas/.test(lowerMessage),
      learning: /apprendre|cours|formation|étudier|comprendre/.test(lowerMessage),
      calculation: /calculer|calcul|formule|mathématiques/.test(lowerMessage)
    };
    
    return { codes, intents };
  };

  const getAIResponse = async (userMessage: string): Promise<Message> => {
    const analysis = analyzeUserIntent(userMessage);
    const lowerMessage = userMessage.toLowerCase();
    
    // Mise à jour du contexte
    setContext(prev => ({
      ...prev,
      lastQuery: userMessage,
      conversationHistory: [...prev.conversationHistory.slice(-5), userMessage]
    }));

    // Recherche de codes de diagnostic dans la vraie base
    if (analysis.codes && analysis.codes.length > 0) {
      try {
        const code = analysis.codes[0];
        const { data: diagnosticData } = await getDiagnosticCode(code);
        
        if (diagnosticData) {
          return {
            id: Date.now().toString(),
            text: `Code ${code} détecté dans notre base ! 🔍\n\n**${diagnosticData.description}**\n\n**Symptômes typiques :**\n${diagnosticData.symptoms.map(s => `• ${s}`).join('\n')}\n\n**Causes possibles :**\n${diagnosticData.possible_causes.map(c => `• ${c}`).join('\n')}\n\n**Étapes de diagnostic :**\n${diagnosticData.diagnostic_steps.slice(0, 3).map((s, i) => `${i+1}. ${s}`).join('\n')}\n\n**Gravité :** ${diagnosticData.severity === 'critical' ? '🔴 Critique' : diagnosticData.severity === 'high' ? '🟠 Élevée' : diagnosticData.severity === 'medium' ? '🟡 Moyenne' : '🟢 Faible'}\n\n**Temps estimé :** ${diagnosticData.estimated_time_hours}h\n**Coût estimé :** ${diagnosticData.estimated_cost_euros}€`,
            isBot: true,
            timestamp: new Date(),
            category: 'Code Diagnostic',
            confidence: 95,
            attachments: [{
              type: 'code',
              data: diagnosticData,
              title: `Procédure complète ${code}`
            }]
          };
        } else {
          return {
            id: Date.now().toString(),
            text: `Code ${code} non trouvé dans notre base actuelle. Cependant, je peux vous aider :\n\n🔍 **Codes P0XXX** : Moteur et transmission\n🔍 **Codes B0XXX** : Carrosserie et confort\n🔍 **Codes C0XXX** : Châssis et freinage\n🔍 **Codes U0XXX** : Réseau et communication\n\nPouvez-vous me donner plus de détails sur les symptômes ?`,
            isBot: true,
            timestamp: new Date(),
            category: 'Code Diagnostic',
            confidence: 60
          };
        }
      } catch (error) {
        console.error('Erreur recherche code:', error);
      }
    }

    // Recherche dans la vraie base de connaissances automobile
    if (analysis.intents.technical_question || analysis.intents.problem_solving) {
      try {
        const { data: automotiveData } = await searchAutomotiveKnowledge(userMessage);
        
        if (automotiveData && automotiveData.length > 0) {
          const bestMatch = automotiveData[0];
          return {
            id: Date.now().toString(),
            text: `Excellent ! J'ai trouvé des informations dans notre base technique ! 📚\n\n**${bestMatch.title}**\n\n${bestMatch.content.substring(0, 400)}...\n\n**Niveau de difficulté :** ${'⭐'.repeat(bestMatch.difficulty_level)}\n**Catégorie :** ${bestMatch.category.replace('_', ' ')}\n**Mots-clés :** ${bestMatch.keywords.join(', ')}\n\nVoulez-vous que je vous donne plus de détails ou d'autres articles sur ce sujet ?`,
            isBot: true,
            timestamp: new Date(),
            category: bestMatch.category,
            confidence: 95,
            attachments: [{
              type: 'knowledge',
              data: bestMatch,
              title: 'Article complet'
            }]
          };
        }
      } catch (error) {
        console.error('Erreur recherche automobile:', error);
      }
    }

    // Recherche dans la vraie base enseignement général
    if (analysis.intents.learning || analysis.intents.calculation) {
      try {
        const { data: educationData } = await searchGeneralEducation(userMessage);
        
        if (educationData && educationData.length > 0) {
          const bestMatch = educationData[0];
          return {
            id: Date.now().toString(),
            text: `Parfait ! J'ai du contenu d'enseignement général dans notre base ! 📖\n\n**${bestMatch.title}**\n\n${bestMatch.content.substring(0, 350)}...\n\n**Matière :** ${bestMatch.subject}\n**Niveau :** ${bestMatch.level}\n**Durée :** ${bestMatch.duration_minutes} minutes\n**Obligatoire :** ${bestMatch.is_mandatory ? 'Oui' : 'Non'}\n\nSouhaitez-vous voir les exercices pratiques ou d'autres cours ?`,
            isBot: true,
            timestamp: new Date(),
            category: `${bestMatch.subject} - ${bestMatch.level}`,
            confidence: 92,
            attachments: [{
              type: 'exercise',
              data: bestMatch,
              title: 'Cours complet + exercices'
            }]
          };
        }
      } catch (error) {
        console.error('Erreur recherche éducation:', error);
      }
    }

    // Réponses contextuelles spécialisées
    if (lowerMessage.includes('électrique') || lowerMessage.includes('batterie') || lowerMessage.includes('tesla')) {
      return {
        id: Date.now().toString(),
        text: '⚡ **Véhicules Électriques - Ma Spécialité !**\n\nJe peux vous expliquer :\n\n🔋 **Batteries Li-ion** : Chimies, BMS, refroidissement\n⚡ **Moteurs électriques** : Synchrones, asynchrones, onduleurs\n🔌 **Systèmes de charge** : AC/DC, CCS, CHAdeMO\n🛡️ **Sécurité haute tension** : Habilitations, procédures\n🔧 **Diagnostic spécialisé** : Codes spécifiques, outils\n\nQuelle technologie électrique vous intéresse ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Véhicules Électriques',
        confidence: 95
      };
    }

    if (lowerMessage.includes('hybride') || lowerMessage.includes('prius') || lowerMessage.includes('toyota')) {
      return {
        id: Date.now().toString(),
        text: '🔄 **Véhicules Hybrides - Expert Toyota/Honda !**\n\nArchitectures hybrides :\n\n🔀 **Série** : Moteur thermique → générateur → moteur électrique\n⚡ **Parallèle** : Les deux moteurs propulsent (Prius)\n🔄 **Mixte** : Combine série + parallèle selon conditions\n🔌 **PHEV** : Hybride rechargeable avec prise\n\n🔋 Batteries NiMH/Li-ion spécifiques\n⚡ Récupération énergie au freinage\n🔧 Diagnostic bi-technologie\n\nQuel système hybride vous intéresse ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Véhicules Hybrides',
        confidence: 93
      };
    }

    if (lowerMessage.includes('mercedes') || lowerMessage.includes('bmw') || lowerMessage.includes('audi')) {
      return {
        id: Date.now().toString(),
        text: '🏆 **Diagnostic Premium Allemand !**\n\nSpécialités constructeurs :\n\n🔹 **Mercedes** : COMAND, MBUX, AIRMATIC, 7G-TRONIC\n🔹 **BMW** : iDrive, xDrive, Valvetronic, VANOS\n🔹 **Audi** : MMI, Quattro, TFSI, TDI\n\n🔧 **Outils spécialisés** : STAR, ISTA, ODIS\n📊 **Codes constructeur** : Accès exclusif\n🎯 **Diagnostic avancé** : Multiplexage, CAN\n\nQuel modèle vous pose problème ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Diagnostic Premium',
        confidence: 92
      };
    }

    if (lowerMessage.includes('mathématiques') || lowerMessage.includes('calcul') || lowerMessage.includes('formule')) {
      return {
        id: Date.now().toString(),
        text: '🧮 **Mathématiques Appliquées Automobile !**\n\nFormules essentielles :\n\n⚡ **Puissance** : P = C × ω (Couple × vitesse angulaire)\n🔋 **Énergie** : E = P × t (Puissance × temps)\n🚗 **Vitesse** : V = (π × D × N) / 60 (Diamètre roue × régime)\n📏 **Géométrie** : Carrossage, chasse, pincement\n💰 **Coûts** : Main d\'œuvre + pièces + marge\n\nQuel calcul automobile vous intéresse ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Mathématiques Automobile',
        confidence: 90
      };
    }

    if (lowerMessage.includes('français') || lowerMessage.includes('rapport') || lowerMessage.includes('communication')) {
      return {
        id: Date.now().toString(),
        text: '📝 **Français Technique Automobile !**\n\nCompétences professionnelles :\n\n📋 **Rapports d\'intervention** : Structure, vocabulaire technique\n💬 **Communication client** : Écoute, explication, négociation\n📄 **Devis détaillés** : Justification, présentation claire\n📧 **Correspondance pro** : Emails, courriers officiels\n🎯 **Présentation orale** : Soutenance, formation équipe\n\nQuel aspect vous intéresse le plus ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Français Technique',
        confidence: 88
      };
    }

    if (lowerMessage.includes('anglais') || lowerMessage.includes('english') || lowerMessage.includes('international')) {
      return {
        id: Date.now().toString(),
        text: '🌍 **Anglais Technique Automobile !**\n\nVocabulaire international :\n\n🔧 **Outils** : wrench, screwdriver, multimeter\n🚗 **Composants** : engine, transmission, brakes\n⚡ **Électrique** : battery, motor, inverter, charging\n📊 **Diagnostic** : trouble codes, symptoms, repair\n📚 **Documentation** : service manual, wiring diagram\n\nBesoin de traduction ou vocabulaire spécifique ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Anglais Technique',
        confidence: 87
      };
    }

    // Réponses par défaut selon contexte
    const defaultResponses = [
      {
        condition: () => lowerMessage.includes('formation') || lowerMessage.includes('cours'),
        response: '🎓 **Formations Disponibles :**\n\n📚 **CAP MVA** : 13€/mois - Formation complète\n🎯 **Bac Pro** : 15€/mois - Niveau supérieur\n🏆 **BTS** : 18€/mois - Management inclus\n⚡ **Premium** : 22€/mois - Toutes spécialisations\n\nQuelle formation vous intéresse ?',
        category: 'Formations'
      },
      {
        condition: () => lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût'),
        response: '💰 **Tarifs Révolutionnaires :**\n\n🎯 **77% moins cher** que la concurrence !\n\n📚 CAP MVA : **13€/mois** (vs 57€ ailleurs)\n🎓 Bac Pro : **15€/mois** (vs 67€ ailleurs)\n🏆 BTS : **18€/mois** (vs 77€ ailleurs)\n⚡ Premium : **22€/mois** (vs 97€ ailleurs)\n\n🎁 **Offre spéciale** : -50% le premier mois !',
        category: 'Tarification'
      },
      {
        condition: () => lowerMessage.includes('stage') || lowerMessage.includes('entreprise'),
        response: '🏢 **Stages Garantis !**\n\nNotre réseau de **500+ partenaires** :\n\n🚗 **Garages indépendants** : Polyvalence, proximité\n🏪 **Concessions** : Spécialisation marque\n🔧 **Centres auto** : Volume, efficacité\n🚛 **Flottes entreprises** : Maintenance préventive\n⚡ **Stations électriques** : Technologies émergentes\n\n**95% de placement** en stage garanti !',
        category: 'Stages'
      }
    ];

    const matchedResponse = defaultResponses.find(r => r.condition());
    if (matchedResponse) {
      return {
        id: Date.now().toString(),
        text: matchedResponse.response,
        isBot: true,
        timestamp: new Date(),
        category: matchedResponse.category,
        confidence: 85
      };
    }

    // Réponse par défaut avec suggestions
    return {
      id: Date.now().toString(),
      text: '🤖 **Je suis votre expert automobile !**\n\nJe peux vous aider avec :\n\n🔧 **Diagnostic** : Codes défauts, pannes, solutions\n⚡ **Technologies** : Électrique, hybride, hydrogène\n📚 **Formations** : CAP, Bac Pro, BTS, spécialisations\n🧮 **Enseignement** : Maths, français, anglais technique\n💰 **Tarifs** : Informations détaillées\n\n**Posez-moi une question technique ou dites-moi ce qui vous intéresse !**',
      isBot: true,
      timestamp: new Date(),
      category: 'Aide Générale',
      confidence: 70
    };
  };

  const handleSendMessage = async () => {
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

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = await getAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erreur IA:', error);
      const errorResponse: Message = {
        id: Date.now().toString(),
        text: 'Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?',
        isBot: true,
        timestamp: new Date(),
        category: 'Erreur',
        confidence: 0
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
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
      const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '').replace(/[🔧⚡🚗📚🎯🏆💰🔍🟠🟡🟢🔴]/g, ''));
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryIcon = (category?: string) => {
    if (!category) return <Bot className="h-4 w-4" />;
    
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Véhicules Électriques': Zap,
      'Véhicules Hybrides': Car,
      'Code Diagnostic': Search,
      'Diagnostic Premium': Award,
      'Mathématiques Automobile': Calculator,
      'Français Technique': FileText,
      'Anglais Technique': Globe,
      'Formations': BookOpen,
      'Tarification': Target,
      'Stages': Settings
    };
    
    const IconComponent = iconMap[category] || Bot;
    return <IconComponent className="h-4 w-4" />;
  };

  const quickSuggestions = [
    'Code P0300 moteur',
    'Formation véhicules électriques', 
    'Calcul puissance moteur',
    'Diagnostic Mercedes',
    'Tarifs formations',
    'Stage en entreprise'
  ];

  return (
    <>
      {/* Enhanced Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        } animate-pulse`}
      >
        <div className="relative">
          <Bot className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
        </div>
      </button>

      {/* Enhanced Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] h-[700px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Alex - Expert IA Automobile</h3>
                  <div className="flex items-center text-xs text-blue-100">
                    <Database className="h-3 w-3 mr-1" />
                    <span>Base de données : 1000+ articles • Codes diagnostic • Enseignement général</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.isBot ? 'bg-gradient-to-r from-blue-100 to-purple-100' : 'bg-orange-100'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    message.isBot 
                      ? 'bg-white border border-slate-200 text-slate-800' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  }`}>
                    {message.category && message.isBot && (
                      <div className="flex items-center text-xs text-blue-600 mb-2 font-medium">
                        {getCategoryIcon(message.category)}
                        <span className="ml-1">{message.category}</span>
                        {message.confidence && (
                          <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {message.confidence}%
                          </span>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    
                    {message.attachments && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {attachment.type === 'knowledge' && <BookOpen className="h-4 w-4 mr-2 text-blue-600" />}
                                {attachment.type === 'code' && <Search className="h-4 w-4 mr-2 text-red-600" />}
                                {attachment.type === 'exercise' && <Calculator className="h-4 w-4 mr-2 text-green-600" />}
                                <span className="text-sm font-medium text-slate-800">{attachment.title}</span>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.isBot && (
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() => speakText(message.text)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Volume2 className="h-4 w-4" />
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
            
            {/* Enhanced typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-full">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-slate-500">Recherche dans la base...</span>
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
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputText(suggestion)}
                  className="text-xs bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 px-3 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question technique..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center mt-2 text-xs text-slate-500">
              <Database className="h-3 w-3 mr-1" />
              <span>IA connectée à la base de données automobile complète</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedChatBot;