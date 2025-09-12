describe("MovieApp – Mockad data", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("visar fixture-filmer istället för riktiga API:t", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movies.json" }).as("mockMovies");

    cy.get("#searchText").type("Star Wars");
    cy.get("#search").click();

    cy.wait("@mockMovies");
    cy.get(".movie").should("have.length", 3);
    cy.get(".movie h3").first().should("contain.text", "Batman Begins");
  });

  it("visar meddelande om inga resultat", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { body: { Search: [] } });

    cy.get("#searchText").type("Bob Loblaw");
    cy.get("#search").click();

    cy.contains("Inga sökresultat att visa").should("exist");
  });
});

