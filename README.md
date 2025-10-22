# 🧠 SkillForge

**Gamified learning platform with animated skill trees, XP-based progression, and AI-generated quests**

SkillForge transforms education into an interactive quest. Learners earn XP by completing challenges, unlock new skills through a dynamic tree, and track their progress in real time. Powered by Firebase, FastAPI, and LangChain, it blends frontend polish with backend intelligence.

Available as a mobile-first React Native app with optional FastAPI backend for AI-driven quest generation.

---

## 🌟 Key Features

- 🌳 **Animated Skill Tree**  
  Visual progression map with unlock logic, XP gates, and smooth transitions

- ⚔️ **Battle System**  
  Real-time multiplayer challenges with scoring and live sync

- 🎮 **Quests**  
  Topic-specific challenges that award XP and unlock new skills

- 📊 **XP Tracking**  
  Firebase-backed XP system with progress bars and unlock thresholds

- 🧩 **Category Filtering**  
  Group skills by domain (Python, AI, Algorithms, etc.) with color-coded branches

- 🎬 **Animated Unlocks**  
  Smooth transitions when new skills become available

- 🤖 **LangChain Backend**  
  AI-generated quests and semantic skill recommendations

- 🔗 **Firebase Integration**  
  Real-time sync for XP, progress, and skill completion

- 🧪 **Type-Safe Navigation**  
  Fully typed React Navigation stack with modular screen logic

---

## 📱 Demo

Watch SkillForge in action:  
- Completing a quest unlocks a new skill node  
- XP progress bar animates in real time  
- Skill tree updates with smooth transitions and category colors

📹 `demo.mp4` (coming soon)

---

## 🧱 Project Structure
```
README.md                    # 📘 Project documentation (this file)
.env                         # 🔐 Environment variables and secrets
app.json                     # Expo app configuration
package.json                 # npm scripts and dependencies

app/                         # 📱 React Native frontend
  firebase.ts                # Firebase config and SDK setup
  navigation/                # Stack and tab navigators
  data/                      # Static skill tree structure and metadata
  types/                     # Global TypeScript types and interfaces
  components/                # Reusable UI components (ProgressBar, SkillNode, etc.)
  screens/                   # SkillTree, Quest, Battle, Profile screens
    SkillTreeScreen.tsx     # Animated skill tree with XP logic and filtering
    QuestScreen.tsx         # Quest interface and XP awarding
    BattleScreen.tsx        # Real-time multiplayer challenge view
  App.tsx                   # Entry point for the mobile app

backend/                     # ⚙️ FastAPI + LangChain backend (optional)
  Dockerfile                 # Backend image build
  requirements.txt           # Python dependencies
  main.py                    # FastAPI entry point
  database.py                # PostgreSQL connection and ORM setup
  api/                       # Quest generation, semantic search, XP logic
  models/                    # Pydantic models and schema definitions
  langchain/                 # LangChain pipelines and prompt templates

pipelines/                   # 🤖 AI + XP processing pipelines
  quest_generator.py         # LangChain-powered quest generation
  skill_recommender.py       # Semantic skill suggestions
  xp_calculator.py           # XP logic and progression rules

tests/                       # 🧪 Unit and integration tests
  test_*.ts                  # Frontend and backend test suites

assets/                      # 🎨 Icons, fonts, images

.github/                     # CI workflows
  workflows/
    ci.yml                   # GitHub Actions: tests, build, deploy

```
---

## 🔥 Tech Stack

| Layer         | Tech Stack                          |
|--------------|-------------------------------------|
| Frontend      | React Native, TypeScript, Expo      |
| Navigation    | React Navigation (Native Stack)     |
| Backend       | FastAPI, LangChain, PostgreSQL      |
| Realtime DB   | Firebase Realtime Database          |
| Auth (opt)    | Firebase Auth or OAuth              |
| Styling       | React Native StyleSheet             |
| Deployment    | Docker, GitHub Actions (optional)   |

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/skillforge.git
cd skillforge

### 2. Install Dependencies
npm install

### 3. Configre Firebase
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
}

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

### 4. Run the App
npx expo start


🧪 Development Notes
Type Safety: All navigation and skill tree logic is strictly typed

Modular Screens: Each screen is isolated and reusable

XP Sync: XP is stored in Firebase and used to gate skill unlocks

Animated Unlocks: Uses Animated.Value and useEffect to trigger transitions

Category Filtering: Tapable legend filters the tree by domain

LangChain Integration: Backend generates quests and recommendations using semantic search

🧠 Future Enhancements
🏆 Leaderboards and multiplayer matchmaking

📱 Profile screen with badges and history

🔐 Auth and persistent user sessions

📦 Migrate to Firestore or PostgreSQL for scalability

🔍 Search bar and collapsible skill branches

🧠 AI-generated quests via LangChain

👨‍💻 Maintainer
Built by Siddharth Sivalanka Computer Science @ UC San Diego | AI, Robotics, and Education Enthusiast