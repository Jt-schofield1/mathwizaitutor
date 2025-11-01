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

    console.log('Achievement Check API - userId:', userId);
    console.log('Achievement Check API - current achievements:', userProfile.achievements?.map((a: any) => a.id));

    // Check for newly unlocked achievements
    const newAchievements = checkAchievements(userProfile);

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

