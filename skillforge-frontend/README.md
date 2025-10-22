🧠 SkillForge
Gamified Learning with XP, Quests, and a Reactive Skill Tree

SkillForge is a full-stack, gamified learning platform that blends real-time challenges, XP-based progression, and a dynamic skill tree. Built for learners who thrive on feedback, structure, and visual progress.

🚀 Features
🌳 Skill Tree: Visual map of topics with unlock logic, XP gates, and animated transitions

⚔️ Battle System: Real-time multiplayer challenges with scoring and live sync

🎮 Quests: Topic-specific challenges that award XP and unlock new skills

📊 XP Tracking: Firebase-backed XP system with progress bars and unlock thresholds

🧩 Category Filtering: Group skills by domain (Python, AI, Algorithms, etc.)

🎬 Animated Unlocks: Smooth transitions when new skills become available

🔗 Firebase Integration: Real-time sync for XP, progress, and skill completion

🧠 Type-Safe Navigation: Fully typed React Navigation stack with modular screen logic

🧱 Architecture Overview
Code
SkillForge/
├── app/
│   ├── screens/              # React Native screens (SkillTree, Quest, Battle, etc.)
│   ├── components/           # Reusable UI components
│   ├── data/                 # Static skill tree structure
│   ├── types/                # Global TypeScript types
│   ├── firebase.ts           # Firebase config and SDK setup
│   └── navigation/           # Stack and tab navigators
├── backend/                  # FastAPI backend (optional for advanced logic)
│   └── api/                  # LangChain integration, XP logic, matchmaking
├── assets/                   # Icons, fonts, images
├── .env                      # Secrets (managed securely)
├── app.json / package.json   # App config and dependencies
└── README.md                 # This file
🧠 Skill Tree Logic
Each skill node is defined as:

ts
type SkillNode = {
  unlocked: boolean;
  children: string[];
  requiredXP?: number;
  category?: string;
  icon?: string;
};
Unlock logic:

A skill is unlocked if:

It’s marked unlocked: true

OR its parent is completed AND user has enough XP

Animated transitions trigger when a skill changes from locked → unlocked.

🔥 Technologies Used
Layer	Tech Stack
Frontend	React Native, TypeScript, Expo
Navigation	React Navigation (Native Stack)
Backend (opt)	FastAPI, LangChain, PostgreSQL
Realtime DB	Firebase Realtime Database
Auth (opt)	Firebase Auth or OAuth
State Mgmt	React Hooks
Styling	React Native StyleSheet
⚙️ Setup Instructions
1. Clone the repo
bash
git clone https://github.com/your-username/skillforge.git
cd skillforge
2. Install dependencies
bash
npm install
3. Configure Firebase
Create firebase.ts:

ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_DOMAIN',
  databaseURL: 'YOUR_DB_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
4. Run the app
bash
npx expo start
🧪 Development Notes
Type Safety: All navigation and skill tree logic is strictly typed

Modular Screens: Each screen is isolated and reusable

XP Sync: XP is stored in Firebase and used to gate skill unlocks

Animated Unlocks: Uses Animated.Value and useEffect to trigger transitions

Category Filtering: Tapable legend filters the tree by domain

🧠 Future Enhancements
🏆 Leaderboards and multiplayer matchmaking

🧠 AI-generated quests via LangChain

📱 Profile screen with badges and history

🔐 Auth and persistent user sessions

📦 Migrate to Firestore or PostgreSQL for scalability

👨‍💻 Maintainer
Built by Siddharth Sivalanka Computer Science @ UC San Diego | AI, Robotics, and Education Enthusiast 