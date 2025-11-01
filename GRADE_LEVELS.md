# 📚 Grade Levels - K through 12

## Grade Level System

The app now supports **Kindergarten through 12th Grade**!

### How It Works:

| Grade Value | Display Name | Age Range |
|-------------|--------------|-----------|
| `0` | Kindergarten | 5-6 years |
| `1` | 1st Grade | 6-7 years |
| `2` | 2nd Grade | 7-8 years |
| `3` | 3rd Grade | 8-9 years |
| `4` | 4th Grade | 9-10 years |
| `5` | 5th Grade | 10-11 years |
| `6` | 6th Grade | 11-12 years |
| `7` | 7th Grade | 12-13 years |
| `8` | 8th Grade | 13-14 years |
| `9` | 9th Grade | 14-15 years |
| `10` | 10th Grade | 15-16 years |
| `11` | 11th Grade | 16-17 years |
| `12` | 12th Grade | 17-18 years |

---

## Database Setup

### Supabase Column:
```sql
gradeLevel | int4 | default: 0
```

- **Type**: `int4` (integer, 4 bytes)
- **Range**: 0-12
- **Default**: 0 (Kindergarten)
- **✅ Perfect for K-12!**

---

## Current Content Coverage

### ✅ Available (Grades 1-2):
- Addition (single & double digit)
- Subtraction (single & double digit)
- Basic shapes
- Telling time
- Word problems

### 🚧 To Add (Grades 3-12):

**Elementary (3-5):**
- Multiplication
- Division
- Fractions
- Decimals
- Geometry basics

**Middle School (6-8):**
- Algebra basics
- Ratios & proportions
- Percentages
- Integers
- Basic equations

**High School (9-12):**
- Algebra I & II
- Geometry
- Trigonometry
- Pre-Calculus
- Calculus (optional)

---

## Adding Content for Higher Grades

### Step 1: Add Problems

Edit: `lib/seed-data.ts`

```typescript
// Example: Grade 6 problems
export const GRADE_6_PROBLEMS: Problem[] = [
  {
    id: 'g6_frac_1',
    question: 'What is 2/3 + 1/4?',
    answer: '11/12',
    difficulty: 3,
    category: 'fractions',
    gradeLevel: 6,
    skills: ['fraction_addition'],
    hints: [
      { order: 1, content: 'First, find a common denominator (12)', cost: 10 },
      { order: 2, content: '2/3 = 8/12 and 1/4 = 3/12', cost: 15 },
    ],
    xpReward: 100,
  },
  // ... more problems
];
```

### Step 2: Add Lessons

```typescript
export const GRADE_6_LESSONS: Lesson[] = [
  {
    id: 'g6_lesson_fractions',
    title: 'Mastering Fractions',
    description: 'Learn fraction operations',
    category: 'fractions',
    gradeLevel: 6,
    // ... rest of lesson
  },
];
```

### Step 3: Update API Routes

Edit: `app/api/oatutor/problems/route.ts`

Add your new problems to the database:
```typescript
const PROBLEM_DATABASE = [
  ...GRADE_1_PROBLEMS,
  ...GRADE_2_PROBLEMS,
  ...GRADE_6_PROBLEMS, // ← Add here
];
```

---

## Grade Selection in Onboarding

The onboarding now shows:

```
[K] [1] [2] [3] [4] [5] [6]
[7] [8] [9] [10] [11] [12]
```

Kids can select any grade K-12!

---

## Utility Functions

### Display Grade:
```typescript
getGradeDisplay(0)  // "Kindergarten"
getGradeDisplay(1)  // "1st Grade"
getGradeDisplay(6)  // "6th Grade"
getGradeDisplay(12) // "12th Grade"
```

### In Your Code:
```typescript
const user = useAuthStore((state) => state.user);
console.log(user.gradeLevel); // 0-12

// Display
<p>{getGradeDisplay(user.gradeLevel)}</p>
```

---

## Filtering Content by Grade

### In Practice Mode:
```typescript
// Automatically filters problems
const filteredProblems = PROBLEM_DATABASE.filter(
  p => p.gradeLevel === user.gradeLevel
);
```

### Adaptive Selection:
```typescript
// Show problems from current grade ± 1
const adaptiveProblems = PROBLEM_DATABASE.filter(
  p => Math.abs(p.gradeLevel - user.gradeLevel) <= 1
);
```

---

## Testing Different Grades

### Test Kindergarten:
1. Start app
2. Pick a kid
3. Select "K" in onboarding
4. See kindergarten content

### Test High School:
1. Pick different kid
2. Select "12" in onboarding
3. See 12th grade content (when added)

---

## Supabase Setup Reminder

When creating the `profiles` table, use:

```sql
gradeLevel | int4 | 0 | (0=K, 1-12=Grades)
```

This allows:
- ✅ All grade levels
- ✅ Easy math operations
- ✅ Simple comparisons
- ✅ Standard SQL integer

---

## Migration Guide

### If You Already Created Table:

**Option 1: Update Default**
```sql
ALTER TABLE profiles 
ALTER COLUMN gradeLevel SET DEFAULT 0;
```

**Option 2: Keep as is**
- Default of 1 is fine
- Just select K (0) in onboarding if needed

---

## Future Enhancements

### 1. Grade-Specific Themes
```typescript
const themes = {
  0: 'animals',      // Kindergarten
  1-2: 'wizards',    // Elementary
  3-5: 'space',      // Upper Elementary
  6-8: 'sci-fi',     // Middle School
  9-12: 'modern',    // High School
};
```

### 2. Difficulty Levels
```typescript
// Auto-adjust based on grade
const difficulty = {
  0: 1,      // Very Easy (K)
  1-2: 2,    // Easy (1st-2nd)
  3-5: 3,    // Medium (3rd-5th)
  6-8: 4,    // Hard (6th-8th)
  9-12: 5,   // Expert (9th-12th)
};
```

### 3. Subject Expansion
- **K-5**: Basic math
- **6-8**: Pre-algebra, geometry
- **9-10**: Algebra, geometry
- **11-12**: Pre-calc, calculus

---

## Quick Reference

### Set Grade Level:
```typescript
await updateProfile(kidId, { gradeLevel: 6 });
```

### Display Grade:
```typescript
getGradeDisplay(user.gradeLevel)
```

### Filter Content:
```typescript
problems.filter(p => p.gradeLevel === user.gradeLevel)
```

### Check Grade Range:
```typescript
if (user.gradeLevel >= 0 && user.gradeLevel <= 5) {
  // Elementary content
} else if (user.gradeLevel >= 6 && user.gradeLevel <= 8) {
  // Middle school content
} else {
  // High school content
}
```

---

## ✅ Summary

**Your column is perfect!** ✨

- ✅ `int4` type handles 0-12
- ✅ Default of 0 = Kindergarten
- ✅ 1-12 = respective grades
- ✅ Easy to query and compare
- ✅ Standard across database and app

**No changes needed to Supabase column type!** Just make sure to set default to `0` instead of `1` if you want Kindergarten as the default.

---

**Your app now supports K-12! 🎓✨**

