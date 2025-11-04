import { getAuthToken } from "../support/helpers";

describe("TC-003 – Edge Case Tests", () => {
  const workspace_id = "e6d745de-8393-451b-831f-9746e53fdfdb";
  const profile_id = "907d1b16-eda1-4f7c-93d6-b571b0afbd39";

  let token;
  let createdIds = [];

  before(() => {
    cy.then(() => getAuthToken()).then((t) => {
      expect(t).to.exist;
      token = t;
    });
  });

  //
  // ✅ 3.1 → Very long message
  //
  it("✅ should handle extremely long message text", () => {
    const longMsg = "A".repeat(2000);

    cy.request({
      method: "POST",
      url: "https://assistant.wing.work/conversations/create",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        query: longMsg,
        workspace_id,
        profile_id,
      },
      failOnStatusCode: false,
    }).then((res) => {
      if (res.body?.conversation_id) {
        createdIds.push(res.body.conversation_id);
      }
      expect([200, 413]).to.include(res.status);
    });
  });

  //
  // ✅ 3.2 → Special characters
  //
  it("✅ should accept special characters message", () => {
    const specialMsg = "!@#$%^&*()_+{}|:\"<>?[];',./`~";

    cy.request({
      method: "POST",
      url: "https://assistant.wing.work/conversations/create",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        query: specialMsg,
        workspace_id,
        profile_id,
      },
      failOnStatusCode: false,
    }).then((res) => {
      if (res.body?.conversation_id) {
        createdIds.push(res.body.conversation_id);
      }
      expect([200, 400]).to.include(res.status);
    });
  });

  //
  // ✅ 3.3 → Rapid multi-message
  //
  it("✅ should handle rapid burst of multiple messages", () => {
    const messages = [
      "quick msg 1",
      "quick msg 2",
      "quick msg 3",
      "quick msg 4",
      "quick msg 5",
    ];

    messages.forEach((msg) => {
      cy.request({
        method: "POST",
        url: "https://assistant.wing.work/conversations/create",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          query: msg,
          workspace_id,
          profile_id,
        },
        failOnStatusCode: false,
      }).then((res) => {
        if (res.body?.conversation_id) {
          createdIds.push(res.body.conversation_id);
        }
        expect([200, 429]).to.include(res.status);
      });
    });
  });

  //
  // ✅ CLEANUP
  //
  after(() => {
    if (!createdIds.length) {
      cy.log("⚠️ No conversations to cleanup");
      return;
    }

    cy.log(`🧹 Cleanup → deleting ${createdIds.length} conversations`);

    createdIds.forEach((id) => {
      cy.request({
        method: "DELETE",
        url: `https://assistant.wing.work/conversations/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false,
      }).then((res) => {
        cy.log(`🧹 Deleted → ${id} (status ${res.status})`);
      });
    });
  });
});
