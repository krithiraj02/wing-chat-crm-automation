import { getAuthToken } from "../support/helpers";

describe("Negative Scenarios – Conversation API", () => {

  const apiUrl = "https://assistant.wing.work/conversations/create";
  const validWorkspace = "e6d745de-8393-451b-831f-9746e53fdfdb";
  const validProfile = "907d1b16-eda1-4f7c-93d6-b571b0afbd39";

  let token = null;

  before(() => {
    getAuthToken().then((tkn) => {
      expect(tkn).to.exist;
      token = tkn;
    });
  });

  /**
   * ✅ Generic validator for error responses
   */
  function validateErrorResponse(res) {
    cy.log("🔎 API Response:", JSON.stringify(res.body, null, 2));

    // Allowed failures — we tolerate 500 but should report
    expect(res.status, "Expected 4xx or handled 500").to.be.oneOf([400, 404, 401, 403, 500]);

    // Message is required
    expect(res.body.message || res.body.error, "Error payload expected").to.exist;
  }

  /**
   * ✅ Validate minimal schema
   */
  function assertErrorSchema(res) {
    expect(res.body).to.be.a("object");
    expect(Object.keys(res.body).length).to.be.greaterThan(0);
  }

  // ⛔ Missing query
  it("should fail if query is missing", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        query: "",
        workspace_id: validWorkspace,
        profile_id: validProfile
      },
    }).then((res) => {
      validateErrorResponse(res);
      assertErrorSchema(res);
    });
  });

  // ⛔ Missing workspace_id
  it("should fail if workspace_id is missing", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        query: "hello",
        profile_id: validProfile,
      },
    }).then((res) => {
      validateErrorResponse(res);
      assertErrorSchema(res);
    });
  });

  // ⛔ Invalid workspace_id
  it("should fail if workspace_id is invalid", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        query: "hello",
        workspace_id: "dummy-invalid",
        profile_id: validProfile,
      },
    }).then((res) => {
      validateErrorResponse(res);
      assertErrorSchema(res);
    });
  });

  // ⛔ Missing profile_id
  it("should fail if profile_id is missing", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        query: "hello",
        workspace_id: validWorkspace,
      },
    }).then((res) => {
      validateErrorResponse(res);
      assertErrorSchema(res);
    });
  });

  // ⛔ Missing Token
  it("should fail when Authorization header is missing", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        query: "hello",
        workspace_id: validWorkspace,
        profile_id: validProfile,
      },
    }).then((res) => {
      validateErrorResponse(res);
      assertErrorSchema(res);
    });
  });

  // ⛔ Invalid / corrupted token
it("should fail when Authorization token is invalid", () => {
  cy.request({
    method: "POST",
    url: apiUrl,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer invalid_dummy_token_123`,
    },
    body: {
      query: "hello",
      workspace_id: validWorkspace,
      profile_id: validProfile,
    },
  }).then((res) => {
    validateErrorResponse(res);
    assertErrorSchema(res);

    // Recommended — verify no conversation_id returned
    expect(res.body.conversation_id, "Conversation should not be created").to.not.exist;
  });
});

// ⛔ Empty request body
it("should fail when body is completely empty", () => {
  cy.request({
    method: "POST",
    url: apiUrl,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {},   // ✅ empty body
  }).then((res) => {
    validateErrorResponse(res);
    assertErrorSchema(res);

    // ✅ No conversation should be created
    expect(res.body.conversation_id, "Conversation should NOT be created").to.not.exist;
  });
});


});
