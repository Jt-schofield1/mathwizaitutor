-- Fix for missing onboarding_completed column
-- Run this in Supabase SQL Editor if you get "column does not exist" errors

-- Add onboarding_completed column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'onboarding_completed'
    ) THEN
        ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
        RAISE NOTICE 'Added onboarding_completed column';
    ELSE
        RAISE NOTICE 'onboarding_completed column already exists';
    END IF;
END $$;

-- Make sure all other required columns exist
DO $$ 
BEGIN
    -- Check and add completed_problems if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'completed_problems'
    ) THEN
        ALTER TABLE profiles ADD COLUMN completed_problems TEXT[] DEFAULT '{}';
        RAISE NOTICE 'Added completed_problems column';
    END IF;
    
    -- Check and add completed_lessons if missing  
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'completed_lessons'
    ) THEN
        ALTER TABLE profiles ADD COLUMN completed_lessons JSONB DEFAULT '[]';
        RAISE NOTICE 'Added completed_lessons column';
    END IF;
END $$;

-- Verify all columns exist
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

