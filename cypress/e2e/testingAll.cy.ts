describe("MovieApp", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Happy flow med riktig API", () => {
    cy.get("#searchText").type("Batman");
    cy.get("#search").click();

    cy.get(".movie").should("exist");
    cy.get(".movie h3").first().should("contain.text", "Batman");
  });

  it("Mockad data", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movies.json" }).as("mockMovies");

    cy.get("#searchText").type("Star Wars");
    cy.get("#search").click();

    cy.wait("@mockMovies");
    cy.get(".movie").should("have.length", 3);
  });

  it("Visar meddelande om inga resultat", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { body: { Search: [] } });

    cy.get("#searchText").type("asdfghjklqwerty");
    cy.get("#search").click();

    cy.contains("Inga sökresultat att visa").should("exist");
  });

  it("Sorterar filmer i rätt ordning", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movies-unsorted.json" });

    cy.get("#searchText").type("sorttest");
    cy.get("#search").click();
    cy.get("#sortBtn").click();

    cy.get(".movie h3").then(($titles) => {
      const texts = [...$titles].map((el) => el.innerText);
      const sorted = [...texts].sort(); 
      expect(texts).to.deep.equal(["Avengers", "Batman", "Superman"]);
    });
  });
});
