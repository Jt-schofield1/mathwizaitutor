-- Add correct_answers column if it doesn't exist
-- This column is needed to properly calculate accuracy rate

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'profiles' AND column_name = 'correct_answers'
    ) THEN
        ALTER TABLE profiles ADD COLUMN correct_answers INT4 DEFAULT 0;
        RAISE NOTICE 'Added correct_answers column';
    ELSE
        RAISE NOTICE 'correct_answers column already exists';
    END IF;
END $$;

-- Update existing profiles to set correct_answers = 0 where it's null
UPDATE profiles
SET correct_answers = 0
WHERE correct_answers IS NULL;

RAISE NOTICE 'Updated null correct_answers to 0';

