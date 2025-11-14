'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, X, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { healthGuardAIChatbot } from '@/ai/flows/health-guard-ai-chatbot';
import { useUser, useAuth } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { signInAnonymously } from 'firebase/auth';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function HealthGuardAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (isOpen) {
      if (!isUserLoading && !user) {
        signInAnonymously(auth);
      }
      inputRef.current?.focus();
    }
  }, [isOpen, user, isUserLoading, auth]);

  useEffect(() => {
    // @ts-ignore
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await healthGuardAIChatbot({
        history: messages,
        prompt: input,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response.symptomReport && user && firestore) {
        const reportCollection = collection(
          firestore,
          `users/${user.uid}/symptom_reports`
        );
        const reportData = {
          ...response.symptomReport,
          userId: user.uid,
          timestamp: serverTimestamp(),
        };
        addDocumentNonBlocking(reportCollection, reportData);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content:
          "I'm sorry, but I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Chatbot error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Card className="w-96 h-[32rem] flex flex-col shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-headline text-lg">
                    HealthGuard AI
                  </CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${
                          message.role === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-xs rounded-lg p-3 text-sm ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.role === 'user' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <User className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-xs rounded-lg p-3 bg-muted flex items-center space-x-1">
                          <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-2 border-t">
                <div className="relative w-full">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask about symptoms..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="pr-12"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
            >
              <Bot className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </>
  );
}
