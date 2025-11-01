/**
 * Kid Selection Page - Choose which kid is learning
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { KIDS, loginKid, getAllKids } from '@/lib/kid-auth';
import { motion } from 'framer-motion';
import { Sparkles, Star, Zap } from 'lucide-react';

export default function SelectKidPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [selectedKid, setSelectedKid] = useState<string | null>(null);
  const [allKids, setAllKids] = useState<any[]>([]);

  useEffect(() => {
    async function loadKids() {
      const kids = await getAllKids();
      setAllKids(kids);
    }
    loadKids();
  }, []);

  const handleSelectKid = (kidId: string) => {
    setSelectedKid(kidId);
  };

  const handleContinue = async () => {
    if (!selectedKid) return;

    const profile = await loginKid(selectedKid);
    if (profile) {
      setUser(profile);
      
      if (!profile.onboardingCompleted) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-wizard-gold-500 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-wizard-purple-800 mb-2">
            Who's Learning Today?
          </h1>
          <p className="text-wizard-purple-600">
            Choose your wizard to continue your magical math journey!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Profile</CardTitle>
            <CardDescription>
              Each wizard has their own progress and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {allKids.map((kid, index) => (
                <motion.button
                  key={kid.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleSelectKid(kid.id)}
                  className={`relative p-4 rounded-2xl border-4 transition-all group ${
                    selectedKid === kid.id
                      ? 'border-wizard-gold-500 bg-gradient-to-br from-wizard-purple-100 to-wizard-gold-50 shadow-2xl'
                      : 'border-wizard-parchment-300 bg-white hover:border-wizard-purple-400 hover:shadow-xl'
                  }`}
                >
                  {/* Selection sparkles */}
                  {selectedKid === kid.id && (
                    <>
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2"
                      >
                        <Star className="w-8 h-8 text-wizard-gold-500 fill-wizard-gold-500" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -top-1 -left-1"
                      >
                        <Sparkles className="w-6 h-6 text-wizard-purple-500" />
                      </motion.div>
                    </>
                  )}
                  
                  {/* Wizard Avatar */}
                  <div className="relative w-24 h-24 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Image
                      src={kid.avatar}
                      alt={kid.name}
                      width={96}
                      height={96}
                      className="drop-shadow-lg"
                      unoptimized
                    />
                    {/* Floating emoji */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 text-2xl"
                    >
                      {kid.emoji}
                    </motion.div>
                  </div>
                  
                  <div className="font-bold text-wizard-purple-800 mb-1 text-sm">
                    {kid.name}
                  </div>
                  
                  {kid.profile && (
                    <div className="flex items-center justify-center gap-1 text-xs text-wizard-purple-600">
                      <Zap className="w-3 h-3 text-wizard-gold-500" />
                      <span>Level {kid.profile.level}</span>
                    </div>
                  )}
                  {!kid.profile && (
                    <div className="text-xs text-wizard-purple-500 font-medium">
                      ✨ New Wizard!
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            <Button 
              onClick={handleContinue} 
              size="lg" 
              className="w-full"
              disabled={!selectedKid}
            >
              Start Learning
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>

            {selectedKid && allKids.find(k => k.id === selectedKid)?.profile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-6 p-6 bg-gradient-to-r from-wizard-gold-50 to-wizard-purple-50 border-2 border-wizard-gold-400 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  {allKids.find(k => k.id === selectedKid)?.avatar && (
                    <Image
                      src={allKids.find(k => k.id === selectedKid)?.avatar || ''}
                      alt="Selected wizard"
                      width={48}
                      height={48}
                      className="drop-shadow-md"
                      unoptimized
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-wizard-purple-800 text-lg">
                      Welcome back!
                    </h3>
                    <p className="text-sm text-wizard-purple-600">
                      {allKids.find(k => k.id === selectedKid)?.name}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/60 rounded-lg p-2">
                    <div className="text-xs text-wizard-purple-600 mb-1">Level</div>
                    <div className="text-lg font-bold text-wizard-purple-800 flex items-center justify-center gap-1">
                      <Zap className="w-4 h-4 text-wizard-gold-500" />
                      {allKids.find(k => k.id === selectedKid)?.profile?.level}
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <div className="text-xs text-wizard-purple-600 mb-1">XP</div>
                    <div className="text-lg font-bold text-wizard-purple-800 flex items-center justify-center gap-1">
                      <Sparkles className="w-4 h-4 text-wizard-gold-500" />
                      {allKids.find(k => k.id === selectedKid)?.profile?.xp.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <div className="text-xs text-wizard-purple-600 mb-1">Solved</div>
                    <div className="text-lg font-bold text-wizard-purple-800 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-wizard-gold-500 fill-wizard-gold-500" />
                      {allKids.find(k => k.id === selectedKid)?.profile?.totalProblemsCompleted}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

