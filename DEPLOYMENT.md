# 🚀 MathWiz Academy - Deployment Guide

This guide will walk you through deploying MathWiz Academy to Vercel with Firebase integration.

## Prerequisites

- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- [Vercel account](https://vercel.com/signup) (free)
- [Firebase account](https://firebase.google.com/) (free tier available)
- [Anthropic API key](https://console.anthropic.com/) for Claude integration

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project (e.g., "mathwiz-academy")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Save changes

### 1.3 Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode**
4. Select a location (e.g., `us-central`)
5. Click "Enable"

### 1.4 Configure Firestore Security Rules

In Firestore **Rules** tab, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Sessions - authenticated users can access
    match /sessions/{sessionId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Problems - read-only for authenticated users
    match /problems/{problemId} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only
    }
    
    // Lessons - read-only for authenticated users
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only
    }
    
    // Conversations - users can access their own conversations
    match /conversations/{conversationId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### 1.5 Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click **Web** icon (`</>`)
4. Register app name (e.g., "MathWiz Web")
5. Copy the Firebase configuration object

You'll need these values:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

## Step 2: Get Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click "Create Key"
5. Name it "MathWiz Academy"
6. Copy the API key (starts with `sk-ant-`)

⚠️ **Important**: Never commit this key to version control!

## Step 3: Local Development Setup

### 3.1 Clone and Install

```bash
cd "C:\tutor app\mathwiz-academy"
npm install
```

### 3.2 Configure Environment Variables

Create `.env.local` file in the project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Claude API
ANTHROPIC_API_KEY=sk-ant-your_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3.3 Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and test:
- Sign up for an account
- Complete onboarding
- Try each learning mode
- Verify Firebase data is being saved

## Step 4: Deploy to Vercel

### 4.1 Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### 4.2 Deploy via Git (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   cd "C:\tutor app\mathwiz-academy"
   git init
   git add .
   git commit -m "Initial commit: MathWiz Academy"
   ```

2. **Create GitHub repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., "mathwiz-academy")
   - Don't initialize with README, .gitignore, or license
   - Copy the repository URL

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/mathwiz-academy.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

### 4.3 Configure Environment Variables in Vercel

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add each variable from `.env.local`:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API key | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Your auth domain | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Your project ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Your storage bucket | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your app ID | Production, Preview, Development |
| `ANTHROPIC_API_KEY` | Your Claude API key | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL | Production |
| `NODE_ENV` | `production` | Production |

3. Click "Save"

### 4.4 Deploy

Click **Deploy** button. Vercel will:
- Install dependencies
- Build the Next.js app
- Deploy to CDN
- Provide a live URL

⏱️ Deployment typically takes 2-5 minutes.

## Step 5: Configure Firebase for Production

### 5.1 Add Vercel Domain to Firebase

1. In Firebase Console, go to **Authentication** → **Settings**
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Add your Vercel domain (e.g., `mathwiz-academy.vercel.app`)
5. Save

### 5.2 Update CORS Settings (if needed)

If you encounter CORS issues:

1. In Firebase Console, go to **Storage** → **Rules**
2. Ensure CORS is configured for your domain

## Step 6: Verify Deployment

### 6.1 Test Core Functionality

Visit your Vercel URL and test:

✅ Landing page loads correctly
✅ Sign up creates new user in Firebase
✅ Login works with credentials
✅ Onboarding flow completes
✅ Dashboard displays user data
✅ Learn mode shows lessons
✅ Practice mode fetches problems
✅ Homework help AI chat responds
✅ XP and achievements update
✅ Profile shows correct stats

### 6.2 Check Firebase Data

In Firebase Console:
- **Authentication**: Verify new users appear
- **Firestore**: Check `users` collection has data
- **Usage**: Monitor read/write counts

### 6.3 Monitor Logs

In Vercel Dashboard:
- **Deployments**: Check build logs
- **Functions**: Monitor API route calls
- **Analytics**: Track usage (if enabled)

## Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. In Vercel project, go to **Settings** → **Domains**
2. Click "Add"
3. Enter your domain (e.g., `mathwizacademy.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning

### 7.2 Update Firebase

Add custom domain to Firebase authorized domains (Step 5.1)

### 7.3 Update Environment Variables

Update `NEXT_PUBLIC_APP_URL` in Vercel to your custom domain.

## Troubleshooting

### Build Errors

**Error**: `Module not found: Can't resolve '@/...'`
- **Fix**: Ensure `tsconfig.json` has correct paths configuration

**Error**: `Firebase configuration error`
- **Fix**: Verify all Firebase env vars are set in Vercel

### Runtime Errors

**Error**: `Firebase auth not authorized`
- **Fix**: Add Vercel domain to Firebase authorized domains

**Error**: `Claude API 401 Unauthorized`
- **Fix**: Verify `ANTHROPIC_API_KEY` is correct in Vercel

**Error**: `Firestore permission denied`
- **Fix**: Check Firestore security rules match deployed version

### Performance Issues

**Slow API responses**:
- Check Vercel function logs for errors
- Verify Firebase Blaze plan for production

**Firebase quota exceeded**:
- Upgrade to Firebase Blaze plan (pay-as-you-go)
- Optimize Firestore queries
- Implement caching

## Maintenance

### Regular Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Test locally
npm run dev

# Deploy
git push origin main
```

### Monitoring

- **Vercel**: Check deployment status, function logs
- **Firebase**: Monitor usage, authentication, Firestore
- **Anthropic**: Track API usage and costs

### Backups

- **Firestore**: Enable automatic backups in Firebase Console
- **Code**: Keep Git repository up to date

## Security Checklist

✅ All API keys stored as environment variables
✅ Firebase security rules properly configured
✅ HTTPS enabled (automatic with Vercel)
✅ Authentication required for all app routes
✅ User data protected by auth rules
✅ No API keys in client-side code
✅ `.env.local` added to `.gitignore`

## Cost Estimates

### Free Tier Limits
- **Vercel**: 100 GB bandwidth, unlimited deployments
- **Firebase**: 50K reads, 20K writes per day
- **Anthropic**: $5 free credit (then pay-as-you-go)

### Expected Costs (100 active users)
- **Vercel**: Free (within limits)
- **Firebase**: ~$0-5/month
- **Anthropic**: ~$10-30/month (depends on usage)

## Support

Need help? Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Anthropic Documentation](https://docs.anthropic.com/)

---

🎉 **Congratulations!** MathWiz Academy is now live!

