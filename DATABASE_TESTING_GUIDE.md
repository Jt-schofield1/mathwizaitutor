# 🧪 Database Testing Guide - Verify Supabase Integration

## 📋 **Quick Test (2 minutes)**

### **Option 1: Visual Test Page**

1. **Start your dev server:**
```bash
npm run dev
```

2. **Visit the test page:**
```
http://localhost:3000/test-db
```

3. **Check the results:**
   - ✅ Green = Working perfectly
   - ⚠️ Yellow = Not created yet (normal for new accounts)
   - ❌ Red = Problem needs fixing

### **Option 2: API Test**

Open in your browser:
```
http://localhost:3000/api/test-db
```

You'll see JSON with all test results.

---

## 🎯 **Complete Testing Checklist**

### **Test 1: Supabase Dashboard**

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Login to your project

2. **Check the `profiles` table:**
   - Click "Table Editor" in sidebar
   - Find the `profiles` table
   - You should see it exists (even if empty)

3. **Expected Result:**
   - ✅ Table exists with correct columns:
     - `kid_id` (text, primary key)
     - `display_name` (text)
     - `grade_level` (int)
     - `xp` (int)
     - `level` (int)
     - `achievements` (jsonb)
     - `skills` (jsonb)
     - `completed_problems` (text[])
     - `streak` (int)
     - `accuracy_rate` (float)
     - etc.

---

### **Test 2: Create Miles's Profile**

1. **Start the app:**
```bash
npm run dev
```

2. **Go to:** `http://localhost:3000`

3. **Click "Miles" (Purple Wizard 🔮)**

4. **Complete onboarding:**
   - Select a grade level
   - Take the 5-question quiz
   - Answer the questions

5. **Solve one practice problem:**
   - Go to Practice Mode
   - Solve a problem correctly

6. **Check Supabase Dashboard:**
   - Refresh the `profiles` table
   - You should see a row for `miles`
   - Data should include:
     ```
     kid_id: "miles"
     display_name: "Miles"
     grade_level: [whatever you selected]
     xp: [some number > 0]
     total_problems_completed: 1
     ```

---

### **Test 3: Create Robert's Profile**

1. **Log out:**
   - Click logout button (top right)

2. **Click "Robert" (Blue Wizard ⚡)**

3. **Complete onboarding:**
   - Select a grade level (can be different from Miles!)
   - Take the quiz

4. **Solve one practice problem**

5. **Check Supabase Dashboard:**
   - Refresh the `profiles` table
   - You should now see TWO rows:
     - `miles`
     - `robert`
   - Each with their own separate data

---

### **Test 4: Data Persistence**

1. **While logged in as Miles:**
   - Note his XP, level, problems solved

2. **Close the browser completely**

3. **Open browser again and go to app**

4. **Click "Miles"**

5. **Expected Result:**
   - ✅ All his data is still there!
   - ✅ Same XP, level, progress
   - ✅ No data lost

---

### **Test 5: Achievement Saving**

1. **Log in as Miles**

2. **Solve problems until you unlock an achievement:**
   - First problem = ✨ "First Spell Cast" (50 XP)
   - 10 problems = 🧙 "Apprentice Wizard" (100 XP)

3. **When achievement unlocks:**
   - Animation plays
   - XP is awarded

4. **Check Supabase Dashboard:**
   - Refresh `profiles` table
   - Click on Miles's row
   - Look at `achievements` column
   - Should see JSON like:
     ```json
     [
       {
         "id": "first_problem",
         "name": "First Spell Cast",
         "icon": "✨",
         "xpReward": 50,
         "unlockedAt": "2025-01-15T10:30:00Z"
       }
     ]
     ```

---

### **Test 6: Cross-Device Sync**

1. **On Computer:**
   - Log in as Miles
   - Solve 5 problems
   - Note: XP = X, Problems = 5

2. **On Tablet/Phone (same network):**
   - Go to: `http://[your-computer-ip]:3000`
   - Log in as Miles
   - Expected: Same XP (X), Same 5 problems!

3. **Solve 2 more problems on tablet**
   - Now: Problems = 7

4. **Go back to computer, refresh:**
   - Expected: Problems = 7 (synced!)

---

### **Test 7: Skills and Progress**

1. **Complete several problems in practice mode**

2. **Check Supabase Dashboard:**
   - Look at `skills` column
   - Should see JSON tracking skill mastery:
     ```json
     [
       {
         "skillId": "addition",
         "skillName": "Addition",
         "masteryLevel": 0.75,
         "practiceCount": 10,
         "lastPracticed": "2025-01-15T10:30:00Z"
       }
     ]
     ```

3. **Go to Dashboard in app:**
   - Check "Your Skills" section
   - Should show same mastery levels
   - Should show practice counts

---

## 🔍 **Troubleshooting**

### **Issue: "Table does not exist"**

**Solution:**
1. Check your Supabase dashboard
2. Make sure you ran the SQL setup:
   ```sql
   -- From SUPABASE_SETUP.md
   CREATE TABLE profiles (...)
   ```
3. Check table permissions (RLS policies)

### **Issue: "Not configured"**

**Solution:**
1. Check `.env.local` has:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
2. Restart dev server after adding env vars

### **Issue: "Unauthorized" or "Permission denied"**

**Solution:**
1. Check RLS (Row Level Security) policies in Supabase
2. Make sure you have:
   ```sql
   -- Enable read/write for everyone (development)
   CREATE POLICY "Allow all access" ON profiles
     FOR ALL USING (true);
   ```

### **Issue: Data not saving**

**Solution:**
1. Check browser console for errors
2. Check Network tab for failed API calls
3. Verify Supabase project is active (not paused)

### **Issue: Using localStorage instead**

**Solution:**
If Supabase isn't configured, the app falls back to localStorage:
- Data only on that device
- Won't sync across devices
- Will work but not ideal

To fix: Add Supabase credentials to `.env.local`

---

## 📊 **What Each Test Verifies**

| Test | What It Checks | Why Important |
|------|----------------|---------------|
| **Visual Test Page** | Overall connectivity | Quick sanity check |
| **Supabase Dashboard** | Table structure | Ensures database is set up |
| **Miles's Profile** | Profile creation | Verifies kid-specific storage |
| **Robert's Profile** | Multiple accounts | Ensures separation |
| **Data Persistence** | Survives refresh | Won't lose progress |
| **Achievement Saving** | Complex data (JSON) | Rich data structures work |
| **Cross-Device Sync** | Real-time sync | Works on all devices |
| **Skills Progress** | Nested JSON data | All features saving |

---

## 💡 **How to Verify Data is Correct**

### **In Supabase Dashboard:**

1. **Go to Table Editor**
2. **Click `profiles` table**
3. **You should see:**

```
kid_id  | display_name | grade_level | xp  | level | total_problems
--------|--------------|-------------|-----|-------|----------------
miles   | Miles        | 5           | 250 | 1     | 5
robert  | Robert       | 3           | 100 | 1     | 2
```

### **Achievements Column:**
Click on the `achievements` cell to expand:
```json
[
  {
    "id": "first_problem",
    "name": "First Spell Cast",
    "icon": "✨",
    "xpReward": 50,
    "unlockedAt": "2025-01-15T14:23:00.000Z"
  }
]
```

### **Skills Column:**
Click on the `skills` cell to expand:
```json
[
  {
    "skillId": "addition",
    "skillName": "Addition",
    "category": "addition",
    "masteryLevel": 0.8,
    "practiceCount": 15,
    "p_known": 0.8,
    "p_learn": 0.3,
    "p_guess": 0.25,
    "p_slip": 0.1,
    "lastPracticed": "2025-01-15T14:25:00.000Z"
  }
]
```

---

## ✅ **Success Criteria**

Your database is working correctly if:

- ✅ Test page shows all green checkmarks
- ✅ Both Miles and Robert have separate profiles in Supabase
- ✅ Data persists after closing browser
- ✅ Achievements show in Supabase `achievements` column
- ✅ Skills show in Supabase `skills` column
- ✅ XP and level update after solving problems
- ✅ Progress syncs across devices
- ✅ No errors in browser console

---

## 🎯 **Quick Daily Check**

Before letting the kids use the app:

1. Visit: `http://localhost:3000/test-db`
2. Check for green checkmarks
3. If all green → Ready to go! ✅
4. If any red → Check troubleshooting

---

## 📝 **Manual SQL Query (Advanced)**

If you want to check directly in Supabase:

1. Go to **SQL Editor** in Supabase
2. Run this query:

```sql
-- See all profiles
SELECT 
  kid_id,
  display_name,
  grade_level,
  xp,
  level,
  total_problems_completed,
  streak,
  accuracy_rate,
  created_at,
  last_login_at
FROM profiles
ORDER BY created_at DESC;
```

3. Run this for achievements:

```sql
-- See achievements
SELECT 
  kid_id,
  display_name,
  jsonb_array_length(achievements) as total_achievements,
  achievements
FROM profiles
WHERE achievements IS NOT NULL;
```

---

## 🚨 **Common Issues & Solutions**

### **Problem: "localStorage" in console logs**

**Meaning:** Using localStorage fallback (not Supabase)

**Solution:**
1. Add Supabase credentials to `.env.local`
2. Restart server
3. Refresh page

### **Problem: Achievements not saving**

**Check:**
1. `/api/achievements/check` endpoint works
2. Supabase has `achievements` column (type: jsonb)
3. Browser console for errors

### **Problem: Different data on different devices**

**Check:**
1. Both devices using same Supabase project
2. Not using localhost on both (use IP address)
3. Both logged in as same kid

---

## 🎉 **You're Ready When:**

- ✅ Test page shows all green
- ✅ Miles and Robert both have profiles
- ✅ Data visible in Supabase dashboard
- ✅ Achievements unlocking and saving
- ✅ Skills updating as they practice
- ✅ XP and level increasing
- ✅ No errors in console

**Then your database is working perfectly! 🎓✨**

---

## 📞 **Need Help?**

Check these in order:
1. Run test page: `/test-db`
2. Check Supabase dashboard
3. Look at browser console (F12)
4. Check Network tab for failed requests
5. Verify `.env.local` has correct credentials

