/**
 * Homework Help - Conversational AI Tutor with Claude
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Sparkles, User, Bot, Camera, Image as ImageIcon, X, Mic, MicOff } from 'lucide-react';
import Link from 'next/link';
import { MathRenderer } from '@/components/MathRenderer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function HomeworkPage() {
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello, young wizard! I'm Professor Mathwiz, your magical math tutor. 🧙‍♂️\n\nI'm here to help you with your homework! You can:\n• Ask me to explain a math concept\n• Show me a problem you're stuck on\n• Request step-by-step guidance\n• Practice similar problems together\n\nWhat would you like help with today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for speech recognition support (works on Safari/iPad with webkit prefix)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setSpeechSupported(true);
        
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          
          setInput(transcript);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          
          if (event.error === 'not-allowed') {
            alert('🎤 Please allow microphone access to use voice input!');
          }
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('🎤 Speech recognition is not supported on this browser. Try Chrome or Safari on iPad!');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        // Request microphone permission explicitly
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
              recognitionRef.current.start();
              setIsListening(true);
            })
            .catch((err) => {
              console.error('Microphone permission denied:', err);
              alert('🎤 Please allow microphone access in your browser settings to use voice input!\n\nOn iPad: Settings → Safari → Microphone → Allow');
            });
        } else {
          recognitionRef.current.start();
          setIsListening(true);
        }
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        alert('🎤 Could not start voice input. Please check your microphone permissions.');
      }
    }
  };

  const handleSend = async (autoSend = false) => {
    if ((!input.trim() && !autoSend) || loading) return;

    let messagesToSend = messages;
    
    if (!autoSend) {
      const userMessage: Message = {
        role: 'user',
        content: input,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      // Include the new user message in the API call
      messagesToSend = [...messages, userMessage];
    }
    
    setInput('');
    setUploadedImage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/claude/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesToSend.slice(-10).map(m => ({ // Last 10 messages for context
            role: m.role,
            content: m.content,
          })),
          gradeLevel: user?.gradeLevel || 1,
          userContext: `Level ${user?.level || 1} wizard, ${user?.xp || 0} XP`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment! 🔮",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setUploadedImage(base64);
      setProcessingImage(true);

      try {
        // Send image to AI for analysis
        const response = await fetch('/api/vision/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64,
            gradeLevel: user?.gradeLevel || 1,
          }),
        });

        const data = await response.json();
        
        if (data.success || data.extractedText) {
          // Add the extracted problem as a user message
          const imageMessage: Message = {
            role: 'user',
            content: `Here's my homework problem:\n\n${data.extractedText}`,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, imageMessage]);
          setInput('');
          
          // Get AI response (unless this is an error message)
          if (data.success && !data.error) {
            handleSend(true); // Auto-send after image processing
          }
        } else {
          // Show error message
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: data.error || "I had trouble reading that image. Could you try again with better lighting? 📝",
            timestamp: new Date(),
          }]);
        }
      } catch (error) {
        console.error('Image processing error:', error);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I had trouble processing that image. Please try:\n1. Better lighting\n2. Focus on the problem\n3. Or type it out directly 📝",
          timestamp: new Date(),
        }]);
      } finally {
        setProcessingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-wizard-purple-800 text-white px-6 py-4 shadow-lg">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Homework Help</h1>
              <p className="text-wizard-purple-200 text-sm">Chat with Professor Mathwiz</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-wizard-purple-700">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-1 container mx-auto max-w-4xl px-6 py-8 flex flex-col">
        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-wizard-purple-700 mb-3">
              Quick Questions:
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-sm px-4 py-2 bg-wizard-parchment-100 hover:bg-wizard-parchment-200 border-2 border-wizard-parchment-300 rounded-full text-wizard-purple-700 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <Card className="flex-1 flex flex-col mb-4">
          <CardContent className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-wizard-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-wizard-purple-600 text-white'
                          : 'bg-wizard-parchment-100 text-wizard-purple-800 border-2 border-wizard-parchment-300'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <MathRenderer content={message.content} />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-wizard-purple-200' : 'text-wizard-purple-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-wizard-gold-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-wizard-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-wizard-parchment-100 border-2 border-wizard-parchment-300 px-4 py-3 rounded-2xl">
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-wizard-purple-600 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-wizard-purple-600 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-wizard-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card>
          <CardContent className="p-4">
            {/* Image Preview */}
            {uploadedImage && (
              <div className="mb-3 relative">
                <img src={uploadedImage} alt="Uploaded homework" className="max-h-48 rounded-lg border-2 border-wizard-purple-300" />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
                {processingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">Reading problem...</div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-3">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Camera/Upload Button */}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="lg"
                disabled={loading || processingImage}
                className="flex-shrink-0"
                title="Take photo or upload homework"
              >
                <Camera className="w-5 h-5" />
              </Button>
              
              {/* Microphone Button (Speech-to-Text) */}
              {speechSupported && (
                <Button
                  onClick={toggleSpeechRecognition}
                  variant="outline"
                  size="lg"
                  disabled={loading || processingImage}
                  className={`flex-shrink-0 ${
                    isListening 
                      ? 'bg-red-500 text-white hover:bg-red-600 border-red-500 animate-pulse' 
                      : 'bg-white'
                  }`}
                  title={isListening ? "Stop recording" : "Voice input"}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </Button>
              )}
              
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={isListening ? "Listening... 🎤" : "Ask your question, upload a photo, or use voice..."}
                disabled={loading || processingImage}
                className="flex-1"
              />
              <Button onClick={() => handleSend()} disabled={loading || processingImage || !input.trim()} size="lg">
                {loading ? 'Sending...' : 'Send'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-wizard-purple-500 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by AI - {speechSupported ? '🎤 Voice, 📸 Photo, or ⌨️ Type' : '📸 Photo or ⌨️ Type your question'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const quickQuestions = [
  "How do I add two-digit numbers?",
  "What's the difference between addition and subtraction?",
  "Can you explain fractions?",
  "Help me with word problems",
];

