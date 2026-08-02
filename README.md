# ⚡ GHL API & Webhook Bridge (`ghl-api-webhook-bridge`)

> Full-stack GoHighLevel integration suite featuring REST API v2 Middleware, Webhook Listener & Simulator, Custom Funnel Scripting Suite, and a React + Tailwind CSS Custom Dashboard App designed for GHL Custom Menu Link (iFrame) embedding.

[![GoHighLevel](https://img.shields.io/badge/GoHighLevel-API_v2-indigo?style=for-the-badge&logo=gohighlevel)](https://highlevel.com)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)

---

## 🎯 Overview

This repository demonstrates end-to-end technical capabilities required for a **GoHighLevel Developer Assistant / GHL Developer**. It provides a production-ready toolkit covering all key pillars of HighLevel customization:

1. **Backend Middleware Server (`server/`)**: Express API proxying for GHL REST API v2 endpoints and a built-in Mock GHL Simulator Engine for offline/sandbox development.
2. **Webhook Event Processing**: Real-time HTTP POST listener and logger for GHL Workflow triggers (`ContactCreated`, `OpportunityStageUpdate`, `FormSubmission`).
3. **Custom Funnel Scripting Suite (`scripts/`)**: Injected Vanilla JavaScript & CSS for GHL Funnels (UTM parameter auto-injector & dynamic pricing calculator).
4. **React Custom Dashboard App (`client/`)**: Modern single-page application built with React 19 and Tailwind CSS v4, optimized to run seamlessly inside GHL sub-accounts as a **Custom Menu Link (iFrame)**.

---

## 🏗️ Repository Architecture

```text
ghl-api-webhook-bridge/
├── server/                   # Express Middleware & Mock GHL Engine
│   ├── index.js              # Server entry point (Port 5000)
│   ├── routes/
│   │   ├── ghlApiRouter.js   # GHL REST API v2 proxy endpoints
│   │   └── webhookRouter.js  # Webhook receiver & log buffer
│   └── services/
│       └── mockGhlEngine.js  # Virtual GHL dataset & trigger generator
│
├── scripts/                  # GHL Funnel Custom Scripting Suite
│   ├── ghl-utm-injector.js   # URL query parameter (UTM/GCLID) auto-injector
│   ├── ghl-funnel-calculator.js # Dynamic funnel pricing calculator script
│   └── ghl-custom-styles.css # Scoped CSS overrides for GHL funnels & forms
│
└── client/                   # GHL Custom Menu React Dashboard App
    ├── src/
    │   ├── App.jsx           # Main tabbed dashboard container
    │   ├── components/
    │   │   ├── Header.jsx    # GHL connection banner & tab navigation
    │   │   ├── ContactExplorer.jsx   # GHL Contact search & creation
    │   │   ├── OpportunityTracker.jsx # Pipeline stage deal tracker
    │   │   └── WebhookLogViewer.jsx   # Live webhook log inspector & trigger simulator
    │   └── index.css         # Tailwind CSS v4 styling rules
    └── vite.config.js
```

---

## ⚡ Core Features & Technical Highlights

### 1. GHL REST API v2 Proxying (`server/routes/ghlApiRouter.js`)

- Protects client access tokens by proxying API calls through Node.js.
- Exposes authenticated endpoints: `GET /api/ghl/contacts`, `POST /api/ghl/contacts`, `GET /api/ghl/opportunities`.

### 2. Live Webhook Engine (`server/routes/webhookRouter.js`)

- Captures incoming POST triggers sent from HighLevel Workflows.
- Buffer keeps the last 50 webhook events for real-time inspection in the React dashboard.
- Includes a built-in **Simulator Endpoint** (`POST /api/ghl/simulate-trigger`) for instant testing without paid GHL access.

### 3. GHL Custom Funnel Scripts (`scripts/`)

- **`ghl-utm-injector.js`**: Automatically parses URL search parameters (`?utm_source=facebook&utm_campaign=summer`) and injects values into hidden GHL form fields for ad attribution.
- **`ghl-funnel-calculator.js`**: Listens to custom funnel inputs (quantities, service tiers), computes real-time pricing, and writes values into GHL custom fields prior to submission.
- **`ghl-custom-styles.css`**: Sleek glassmorphism CSS card overrides for GHL funnel popups and embeds.

### 4. Custom Menu React App (`client/`)

- **Contact Explorer**: Search contacts by name/email and create new GHL contacts dynamically.
- **Opportunity Pipeline Tracker**: Real-time visual tracking of deal stages and total pipeline monetary value.
- **Live Webhook Viewer**: Auto-refreshing log stream with interactive trigger simulator buttons.

---

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v18+)
- npm or yarn

### 1. Start the Backend Middleware Server

```bash
cd server
npm install
npm run dev
```

_Server starts on `http://localhost:5000`_

### 2. Start the React Client Application

Open a new terminal window:

```bash
cd client
npm install
npm run dev
```

_App starts on `http://localhost:5173`_

---

## 📌 How to Embed in GoHighLevel (Custom Menu Link iFrame)

To embed this React application inside a GoHighLevel sub-account:

1. Deploy the `client/` React build to your hosting provider (e.g. Vercel, Netlify, or Render).
2. Log into your **GoHighLevel Agency Dashboard**.
3. Go to **Settings -> Custom Menu Links -> Add New**.
4. Configure the link settings:
   - **Link Title**: `Custom Developer Portal`
   - **Icon**: Choose a dashboard icon
   - **URL**: Paste your deployed React app URL (`https://your-app.vercel.app`)
   - **Display Target**: `Inside iframe`
   - **Show in Locations**: Select target sub-accounts
5. Save the link. Your custom React application now renders directly inside GHL!
