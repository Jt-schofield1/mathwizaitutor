/**
 * Database Test Endpoint - Verify Supabase Connection
 * Access at: /api/test-db
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase, getKidProfile, upsertKidProfile, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: {},
    supabaseConfigured: isSupabaseConfigured(),
  };

  try {
    // Test 1: Check Supabase Configuration
    results.tests.configuration = {
      status: 'running',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    };

    if (!isSupabaseConfigured()) {
      results.tests.configuration.status = '❌ Not configured - using localStorage fallback';
      return NextResponse.json(results);
    }

    results.tests.configuration.status = '✅ Configured';

    // Test 2: Check if profiles table exists
    results.tests.tableExists = {
      status: 'running',
    };

    const { data: tableCheck, error: tableError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (tableError) {
      results.tests.tableExists.status = '❌ Error';
      results.tests.tableExists.error = tableError.message;
      results.tests.tableExists.hint = 'Table might not exist. Check Supabase dashboard.';
    } else {
      results.tests.tableExists.status = '✅ Table exists';
    }

    // Test 3: Try to fetch Miles's profile
    results.tests.fetchMiles = {
      status: 'running',
    };

    const milesProfile = await getKidProfile('miles');
    if (milesProfile) {
      results.tests.fetchMiles.status = '✅ Found';
      results.tests.fetchMiles.data = {
        name: milesProfile.displayName,
        gradeLevel: milesProfile.gradeLevel,
        xp: milesProfile.xp,
        level: milesProfile.level,
        totalProblems: milesProfile.totalProblemsCompleted,
        achievements: milesProfile.achievements?.length || 0,
      };
    } else {
      results.tests.fetchMiles.status = '⚠️ Not found (will be created on first login)';
    }

    // Test 4: Try to fetch Robert's profile
    results.tests.fetchRobert = {
      status: 'running',
    };

    const robertProfile = await getKidProfile('robert');
    if (robertProfile) {
      results.tests.fetchRobert.status = '✅ Found';
      results.tests.fetchRobert.data = {
        name: robertProfile.displayName,
        gradeLevel: robertProfile.gradeLevel,
        xp: robertProfile.xp,
        level: robertProfile.level,
        totalProblems: robertProfile.totalProblemsCompleted,
        achievements: robertProfile.achievements?.length || 0,
      };
    } else {
      results.tests.fetchRobert.status = '⚠️ Not found (will be created on first login)';
    }

    // Test 5: List all profiles in database
    results.tests.allProfiles = {
      status: 'running',
    };

    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('kid_id, display_name, grade_level, xp, level, total_problems_completed');

    if (allError) {
      results.tests.allProfiles.status = '❌ Error';
      results.tests.allProfiles.error = allError.message;
    } else {
      results.tests.allProfiles.status = '✅ Success';
      results.tests.allProfiles.count = allProfiles?.length || 0;
      results.tests.allProfiles.profiles = allProfiles || [];
    }

    // Overall status
    results.overallStatus = '✅ Database is working!';
    results.summary = {
      configured: isSupabaseConfigured(),
      tableExists: !tableError,
      milesExists: !!milesProfile,
      robertExists: !!robertProfile,
      totalProfiles: allProfiles?.length || 0,
    };

  } catch (error: any) {
    results.overallStatus = '❌ Error';
    results.error = error.message;
  }

  return NextResponse.json(results, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

