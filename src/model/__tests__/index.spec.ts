/**
 * Tests stuff
 */
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";

const expect = chai.expect;
chai.use(chaiAsPromised);

/**
 * Code under test
 */
import Model from "../";
import Vertice from "../vertice";

describe("Graph", function() {
  it("Model class", () => {
    const model = new Model();
    expect(model).to.respondTo("add");
    expect(model).to.respondTo("remove");
    expect(model).to.respondTo("getRoute");
    expect(model).to.have.property("vertices");
  });

  it("Add standalone vertice to graph", () => {
    const model = new Model();
    const vertice = new Vertice({x: 0, y: 0});
    return Promise.all([
      expect(vertice.edges).to.be.empty,
      expect(model.add(vertice)
        .then(m => m.vertices.length)).eventually.equals(1),
    ]);
  });

  it("Add vertice to graph as array", () => {
    const model = new Model();
    const vertice = new Vertice({x: 0, y: 0});
    return Promise.all([
      expect(model.add([vertice])
        .then(m => m.vertices.length)).eventually.equals(1),
    ]);
  });

  it("Add the same vertice to graph twice do not produce duplicates", () => {
    const model = new Model();
    const vertice = new Vertice({x: 0, y: 0});
    return Promise.all([
      expect(
        model.add(vertice)
        .then(m => m.add(vertice))
        .then(m => m.vertices.length),
      ).eventually.equals(1),
    ]);
  });
});
