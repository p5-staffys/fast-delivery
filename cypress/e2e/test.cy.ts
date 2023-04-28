describe("Full App Run", () => {
  it("Landing to User", () => {
    cy.visit("https://frontend-buhubxjtrq-ue.a.run.app/");

    cy.get('[href="/deliveryMan"] > .MuiButtonBase-root').click();

    cy.url().should("include", "/deliveryMan");
  });

  it("User Log In", () => {
    cy.visit("https://frontend-buhubxjtrq-ue.a.run.app/deliveryMan");

    //  Verify that the value has been updated
    cy.get(".action-email").should("have.value", "fake@email.com");
  });
});
