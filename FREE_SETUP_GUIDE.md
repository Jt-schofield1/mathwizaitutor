# 💯 100% FREE Setup Guide - MathWiz Academy

## ✅ What's FREE (and will stay free)

| Service | Free Tier | Limits | Cost if Exceeded |
|---------|-----------|--------|------------------|
| **Next.js** | ✅ FREE | Unlimited | $0 (open source) |
| **Vercel Hosting** | ✅ FREE | 100GB bandwidth/month | $20/month if you exceed |
| **Firebase Auth** | ✅ FREE | 50,000 users | Still free! |
| **Firebase Firestore** | ✅ FREE | 50K reads, 20K writes/day | ~$1-5/month if exceeded |
| **Claude API** | ⚠️ PAID | $5 free credit, then pay-as-you-go | ~$0.01-0.10 per chat |

### 💰 Estimated Costs for Real Usage

- **Development (Testing)**: **$0** (use mock mode)
- **Small Usage** (10-50 users): **$0-5/month**
- **Medium Usage** (100-500 users): **$5-30/month** (mostly Claude API)

---

## 🎯 Step-by-Step FREE Setup (5 Minutes)

### ✅ STEP 1: Create the Environment File

1. **Open File Explorer**
2. **Navigate to**: `C:\tutor app\mathwiz-academy`
3. **Right-click** in the folder → **New** → **Text Document**
4. **Name it**: `.env.local` (delete the `.txt` extension)
5. **Open it** in Notepad
6. **Copy and paste this EXACTLY**:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=demo_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mathwiz-demo
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=demo_app_id

ANTHROPIC_API_KEY=demo_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

7. **Save and close**

> ⚠️ **IMPORTANT**: The file must be named `.env.local` exactly (not `.env.local.txt`)

---

### ✅ STEP 2: Start the App (100% FREE Mode)

1. **Open PowerShell** or Command Prompt
2. **Type**:
```bash
cd "C:\tutor app\mathwiz-academy"
```
3. **Press Enter**
4. **Type**:
```bash
npm run dev
```
5. **Press Enter**
6. **Wait** for "Ready" message (30-60 seconds)
7. **Open your browser** to: http://localhost:3000

🎉 **The app is running!**

---

### ✅ STEP 3: Test Everything (Still FREE)

**What Works in FREE Mode:**
- ✅ Sign up (data stored in browser only)
- ✅ Login
- ✅ Complete onboarding
- ✅ View dashboard
- ✅ All animations and UI
- ✅ Practice problems (with mock validation)
- ✅ Learn mode (with mock AI responses)
- ✅ Homework chat (with mock AI responses)

**What Doesn't Work:**
- ❌ Data persistence (refreshing page loses data)
- ❌ Real AI conversations
- ❌ Cross-device sync

**This is perfect for:**
- Testing the app
- Showing to others
- Development
- Screenshots/demos

---

## 🚀 Want Real Features? (Still Mostly FREE)

### Option A: Add Firebase (FREE - Recommended!)

**Why**: Save user data, profiles, progress
**Cost**: $0/month for up to 1000 users
**Time**: 10 minutes

#### Steps:

1. **Go to**: https://console.firebase.google.com
2. **Click**: "Add project"
3. **Name it**: "mathwiz-academy"
4. **Disable** Google Analytics (optional)
5. **Click**: "Create project"
6. **Wait** for setup (1-2 minutes)

#### Enable Authentication:

7. **Click**: "Authentication" in left sidebar
8. **Click**: "Get started"
9. **Click**: "Email/Password"
10. **Enable** the first toggle (Email/Password)
11. **Click**: "Save"

#### Create Database:

12. **Click**: "Firestore Database" in left sidebar
13. **Click**: "Create database"
14. **Choose**: "Start in test mode"
15. **Select**: Your nearest location
16. **Click**: "Enable"

#### Get Configuration:

17. **Click**: ⚙️ Settings icon (top left)
18. **Click**: "Project settings"
19. **Scroll down** to "Your apps"
20. **Click**: Web icon (`</>`)
21. **Name**: "MathWiz Web"
22. **Click**: "Register app"
23. **Copy** the config values

#### Update Your `.env.local`:

Replace the `demo_key` values with your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your_actual_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mathwiz-academy.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mathwiz-academy
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mathwiz-academy.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Keep this as demo for now (see Option B below)
ANTHROPIC_API_KEY=demo_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### Restart the App:

1. **Stop** the server (Ctrl+C in terminal)
2. **Start** again: `npm run dev`

🎉 **Now you have real user accounts and data persistence - still FREE!**

---

### Option B: Add Real AI (PAID - Optional)

**Why**: Real Claude AI conversations
**Cost**: ~$0.01-0.10 per conversation
**Time**: 5 minutes

#### Steps:

1. **Go to**: https://console.anthropic.com
2. **Sign up** for free account
3. **Get $5 free credit** (lasts for testing!)
4. **Go to**: API Keys section
5. **Click**: "Create Key"
6. **Copy** the key (starts with `sk-ant-`)

#### Update `.env.local`:

```env
# Keep all Firebase settings...

# Replace this line:
ANTHROPIC_API_KEY=sk-ant-your_actual_key_here

# Keep the rest...
```

#### Restart App:

```bash
# Stop: Ctrl+C
npm run dev
```

🎉 **Now you have real AI tutoring!**

**Monitoring Costs:**
- Check usage at: https://console.anthropic.com/settings/usage
- Each chat message costs ~$0.01-0.05
- $5 credit = ~100-500 conversations

---

## 🌐 Deploy for FREE on Vercel

### Steps:

1. **Create GitHub account** (if you don't have one): https://github.com/signup
2. **Go to GitHub**: https://github.com/new
3. **Create repository**:
   - Name: `mathwiz-academy`
   - Privacy: Private
   - Don't initialize with anything
4. **In PowerShell**:

```bash
cd "C:\tutor app\mathwiz-academy"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mathwiz-academy.git
git push -u origin main
```

5. **Go to**: https://vercel.com/signup
6. **Sign up** with GitHub (FREE account)
7. **Click**: "Add New..." → "Project"
8. **Import** your GitHub repository
9. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add each variable from your `.env.local`
   - Click "Add" after each one
10. **Click**: "Deploy"

⏱️ Wait 2-3 minutes...

🎉 **Your app is LIVE on the internet for FREE!**

Vercel will give you a URL like: `https://mathwiz-academy-abc123.vercel.app`

---

## 💡 Cost Summary

### Running Locally (Development)
- **Cost**: $0
- **Perfect for**: Testing, development, demos

### With Firebase Only
- **Cost**: $0/month (up to 1000 users)
- **Perfect for**: Personal use, small school, portfolio
- **Includes**: Real accounts, data persistence, progress tracking

### With Firebase + Claude AI
- **Cost**: $0-30/month depending on usage
- **Perfect for**: Production use, real tutoring
- **Includes**: Everything + real AI conversations

### Firebase Limits (Free Tier)
- **50,000 reads/day** = ~1,500 users/day can log in
- **20,000 writes/day** = ~600 users/day can save progress
- **50,000 users total** = More than enough!

**When you might exceed free tier:**
- 100+ active users daily
- Heavy database usage
- Solution: Costs only ~$1-5/month if exceeded

---

## ❓ FAQ

### Q: Will I be charged without warning?
**A**: No! Firebase free tier is very generous. Vercel is completely free for hobby projects. Claude requires you to add payment info, but you get $5 free credit.

### Q: Can I run this completely free forever?
**A**: Yes! Use Firebase free tier (plenty for small-medium usage) and keep Claude in "demo_key" mode for mock responses.

### Q: What happens if I exceed Firebase limits?
**A**: Firebase automatically upgrades to "Blaze" plan (pay-as-you-go), but you'll only pay for what you use. First ~$1 is free monthly, then pennies per 1000 operations.

### Q: Can I set spending limits?
**A**: 
- Firebase: Yes, in Firebase Console → Project Settings → Usage and billing
- Claude: Set usage limits in Anthropic Console
- Vercel: Free tier can't be exceeded (just stops working)

### Q: How can I monitor costs?
**A**:
- **Firebase**: Console → Usage tab
- **Claude**: console.anthropic.com/settings/usage
- **Vercel**: Dashboard shows bandwidth usage

---

## 🎯 Recommended Setup

**For Testing/Development:**
```
✅ Local setup with demo_key (100% FREE)
Time: 5 minutes
Cost: $0
```

**For Small School/Personal Use:**
```
✅ Local or Vercel hosting (FREE)
✅ Firebase Authentication + Firestore (FREE)
✅ Claude in demo mode (FREE)
Time: 15 minutes
Cost: $0/month
```

**For Production/Real Users:**
```
✅ Vercel hosting (FREE)
✅ Firebase Authentication + Firestore (FREE)
✅ Claude API with real key (PAID)
Time: 20 minutes
Cost: $5-30/month depending on usage
```

---

## 🚨 Important Notes

1. **Never commit `.env.local`** - It's in `.gitignore` already
2. **Never share API keys** - They're secrets
3. **Monitor usage** - Check Firebase and Claude dashboards weekly
4. **Start with demo mode** - Test everything before adding real APIs

---

## 📞 Need Help?

1. Check `QUICK_START.md` for basic setup
2. Check `DEPLOYMENT.md` for detailed deployment
3. Check `MOBILE_GUIDE.md` for mobile testing

---

## ✅ Your Action Plan (5 Minutes)

1. ✅ **Create `.env.local`** (with demo_key values) - 2 min
2. ✅ **Run `npm run dev`** - 1 min
3. ✅ **Test on http://localhost:3000** - 2 min

**DONE! You're running 100% FREE!** 🎉

Later (optional):
- Add Firebase (still FREE) - 10 min
- Add Claude API ($5 credit, then ~$10-30/month) - 5 min
- Deploy to Vercel (FREE) - 10 min

---

**Bottom line: You can run and deploy this app 100% FREE with generous limits!** 💯

