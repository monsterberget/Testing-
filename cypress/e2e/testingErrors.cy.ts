describe("MovieApp – Sortering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("sorterar filmer i alfabetisk ordning", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movies-unsorted.json" }).as("mockUnsorted");

    cy.get("#searchText").type("sorttest");
    cy.get("#search").click();
    cy.wait("@mockUnsorted");
    cy.get("#sortBtn").click();
    
    cy.get(".movie h3").then(($titles) => {
      const texts = [...$titles].map((el) => el.innerText);
      expect(texts).to.deep.equal(["Avengers", "Batman", "Superman"]);
    });
  });
});

