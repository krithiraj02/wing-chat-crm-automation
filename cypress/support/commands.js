Cypress.Commands.add("login", () => {
  cy.visit("https://test.wing.work/login");

  cy.get('input[name="email"], #email, input[type="email"]', { timeout: 10000 })
    .first()
    .should("be.visible")
    .type(Cypress.env("WING_USERNAME"));

  cy.get('input[name="password"], #password, input[type="password"]', { timeout: 10000 })
    .first()
    .should("be.visible")
    .type(Cypress.env("WING_PASSWORD"), { log: false });

  cy.get('button[type="submit"]').click();
});


Cypress.Commands.add("getIframeBody", () => {
  return cy
    .get("iframe", { timeout: 10000 })
    .eq(1)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});


