-- Reset Robert's completed lessons (because he changed grades)
-- Run this in Supabase SQL Editor

UPDATE profiles
SET completed_lessons = '{}'::text[]
WHERE kid_id = 'robert';

-- Verify the reset
SELECT kid_id, display_name, grade_level, completed_lessons
FROM profiles
WHERE kid_id = 'robert';

