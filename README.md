Wing Chat CRM – Cypress E2E Automation

This repository contains end-to-end automation test cases for Wing Chat CRM, covering UI + API flows using Cypress.
The goal is to validate lead intake, CRM record updates, and cross-system data consistency.

✅ Tech Stack

Cypress

Node.js

JavaScript

dotenv

GitHub Actions (CI)

✅ Folder Structure
wing-chat-crm-automation
│
├── cypress
│   ├── e2e
│   │   ├── tc_001_happy_path.cy.js
│   │   ├── tc_002_negative_scenario_invalid_data.cy.js
│   │   ├── tc_003_edge_case_scenario_with_long_message.cy.js
│   │   └── tc_004_ui_api_cross_check.cy.js
│   ├── fixtures
│   ├── support
│
├── .github/workflows/ci.yml     → CI config
├── cypress.config.js
├── package.json
└── README.md

✅ Test Scenarios
ID	Scenario	Status
TC-001	Happy path – Chat intake → validate CRM entry	✅
TC-002	Invalid data form submission	✅
TC-003	Edge case – long message input	✅
TC-004	UI → API data cross-validation	✅
✅ Environment Variables

The following values must be available before running tests:

Key	Description
WING_URL	Base URL
WING_USERNAME	CRM username
WING_PASSWORD	CRM password
WING_TOKEN	(If required) auth token
✅ Local Usage — .env

Create a .env file and add:

WING_URL=https://test.wing.work
WING_USERNAME=<username>
WING_PASSWORD=<password>
WING_TOKEN=<token>


✅ .env is ignored from Git for security.

✅ Install & Run
1) Clone repo
git clone <repo-url>
cd wing-chat-crm-automation

2) Install
npm install

3) Run tests (headed)
npx cypress open

4) Run tests (headless)
npm run test

✅ CI Execution (GitHub Actions)

Tests run automatically on:
✅ Any push
✅ Any pull request

CI file:

.github/workflows/ci.yml


Artifacts uploaded on failure:
✅ Cypress screenshots
✅ Cypress videos (optional)

Required GitHub Secrets:

WING_URL

WING_USERNAME

WING_PASSWORD

WING_TOKEN

✅ Short Note — Design Choices
✅ Selector Strategy

Used stable selectors like data-testid, role, and text

Avoided fragile CSS and nth-child selectors

Ensures tests remain stable during UI styling changes

✅ Wait Strategy

Relied on Cypress auto-retry

Used cy.intercept() + waits for network sync

Minimal use of cy.wait() → only for controlled async cases

✅ Flakiness Mitigation

Tests are isolated and independent

Avoided chaining too many UI waits

Assertions added after DOM/API sync

Stable selectors → fewer flaky failures

✅ Test Data Strategy

Sensitive credentials via env vars

Static reusable payloads via fixtures

No hard-coded credentials

Helper reused for login

✅ Structure & Naming

File naming format:

tc_<number>_<description>.cy.js


✅ Improves readability & reporting
✅ Easy grouping when scaling test suite

✅ Known Limitations

Tests require valid credentials to fully pass

CI may fail without valid tokens/credentials

Data cleanup may be required for repeat runs

✅ How to Extend

Add parallel execution

Add dashboard reporting

Expand fixture-based data strategy

Add more business-workflow case coverage

✅ Conclusion

This automation suite:
✅ Covers primary user journeys
✅ Validates UI + API sync
✅ Uses stable selectors + retry logic
✅ Designed to be maintainable, scalable, and CI-ready