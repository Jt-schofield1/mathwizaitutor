# 🎯 START HERE - MathWiz Academy Setup

## 🚀 Quick Start (Choose Your Path)

### Option 1: Just Test Locally (1 Minute)
**Perfect for**: Testing the app on one computer

```bash
cd "C:\tutor app\mathwiz-academy"
npm run dev
```

Open: http://localhost:3000

✅ **No setup needed!** Data saves in browser only.

---

### Option 2: iPad + Multi-Device Sync (10 Minutes) ⭐ RECOMMENDED
**Perfect for**: Your 4 kids using iPads and computers

**Follow**: `SUPABASE_SETUP.md`

**What you get**:
- ✅ Works on all devices (iPad, computer, phone)
- ✅ Data syncs across devices
- ✅ 100% FREE forever
- ✅ Professional setup

**Time**: 10 minutes total
**Cost**: $0/month

---

## 📱 iPad Access

### Without Supabase (Local Only):
1. Run `npm run dev` on your computer
2. Find your IP: `ipconfig`
3. On iPad: Go to `http://YOUR_IP:3000`
4. Each device has separate data

### With Supabase (Synced): ⭐
1. Follow `SUPABASE_SETUP.md` (10 min setup)
2. Run `npm run dev` on your computer
3. On iPad: Go to `http://YOUR_IP:3000`
4. **Data syncs across all devices!** 🎉

---

## 🎨 Customize Kid Names

Edit: `lib/kid-auth.ts`

Find (line ~8):
```typescript
export const KIDS = [
  {
    id: 'kid1',
    name: 'Kid 1',     // ← Change to real name
    avatar: '🧙‍♂️',   // ← Change emoji
    color: 'purple',
  },
  // ... more kids
];
```

Save and restart `npm run dev`

---

## 📂 Key Files

### Setup Guides:
- **`SUPABASE_SETUP.md`** - iPad sync setup (recommended!)
- **`SIMPLE_SETUP.md`** - Local-only setup
- **`FINAL_SETUP.md`** - All features explained
- **`MOBILE_GUIDE.md`** - iPad optimization details

### Configuration:
- **`lib/kid-auth.ts`** - Kid profiles and names
- **`lib/supabase.ts`** - Database connection
- **`.env.local`** - API keys (create this for Supabase)

### Documentation:
- **`README.md`** - Full project documentation
- **`DEPLOYMENT.md`** - Deploy to production

---

## 🎯 Recommended Setup Flow

### Step 1: Test Locally (Now!)
```bash
npm run dev
```
Open http://localhost:3000 and try it out!

### Step 2: Customize Names (5 min)
Edit `lib/kid-auth.ts` with real kid names

### Step 3: Set Up Supabase (10 min)
Follow `SUPABASE_SETUP.md` for iPad sync

### Step 4: Test on iPad
Use from any device with synced data!

---

## ✨ What's Included

### Core Features:
- ✅ Kid selection (4 profiles)
- ✅ Onboarding with placement quiz
- ✅ Dashboard with progress
- ✅ Learn mode (interactive lessons)
- ✅ Practice mode (adaptive problems)
- ✅ Homework help (AI tutor chat)
- ✅ XP, levels, achievements
- ✅ Skill mastery tracking

### Free Features:
- ✅ Smart keyword-based AI (no API cost!)
- ✅ Offline support
- ✅ Mobile/iPad optimized
- ✅ Wizard-themed animations
- ✅ Progress tracking

### Optional (FREE):
- ✅ Supabase sync (recommended for iPads)
- ✅ Groq AI (real AI chat - optional)
- ✅ Vercel deployment (optional)

---

## 💰 Costs

### Running Locally:
**$0/month** - Everything works for free!

### With Supabase (Recommended):
**$0/month** - Free tier perfect for 4 kids!

### With Groq AI (Optional):
**$0/month** - Free tier: 14,400 requests/day!

**Total: $0/month** 🎉

---

## 🆘 Need Help?

### Can't start the app?
```bash
cd "C:\tutor app\mathwiz-academy"
npm install
npm run dev
```

### Want iPad sync?
Read: `SUPABASE_SETUP.md`

### Want to customize?
Edit: `lib/kid-auth.ts` (kid names)
Edit: `lib/seed-data.ts` (problems)

### Want real AI chat?
Add Groq API key (see `FINAL_SETUP.md`)

---

## 🎉 You're Ready!

1. **Run**: `npm run dev`
2. **Open**: http://localhost:3000
3. **Pick a kid**
4. **Start learning!**

For iPad sync, follow `SUPABASE_SETUP.md` next! 📱

---

**Happy learning, young wizards! 🧙‍♂️✨**

