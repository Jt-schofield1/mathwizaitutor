/**
 * Dashboard - Main Hub
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SpellBookProgress } from '@/components/wizard/spell-book-progress';
import { useAuthStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  MessageCircle, 
  Trophy,
  Flame,
  Star,
  TrendingUp,
  Award,
  LogOut,
  User,
  Sparkles,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { logoutKid } from '@/lib/kid-auth';
import { getAchievementProgress, getNextAchievement } from '@/lib/achievements';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [nextAchievement, setNextAchievement] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/select-kid');
    } else {
      // Get next achievement to unlock
      const next = getNextAchievement(user);
      setNextAchievement(next);
    }
  }, [user, router]);

  const handleLogout = () => {
    logoutKid();
    clearUser();
    router.push('/auth/select-kid');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-wizard-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-wizard-purple-600">Loading your magical dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header - Game Style */}
      <header className="bg-gradient-to-r from-wizard-purple-800 via-wizard-purple-700 to-wizard-purple-800 text-white px-6 py-4 shadow-2xl border-b-4 border-wizard-gold-500">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user.photoURL && user.photoURL.startsWith('/') && (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'Wizard'}
                    width={56}
                    height={56}
                    className="rounded-full border-4 border-wizard-gold-400 shadow-lg"
                    unoptimized
                  />
                </motion.div>
              )}
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-wizard-gold-300" />
                  {user.displayName}
                </h1>
                <div className="flex items-center gap-3 text-sm text-wizard-purple-200 mt-1">
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-wizard-gold-400" />
                    Level {user.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-wizard-gold-400 fill-wizard-gold-400" />
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="text-white hover:bg-wizard-purple-700 hover:scale-110 transition-transform">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout} 
                className="text-white hover:bg-wizard-purple-700 hover:scale-110 transition-transform"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-wizard-gold-500" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SpellBookProgress xp={user.xp} level={user.level} showDetails />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-wizard-purple-800 mb-1">
                {user.streak} days
              </div>
              <p className="text-sm text-wizard-purple-600">
                Keep learning every day!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-wizard-purple-800 mb-1">
                {Math.round(user.accuracyRate)}%
              </div>
              <p className="text-sm text-wizard-purple-600">
                {user.totalProblemsCompleted} problems solved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Paths - Game Style */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-wizard-purple-800 mb-6 flex items-center gap-2">
            <Image src="/icons/wand.svg" alt="Wand" width={32} height={32} className="inline" unoptimized />
            Choose Your Adventure
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={path.href}>
                  <Card hover className="h-full cursor-pointer border-4 border-wizard-parchment-300 hover:border-wizard-purple-500 transition-all shadow-lg hover:shadow-2xl">
                    <CardHeader className="text-center">
                      {/* Game Icon */}
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-4 mx-auto"
                      >
                        <Image
                          src={path.gameIcon}
                          alt={path.title}
                          width={80}
                          height={80}
                          className="drop-shadow-xl"
                          unoptimized
                        />
                      </motion.div>
                      <CardTitle className="text-2xl">{path.title}</CardTitle>
                      <CardDescription className="text-base">{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-wizard-purple-600 mb-4">
                        {path.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs border-2 border-wizard-purple-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all" variant={path.variant as any}>
                        <Sparkles className="mr-2 w-5 h-5" />
                        Start Quest
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

            {/* Next Achievement Progress */}
            {nextAchievement && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-wizard-purple-800 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-wizard-gold-500" />
                  Next Achievement
                </h2>
                <Card className="border-4 border-wizard-gold-300 bg-gradient-to-br from-wizard-gold-50 to-wizard-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{nextAchievement.achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-wizard-purple-800 mb-1">
                          {nextAchievement.achievement.name}
                        </h3>
                        <p className="text-sm text-wizard-purple-600 mb-3">
                          {nextAchievement.achievement.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-wizard-purple-700 font-semibold">
                              {nextAchievement.progress.current} / {nextAchievement.progress.max}
                            </span>
                            <span className="text-wizard-gold-700 font-semibold">
                              +{nextAchievement.achievement.xpReward} XP
                            </span>
                          </div>
                          <Progress 
                            value={(nextAchievement.progress.current / nextAchievement.progress.max) * 100} 
                            className="h-3"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-wizard-purple-800 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-wizard-gold-500" />
                Recent Achievements
                {user.achievements && user.achievements.length > 0 && (
                  <Badge variant="gold" className="ml-2">
                    {user.achievements.length} unlocked
                  </Badge>
                )}
              </h2>
              
              {user.achievements && user.achievements.length > 0 ? (
                <div className="grid md:grid-cols-4 gap-4">
                  {user.achievements.slice(-8).reverse().map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card className="border-2 border-wizard-gold-300 hover:border-wizard-gold-500 transition-all hover:shadow-xl">
                        <CardContent className="p-4 text-center">
                          <motion.div 
                            className="text-5xl mb-2"
                            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {achievement.icon}
                          </motion.div>
                          <h3 className="font-bold text-wizard-purple-800 text-sm mb-1">
                            {achievement.name}
                          </h3>
                          <p className="text-xs text-wizard-purple-600 mb-2">
                            {achievement.description}
                          </p>
                          <Badge variant="outline" className="text-xs border-wizard-gold-400 text-wizard-gold-700">
                            +{achievement.xpReward} XP
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="border-4 border-dashed border-wizard-purple-300">
                  <CardContent className="p-12 text-center">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Award className="w-20 h-20 text-wizard-purple-300 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-wizard-purple-700 mb-2">
                      Start Your Journey!
                    </h3>
                    <p className="text-wizard-purple-600">
                      Complete problems to unlock your first achievement! 🎯✨
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

        {/* Skills Overview */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-wizard-purple-800 mb-4">Your Skills</h2>
          <Card>
            <CardContent className="p-6">
              {user.skills && user.skills.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {user.skills.map((skill) => (
                    <div key={skill.skillId} className="flex items-center justify-between p-4 bg-wizard-parchment-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-wizard-purple-800">{skill.skillName}</h3>
                        <p className="text-xs text-wizard-purple-600">
                          {skill.practiceCount} practice{skill.practiceCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-wizard-purple-700">
                          {Math.round(skill.masteryLevel * 100)}%
                        </div>
                        <p className="text-xs text-wizard-purple-500">mastery</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-wizard-purple-600">
                    Start practicing to build your skills!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const learningPaths = [
  {
    title: 'Learn',
    description: 'Explore new math spells and magical concepts',
    href: '/learn',
    icon: BookOpen,
    gameIcon: '/icons/spellbook.svg',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    features: ['📚 Lessons', '✨ Examples', '🎯 Quizzes'],
    variant: 'default',
  },
  {
    title: 'Practice',
    description: 'Train your skills with adaptive challenges',
    href: '/practice',
    icon: Target,
    gameIcon: '/icons/crystal.svg',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    features: ['⚡ Adaptive', '💡 Hints', '📈 Progress'],
    variant: 'secondary',
  },
  {
    title: 'Homework',
    description: 'Ask your AI wizard tutor for guidance',
    href: '/homework',
    icon: MessageCircle,
    gameIcon: '/icons/potion.svg',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    features: ['💬 Chat', '🔮 Magic Help', '🧙 Guidance'],
    variant: 'outline',
  },
];

