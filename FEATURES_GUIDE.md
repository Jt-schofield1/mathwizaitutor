# 🎤📸 Speech-to-Text & Photo OCR Features

## 🎤 **Speech-to-Text (Voice Input)**

### **How It Works:**
Uses the **Web Speech API** built into modern browsers - completely FREE and runs locally!

### **Browser Support:**

| Browser | Desktop | iPad/iOS | Android |
|---------|---------|----------|---------|
| **Chrome** | ✅ Full Support | ✅ Full Support | ✅ Full Support |
| **Safari** | ✅ Full Support | ✅ Full Support | ⚠️ Limited |
| **Edge** | ✅ Full Support | ✅ Full Support | ✅ Full Support |
| **Firefox** | ❌ Not Supported | ❌ Not Supported | ❌ Not Supported |

**✅ Best Experience:** Chrome or Safari on iPad/iPhone

### **Enabling Microphone on iPad:**

1. **Open Settings**
2. Scroll to **Safari**
3. Tap **Microphone**
4. Select **"Ask"** or **"Allow"**
5. Restart Safari

**For the app specifically:**
1. Visit the homework page
2. Click the microphone button 🎤
3. Tap **"Allow"** when prompted
4. Start speaking!

### **Using Voice Input:**

1. Go to **Homework Helper**
2. Click the **microphone button** 🎤
3. Wait for it to turn red (listening)
4. Speak your question clearly:
   - "What is three times five?"
   - "How do I solve x plus seven equals twelve?"
   - "Explain fractions to me"
5. Click the microphone again to stop
6. Your words appear in the text box!
7. Hit **Send**

**Tips for Best Results:**
- ✅ Speak clearly and not too fast
- ✅ Use a quiet environment
- ✅ Say "plus" for +, "minus" for -, "times" for ×
- ✅ For equations, say "equals" for =
- ⚠️ Complex math notation may need typing

---

## 📸 **Photo OCR (Homework Scanner)**

### **How It Works:**

**Two-Level System** for maximum reliability:

1. **Primary: Groq Vision AI** (llama-3.2-90b-vision-preview)
   - Smart AI that understands math problems
   - Recognizes handwriting
   - Extracts equations correctly
   - **FREE** with Groq API

2. **Fallback: Tesseract.js OCR**
   - Traditional OCR (character recognition)
   - Works when Vision AI is unavailable
   - Better for typed/printed text
   - Runs in the browser - no API needed!

### **What It Can Read:**

| Type | Groq Vision AI | Tesseract OCR |
|------|----------------|---------------|
| **Printed Math** | ✅ Excellent | ✅ Good |
| **Handwritten** | ✅ Good | ⚠️ Limited |
| **Equations** | ✅ Very Good | ⚠️ Fair |
| **Word Problems** | ✅ Excellent | ✅ Good |
| **Diagrams** | ✅ Can Describe | ❌ No |

### **Using Photo Scanner:**

1. Go to **Homework Helper**
2. Click the **camera button** 📷
3. Choose:
   - **"Take Photo"** (on iPad/phone)
   - **"Choose from Library"** (upload existing photo)
4. Take/select a clear photo of the problem
5. Wait for processing (5-15 seconds)
6. The problem appears in chat!
7. AI Professor Mathwiz will help solve it!

**Tips for Best Photos:**

✅ **Good:**
- Well-lit (natural light or bright room)
- Problem centered in frame
- Camera held steady
- Clear, in-focus text
- High contrast (dark text on white paper)

❌ **Avoid:**
- Dark or shadowy photos
- Blurry or out-of-focus
- Text at an angle
- Glare from lights
- Wrinkled or folded paper

### **Example Workflow:**

```
1. Student takes photo of: "52 × 3 = ?"

2. Vision AI extracts: "Problem: 52 × 3 = ?"

3. AI automatically responds:
   "Whoa, that's a big multiplication spell! 🧙
   Let's break it down...
   Can you think of 52 groups of 3?"

4. Student continues conversation with AI!
```

---

## 🔧 **Troubleshooting**

### **Speech-to-Text Not Working:**

**Error: "not-allowed"**
```
🎤 Please allow microphone access!

iPad: Settings → Safari → Microphone → Allow
Desktop: Click lock icon in address bar → Allow microphone
```

**Button Not Appearing:**
- Browser doesn't support Web Speech API
- Use Chrome or Safari instead
- Firefox doesn't support this feature

**No Text Appearing:**
- Microphone may be muted
- Check system audio settings
- Try speaking louder or closer to microphone
- Make sure you're in a quiet environment

### **Photo OCR Not Working:**

**"Groq API error: 400"**
```
Vision model may be temporarily down.
✅ Don't worry! Tesseract OCR will automatically activate as backup.
```

**"I had trouble reading the text"**
```
Both systems tried and couldn't read it clearly.
Try:
1. Retake photo with better lighting
2. Make sure text is in focus
3. Try typed/printed problems instead of handwriting
4. Type the problem manually
```

**Image Upload Failed:**
- File may be too large (max ~5MB)
- Format not supported (use JPG or PNG)
- Try taking photo directly in the app instead of uploading

---

## 💡 **Pro Tips**

### **For Voice Input:**

1. **Practice saying math terms:**
   - "x squared" → x²
   - "three fourths" → 3/4
   - "x plus five" → x + 5

2. **Edit after speaking:**
   - Voice input fills the text box
   - You can edit before sending
   - Fix any misheard words

3. **Combine with typing:**
   - Speak the main question
   - Type complex notation
   - Best of both worlds!

### **For Photo OCR:**

1. **Test with different problems:**
   - Start with printed text (easiest)
   - Try neat handwriting (medium)
   - Complex equations may need help

2. **Use good lighting:**
   - Natural daylight is best
   - Desk lamp directly overhead
   - Avoid shadows

3. **Frame properly:**
   - Fill the frame with the problem
   - Leave a little border
   - No need to capture entire page

---

## 🆓 **All Features Are FREE!**

- ✅ **Web Speech API**: Built into browsers
- ✅ **Groq Vision**: Free API (generous limits)
- ✅ **Tesseract OCR**: Open source, runs in browser
- ✅ **No subscriptions needed!**

---

## 📱 **iPad Optimization**

Both features work great on iPad:

- **Speech-to-Text**: Full support in Safari
- **Photo Scanner**: Can use iPad camera
- **Touch-friendly**: Large buttons (44px minimum)
- **Responsive**: Adapts to screen size

---

## 🎯 **When to Use Each Feature**

| Situation | Best Tool |
|-----------|-----------|
| Quick question | 🎤 **Voice** (fastest!) |
| Complex equation | ⌨️ **Typing** (most accurate) |
| Homework sheet | 📸 **Photo** (easiest!) |
| Word problem | 📸 **Photo** or 🎤 **Voice** |
| Multiple problems | 📸 **Photo** (gets them all!) |

---

## 🔮 **Future Improvements**

We're working on:
- [ ] Better handwriting recognition
- [ ] Support for mathematical diagrams
- [ ] Offline speech recognition
- [ ] Multi-language support
- [ ] Batch problem upload (multiple photos)

---

**Questions? Just ask Professor Mathwiz in the homework helper! 🧙‍♂️✨**

