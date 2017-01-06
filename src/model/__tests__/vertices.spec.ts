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
import Edge from "../edge";

describe("Vertice", function() {
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

  it("Remove vertice from graph", () => {
    const model = new Model();

    const node1 = new Vertice({ x: 0, y: 0 });
    const node2 = new Vertice({ x: 4, y: 0 });
    const node3 = new Vertice({ x: 0, y: 4 });

    const edge1 = new Edge(node1, node2);
    const edge2 = new Edge(node1, node3);
    const edge3 = new Edge(node2, node3);

    return expect(
      model.add([node1, node2, node3]).then(m => m.add([edge1, edge2, edge3]))
        .then(m => m.remove(node1)
        .then(m => [m.vertices.length, node2.edges.size, node3.edges.size]))
    ).eventually.deep.equal([2, 1, 1]);
  });
});
