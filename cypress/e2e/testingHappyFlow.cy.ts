describe("MovieApp – Happy flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("söker film och visar resultat från API:t", () => {
    cy.get("#searchText").type("Batman");
    cy.get("#search").click();

    cy.get(".movie").should("exist");
    cy.get(".movie h3").first().should("contain.text", "Batman");
  });
});