/**
 * Achievement Check API - Checks and unlocks new achievements
 * Saves to Supabase database
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkAchievements } from '@/lib/achievements';
import { upsertKidProfile, getKidProfile } from '@/lib/supabase';
import type { Achievement, UserProfile } from '@/types';

function dedupeAchievements<T extends { id?: string | number }>(achievements?: T[] | null): T[] {
  if (!achievements) {
    return [];
  }
  const seen = new Set<string | number>();
  return achievements.filter((achievement) => {
    if (!achievement?.id) {
      return false;
    }
    if (seen.has(achievement.id)) {
      return false;
    }
    seen.add(achievement.id);
    return true;
  });
}

export async function POST(request: NextRequest) {
  try {
    const { userId, userProfile } = await request.json();

    if (!userId || !userProfile) {
      return NextResponse.json(
        { error: 'User ID and profile are required' },
        { status: 400 }
      );
    }

      console.log('Achievement Check API - userId:', userId);
      console.log('Achievement Check API - current achievements:', userProfile.achievements?.map((a: any) => a.id));

      // Load the existing profile (if available) to avoid trusting client-provided achievements blindly
      const existingProfile = await getKidProfile(userId);
      const persistedAchievements = dedupeAchievements(existingProfile?.achievements);
      const clientAchievements = dedupeAchievements(userProfile.achievements);
      const baselineAchievements = persistedAchievements.length > 0 ? persistedAchievements : clientAchievements;

      const profileForCheck: UserProfile = {
        ...userProfile,
        achievements: baselineAchievements,
      };

      // Check for newly unlocked achievements
      const newAchievements = checkAchievements(profileForCheck).filter(
        (achievement) => !baselineAchievements.some(existing => existing.id === achievement.id)
      );

    console.log('Achievement Check API - new achievements found:', newAchievements.map(a => a.id));

    if (newAchievements.length === 0) {
      return NextResponse.json({
        success: true,
        newAchievements: [],
        totalXP: 0,
      });
    }

    // Calculate total XP from new achievements
    const totalXP = newAchievements.reduce((sum, a) => sum + a.xpReward, 0);

      // Update user profile with new achievements and XP
      const updatedAchievements = dedupeAchievements([
        ...baselineAchievements,
        ...newAchievements,
      ]);

      const reportedXp = Number(userProfile.xp) || 0;
      const persistedXp = Number(existingProfile?.xp) || 0;
      const baseXp = Math.max(reportedXp, persistedXp);
      const finalXp = baseXp + totalXP;

      const updatedProfile: UserProfile = {
        ...userProfile,
        achievements: updatedAchievements,
        xp: finalXp,
        level: Math.floor(finalXp / 600) + 1,
      };

    console.log('Achievement Check API - saving to Supabase...');
    console.log('Achievement Check API - updated achievements:', updatedProfile.achievements.map((a: any) => a.id));

    // Save to Supabase and get the fresh profile back
    let savedProfile = null;
    try {
      savedProfile = await upsertKidProfile(userId, updatedProfile);
      if (!savedProfile) {
        console.error('Achievement Check API - Failed to save to Supabase (null returned)');
      } else {
        console.log('Achievement Check API - Successfully saved to Supabase');
        console.log('Achievement Check API - saved achievements:', savedProfile.achievements?.map((a: any) => a.id));
      }
    } catch (error) {
      console.error('Achievement Check API - Supabase save error:', error);
    }

    // Return the freshly saved profile (or the calculated one if save failed)
    const profileToReturn = savedProfile || updatedProfile;

    return NextResponse.json({
      success: true,
      newAchievements,
      totalXP,
      updatedProfile: profileToReturn,
    });

  } catch (error: any) {
    console.error('Achievement Check API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check achievements' },
      { status: 500 }
    );
  }
}

