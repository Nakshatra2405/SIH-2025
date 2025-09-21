import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Send, Mic, MicOff, Bot, User, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { VoiceGuidance } from './VoiceGuidance';
import { toast } from 'sonner@2.0.3';

interface ChatbotPageProps {
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isVoice?: boolean;
}

export function ChatbotPage({ onBack }: ChatbotPageProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: getWelcomeMessage(),
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  function getWelcomeMessage() {
    switch (language) {
      case 'hi':
        return 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। मैं स्वास्थ्य योजनाओं, दवाओं, और सामान्य स्वास्थ्य प्रश्नों में आपकी सहायता कर सकता हूँ। आप मुझसे बात कर सकते हैं या टाइप कर सकते हैं।';
      case 'ml':
        return 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ആരോഗ്യ സഹായിയാണ്. ആരോഗ്യ പദ്ധതികൾ, മരുന്നുകൾ, പൊതു ആരോഗ്യ ചോദ്യങ്ങൾ എന്നിവയിൽ സഹായിക്കാൻ എനിക്ക് കഴിയും. നിങ്ങൾക്ക് എന്നോട് സംസാരിക്കാം അല്ലെങ്കിൽ ടൈപ് ചെയ്യാം.';
      default:
        return 'Hello! I\'m your healthcare assistant. I can help you with health schemes, medicines, and general health questions. You can talk to me or type your questions.';
    }
  }

  // Mock responses based on keywords
  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Health scheme related
    if (message.includes('scheme') || message.includes('योजना') || message.includes('പദ്ധതി')) {
      switch (language) {
        case 'hi':
          return 'केरल में मुख्य स्वास्थ्य योजनाएं हैं: आर्द्रम्, अमृतम्, जनानी सुरक्षा योजना। इन सभी योजनाओं के बारे में अधिक जानकारी के लिए मुख्य मेनू में "स्वास्थ्य योजनाएं" देखें।';
        case 'ml':
          return 'കേരളത്തിലെ പ്രധാന ആരോഗ്യ പദ്ധതികൾ: ആർദ്രം, അമൃതം, ജനനി സുരക്ഷാ യോജന. ഈ പദ്ധതികളെക്കുറിച്ച് കൂടുതൽ അറിയാൻ മെയിൻ മെനുവിലെ "ആരോഗ്യ പദ്ധതികൾ" കാണുക.';
        default:
          return 'Kerala\'s main health schemes include: Ardram, Amrutam, Janani Suraksha Yojana. For detailed information about these schemes, check "Healthcare Policies" in the main menu.';
      }
    }
    
    // Medicine related
    if (message.includes('medicine') || message.includes('दवा') || message.includes('मरुന्न')) {
      switch (language) {
        case 'hi':
          return 'दवाओं के लिए: 1) जन औषधि केंद्र में जाएं 2) सरकारी अस्पतालों में मुफ्त दवाएं मिलती हैं 3) आपातकाल में 108 पर कॉल करें। प्रिस्क्रिप्शन हमेशा साथ रखें।';
        case 'ml':
          return 'മരുന്നുകൾക്കായി: 1) ജൻ ഔഷധി കേന്द്രത്തിൽ പോകുക 2) സർക്കാർ ആശുപത്രികളിൽ സൗജന്യ മരുന്നുകൾ 3) അടിയന്തിരാവസ്ഥയിൽ 108 ൽ വിളിക്കുക. കുറിപ്പു എപ്പോഴും കൈവശം വയ്ക്കുക.';
        default:
          return 'For medicines: 1) Visit Jan Aushadhi centers for affordable medicines 2) Free medicines available at government hospitals 3) Call 108 for emergency. Always carry your prescription.';
      }
    }
    
    // Emergency related
    if (message.includes('emergency') || message.includes('आपातकाल') || message.includes('അടിയന്തിരം')) {
      switch (language) {
        case 'hi':
          return 'आपातकाल के लिए तुरंत 108 पर कॉल करें। यह निःशुल्क एम्बुलेंस सेवा है। गंभीर स्थिति में निकटतम सरकारी अस्पताल जाएं।';
        case 'ml':
          return 'അടിയന്തിരാവസ്ഥയ്ക്ക് ഉടൻ 108 ൽ വിളിക്കുക. ഇത് സൗജന്യ ആംബുലൻസ് സേവനമാണ്. ഗുരുതരാവസ്ഥയിൽ അടുത്തുള്ള സർക്കാർ ആശുപത്രിയിൽ പോകുക.';
        default:
          return 'For emergency, immediately call 108. This is a free ambulance service. In serious condition, go to the nearest government hospital.';
      }
    }
    
    // Doctor related
    if (message.includes('doctor') || message.includes('डॉक्टर') || message.includes('ഡോക്ടർ')) {
      switch (language) {
        case 'hi':
          return 'डॉक्टर से मिलने के लिए: 1) सबसे पहले PHC जाएं 2) ऑनलाइन अपॉइंटमेंट बुक करें 3) सरकारी अस्पतालों में विशेषज्ञ डॉक्टर मिलते हैं।';
        case 'ml':
          return 'ഡോക്ടറെ കാണാൻ: 1) ആദ്യം PHC യിൽ പോകുക 2) ഓൺലൈൻ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക 3) സർക്കാർ ആശുപത്രികളിൽ സ്പെഷ്യലിസ്റ്റ് ഡോക്ടർമാർ ലഭ്യമാണ്.';
        default:
          return 'To see a doctor: 1) First visit PHC (Primary Health Center) 2) Book online appointments 3) Specialist doctors available at government hospitals.';
      }
    }
    
    // Default response
    switch (language) {
      case 'hi':
        return 'मैं आपकी सहायता करना चाहता हूं। कृपया स्वास्थ्य योजनाओं, दवाओं, डॉक्टर की अपॉइंटमेंट या आपातकालीन सेवाओं के बारे में पूछें।';
      case 'ml':
        return 'എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ താൽപ്പര്യമുണ്ട്. ആരോഗ്യ പദ്ധതികൾ, മരുന്നുകൾ, ഡോക്ടർ അപ്പോയിന്റ്മെന്റ് അല്ലെങ്കിൽ അടിയന്തിര സേവനങ്ങളെക്കുറിച്ച് ചോദിക്കുക.';
      default:
        return 'I\'d like to help you. Please ask about health schemes, medicines, doctor appointments, or emergency services.';
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'ml' ? 'ml-IN' : 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition failed. Please try again.');
      };
    }
  }, [language]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate bot typing
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Play voice response if enabled
      if (voiceEnabled) {
        playVoiceResponse(botResponse.content);
      }
    }, 1000 + Math.random() * 2000);
  };

  const playVoiceResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'ml' ? 'ml-IN' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast.error('Voice input not supported on this device.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    {
      text: language === 'hi' ? 'स्वास्थ्य योजनाएं' : language === 'ml' ? 'ആരോഗ്യ പദ്ധതികൾ' : 'Health Schemes',
      query: language === 'hi' ? 'स्वास्थ्य योजनाओं के बारे में बताएं' : language === 'ml' ? 'ആരോഗ്യ പദ്ധതികളെക്കുറിച്ച് പറയുക' : 'Tell me about health schemes'
    },
    {
      text: language === 'hi' ? 'दवा कहां मिलेगी' : language === 'ml' ? 'മരുന്ന് എവിടെ കിട്ടും' : 'Where to get medicines',
      query: language === 'hi' ? 'दवा कहां से खरीदूं' : language === 'ml' ? 'മരുന്ന് എവിടെ നിന്ന് വാങ്ങാം' : 'Where to buy medicines'
    },
    {
      text: language === 'hi' ? 'आपातकाल' : language === 'ml' ? 'അടിയന്തിരം' : 'Emergency',
      query: language === 'hi' ? 'आपातकाल में क्या करें' : language === 'ml' ? 'അടിയന്തിരാവസ്ഥയിൽ എന്ത് ചെയ്യണം' : 'What to do in emergency'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="font-medium">Health Assistant</h1>
                <p className="text-sm text-gray-600">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
          >
            {voiceEnabled ? (
              <Volume2 className="h-5 w-5 text-blue-600" />
            ) : (
              <VolumeX className="h-5 w-5 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4">
        <ScrollArea className="h-[calc(100vh-200px)]" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-green-100 text-green-600'
                  }
                `}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`
                  max-w-[80%] rounded-lg p-3 
                  ${message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border shadow-sm'
                  }
                `}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white border shadow-sm rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputText(question.query)}
                className="text-xs"
              >
                {question.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'hi' 
                  ? 'अपना स्वास्थ्य प्रश्न पूछें...' 
                  : language === 'ml' 
                  ? 'നിങ്ങളുടെ ആരോഗ്യ ചോദ്യം ചോദിക്കുക...'
                  : 'Ask your health question...'
              }
              className="pr-12"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceInput}
            className={`p-2 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            size="sm"
            className="px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          {language === 'hi' 
            ? 'आप बोल सकते हैं या टाइप कर सकते हैं' 
            : language === 'ml' 
            ? 'നിങ്ങൾക്ക് സംസാരിക്കാം അല്ലെങ്കിൽ ടൈപ് ചെയ്യാം'
            : 'You can speak or type your questions'
          }
        </p>
      </div>
    </div>
  );
}