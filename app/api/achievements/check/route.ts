/**
 * Achievement Check API - Checks and unlocks new achievements
 * Saves to Supabase database
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkAchievements } from '@/lib/achievements';
import { upsertKidProfile, getKidProfile } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, userProfile } = await request.json();

    if (!userId || !userProfile) {
      return NextResponse.json(
        { error: 'User ID and profile are required' },
        { status: 400 }
      );
    }

    // Check for newly unlocked achievements
    const newAchievements = checkAchievements(userProfile);

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
    const updatedAchievements = [
      ...(userProfile.achievements || []),
      ...newAchievements,
    ];

    const updatedProfile = {
      ...userProfile,
      achievements: updatedAchievements,
      xp: userProfile.xp + totalXP,
      level: Math.floor((userProfile.xp + totalXP) / 1000) + 1,
    };

    // Save to Supabase
    try {
      await upsertKidProfile(userId, updatedProfile);
    } catch (error) {
      console.error('Failed to save achievements to Supabase:', error);
      // Continue anyway - we'll return the achievements
    }

    return NextResponse.json({
      success: true,
      newAchievements,
      totalXP,
      updatedProfile,
    });

  } catch (error: any) {
    console.error('Achievement Check API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check achievements' },
      { status: 500 }
    );
  }
}

