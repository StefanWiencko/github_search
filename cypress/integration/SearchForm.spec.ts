import {
  generateData,
  aliasQuery,
  hasOperationName,
} from "../../utils/graphql-test-utils";
describe("SearchForm input", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("POST", "/search/**", (req) => {
      aliasQuery(req, "getSearchResoluts");
    });
  });
  it("fails if input empty", () => {
    cy.get("input:invalid").should("have.length", 1);
    cy.get("#searchbox")
      .invoke("prop", "validationMessage")
      .should("equal", "Wypełnij to pole.");
    cy.get('input[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  context(
    "checks aftefEach if either there are search resoluts or 'No resoluts found' message",
    () => {
      afterEach(() => {
        cy.get("section").then(($container) => {
          if ($container.find("div").length) {
            cy.get("section > div").should("exist");
          } else {
            cy.get("section > h2").should("have.text", "No resoluts found");
          }
        });
      });
      it("submits correctly after pressing enter", () => {
        const text = "sample1";
        cy.get('input[type="text"]').type(`${text}{enter}`);
        cy.url().should("include", `/search/${text}`);
        cy.get('input[type="text"]').should("have.value", "");
      });
      it("submits correctly after clicking btn", () => {
        const text = "sample2";
        cy.get('input[type="text"]').type(text);
        cy.get('input[type="submit"]').click();
        cy.url().should("include", `/search/${text}`);
        cy.get('input[type="text"]').should("have.value", "");
      });

      it("works correctly by typing url", () => {
        const text = "swagasfasfasfasfasfasfasfasf";
        cy.visit(`http://localhost:3000/search/${text}`);
      });
      it.only("displays message correctly if no resoluts were found", () => {
        cy.visit(`http://localhost:3000/search/a`);
      });
    }
  );
});
export {};
