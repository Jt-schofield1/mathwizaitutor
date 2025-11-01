# 🚀 Quick Testing Reference

## **The Fastest Way to Test Database** ⚡

### **Step 1: Open Test Page**
```
http://localhost:3000/test-db
```
**Look for:**
- ✅ All green checkmarks = Perfect!
- ⚠️ Yellow warnings = Normal (kids haven't logged in yet)
- ❌ Red errors = Need to fix

---

## **Step 2: Test Miles**

1. Go to `http://localhost:3000`
2. Click **Miles** (🔮 Purple Wizard)
3. Complete onboarding (pick grade, take quiz)
4. Go to **Practice Mode**
5. Solve **1 problem correctly**
6. **Achievement should unlock!** ✨

---

## **Step 3: Check Supabase**

1. Go to: https://supabase.com/dashboard
2. Click **Table Editor** → **profiles**
3. **You should see:**
   - A row for `miles`
   - His XP, level, grade
   - Click `achievements` → see JSON data

---

## **Step 4: Test Robert**

1. **Log out** (click button top-right)
2. Click **Robert** (⚡ Blue Wizard)
3. Complete onboarding
4. Solve 1 problem
5. **Check Supabase again:**
   - Now see TWO rows: `miles` and `robert`
   - Each with their own data

---

## **Step 5: Test Persistence**

1. **Close browser completely**
2. **Open browser again**
3. Go to `http://localhost:3000`
4. Click **Miles**
5. **His progress should still be there!** ✅

---

## **What Data Should Save:**

| Data | Where to Check |
|------|----------------|
| **XP & Level** | Dashboard, Supabase `xp` + `level` columns |
| **Grade Level** | Dashboard, Supabase `grade_level` column |
| **Problems Solved** | Dashboard, Supabase `total_problems_completed` |
| **Achievements** | Dashboard grid, Supabase `achievements` (JSON) |
| **Skills** | Dashboard "Your Skills", Supabase `skills` (JSON) |
| **Streak** | Dashboard, Supabase `streak` column |
| **Accuracy** | Dashboard, Supabase `accuracy_rate` column |

---

## **Quick Checks:**

### ✅ **Database Working?**
- Visit `/test-db`
- All green = Yes!

### ✅ **Data Saving?**
- Solve problem
- Refresh Supabase
- New data there = Yes!

### ✅ **Achievements Working?**
- Solve 1st problem
- Animation plays
- Check Supabase `achievements` = Yes!

### ✅ **Separate Accounts?**
- Miles's data ≠ Robert's data
- Two rows in Supabase = Yes!

---

## **URLs to Bookmark:**

| Page | URL | Purpose |
|------|-----|---------|
| **App** | `http://localhost:3000` | Main app |
| **Test DB** | `http://localhost:3000/test-db` | Visual test |
| **API Test** | `http://localhost:3000/api/test-db` | JSON test results |
| **Supabase** | `https://supabase.com/dashboard` | View raw data |

---

## **Troubleshooting:**

### **❌ "Table does not exist"**
→ Go to Supabase, run the SQL from `SUPABASE_SETUP.md`

### **❌ "Not configured"**
→ Check `.env.local` has Supabase credentials

### **⚠️ "Not found (will be created)"**
→ Normal! Just log in as that kid once

### **❌ Data not saving**
→ Check browser console (F12) for errors

---

## **Daily Pre-Use Check:**

Before kids start:
1. Visit: `/test-db`
2. Look for ✅ green checkmarks
3. If red errors → investigate
4. Otherwise → Ready! 🎉

---

## **Success = All These True:**

- [x] Test page shows green ✅
- [x] Miles has profile in Supabase
- [x] Robert has profile in Supabase
- [x] Achievements showing in JSON
- [x] Progress persists after closing browser
- [x] No console errors
- [x] XP increases when solving problems

**Then you're GOOD TO GO!** 🧙‍♂️✨

