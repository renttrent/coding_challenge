describe("Startup List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/startups");
    cy.wait("@getStartups");
  });

  it("should display list of startups with basic info", () => {
    cy.get("#startup-list").find(".MuiGrid-item").should("have.length", 2);
    cy.contains("Biotechnix").should("be.visible");
    cy.contains("Fujinet").should("be.visible");
    cy.contains(
      "Prosthetics corporation allied with Dr. Octopus to control mutilated influential people"
    ).should("be.visible");
    cy.contains("Founded: 2002").should("be.visible");
    cy.contains("<10 Employees").should("be.visible");
    cy.contains("102 $").should("be.visible");
    cy.contains("Series A").should("be.visible");
  });
});
