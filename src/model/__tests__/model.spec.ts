/**
 * Tests stuff
 */
 import { expect } from "chai";

/**
 * Code under test
 */
import Model from "../";

describe("Graph", function() {
  it("Model class", () => {
    const model = new Model();
    expect(model).to.respondTo("add");
    expect(model).to.respondTo("remove");
    expect(model).to.respondTo("getRoute");
    expect(model).to.have.property("vertices");
  });
});
