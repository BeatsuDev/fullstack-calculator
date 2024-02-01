// https://on.cypress.io/api

describe("Contact schema", () => {
    it("submitting should send a post request", () => {
      cy.visit("/contact");

      cy.intercept("POST", "/api/contact", {
        statusCode: 200,
        body: { message: "success" },
      }).as("contact");
  
      cy.get("input#name").should("exist");
      cy.get("input#email").should("exist");
      cy.get("textarea#message").should("exist");
      cy.get("button[type='submit']").should("exist");
    });
  });
  