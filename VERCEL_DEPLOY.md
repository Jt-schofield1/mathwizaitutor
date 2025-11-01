# 🚀 Deploy MathWiz Academy to Vercel

## ✅ Step 1: Code is on GitHub! ✅
Your code is already pushed to: https://github.com/Jt-schofield1/mathwizaitutor.git

---

## 🔐 Step 2: Login to Vercel

Run this command in your terminal:

```bash
cd "C:\tutor app\mathwiz-academy"
npx vercel login
```

This will:
1. Open your browser
2. Ask you to login to Vercel (use GitHub)
3. Authorize the CLI

---

## 🚀 Step 3: Deploy to Vercel

After logging in, run:

```bash
cd "C:\tutor app\mathwiz-academy"
npx vercel --prod
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name?** mathwiz-academy (or press Enter)
- **Directory?** ./ (press Enter)
- **Override settings?** No (press Enter)

---

## 🔑 Step 4: Add Environment Variables

After deployment, you need to add your environment variables:

### Option A: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/dashboard
2. Click on your project: **mathwiz-academy**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://cmfthcofiiciusteypwq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZnRoY29maWljaXVzdGV5cHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODQ4NDQsImV4cCI6MjA3NzU2MDg0NH0.lmwQ6c0lKOQFobV2gDpWweuzYeLg6x0UUNPi-5VxU1Q

GROQ_API_KEY = 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

OCR_SPACE_API_KEY = K81328261688957

NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
NODE_ENV = production
```

5. Click **Save**
6. Go to **Deployments** tab
7. Click **...** on latest deployment → **Redeploy**

### Option B: Via Command Line

```bash
cd "C:\tutor app\mathwiz-academy"

# Add environment variables
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://cmfthcofiiciusteypwq.supabase.co

npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

npx vercel env add GROQ_API_KEY production
# Paste: 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

npx vercel env add OCR_SPACE_API_KEY production
# Paste: K81328261688957

# Redeploy with new environment variables
npx vercel --prod
```

---

## ✅ Step 5: Verify Deployment

Your app will be live at: `https://mathwiz-academy.vercel.app` (or similar)

Test these features:
- ✅ Login page loads
- ✅ Miles and Robert profiles appear
- ✅ Can complete onboarding
- ✅ Practice mode generates problems
- ✅ AI homework helper works
- ✅ Photo upload works (OCR)
- ✅ Voice input works (speech-to-text)

---

## 📊 Monitor Your Deployment

- **Dashboard**: https://vercel.com/dashboard
- **Analytics**: See usage and performance
- **Logs**: Check for errors in real-time
- **Domains**: Add custom domain (optional)

---

## 🔄 Future Updates

To deploy updates:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Deploy to Vercel
npx vercel --prod
```

Or let Vercel auto-deploy:
1. Go to Project Settings → Git
2. Enable "Production Branch: main"
3. Now every push to GitHub auto-deploys!

---

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs
- Make sure all environment variables are set
- Try: `npm run build` locally first

### Environment Variables Not Working
- Make sure to **Redeploy** after adding them
- Check variable names match exactly
- Production variables are separate from preview/development

### API Errors
- Verify API keys are correct
- Check API rate limits (Groq, OCR.space)
- Review function logs in Vercel dashboard

---

## 🎉 You're Live!

Your AI math tutor is now accessible worldwide! 🌍✨

Share the link with Miles and Robert to start learning! 🧙‍♂️📚

---

## Quick Commands Reference

```bash
# Login
npx vercel login

# Deploy to production
npx vercel --prod

# Check deployment status
npx vercel ls

# View logs
npx vercel logs

# Add environment variable
npx vercel env add VARIABLE_NAME production

# List environment variables
npx vercel env ls
```

