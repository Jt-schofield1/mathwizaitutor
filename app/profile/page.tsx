/**
 * Profile Page - User Settings & Progress
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpellBookProgress } from '@/components/wizard/spell-book-progress';
import { useAuthStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { User, Trophy, Target, Flame, Star, Award, Settings, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getGradeDisplay, getAchievementBadge } from '@/lib/utils';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-wizard-purple-800 text-white px-6 py-4 shadow-lg">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <p className="text-wizard-purple-200 text-sm">View your progress and achievements</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-wizard-purple-700">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-wizard-purple-500 to-wizard-gold-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-wizard-purple-800 mb-2">
                  {user.displayName}
                </h2>
                <p className="text-wizard-purple-600 mb-4">{user.email}</p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                  <Badge variant="gold" className="text-base px-4 py-2">
                    Level {user.level} Wizard
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2">
                    {getGradeDisplay(user.gradeLevel)}
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2">
                    {user.streak} Day Streak 🔥
                  </Badge>
                </div>

                <SpellBookProgress xp={user.xp} level={user.level} showDetails />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Star}
            label="Total XP"
            value={user.xp.toLocaleString()}
            color="gold"
          />
          <StatCard
            icon={Target}
            label="Problems Solved"
            value={user.totalProblemsCompleted}
            color="green"
          />
          <StatCard
            icon={Trophy}
            label="Achievements"
            value={user.achievements?.length || 0}
            color="purple"
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value={`${user.streak} days`}
            color="orange"
          />
        </div>

        {/* Achievements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-wizard-gold-500" />
              Achievements
            </CardTitle>
            <CardDescription>
              Unlock achievements by completing challenges and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.achievements && user.achievements.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {user.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 bg-wizard-parchment-100 border-2 border-wizard-gold-400 rounded-lg text-center"
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-wizard-purple-800 text-sm mb-1">
                      {achievement.name}
                    </h3>
                    <p className="text-xs text-wizard-purple-600 mb-2">
                      {achievement.description}
                    </p>
                    <Badge variant="gold" className="text-xs">
                      +{achievement.xpReward} XP
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-wizard-purple-300 mx-auto mb-4" />
                <p className="text-wizard-purple-600">
                  No achievements yet. Keep learning to unlock them!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills Mastery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-wizard-purple-600" />
              Skill Mastery
            </CardTitle>
            <CardDescription>
              Track your progress across different math topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.skills && user.skills.length > 0 ? (
              <div className="space-y-4">
                {user.skills.map((skill) => (
                  <div key={skill.skillId} className="p-4 bg-wizard-parchment-50 rounded-lg border-2 border-wizard-parchment-300">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-wizard-purple-800">{skill.skillName}</h3>
                        <p className="text-sm text-wizard-purple-600">
                          Practiced {skill.practiceCount} times
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-wizard-purple-700">
                          {Math.round(skill.masteryLevel * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="h-3 bg-wizard-purple-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.masteryLevel * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-wizard-purple-500 to-wizard-gold-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-wizard-purple-300 mx-auto mb-4" />
                <p className="text-wizard-purple-600">
                  Start practicing to build your skills!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: 'gold' | 'green' | 'purple' | 'orange' 
}) {
  const colorClasses = {
    gold: 'bg-wizard-gold-100 text-wizard-gold-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-wizard-purple-100 text-wizard-purple-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-3xl font-bold text-wizard-purple-800 mb-1">{value}</div>
        <p className="text-sm text-wizard-purple-600">{label}</p>
      </CardContent>
    </Card>
  );
}

