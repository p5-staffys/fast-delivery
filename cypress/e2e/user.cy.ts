describe("Full User App Run", () => {
  it("User Log In", () => {
    cy.visit("/");

    cy.get(":nth-child(1) > .MuiInputBase-root > #standard-basic").type(Cypress.env("USER_EMAIL"));
    cy.get(":nth-child(1) > .MuiInputBase-root > #standard-basic").should("have.value", Cypress.env("USER_EMAIL"));

    cy.get(":nth-child(2) > .MuiInputBase-root > #standard-basic").type(Cypress.env("USER_PASSWORD"));
    cy.get(":nth-child(2) > .MuiInputBase-root > #standard-basic").should("have.value", Cypress.env("USER_PASSWORD"));

    cy.get(".MuiButtonBase-root").click();
    cy.url().should("include", "/deliveryMan/workingDay");

    cy.get('[style="text-decoration: none;"] > .MuiButtonBase-root').click();
    cy.url().should("include", "/deliveryMan/workingDay/getPackages");

    cy.get(":nth-child(3) > .css-ncmk3f > .MuiBox-root > :nth-child(3)").click();
  });
});
