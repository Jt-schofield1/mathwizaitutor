-- Fix completed_lessons column type in Supabase
-- This script changes the column from text[] to jsonb to properly store lesson objects

-- IMPORTANT: Run this in your Supabase SQL Editor!
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

-- Step 1: Drop the old column (if you want to keep existing data, see alternative below)
ALTER TABLE profiles DROP COLUMN IF EXISTS completed_lessons;

-- Step 2: Add the new column as JSONB
ALTER TABLE profiles ADD COLUMN completed_lessons JSONB DEFAULT '[]'::jsonb;

-- Step 3: Add a comment for documentation
COMMENT ON COLUMN profiles.completed_lessons IS 'Array of completed lesson objects with lessonId, completedAt, score, and timeSpent';

-- ========================================
-- ALTERNATIVE: If you want to preserve existing data (more complex)
-- ========================================
-- 
-- -- Step 1: Create a new temporary column
-- ALTER TABLE profiles ADD COLUMN completed_lessons_new JSONB DEFAULT '[]'::jsonb;
-- 
-- -- Step 2: Migrate any existing data (if salvageable)
-- -- This is complex because the data is corrupted as character arrays
-- -- You may need to manually fix or just start fresh
-- 
-- -- Step 3: Drop old column
-- ALTER TABLE profiles DROP COLUMN completed_lessons;
-- 
-- -- Step 4: Rename new column
-- ALTER TABLE profiles RENAME COLUMN completed_lessons_new TO completed_lessons;

-- Verify the change
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'completed_lessons';

-- You should see:
-- completed_lessons | jsonb | YES

