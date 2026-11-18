# CampusPulse (KampüsNabız) 💜🌿

> **GLB300 Interdisciplinary Social Impact Course Project**  
> A voluntary, empathetic, daily emotional well-being check-in web application for university students.

---

## 🎯 Project Overview & Purpose

CampusPulse helps university students take a mindful, 15-second pause to reflect on their daily energy, campus belonging, and peer community support. It bridges the gap between academic pressure and emotional literacy, connecting students with confidential campus guidance resources.

### ⚡ Under 15-Second Flow Design
* **Direct Hero Check-in:** The home page immediately asks *"Hey! How are you feeling today?"* with 5 large interactive emojis and a prominent *Continue* button.
* **3-Core Student Navigation:** Streamlined to `Check-in`, `My Progress`, and `Get Support`.
* **3+1 Step Flow:** Mood ➔ Campus comfort ➔ Optional peer support ➔ Optional 140-char note.

### ⚠️ Non-Diagnostic & Safety Commitments
* **Not a clinical diagnosis tool:** CampusPulse does not categorize mental disorders, compute psychological pathology scores, or predict violence.
* **100% Voluntary & Anonymous:** No student ID numbers, full names, IP logs, or classmate identities are recorded.
* **Local-First Demo:** This prototype uses browser `localStorage` for temporary demonstration and testing.
* **Responsible Support Links:** All counseling references are clearly labeled placeholders; no false phone numbers or claims of automated authority alerts are made.

---

## 🌍 UN Sustainable Development Goals Alignment

CampusPulse directly addresses two United Nations Sustainable Development Goals:
1. **UN SDG 3: Good Health & Well-Being (Target 3.4):** Promoting mental health, emotional self-awareness, and reducing social stigma across university campuses.
2. **UN SDG 16: Peace, Justice & Safe Institutions:** Fostering respectful, inclusive, and psychologically safe campus environments with mutual peer empathy without disciplinary surveillance.

---

## 🚀 Quick Start: Running the Project Locally

```bash
# 1. Open your terminal and navigate to the project directory
cd campuspulse

# 2. Start the local Next.js development server
npm run dev
```

Then open your web browser and visit:  
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧭 Page Architecture & Features

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home / Quick Start** | Immediate greeting (*"Hey! How are you feeling today?"*), 5 large selectable emojis, and a single *Continue* CTA that pre-fills and jumps straight into check-in. |
| `/check-in` | **Daily Check-in** | Focused 3+1 flow: <br>• **Q1:** Energy & mood (5 expressive clickable emoji options)<br>• **Q2:** Campus comfort and safety (Yes / Partially / No)<br>• **Q3:** Peer support observation (Optional: Yes / No / Prefer not to say)<br>• **Q4:** Reflection (Optional, max 140 chars)<br>• Celebratory confetti animation upon completion! |
| `/dashboard` | **My Progress** | Personal wellness view featuring today's check-in status, 7-day mood history chart, and stored reflection log. Includes **Tier 1 Support Rule** (triggers an empathetic counseling offer if 4 consecutive low-energy days are logged). |
| `/support` | **Get Support** | 3 clear sections: (1) Everyday campus support tips, (2) University Counseling Center (PDRM) placeholders, (3) Standard crisis & emergency hotlines (112 / 988). |
| `/counselor-demo` | **Counselor Demo** | Clearly labeled academic demonstration view showing how an authorized counselor might view voluntary student support requests in a future production system. Outside ordinary student navigation. |
| `/about` | **About & Ethics** | GLB300 course context, UN SDG 3 & 16 alignment, ethics charter, and Phase 2 technical roadmap. |

---

## 🧪 Special Demonstrations for Evaluators

1. **Test Tier 1 Support Rule:**  
   Navigate to **My Progress** (`/dashboard`) and click **"Test Tier 1 Rule"** (`⚡`). It will load 4 simulated consecutive low-energy days (mood level 1 or 2) and immediately display the prototype counseling support card. Click **Reset** (`🔄`) to return to standard demo entries.
2. **Counselor View Prototype:**  
   Access **Counselor Demo ↗** via the footer or mobile menu to preview the conceptual counselor intake interface with simulated student requests.

---

## 📂 Project Structure

```text
campuspulse/
├── app/
│   ├── layout.tsx              # Root HTML shell, Navbar, DemoBanner, and Footer
│   ├── globals.css             # Tailwind CSS v4 directives, custom font stack & animations
│   ├── page.tsx                # Simplified Home check-in start
│   ├── check-in/
│   │   └── page.tsx            # Smooth 3+1 step check-in flow with celebration
│   ├── dashboard/
│   │   └── page.tsx            # My Progress dashboard & Tier 1 low-mood rule trigger
│   ├── support/
│   │   └── page.tsx            # 3-section Get Support hub
│   ├── counselor-demo/
│   │   └── page.tsx            # Separate simulated counselor demo view
│   └── about/
│       └── page.tsx            # GLB300 social impact, SDG 3/16, and ethics manifesto
├── components/
│   ├── Navbar.tsx              # 3-item navigation (Check-in, My Progress, Get Support)
│   ├── Footer.tsx              # Footer with About, Counselor Demo, disclaimers & SDG links
│   ├── DemoBanner.tsx          # Dismissable top banner explaining prototype status
│   ├── MoodSelector.tsx        # 5 reactive emoji cards with animated hover/select feedback
│   ├── CampusFeelingSelector.tsx # Q2 illustrated card selector
│   ├── PeerSupportSelector.tsx # Q3 peer empathy selector + educational tips
│   ├── ConfettiCelebration.tsx # Lightweight pure CSS/SVG celebratory particles
│   └── MoodTrendChart.tsx      # Interactive 7-day visual mood rhythm chart
└── lib/
    ├── types.ts                # TypeScript data contracts (CheckInEntry, MoodLevel, etc.)
    └── storage.ts              # LocalStorage manager + Tier 1 rule detector + low-mood simulation
```
