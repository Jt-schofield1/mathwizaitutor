-- Reset Miles' achievements for testing
-- Run this in Supabase SQL Editor to clear Miles' achievements

UPDATE profiles
SET achievements = '[]'::jsonb
WHERE kid_id = 'miles';

-- Verify the reset
SELECT kid_id, display_name, achievements
FROM profiles
WHERE kid_id = 'miles';

