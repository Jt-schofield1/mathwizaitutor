# 🚀 Supabase Setup - FREE iPad Sync!

## Why Supabase?

- ✅ **100% FREE** for small projects (way more generous than Firebase!)
- ✅ **Super easy** to set up (5 minutes)
- ✅ **Works across devices** (iPad, computer, phone)
- ✅ **Automatic sync** - data updates everywhere
- ✅ **No credit card** required

### Free Tier Limits:
- **500MB database** (plenty for your kids)
- **Unlimited API requests**
- **50,000 monthly active users** (you have 4!)
- **1GB file storage**

**Perfect for family use!** 👨‍👩‍👧‍👦

---

## 📝 Step-by-Step Setup (5 Minutes)

### Step 1: Create Supabase Account

1. **Go to**: https://supabase.com
2. **Click**: "Start your project"
3. **Sign in with GitHub** (or email)
4. **Create account** - No credit card needed!

### Step 2: Create Project

1. **Click**: "New Project"
2. **Organization**: Create new organization (e.g., "Family")
3. **Project name**: "mathwiz-academy"
4. **Database password**: Create a strong password (save it!)
5. **Region**: Choose closest to you
6. **Click**: "Create new project"
7. **Wait**: 1-2 minutes for setup

### Step 3: Create Database Table

1. **Click**: "Table Editor" (left sidebar)
2. **Click**: "Create a new table"
3. **Table name**: `profiles`
4. **Add these columns**:

| Column Name | Type | Default | Extra |
|-------------|------|---------|-------|
| `id` | int8 | AUTO | Primary Key |
| `kid_id` | text | - | Unique |
| `uid` | text | - | - |
| `email` | text | - | - |
| `displayName` | text | - | - |
| `photoURL` | text | - | - |
| `gradeLevel` | int4 | 0 | - (0=K, 1=1st, 2=2nd... 12=12th) |
| `xp` | int4 | 0 | - |
| `level` | int4 | 1 | - |
| `streak` | int4 | 0 | - |
| `totalProblemsCompleted` | int4 | 0 | - |
| `accuracyRate` | float4 | 0 | - |
| `achievements` | jsonb | [] | - |
| `skills` | jsonb | [] | - |
| `preferences` | jsonb | {} | - |
| `onboardingCompleted` | bool | false | - |
| `created_at` | timestamptz | now() | - |
| `updated_at` | timestamptz | now() | - |

5. **Click**: "Save"

### Step 4: Set RLS Policies (Security)

1. **Stay in Table Editor**
2. **Click** the `profiles` table
3. **Click**: "RLS" tab
4. **Disable** RLS for now (we can enable it later)
   - Or enable and add policy: "Enable read access for all users"

### Step 5: Get Your API Keys

1. **Click**: Settings icon (⚙️) in sidebar
2. **Click**: "API"
3. **Copy these two values**:
   - **Project URL** (looks like: `https://abcdefg.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

## 🔧 Configure Your App

### Create `.env.local` File

In `C:\tutor app\mathwiz-academy\`, create (or edit) `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your_long_key_here

# App Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Replace** `YOUR_PROJECT` and the anon key with your actual values!

---

## ✅ Test It Works

### Step 1: Restart Your App

```bash
# Stop the server (Ctrl+C if running)
# Start again:
npm run dev
```

### Step 2: Test on Computer

1. Open: http://localhost:3000
2. Select a kid
3. Complete onboarding
4. Check Supabase:
   - Go to Supabase → Table Editor
   - See the data appear! ✨

### Step 3: Test on iPad

1. **Find your computer's IP**:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (like `192.168.1.100`)

2. **On iPad**:
   - Connect to **same WiFi**
   - Open Safari
   - Go to: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

3. **Test sync**:
   - Log in as a kid on iPad
   - Earn some XP
   - Check on computer - **data should be the same!** 🎉

---

## 📱 Add to iPad Home Screen

Make it feel like a real app!

1. **On iPad**, open the app in Safari
2. Tap **Share** button (square with arrow)
3. Scroll and tap **"Add to Home Screen"**
4. **Name it**: "MathWiz"
5. Tap **Add**

Now your kids have a home screen icon! 📲

---

## 🔄 How Sync Works

### Smart Hybrid System:

1. **Reads**: Tries Supabase first, falls back to localStorage
2. **Writes**: Saves to both localStorage AND Supabase
3. **Offline**: Works offline, syncs when online
4. **Fast**: Uses localStorage cache for instant loading

### What This Means:

- ✅ Works even if Supabase is down
- ✅ Super fast (cached locally)
- ✅ Syncs across all devices
- ✅ No data loss

---

## 🎯 Usage Scenarios

### Scenario 1: One iPad at Home
- Each kid picks their profile
- All data syncs to cloud
- Progress saved forever
- Switch between kids anytime

### Scenario 2: Multiple iPads
- Same app on 2+ iPads
- Kids can use any iPad
- Pick their profile
- Data syncs across devices!

### Scenario 3: Computer + iPad
- Do homework on computer
- Practice on iPad
- Progress follows them!

---

## 💡 Tips & Tricks

### Backup Your Database
1. **Supabase Dashboard** → Project Settings
2. **Database** → Backups
3. **Enable** daily backups (free!)

### Monitor Usage
1. **Supabase Dashboard** → Project Settings
2. **Usage** tab
3. See database size, requests, etc.

### Reset a Kid's Progress
1. **Supabase Dashboard** → Table Editor
2. **profiles** table
3. Find the kid's row
4. **Delete** or edit values

### Add More Kids
1. Edit: `lib/kid-auth.ts`
2. Add to KIDS array:
```typescript
{
  id: 'kid5',
  name: 'Kid 5',
  avatar: '🦁',
  color: 'orange',
}
```

---

## 🐛 Troubleshooting

### Data Not Syncing
**Check**:
- `.env.local` has correct Supabase URL and key
- Restart the dev server
- Check Supabase dashboard - is table created?
- Check browser console for errors (F12)

### Can't Connect from iPad
**Check**:
- Both devices on same WiFi
- Firewall not blocking port 3000
- Using correct IP address
- App is running on computer (`npm run dev`)

### Profile Not Loading
**Check**:
- Table `profiles` exists in Supabase
- RLS policies are disabled or allow access
- Browser console for errors

---

## 🔐 Security Notes

### For Home Use (Current Setup):
- ✅ Safe for family
- ✅ No passwords needed
- ✅ RLS disabled for simplicity

### For Public/School Use:
- Enable RLS (Row Level Security)
- Add authentication
- Set up proper policies

**For just 4 kids at home, current setup is fine!** 👍

---

## 💰 Costs

### Current Usage (4 Kids):
- **Supabase**: $0/month (way under free limits)
- **Hosting**: $0 (running locally)
- **Total**: **$0/month** 🎉

### If You Deploy to Vercel:
- **Vercel**: $0/month (free hobby plan)
- **Supabase**: Still $0/month
- **Total**: Still **$0/month** 🎉

---

## 🚀 Next Steps

1. ✅ Set up Supabase (5 min)
2. ✅ Configure `.env.local`
3. ✅ Test on computer
4. ✅ Test on iPad
5. ✅ Add to iPad home screen
6. ✅ Customize kid names/avatars
7. 🎉 **Let them learn!**

---

## 📞 Support Links

- **Supabase Docs**: https://supabase.com/docs
- **Dashboard**: https://app.supabase.com
- **Community**: https://supabase.com/community

---

**You're all set! Your kids can now use any device! 📱💻🎉**

