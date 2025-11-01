# 🧙‍♂️ MathWiz Academy

**An AI-powered, wizard-themed math tutoring app for elementary school kids (K-12)**

Transform math homework into a magical adventure! MathWiz Academy combines adaptive learning, gamification, and AI assistance to make mathematics engaging and fun for children.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

### 🎓 **Adaptive Learning**
- **K-12 Curriculum**: Dynamic content from Kindergarten through 12th grade, including Calculus & Statistics
- **Personalized Difficulty**: Problems adapt to student's grade level and skill
- **Progress Tracking**: Real-time stats, XP, levels, and achievement system
- **Comprehensive Topics**: Addition, multiplication, fractions, algebra, geometry, trigonometry, calculus, and more

### 🤖 **AI-Powered Tutoring**
- **Groq AI Integration**: Free, fast LLM for conversational help
- **Smart Hints**: Grade-specific, progressive hints that guide without giving away answers
- **Step-by-Step Solutions**: AI explains concepts in age-appropriate language
- **Answer Validation**: Personalized feedback on student responses

### 📸 **Homework Helper**
- **OCR Text Extraction**: Upload photos of homework problems
- **Equation Recognition**: Reconstructs complex math equations from images
- **Voice Input**: Speech-to-text for hands-free problem entry
- **Chat Memory**: Conversational AI remembers context within sessions

### 🎮 **Gamification**
- **26 Achievements**: Unlock trophies for milestones (practice streaks, skill mastery, etc.)
- **XP & Levels**: Earn experience points for solving problems
- **Wizard Themes**: Customizable kid profiles with unique avatars and colors
- **Progress Dashboard**: Visual stats, recent achievements, and next goals

### 📚 **Learning Modes**
1. **Learn Mode**: Interactive lessons with step-by-step tutorials
2. **Practice Mode**: Adaptive problem sets with instant feedback
3. **Homework Helper**: AI tutor for real homework questions

### 🔒 **Kid-Friendly & Safe**
- **No Signup Required**: Simple kid authentication (perfect for families)
- **Offline-First**: Works with localStorage, syncs to Supabase when available
- **Multiple Profiles**: Each child has their own progress and achievements
- **Mobile & iPad Optimized**: Responsive design, touch-friendly UI

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier)
- Groq API key (free tier)
- OCR.space API key (free tier - optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mathwiz-academy.git
cd mathwiz-academy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run database setup (Supabase)
# See SUPABASE_SETUP.md for SQL scripts

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app!

---

## 🔧 Environment Variables

Create a `.env.local` file with these variables:

```env
# Supabase (Database & Authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq AI (Free LLM for tutoring)
GROQ_API_KEY=your_groq_api_key

# OCR.space (Optional - for homework photo scanning)
OCR_SPACE_API_KEY=your_ocr_space_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Getting API Keys

1. **Supabase** (Database): https://supabase.com
   - Create a new project
   - Copy URL and anon key from Settings → API

2. **Groq** (AI Tutoring): https://console.groq.com
   - Sign up for free account
   - Generate API key
   - Free tier: Fast inference, generous limits

3. **OCR.space** (Optional - Photo scanning): https://ocr.space/OCRAPI
   - Free tier: 25,000 requests/month
   - Get API key instantly

---

## 📊 Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **Framer Motion** for animations

### Backend
- **Next.js API Routes** (serverless functions)
- **Supabase** (PostgreSQL database)
- **Groq AI** (LLM for tutoring)
- **OCR.space** (image text extraction)

### State Management
- **Zustand** for global state
- **React Context** for auth

### AI & Machine Learning
- **Groq LLM** (llama-3.1-8b-instant)
- **Dynamic Problem Generation** (OATutor-inspired)
- **Adaptive Difficulty** algorithm

---

## 🗂️ Project Structure

```
mathwiz-academy/
├── app/
│   ├── api/              # API routes (AI, OCR, problems)
│   ├── auth/             # Kid selection & login
│   ├── dashboard/        # Main dashboard
│   ├── learn/            # Interactive lessons
│   ├── practice/         # Adaptive practice mode
│   ├── homework/         # AI homework helper
│   └── onboarding/       # Grade placement quiz
├── components/
│   ├── ui/               # Shadcn/UI components
│   └── wizard/           # Custom wizard-themed components
├── lib/
│   ├── kid-auth.ts       # Kid authentication
│   ├── supabase.ts       # Database client
│   ├── curriculum-data.ts # K-12 math curriculum
│   ├── problem-generator.ts # Dynamic problem generation
│   └── achievements.ts   # Achievement system
├── public/
│   ├── avatars/          # Wizard SVG avatars
│   └── icons/            # App icons
└── types/                # TypeScript type definitions
```

---

## 📱 Features by Page

### 🏠 Dashboard
- XP, level, and streak stats
- Recent achievements grid
- Quick access to all modes
- Progress visualization

### 📖 Learn Mode
- Sequential, unlockable lessons
- 4-step lesson format (intro, concept, examples, practice)
- Grade-specific content
- Completion tracking

### 🎯 Practice Mode
- Adaptive problem difficulty
- AI-powered hints (3 levels)
- Answer validation with feedback
- XP rewards & achievements

### 💬 Homework Helper
- Upload homework photos (OCR)
- Type or speak questions
- Conversational AI tutor
- LaTeX math rendering
- Chat memory within session

---

## 🎨 Customization

### Adding New Kids
Edit `lib/kid-auth.ts`:

```typescript
export const KIDS = [
  {
    id: 'miles',
    name: 'Miles',
    avatar: '/avatars/wizard1.svg',
    color: 'green',
    emoji: '🔮',
  },
  // Add more kids here
];
```

### Adding New Achievements
Edit `lib/achievements.ts`:

```typescript
export const ACHIEVEMENTS = [
  {
    id: 'your_achievement',
    name: 'Achievement Name',
    description: 'How to unlock it',
    icon: '🏆',
    xpReward: 100,
    checkUnlock: (profile) => {
      // Your unlock logic
      return profile.totalProblemsCompleted >= 10;
    }
  },
];
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mathwiz-academy)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy to apply changes

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  kid_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  grade_level INTEGER NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  completed_lessons JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  achievements TEXT[] DEFAULT '{}',
  total_problems_completed INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  accuracy_rate REAL DEFAULT 0,
  completed_problems TEXT[] DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy (adjust for your needs)
CREATE POLICY "Allow all operations" ON profiles
  FOR ALL USING (true);
```

See `SUPABASE_SETUP.md` for complete setup instructions.

---

## 🎓 Curriculum Coverage

| Grade | Topics |
|-------|--------|
| K | Counting, shapes, basic addition |
| 1-2 | Addition, subtraction, place value, time, money |
| 3-5 | Multiplication, division, fractions, decimals, area/perimeter |
| 6-8 | Ratios, percentages, integers, algebra, functions, geometry |
| 9-10 | Polynomials, quadratics, trigonometry, proofs |
| 11 | Pre-calculus, advanced trig, sequences, statistics |
| 12 | **Calculus** (limits, derivatives, integrals), advanced statistics |

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Groq** for providing fast, free LLM inference
- **Supabase** for backend infrastructure
- **OCR.space** for text extraction API
- **Shadcn/UI** for beautiful components
- **OATutor** for adaptive tutoring inspiration
- **Common Core Standards** for curriculum guidance

---

## 📧 Support

For questions or issues:
- Open an [issue](https://github.com/yourusername/mathwiz-academy/issues)
- Email: your@email.com

---

## 🎯 Roadmap

- [ ] Parent dashboard for progress monitoring
- [ ] More achievement types (time-based, skill-specific)
- [ ] Multiplayer math challenges
- [ ] Word problem generator
- [ ] Voice AI tutor (text-to-speech responses)
- [ ] Print worksheet generator
- [ ] Spanish language support
- [ ] Teacher accounts & classroom management

---

**Made with ✨ magic and 💜 for young learners**

Transform math homework from a chore into an adventure! 🧙‍♂️📚✨
