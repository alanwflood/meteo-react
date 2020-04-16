describe("Initial Page", () => {
  before(() => {});

  beforeEach(() => {
    cy.unregisterServiceWorkers();
    cy.clearLocalStorage();
    cy.visit("http://localhost:5000");
  });

  it("Shows the Initial Page", () => {
    cy.contains("Meteo");
    cy.contains("Weather at a Glance");
    cy.contains("Search for a location");
    cy.contains("Search for a location");
    cy.get("input");
    cy.get("button[type='submit']");
  });

  it("Has a dropdown containing places", () => {
    cy.get("input").type("Dublin, Ireland");
    cy.get(".search-dropdown").contains("Dublin, Ireland");
  });

  it("Clicking a place takes you to the weather page", () => {
    cy.get("input").type("Dublin, Ireland");
    cy.get(".search-dropdown").contains("Dublin, Ireland").click();
    cy.contains(/(Today|Tomorrow)/g);
    cy.contains("Min Temperature");
    cy.contains("Max Temperature");
    cy.contains("Avg Temperature");
    cy.contains("Rainfall");
    cy.contains("Temperature");
    cy.contains("Windspeed");
    cy.contains("Humidity");
  });

  it("Reloading shows the same place", () => {
    cy.get("input").type("Dublin, Ireland");
    cy.get(".search-dropdown").contains("Dublin, Ireland").click();
    cy.contains(/(Today|Tomorrow)/g);
    cy.contains("Min Temperature");
    cy.contains("Max Temperature");
    cy.contains("Avg Temperature");

    cy.reload();
    cy.contains(/(Today|Tomorrow)/g);
    cy.contains("Min Temperature");
    cy.contains("Max Temperature");
    cy.contains("Avg Temperature");
  });
});
