/**
 * Landing Page - MathWiz Academy
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, BookOpen, Trophy, Star, Brain } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-6"
            >
              <Wand2 className="w-20 h-20 text-wizard-gold-500 mx-auto" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-wizard-purple-800 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-wizard-purple-600 to-wizard-gold-500 bg-clip-text text-transparent">
                MathWiz Academy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-wizard-purple-600 mb-8 max-w-3xl mx-auto">
              Where young wizards learn math through magical adventures! 
              AI-powered tutoring that adapts to your child's learning style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/select-kid">
                <Button size="xl" className="group">
                  Start Learning
                  <Sparkles className="ml-2 w-5 h-5 group-hover:animate-sparkle" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 text-wizard-gold-400 opacity-50"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-wizard-purple-400 opacity-50"
        >
          <Star className="w-16 h-16" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-wizard-parchment-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-wizard-purple-800 mb-12">
            Your Magical Learning Adventure
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-wizard-purple-500 to-wizard-gold-500 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-wizard-purple-600">
                      {feature.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-wizard-gold-500 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-wizard-purple-800 mb-6">
              Ready to Become a Math Wizard?
            </h2>
            <p className="text-xl text-wizard-purple-600 mb-8">
              Join thousands of young wizards mastering math through magical adventures!
            </p>
            <Link href="/auth/select-kid">
              <Button size="xl" variant="secondary">
                Begin Your Quest Now
                <Wand2 className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wizard-purple-900 text-wizard-parchment-100 px-6 py-12">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-lg mb-2">MathWiz Academy</p>
          <p className="text-sm opacity-75">Making math magical, one spell at a time ✨</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'Adaptive AI Tutoring',
    description: 'Powered by Claude AI and advanced learning algorithms',
    points: [
      'Personalized to your skill level',
      'Real-time hints and guidance',
      'Natural language explanations',
    ],
  },
  {
    icon: BookOpen,
    title: 'Interactive Lessons',
    description: 'Learn through engaging, wizard-themed content',
    points: [
      'Visual aids and examples',
      'Step-by-step breakdowns',
      'Practice with instant feedback',
    ],
  },
  {
    icon: Trophy,
    title: 'Rewards & Progress',
    description: 'Track growth and unlock achievements',
    points: [
      'Earn XP and level up',
      'Unlock wands and robes',
      'Build streaks and mastery',
    ],
  },
];
