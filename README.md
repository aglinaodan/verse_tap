# SermonNotes — Production Setup Guide

A mobile-first sermon note-taking application with Bible reader, recycle bin, theme customization, and Firebase Firestore backend.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Firebase Project Initialization](#firebase-project-initialization)
3. [Firestore Security Rules](#firestore-security-rules)
4. [Configuring the Application](#configuring-the-application)
5. [Bible Engine: `esv_version.js`](#bible-engine-esv_versionjs)
6. [Adding Bible Translations](#adding-bible-translations)
7. [Deploying with Firebase Hosting](#deploying-with-firebase-hosting)
8. [Feature Reference](#feature-reference)
9. [LocalStorage Fallback](#localstorage-fallback)
10. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
sermonnotes/
├── index.html         # Main application (UI, routing, state, Firebase binding)
├── esv_version.js     # Bible translation engine + ESV data scaffold
├── README.md          # This file
└── translations/      # (Optional) Additional translation payload files
    ├── kjv.js
    ├── niv.js
    └── nlt.js
```

All three core files must be served from the same directory (or the same Firebase Hosting root). The `translations/` folder is optional and used for registering additional Bible versions.

---

## Firebase Project Initialization

### Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **"Add project"** and follow the setup wizard.
3. Disable Google Analytics if not needed (optional).

### Step 2: Register a Web App

1. In your Firebase project dashboard, click the **Web** icon (`</>`).
2. Enter an app nickname (e.g., `SermonNotes`).
3. Optionally check **"Also set up Firebase Hosting"** (recommended).
4. Click **"Register app"**.
5. Copy the `firebaseConfig` object shown in the snippet. You will need this.

### Step 3: Enable Firestore

1. In the Firebase console, navigate to **Build → Firestore Database**.
2. Click **"Create database"**.
3. Choose **"Start in production mode"** (recommended) or test mode for development.
4. Select the region closest to your users (e.g., `us-central` or `europe-west`).
5. Click **"Enable"**.

---

## Firestore Security Rules

Navigate to **Firestore → Rules** and replace the default rules with the following:

### Option A: Public (No Authentication) — Development Only

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Warning:** This allows anyone to read or write your notes. Use only during local development.

---

### Option B: Firebase Authentication (Recommended for Production)

This configuration scopes all notes to the authenticated user.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Each user can only access their own notes
    match /users/{userId}/notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

If using per-user collections, update `index.html` to use `db.collection('users').doc(userId).collection('notes')` and initialize Firebase Auth accordingly.

---

### Option C: Anonymous Auth + Ownership Rule (Balanced)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow create: if request.auth != null
                    && request.resource.data.keys().hasAll(['title','content','tags','createdAt','isDeleted','deletedAt'])
                    && request.resource.data.title is string
                    && request.resource.data.title.size() <= 120
                    && request.resource.data.isDeleted is bool;

      allow read, update, delete: if request.auth != null
                                  && resource.data.ownerId == request.auth.uid;
    }
  }
}
```

---

## Configuring the Application

### Step 1: Paste Your Firebase Config

Open `index.html` and find the `FIREBASE_CONFIG` object near the top of the `<script>` section:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

Replace all placeholder values with the values from your Firebase project's **Project Settings → Your Apps → SDK setup and configuration**.

### Step 2: Verify File Serving

Ensure all three files are in the same root directory and served over HTTP/HTTPS (not opened as local `file://` paths, as ES modules and Firebase SDK require a proper origin).

---

## Bible Engine: `esv_version.js`

The `esv_version.js` file exposes a global `BibleEngine` object (also compatible with CommonJS `require()` and AMD `define()`).

### Core API

```javascript
// Get all 66 books
BibleEngine.getAllBooks();
// → [{ id: 'GEN', name: 'Genesis', abbr: 'Gen', chapters: 50 }, ...]

// Get books by testament
BibleEngine.getTestament('OT'); // or 'NT'

// Find a book by ID, name, or abbreviation (case-insensitive)
BibleEngine.findBook('john');
BibleEngine.findBook('JHN');
BibleEngine.findBook('Rev');

// Chapter and verse counts
BibleEngine.getChapterCount('PSA');  // → 150
BibleEngine.getVerseCount('JHN', 3); // → 36

// Fetch a full chapter's verses
const verses = BibleEngine.getChapter('JHN', 3);
// → [{ verse: 1, text: "Now there was a man..." }, ...]

// Fetch a single verse
const v = BibleEngine.getVerse('JHN', 3, 16);
// → { book, bookId, chapter, verse, text, reference, translation }

// Format a canonical reference
BibleEngine.formatReference('PHP', 4, 13); // → "Philippians 4:13"

// Search loaded verse data
BibleEngine.search('eternal life');
// → [{ reference, bookId, chapter, verse, text, translation }, ...]

// Translation management
BibleEngine.getActiveTranslation();          // → 'ESV'
BibleEngine.listTranslations();              // → [{ id, name, shortName, language, active }]
BibleEngine.setActiveTranslation('KJV');
```

### Verse Data Structure

Verses are keyed as `"BOOKID:CHAPTER"` with verse numbers as integer keys:

```javascript
{
  'JHN:3': {
    1:  "Now there was a man of the Pharisees named Nicodemus...",
    16: "For God so loved the world...",
    // ...
  }
}
```

The scaffold provided in `esv_version.js` contains representative ESV-style text for key passages. Full verse hydration can be loaded via `registerVerseData()`.

---

## Adding Bible Translations

### Method 1: Register via JavaScript at runtime

```javascript
// After esv_version.js loads, BibleEngine is globally available
BibleEngine.registerTranslation({
  id:        'KJV',
  name:      'King James Version',
  shortName: 'KJV',
  language:  'en',
  direction: 'ltr',
  year:      1611,
  publisher: 'Public Domain',
  verses:    {}  // Start empty, hydrate below
});

// Hydrate with verse data
BibleEngine.registerVerseData('KJV', {
  'GEN:1': {
    1: "In the beginning God created the heaven and the earth.",
    2: "And the earth was without form, and void; and darkness was upon the face of the deep...",
    // ...
  },
  'JHN:3': {
    16: "For God so loved the world, that he gave his only begotten Son...",
    // ...
  }
  // ... all 31,102 verses
});

BibleEngine.setActiveTranslation('KJV');
```

### Method 2: Companion Translation File (Recommended)

Create a separate file, e.g., `translations/kjv.js`:

```javascript
// translations/kjv.js
(function() {
  const KJV_VERSES = {
    'GEN:1': {
      1: "In the beginning God created the heaven and the earth.",
      // ...
    },
    // ... complete verse data
  };

  if (typeof BibleEngine !== 'undefined') {
    BibleEngine.registerTranslation({
      id: 'KJV', name: 'King James Version', shortName: 'KJV',
      language: 'en', year: 1611, verses: KJV_VERSES
    });
  }
})();
```

Then include it in `index.html` **after** `esv_version.js`:

```html
<script src="esv_version.js"></script>
<script src="translations/kjv.js"></script>
<script src="translations/niv.js"></script>
```

The UI's translation dropdown auto-populates from `BibleEngine.listTranslations()` and updates on load.

### Supported Translation IDs (Suggested Conventions)

| ID    | Full Name                      | Language |
|-------|--------------------------------|----------|
| ESV   | English Standard Version       | en       |
| KJV   | King James Version             | en       |
| NIV   | New International Version      | en       |
| NLT   | New Living Translation         | en       |
| NASB  | New American Standard Bible    | en       |
| AMP   | Amplified Bible                | en       |
| MSG   | The Message                    | en       |
| RVR60 | Reina-Valera 1960              | es       |
| LSG   | Louis Segond                   | fr       |

---

## Deploying with Firebase Hosting

### Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Initialize Hosting

```bash
cd your-project-directory
firebase init hosting
```

When prompted:
- **Public directory:** `.` (dot, the current directory)
- **Single-page app:** `No`
- **GitHub auto-deploys:** Optional

### `firebase.json` Configuration

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [
      {
        "source": "**/*.js",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400" }]
      }
    ],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

### Deploy

```bash
firebase deploy --only hosting
```

Your app will be available at `https://YOUR_PROJECT_ID.web.app`.

---

## Feature Reference

### Sidenav Drawer

| Feature | Behavior |
|---|---|
| Hamburger button | Opens slide-in drawer from the left |
| Bible accordion | Expands OT/NT book list with clickable links |
| Book link click | Switches to Bible Reader View for that book |
| Recycle Bin link | Routes to the Recycle Bin View |
| Theme dots | 4 color themes: Charcoal, Deep Navy, Amber, Emerald |
| Font adjuster | 3 sizes: Small (14px), Default (16px), Large (18px) |

Theme and font preferences are persisted in `localStorage` and restored on app load.

### Note CRUD

| Action | Trigger |
|---|---|
| Create note | FAB (+) button or Ctrl/Cmd+N |
| Open note | Click card |
| Edit note | Edit icon on card, or Edit button in detail modal |
| Soft delete | Delete icon → Move to Recycle Bin |
| Search notes | Search bar in top nav |

### Bible Reader

| Feature | Behavior |
|---|---|
| Book selector | Dropdown with OT/NT optgroups |
| Chapter selector | Auto-updates based on selected book |
| Translation selector | Shows all registered translations |
| Tap a verse | Opens action popover |
| Copy verse | Copies `text — Reference (TRANS)` to clipboard |
| Highlight verse | Toggles yellow highlight on verse row |
| Add to note | Opens new note modal with verse pre-inserted |

### Recycle Bin Lifecycle

| Phase | Detail |
|---|---|
| Soft delete | `isDeleted: true`, `deletedAt: ISO timestamp` written to DB |
| Display | Recycle Bin shows countdown: "Deleting permanently in N days" |
| Auto-purge | On `initApp()`, any note with `deletedAt > 30 days` is permanently deleted |
| Manual restore | Restore icon sets `isDeleted: false`, `deletedAt: null` |
| Permanent delete | Immediately removes document from Firestore/localStorage |
| Empty bin | Batch-deletes all recycled notes |

### Firestore Real-Time Sync

When Firebase is properly configured, `onSnapshot()` keeps the notes grid live-synced across browser tabs and devices without requiring a page refresh.

---

## LocalStorage Fallback

If `FIREBASE_CONFIG.apiKey` is still set to `"YOUR_API_KEY"` or Firebase initialization fails, the app automatically falls back to `localStorage` using the key prefix `sn_`:

| Key | Contents |
|---|---|
| `sn_notes` | JSON array of all note documents |
| `sn_theme` | Active theme name |
| `sn_font` | Active font size |

Data is fully functional in fallback mode. To migrate to Firestore later, export `localStorage.getItem('sn_notes')` and batch-import via the Firebase console or a migration script.

---

## Troubleshooting

### "Firebase not configured" warning in console

This is expected when `FIREBASE_CONFIG` still contains placeholder values. The app runs in localStorage mode. Replace the config values to enable Firestore.

### Firestore permission denied errors

Check your security rules. During development, temporarily use `allow read, write: if true;` on the `notes` collection. Tighten rules before going to production.

### `BibleEngine is not defined`

Ensure `esv_version.js` is loaded **before** `index.html`'s main `<script>` block. Verify the file path is correct (same directory as `index.html`) and the server is returning a 200 response.

### Bible chapters show "text not yet loaded"

The `esv_version.js` scaffold includes representative verses for key passages only. Use `BibleEngine.registerVerseData('ESV', { ... })` to hydrate additional chapters, or include a full verse payload companion file.

### App doesn't open on mobile

Ensure the server sends proper CORS headers and the page is served over HTTPS (required for clipboard API and Firebase SDK). Firebase Hosting handles this automatically.

### Verse "Copy" fails silently

The Clipboard API requires a **secure context** (HTTPS or `localhost`). When developing locally, use `http://localhost` (not `http://127.0.0.1`) or enable secure context in your dev server.

---

## Data Schema Reference

```typescript
interface Note {
  id:        string;        // Firestore doc ID or localStorage genId()
  title:     string;        // Max 120 characters
  tags:      string[];      // Array of tag strings
  content:   string;        // Free-text sermon notes
  createdAt: string;        // ISO 8601 timestamp
  isDeleted: boolean;       // true → in Recycle Bin
  deletedAt: string | null; // ISO 8601 timestamp or null
}
```

---

## License

MIT — Free to use, modify, and distribute.

---

*Built with Firebase Firestore, Tailwind CSS, and the SermonNotes Bible Engine.*
