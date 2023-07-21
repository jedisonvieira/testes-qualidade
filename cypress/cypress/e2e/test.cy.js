// cypress/integration/cnpq_search.spec.js

describe("CNPq Search Page", () => {
  beforeEach(() => {
    // Listen to uncaught exceptions and prevent Cypress from failing the test
    cy.on("uncaught:exception", () => {
      return false;
    });

    cy.visit(
      "https://buscatextual.cnpq.br/buscatextual/busca.do?metodo=apresentar"
    );
  });

  it("should set search text and check/uncheck checkboxes", () => {
    cy.get("#buscarDemais").should("be.visible");
    cy.get("#buscarBrasileiros").should("be.visible");
    cy.get("#buscarEstrangeiros").should("be.visible");
    cy.get("#buscarDoutores").should("be.visible");

    cy.get("#textoBusca").type("jedison vieira");
    cy.get("#buscarDemais").check().should("be.checked");
    cy.get("#buscarBrasileiros").check().should("be.checked");
    cy.get("#buscarEstrangeiros").uncheck().should("not.be.checked");
    cy.get("#buscarDoutores").uncheck().should("not.be.checked");

    cy.get(".control-bar-wrapper > #botaoBuscaFiltros").should('be.visible').click();

    cy.url().should("include", "/busca.do");

    cy.get("ol li").contains("Jedison Vieira Junior").should("exist");
    cy.get("ol li").contains("Jedison Vieira Junior").click();

    cy.get('#idbtnabrircurriculo').should('be.visible');
  });
});
