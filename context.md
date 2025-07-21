# Obsinotes – Application Context

## Vision
Obsinotes is a mobile-first, markdown-based note-taking application inspired by Obsidian, aimed at users who want powerful, flexible, and private note management on the go. It empowers users to take notes, manage tasks, and organize thoughts across both local and cloud environments.

---

## Core Objectives

1. **Local and Cloud Sync**
   - Notes are stored locally on the device.
   - Firebase Cloud Firestore used for syncing notes across devices.
   - Offline-first architecture to ensure full functionality without internet.

2. **Markdown Support**
   - Notes are written and rendered in Markdown.
   - Support for linking notes using `[[note-title]]`.

3. **Task Management**
   - A default landing page for tasks separate from notes.
   - Tasks are stored and rendered in Markdown format.
   - Option to link tasks to notes for context.

4. **Privacy and Control**
   - All notes are stored locally first.
   - User explicitly chooses which notes to sync to Firebase.

---

## Key Features

- **Note Creation & Editing**
  - Markdown editor with formatting shortcuts.
  - Syntax highlighting and real-time preview.

- **Vault System (like Obsidian)**
  - Notes are stored in local folders called "vaults."
  - Vaults can be synced or offline-only.

- **Note Linking**
  - `[[Wiki-style links]]` to other notes.
  - Backlink support to show references.

- **Task Page**
  - A centralized, dedicated screen for tasks.
  - Tasks can include dates, priorities, and statuses.
  - Filters for "Today," "Upcoming," and "Completed."

- **Search and Navigation**
  - Fuzzy search for notes and tasks.
  - Tag-based organization.

- **Cloud Sync (Firebase)**
  - Sync notes and tasks selectively.
  - Realtime updates and conflict handling.
  - Firebase Authentication (Email/Google Sign-In).

---

## Technology Stack

- **Frontend**: React Native (Expo or CLI)
- **State Management**: React Context API or Zustand (to be decided)
- **Storage**:
  - Local: SQLite / AsyncStorage / MMKV
  - Cloud: Firebase Firestore + Firebase Storage
- **Authentication**: Firebase Auth
- **Optional Markdown Parser**: `react-native-markdown-display` or `marked` (custom integration)
- **Backup Options**: Export vaults as `.zip` or `.md` files

---

## Customization Goals (Differentiators from Obsidian)

- **Mobile-first UI**: Designed from the ground up for touch interaction.
- **Dedicated Task Landing Page**: Tasks treated as first-class content.
- **Simple Sync Toggle**: UI to control what notes are synced.
- **Minimalist UI**: Reduced complexity for mobile usability.

---

## Future Considerations

- Bi-directional sync with Obsidian desktop vaults.
- Custom plugin system (modular architecture).
- Encryption for sensitive notes.
- Calendar integration.
- Dark mode, theming.

---

## Naming/Branding Notes

- **Name**: Obsinotes = *Obsidian-inspired Notes*
- **Logo**: TBD – Minimalist glyph or pen-in-vault icon

---

## Initial TODOs

- [ ] Define Folder and Note schema
- [ ] Decide on Markdown renderer
- [ ] Create Firebase project + Firestore schema
- [ ] Build base UI layout with React Native
- [ ] Create Task Page wireframe
- [ ] Implement local storage system
- [ ] Sync system for uploading/downloading notes

---