describe("MovieApp – Data från API:t", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("hämtar filmer från OMDB API", () => {
    cy.get("#searchText").type("Spider-Man");
    cy.get("#search").click();

    cy.get(".movie").should("have.length.greaterThan", 0);
    cy.get(".movie h3").first().should("contain.text", "Spider");
  });
});
