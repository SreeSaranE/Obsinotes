# 📝 Obsinotes

**Obsinotes** is a mobile-first, Markdown-based note-taking application built with React Native, inspired by [Obsidian](https://obsidian.md). It allows users to write and manage notes offline with seamless optional cloud sync using Firebase. Obsinotes brings the power of local-first knowledge management to your fingertips, with a dedicated task management system.

---

## 🚀 Features

- 📄 **Markdown Notes**: Create and edit notes in markdown with real-time preview.
- 🔗 **Backlinks and Wiki Links**: Link notes using `[[note-title]]` syntax.
- 📁 **Vault System**: Organize your notes in local vaults.
- ✅ **Task Page**: A dedicated screen to manage tasks separate from general notes.
- 🔄 **Cloud Sync**: Sync notes across devices using Firebase Firestore.
- 🔐 **Local First**: Full offline functionality, with optional sync.
- 🔎 **Search and Tags**: Quickly find notes or filter by tags.
- 🎨 **Minimal Mobile UI**: Clean and user-friendly mobile experience.

---

## 📱 Screenshots

> _Coming soon..._

---

## ⚙️ Tech Stack

- **Frontend**: React Native (Expo or CLI)
- **Storage**: AsyncStorage / MMKV (local), Firebase Firestore (cloud)
- **Markdown Rendering**: `react-native-markdown-display`
- **Authentication**: Firebase Auth (Email/Google)
- **State Management**: React Context API or Zustand

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 16.x
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- Firebase project setup

### Installation

```bash
git clone https://github.com/your-username/obsinotes.git
cd obsinotes
yarn install
# or
npm install
