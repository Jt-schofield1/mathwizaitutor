# 🔧 Fixing Supabase Profile Errors

## ❌ Error: "Error upserting profile"

This error occurs when the Supabase database table is missing required columns.

---

## ✅ **Quick Fix (5 minutes)**

### **Step 1: Go to Supabase Dashboard**
1. Open: https://supabase.com/dashboard
2. Select your project: `cmfthcofiiciusteypwq`
3. Click **"SQL Editor"** in the left sidebar

### **Step 2: Run the Fix SQL**
1. Click **"New Query"**
2. Copy and paste this SQL:

```sql
-- Add missing onboarding_completed column
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Verify it was added
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'profiles' 
AND column_name = 'onboarding_completed';
```

3. Click **"Run"** (or press `Ctrl+Enter`)
4. You should see: `onboarding_completed | boolean`

### **Step 3: Restart Your Dev Server**
```bash
# Press Ctrl+C in your terminal to stop the server
# Then restart:
npm run dev
```

### **Step 4: Test**
1. Go to `http://localhost:3000`
2. Click "Miles"
3. Complete onboarding
4. **Close browser** completely
5. **Open browser** again
6. Click "Miles"
7. ✅ Should go straight to dashboard (no onboarding!)

---

## 🔍 **Check What Columns You Have**

Run this SQL in Supabase to see all columns:

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;
```

**You should have:**
- `kid_id` (text) - primary key
- `display_name` (text)
- `grade_level` (integer)
- `xp` (integer)
- `level` (integer)
- `streak` (integer)
- `total_problems_completed` (integer)
- `accuracy_rate` (real/float)
- `skills` (jsonb)
- `achievements` (jsonb)
- `completed_lessons` (jsonb)
- `completed_problems` (text array)
- **`onboarding_completed` (boolean)** ← This one is often missing!
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `last_login_at` (timestamp)

---

## 🆘 **If It Still Doesn't Work**

### **Option A: Use LocalStorage Only (No Sync)**

The app will work with localStorage only (data stays on one device):

1. Set empty Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

2. Restart server
3. App will use localStorage (works but doesn't sync across devices)

### **Option B: Recreate the Table**

**⚠️ WARNING: This deletes all existing data!**

```sql
-- Drop existing table
DROP TABLE IF EXISTS profiles;

-- Create new table with all columns
CREATE TABLE profiles (
  kid_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  grade_level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  completed_lessons JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  achievements JSONB DEFAULT '[]',
  total_problems_completed INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  accuracy_rate REAL DEFAULT 0.0,
  completed_problems TEXT[] DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow all access (for development)
CREATE POLICY "Allow all access" ON profiles
  FOR ALL USING (true);
```

---

## 📊 **Test Database Connection**

Visit: `http://localhost:3000/test-db`

**Should show:**
- ✅ Supabase URL: ✅ Set
- ✅ Supabase Key: ✅ Set
- ✅ Configuration: ✅ Configured
- ✅ Table exists: ✅ Table exists

If any show ❌, check your `.env.local` file.

---

## 💡 **Understanding the Error**

The error happens because:

1. App tries to save `onboarding_completed: true` to database
2. Database doesn't have that column
3. Postgres returns error: "column does not exist"
4. App can't save profile
5. User has to redo onboarding every time

**The fix:** Add the missing column(s) to the database.

---

## ✅ **After Fixing**

You should be able to:
- ✅ Complete onboarding once
- ✅ Close browser
- ✅ Reopen and see dashboard (skip onboarding)
- ✅ All XP, achievements, and progress saved
- ✅ Works across devices (if using same Supabase)

---

## 🚨 **Still Getting Errors?**

Check the browser console (F12) for detailed error messages. Look for:
- `Error code: 42703` → Missing column
- `Error code: 42P01` → Table doesn't exist
- `Error code: 42501` → Permission issue (check RLS policies)

Then run the appropriate fix from above!

