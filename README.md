# ✅ Wing Chat – Conversation → CRM Automation

This repository contains automated tests validating:

> **Lead intake via Chat Agent → CRM conversation record creation**

Built using **Cypress (API + UI)**.

---

## ✅ Scope

Covers the required 4 scenarios:

1) ✅ Happy Path – Create conversation → Validate CRM  
2) ✅ Negative case – invalid data / missing inputs  
3) ✅ Edge cases – long message, special characters, rapid sends  
4) ✅ UI ↔ API cross-check  

Additional features:
- Token generation via Supabase
- Cleanup of created conversation data
- Multiple retries for CRM propagation

---

## ✅ Folder Structure

project/
├─ cypress/
│ ├─ e2e/
│ │ ├─ tc_001_happy_path.cy.js
│ │ ├─ tc_002_negative_scenario.cy.js
│ │ ├─ tc_003_edge_cases.cy.js
│ │ └─ tc_004_ui_api_cross_check.cy.js
│ ├─ fixtures/
│ ├─ support/
│ │ ├─ commands.js
│ │ ├─ e2e.js
│ │ └─ helpers.js
├─ .github/
│ └─ workflows/
│ └─ ci.yml
├─ .env.example
├─ cypress.config.js
├─ package.json
└─ README.md


---

## ✅ 1) Setup Instructions

### Clone repo
```bash
git clone <REPO_URL>
cd project
npm install


Create .env
cp .env.example .env

Fill values inside .env:

WING_URL=
WING_USERNAME=
WING_PASSWORD=
SUPABASE_URL=
SUPABASE_KEY=
⚠️ Do NOT commit .env
Cypress reads env variables via process.env.*

✅ 2) Running Tests Locally
Headless mode
npx cypress run --headless

UI Mode
npx cypress open


Screenshots + Videos (on failure):

cypress/screenshots
cypress/videos

✅ 3) Running in CI (GitHub Actions)

Workflow file:

.github/workflows/ci.yml


Steps performed:

Install dependencies

Run Cypress (headless)

Set secrets in:

GitHub → Settings → Secrets → Actions


Required secrets:

WING_USERNAME
WING_PASSWORD
SUPABASE_URL
SUPABASE_KEY

✅ 4) Environment Variables
Key	Purpose
WING_URL	Base web app URL
WING_USERNAME	Login user
WING_PASSWORD	Login password
SUPABASE_URL	Token generation
SUPABASE_KEY	Token generation
✅ 5) Cleanup

Tests delete created conversations:

DELETE /conversations/:id


✅ Idempotent — if record missing → still OK

✅ 6) Design Choices
✅ Selector Strategy

Use visible + stable selectors

Prefer text or placeholder-based selection

Avoid dynamic locators

✅ Wait / Retry Strategy

Cypress auto-retry for UI

Explicit waits only for CRM → UI sync

CRM → API polling up to ~30 sec

✅ Test Data Strategy

Use unique timestamps

Clean data post-run (after hooks)

API used to validate correctness

Why Cypress?

UI + API together

Auto retry

Screenshots/video

Easy CI integration

✅ 7) Test Scenarios Covered
Test Case	Description
TC-001	Happy path
TC-002	Negative case
TC-003	Edge cases
TC-004	UI ↔ API validation
✅ 8) Commands Included
Command	Purpose
cy.login()	UI Login
getAuthToken()	Token retrieval via Supabase
cleanup in after()	Deletes created conversation
✅ 9) How to Extend

Validate webhook triggers

Multi-agent assignment checks

Conversation tagging rules

✅ 10) Notes

.env.example included

.env not committed

CI runs on every push

Runs in headless mode

Supabase token for auth