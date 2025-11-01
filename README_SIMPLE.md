# 🧙‍♂️ MathWiz Academy - For Your 4 Kids!

## ✨ What You Have

A **fully functional, 100% FREE** math tutoring app perfect for your 4 kids!

### Features:
- ✅ 4 kid profiles (customizable)
- ✅ Works on iPad, computer, phone
- ✅ Syncs across all devices (with Supabase)
- ✅ XP, levels, achievements
- ✅ Adaptive math problems
- ✅ AI tutor chat
- ✅ Progress tracking
- ✅ Wizard-themed animations

---

## 🚀 How to Start (RIGHT NOW)

### Step 1: Start the App

```bash
cd "C:\tutor app\mathwiz-academy"
npm run dev
```

### Step 2: Open in Browser

Go to: **http://localhost:3000**

### Step 3: Pick a Kid & Start Learning!

🎉 **That's it!** Works immediately with local storage.

---

## 📱 Use on iPad (Recommended: Add Supabase)

### Option A: Local Network Only (No Setup)
1. Run `npm run dev` on computer
2. Find IP: `ipconfig` → Look for "IPv4 Address" (like `192.168.1.100`)
3. On iPad: Open Safari → Go to `http://YOUR_IP:3000`
4. **Note**: Each device has separate data

### Option B: Cloud Sync (10 min setup) ⭐ RECOMMENDED
**Follow**: `SUPABASE_SETUP.md`

**Benefits**:
- ✅ Data syncs across ALL devices
- ✅ Kids can use any iPad/computer
- ✅ Progress saved in cloud
- ✅ Still 100% FREE!

**Time**: 10 minutes
**Cost**: $0/month
**Difficulty**: Easy (step-by-step guide)

---

## 🎨 Customize Kid Names

### Edit: `lib/kid-auth.ts`

Find this (around line 8):
```typescript
export const KIDS = [
  {
    id: 'kid1',
    name: 'Kid 1',     // ← CHANGE THIS
    avatar: '🧙‍♂️',   // ← AND THIS
    color: 'purple',
  },
  {
    id: 'kid2',
    name: 'Kid 2',
    avatar: '🧙‍♀️',
    color: 'blue',
  },
  {
    id: 'kid3',
    name: 'Kid 3',
    avatar: '⭐',
    color: 'gold',
  },
  {
    id: 'kid4',
    name: 'Kid 4',
    avatar: '✨',
    color: 'pink',
  },
];
```

### Change to Real Names:
```typescript
export const KIDS = [
  {
    id: 'kid1',
    name: 'Emma',      // Real name!
    avatar: '🦄',      // Fun emoji!
    color: 'purple',
  },
  {
    id: 'kid2',
    name: 'Noah',
    avatar: '🦁',
    color: 'blue',
  },
  {
    id: 'kid3',
    name: 'Olivia',
    avatar: '🐉',
    color: 'gold',
  },
  {
    id: 'kid4',
    name: 'Liam',
    avatar: '🦊',
    color: 'pink',
  },
];
```

**Save** and restart `npm run dev`

---

## 💰 Costs

### Everything Included (FREE):
- ✅ App (open source)
- ✅ Local hosting (your computer)
- ✅ Smart AI responses (keyword-based, no API)
- ✅ All features

### Optional Add-ons (Also FREE):
- ✅ Supabase (cloud sync for iPads) - **FREE tier: perfect for 4 kids**
- ✅ Groq API (real AI chat) - **FREE tier: 14,400 requests/day**

**Total: $0/month** 🎉

---

## 📚 Documentation Files

### Quick Start:
- **`START_HERE.md`** ← Read this first!

### Setup Guides:
- **`SUPABASE_SETUP.md`** ← iPad sync (recommended!)
- **`SIMPLE_SETUP.md`** ← Local-only setup
- **`MOBILE_GUIDE.md`** ← iPad/mobile details

### Full Docs:
- **`README.md`** ← Complete documentation
- **`FINAL_SETUP.md`** ← All features explained
- **`DEPLOYMENT.md`** ← Deploy to production (optional)

---

## 🎯 Recommended Path

### Today (5 minutes):
1. ✅ Run `npm run dev`
2. ✅ Open http://localhost:3000
3. ✅ Test with all 4 kids
4. ✅ Customize names in `lib/kid-auth.ts`

### This Week (10 minutes):
5. ✅ Follow `SUPABASE_SETUP.md`
6. ✅ Test on iPad
7. ✅ Add to iPad home screen
8. 🎉 **Done! Your kids can learn from any device!**

---

## ❓ Common Questions

### Q: Do I need to pay for anything?
**A**: No! Everything is 100% FREE. Supabase free tier is perfect for 4 kids.

### Q: Will data sync between devices?
**A**: 
- **Without Supabase**: No, each device separate
- **With Supabase**: Yes! Data syncs everywhere

### Q: Can kids use iPad?
**A**: Yes! Works great on iPad. Add Supabase for cloud sync.

### Q: Is it safe for kids?
**A**: Yes! No external links, kid-friendly content, progress tracking for parents.

### Q: Can I add more kids?
**A**: Yes! Edit `lib/kid-auth.ts` and add more to the KIDS array.

### Q: What if I clear browser data?
**A**: 
- **Without Supabase**: Progress lost
- **With Supabase**: Progress safe in cloud!

### Q: Can multiple kids play at once?
**A**: One kid at a time per device. But with Supabase, each kid can use different devices simultaneously!

---

## 🆘 Troubleshooting

### App Won't Start:
```bash
cd "C:\tutor app\mathwiz-academy"
npm install
npm run dev
```

### Can't Access from iPad:
- Check: Same WiFi network
- Check: Firewall not blocking port 3000
- Try: Restart dev server

### Data Not Saving:
- Without Supabase: Normal, use Supabase for persistence
- With Supabase: Check `.env.local` has correct keys

---

## 🎉 You're Ready!

### To run NOW:
```bash
cd "C:\tutor app\mathwiz-academy"
npm run dev
```

### To add iPad sync:
Read: `SUPABASE_SETUP.md` (10 min)

### To customize:
Edit: `lib/kid-auth.ts` (kid names)

---

**That's everything! Your kids have a professional math tutoring app! 🧙‍♂️✨**

**Questions? Check the other README files or just try it out!**

