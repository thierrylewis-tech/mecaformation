import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider avec nos formations en mécanique automobile ?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
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

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('formation') || message.includes('cap') || message.includes('bac pro')) {
      return 'Nous proposons plusieurs formations : CAP Maintenance des Véhicules (24 mois), Bac Pro Maintenance Automobile (36 mois), et des formations spécialisées en diagnostic électronique. Quelle formation vous intéresse ?';
    }
    
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
      return 'Nos formations sont éligibles au financement CPF, Pôle Emploi, et nous proposons des facilités de paiement. Je peux vous mettre en relation avec un conseiller pour étudier votre dossier de financement.';
    }
    
    if (message.includes('durée') || message.includes('temps')) {
      return 'La durée varie selon la formation : CAP MVA (24 mois), Bac Pro (36 mois), formations courtes (3-6 mois). Toutes incluent des stages en entreprise.';
    }
    
    if (message.includes('stage') || message.includes('entreprise')) {
      return 'Nous garantissons des stages dans notre réseau de 500+ entreprises partenaires : garages, concessions, centres auto. 95% de nos étudiants trouvent un stage.';
    }
    
    if (message.includes('emploi') || message.includes('travail') || message.includes('débouché')) {
      return 'Nos formations offrent d\'excellents débouchés : mécanicien, technicien diagnostic, chef d\'atelier. 87% de nos diplômés trouvent un emploi dans les 6 mois.';
    }
    
    if (message.includes('inscription') || message.includes('candidature')) {
      return 'Pour vous inscrire, vous pouvez remplir notre formulaire de contact ou nous appeler au 01 42 85 96 32. Un conseiller étudiera votre profil et vous guidera.';
    }
    
    if (message.includes('centre') || message.includes('lieu') || message.includes('adresse')) {
      return 'Notre siège social est à Paris, mais nos formations sont 100% à distance ! Vous pouvez suivre nos cours depuis toute la France avec un accompagnement personnalisé.';
    }
    
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! Ravi de vous aider. Avez-vous des questions sur nos formations en mécanique automobile ?';
    }
    
    if (message.includes('merci')) {
      return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions. Bonne journée !';
    }
    
    return 'Je comprends votre question. Pour une réponse personnalisée, je vous recommande de contacter directement nos conseillers au 01 42 85 96 32 ou via notre formulaire de contact. Ils pourront vous aider plus précisément !';
    return 'Je comprends votre question. Pour une réponse personnalisée, contactez nos conseillers sur WhatsApp au +33 6 89 45 72 31 (disponible 24h/7j) ou via notre formulaire de contact. Ils pourront vous aider plus précisément !';
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

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Assistant MécaFormation</h3>
                <p className="text-xs text-blue-100">En ligne</p>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.isBot ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.isBot 
                      ? 'bg-slate-100 text-slate-800' 
                      : 'bg-orange-500 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    {message.isBot && (
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

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                disabled={!inputText.trim()}
                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;