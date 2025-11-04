export const getIframeBody = (selector = "iframe") => {
  return cy
    .get(selector)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
};
