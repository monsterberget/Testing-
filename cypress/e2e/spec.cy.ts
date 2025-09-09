describe('Movie App', () => {
  it('loads the app', () => {
    cy.visit('http://localhost:5173');
    cy.get('#searchForm').should('exist');
  });
});