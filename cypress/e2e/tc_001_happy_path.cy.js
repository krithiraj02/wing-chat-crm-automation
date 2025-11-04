import { getAuthToken } from "../support/helpers";

let conversationId;   // ⬅️ store globally for cleanup
let token;

describe("✅ Happy Path – Conversation → CRM UI Validation", () => {
  before(() => {
    cy.log("🟦 Fetching Supabase Auth Token…");
    return getAuthToken().then((t) => {
      expect(t, "Auth token should exist").to.exist;
      token = t;
    });
  });

  it("✅ should create conversation & validate in CRM UI", () => {
    const sampleMessage =
      "tell me about what can i do in trycentral how will you help others";

    const workspace_id = "e6d745de-8393-451b-831f-9746e53fdfdb";
    const profile_id = "907d1b16-eda1-4f7c-93d6-b571b0afbd39";

    cy.log("🟦 TC START → Happy Path Test started");

    // ✅ STEP-2 → Create conversation using API
    cy.log("🟦 STEP-2 → Creating conversation using API…");
    cy.request({
      method: "POST",
      url: "https://assistant.wing.work/conversations/create",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        query: sampleMessage,
        workspace_id,
        profile_id,
      },
    }).then((res) => {
      cy.log("📩 API Response:", JSON.stringify(res.body));
      expect(res.status).to.eq(200);

      conversationId = res.body.conversation_id;   // ✅ store for cleanup
      expect(conversationId, "Conversation ID").to.exist;
      cy.log("✅ Conversation created → " + conversationId);

      // ✅ STEP-3 → Login
      cy.login();
      cy.url({ timeout: 10000 }).should("include", "/myday");

      cy.contains("Ask Central", { timeout: 15000 })
        .should("be.visible")
        .click();

      cy.get("textarea[placeholder='Ask me anything...']:visible", {
        timeout: 15000,
      })
        .click()
        .type(sampleMessage, { delay: 10 })
        .type("{enter}");

      cy.wait(20000);

      cy.contains("div.markdown-content.text-black", sampleMessage, {
        timeout: 30000,
      })
        .scrollIntoView()
        .should("exist");

      cy.contains("Assistant", { timeout: 20000 })
        .should("be.visible")
        .click();

      cy.url().should("include", "/assistant");

      cy.wait(10000);

      cy.contains(sampleMessage, { timeout: 30000 })
        .scrollIntoView()
        .should("exist");

      cy.log("🎉 ✅ TEST PASSED → Happy Path Flow Successful");
    });
  });

  // ✅ CLEANUP
  after(() => {
    if (!conversationId) {
      cy.log("⚠️ No conversation ID → skipping cleanup");
      return;
    }

    cy.log("🧹 Cleanup → deleting conversation → " + conversationId);

    cy.request({
      method: "DELETE",
      url: `https://assistant.wing.work/conversations/${conversationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    }).then((res) => {
      cy.log(`🧹 Cleanup response → ${res.status}`);
      expect([200, 204, 404]).to.include(res.status);
    });
  });
});

