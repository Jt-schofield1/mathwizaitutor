# 🎮 MathWiz Academy - Game Assets & UI

## 🧙 Custom Wizard Characters

All wizard avatars are custom-designed SVG characters created specifically for this project!

### Kid Avatars (`/public/avatars/`)

- **`wizard1.svg`** - Purple Wizard 🔮
  - Purple hat with gold stars
  - Friendly, magical appearance
  - Perfect for Kid 1

- **`wizard2.svg`** - Blue Wizard ⚡
  - Blue hat with gold moons
  - Happy and energetic
  - Perfect for Kid 2

- **`wizard3.svg`** - Pink Wizard 💖
  - Pink hat with gold hearts
  - Cheerful and warm
  - Perfect for Kid 3

- **`wizard4.svg`** - Green Wizard 🌟
  - Green hat with gold lightning bolts
  - Adventurous and fun
  - Perfect for Kid 4

## ✨ Game Icons (`/public/icons/`)

### Magic Items

- **`potion.svg`** - Magic Potion 🧪
  - Purple bubbling potion bottle
  - Used for: Homework/Help section
  - Represents: Magical assistance

- **`spellbook.svg`** - Spell Book 📚
  - Purple tome with gold accents
  - Used for: Learn section
  - Represents: Knowledge and lessons

- **`treasure.svg`** - Treasure Chest 💰
  - Brown chest with gold gems
  - Used for: Rewards and achievements
  - Represents: XP and prizes

- **`wand.svg`** - Magic Wand ✨
  - Wooden wand with golden star
  - Used for: Actions and choices
  - Represents: Magic and power

- **`crystal.svg`** - Magic Crystal 💎
  - Purple glowing crystal
  - Used for: Practice section
  - Represents: Skills and mastery

- **`star-badge.svg`** - Star Badge ⭐
  - Golden star achievement badge
  - Used for: Achievements and milestones
  - Represents: Success and rewards

## 🎨 Game-Like UI Features

### 1. **Animated Character Selection**
- Wizard avatars with floating emojis
- Hover effects with rotation
- Selection sparkles and stars
- Smooth transitions

### 2. **Magic Background**
Component: `components/wizard/magic-background.tsx`
- Floating sparkles throughout the app
- Rotating stars in background
- Subtle, non-distracting animations
- Creates immersive magical atmosphere

### 3. **Game-Style Dashboard**
- Character portrait in header
- XP and Level display (like RPG games)
- Quest cards with floating icons
- Adventure-themed language ("Choose Your Adventure")
- Animated "Start Quest" buttons

### 4. **Interactive Elements**
- Cards that scale on hover
- Buttons with sparkle icons
- Gradient backgrounds
- Drop shadows for depth
- Border effects for selection states

### 5. **Kid-Friendly Design**
- Large, colorful wizard characters
- Emoji integration for quick recognition
- Big, tappable buttons (mobile-friendly)
- Clear visual feedback
- Playful animations

## 🎯 Usage Examples

### Using Wizard Avatars
```tsx
<Image
  src="/avatars/wizard1.svg"
  alt="Purple Wizard"
  width={96}
  height={96}
/>
```

### Using Game Icons
```tsx
<Image
  src="/icons/spellbook.svg"
  alt="Spell Book"
  width={80}
  height={80}
  className="drop-shadow-xl"
/>
```

### Adding Magic Background
```tsx
import { MagicBackground } from '@/components/wizard/magic-background';

// In your page
<MagicBackground />
```

## 🌟 Color Palette

### Wizard Theme Colors
- **Purple**: `#7C3AED` - Primary wizard color
- **Gold**: `#FCD34D` - Accents and stars
- **Parchment**: `#FEF3C7` - Background tones
- **Blue**: `#3B82F6` - Secondary accent
- **Pink**: `#EC4899` - Warm accent
- **Green**: `#10B981` - Success color

### Gradient Examples
```css
/* Purple to Gold */
background: linear-gradient(135deg, #8B5CF6 0%, #FCD34D 100%);

/* Purple Header */
background: linear-gradient(to right, #6D28D9, #7C3AED, #6D28D9);
```

## 📱 Mobile Optimizations

- All icons are SVG (scalable)
- Tap targets are 44px minimum
- Characters display well on small screens
- Animations are GPU-accelerated
- Touch-friendly hover states

## ✅ Best Practices

1. **Always use Image component** from Next.js for wizard avatars
2. **Set width and height** to prevent layout shift
3. **Add alt text** for accessibility
4. **Use drop-shadow** for visual depth
5. **Animate sparingly** to avoid overwhelming kids

## 🎮 Game Feel Checklist

- ✅ Colorful wizard characters
- ✅ Floating animations
- ✅ Magic sparkles and stars
- ✅ Quest-based language
- ✅ XP and level progression
- ✅ Achievement badges
- ✅ Treasure chest icons
- ✅ Magical sound effects (TODO)
- ✅ Confetti celebrations (exists in wizard components)

## 🚀 Future Enhancements

Ideas for making it even more game-like:

1. **Sound Effects**
   - Sparkle sounds on button clicks
   - Victory fanfare on level up
   - Magic whoosh on page transitions

2. **More Animations**
   - Wand casting spell animation
   - Potion bubbling effect
   - Treasure chest opening

3. **Character Customization**
   - Different hat colors
   - Wizard robes options
   - Wand styles

4. **Mini-Games**
   - Math puzzles with game mechanics
   - Timed challenges with progress bars
   - Boss battles (hard problems)

5. **Multiplayer Features**
   - Sibling leaderboards
   - Friendly competitions
   - Shared achievements

---

**All assets are 100% custom-created and free to use!** 🎉

