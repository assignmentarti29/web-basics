# Portfolio Website - Rotating Text Animation Update

## ✅ Changes Completed

### 1. **HTML Updates** (`index.html`)
- Changed the hero subtitle from static text to dynamic rotating text
- Added `<span id="rotating-text"></span>` for the animated text
- Added `<span class="cursor-blink">|</span>` for the blinking cursor effect

### 2. **CSS Updates** (`style.css`)
- Added styling for `#rotating-text` with `min-width: 300px` to prevent layout shifts
- Added `.cursor-blink` class with blinking animation
- Created `@keyframes blink` animation that fades the cursor in and out
- Made the hero subtitle responsive with proper sizing

### 3. **JavaScript Updates** (`script.js`)
- Updated the typing effect to target the new `rotating-text` element
- Changed the roles array to only include:
    - "Java Developer"
    - "AWS Engineer"
- Typing animation features:
    - Types out each role character by character
    - Pauses for 2 seconds when complete
    - Deletes the text smoothly
    - Rotates to the next role
    - Loops infinitely

## 🎨 Animation Details

**Typing Speed:** 100ms per character  
**Deleting Speed:** 50ms per character  
**Pause Duration:** 2000ms (2 seconds)  
**Cursor Blink:** 1s interval

## 📱 Responsive Design

The rotating text adapts to different screen sizes:
- **Desktop:** min-width: 300px
- **Tablet (768px):** min-width: 200px
- **Mobile (480px):** min-width: 150px

## 🚀 How It Works

1. Page loads → waits 1 second
2. Starts typing "Java Developer"
3. Pauses for 2 seconds
4. Deletes "Java Developer"
5. Types "AWS Engineer"
6. Pauses for 2 seconds
7. Deletes "AWS Engineer"
8. Repeats from step 2

## 🎯 Result

Your portfolio now features a **modern, premium typing animation** that:
- ✅ Automatically rotates between "Java Developer" and "AWS Engineer"
- ✅ Has a smooth, professional typing effect
- ✅ Includes a blinking cursor for authenticity
- ✅ Is fully responsive across all devices
- ✅ Matches the design from your screenshot reference

## 📂 Files Modified

1. `index.html` - Hero section structure
2. `style.css` - Animation and styling
3. `script.js` - Typing logic

## 🔧 Customization

To add more roles or change timing, edit `script.js`:

```javascript
const roles = [
    'Java Developer',
    'AWS Engineer',
    'Your New Role Here'  // Add more roles
];

// Change timing:
typingSpeed = 2000;  // Pause when complete (line ~104)
typingSpeed = 100;   // Typing speed (line ~99)
typingSpeed = 50;    // Deleting speed (line ~96)
```

---

**Status:** ✅ Complete and ready to use!
**Design:** Premium, modern, HR-friendly
**Animation:** Smooth typing effect with cursor blink
