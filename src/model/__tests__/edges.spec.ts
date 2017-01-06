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

describe("Edge", function() {
  it("Edge class", () => {
    const node1 = new Vertice({ x: 0, y: 0 });
    const node2 = new Vertice({ x: 2, y: 2 });
    const edge = new Edge(node1, node2);
    expect(edge).to.have.property("vertices");
  });

  it("Add edge to graph", () => {
    const model = new Model();
    const node1 = new Vertice({ x:  7, y: -2 });
    const node2 = new Vertice({ x: -2, y:  5 });
    const edge = new Edge(node1, node2);
    return Promise.all([
      expect(model.add(edge)
        .then(() => node1.edges.has(edge))).eventually.be.true,
      expect(model.add(edge)
        .then(() => node2.edges.has(edge))).eventually.be.true,
      expect(model.add(edge)
        .then(() => edge.weight)).eventually.be.closeTo(11.4, 11.4),
      expect(model.add(edge)
        .then(m => m.edges.length)).eventually.equal(1),
    ]);
  });

  it("Remove edge from graph", () => {
    const model = new Model();
    const node1 = new Vertice({ x: 0, y: 0 });
    const node2 = new Vertice({ x: 2, y: 2 });
    const edge = new Edge(node1, node2);
    return Promise.all([
      expect(model.add(edge)
      .then(m => m.remove(edge))
      .then(m => m.edges.length)).eventually.equal(0),
    ]);
  });
});
