// https://on.cypress.io/api

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/")
    cy.contains("h1", "Calculator")
  });

  it("display should hold state", () => {
    cy.visit("/");

    cy.get("#route-to-home").should("exist");
    cy.get("#route-to-contact").should("exist");
    cy.get("#calculator-display").should("exist");

    cy.get("button").contains("1").click();
    cy.get("button").contains("2").click();
    cy.get("button").contains("3").click();

    cy.get("#calculator-display").contains("123");

    cy.get("#route-to-contact").click();
    cy.location("pathname").should("eq", "/contact");
    cy.get("#route-to-home").click();

    cy.get("#calculator-display").contains("123");
  });
});
