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
import Edge from "../edge";
import Vertice from "../vertice";

const graph = new Model();

/**
 * See ${filename}.svg nearbe
 */
const node1 = new Vertice({ x:  5, y: 10 });
const node2 = new Vertice({ x: -2, y: 6  });
const node3 = new Vertice({ x:  3, y: 7  });
const node4 = new Vertice({ x:  2, y: 2  });
const node5 = new Vertice({ x: -2, y: 2  });
const node6 = new Vertice({ x: -4, y: 10 });

node1.name = "node1";
node2.name = "node2";
node3.name = "node3";
node4.name = "node4";
node5.name = "node5";
node6.name = "node6";

describe("Routes, set v.1", function() {
  const edge23 = new Edge(node2, node3);
  const edge31 = new Edge(node1, node3);
  const edge41 = new Edge(node4, node1);
  const edge42 = new Edge(node4, node2);
  const edge45 = new Edge(node4, node5);
  const edge52 = new Edge(node5, node2);
  // node6 is not connected

  before(() => {
    return graph.add([node1, node2, node3, node4, node5, node6]).then(g => {
      return g.add([edge31, edge23, edge41, edge42, edge45, edge52]);
    });
  });

  it("Ensure single-edge route between adjacent Vertices", () => {
    return Promise.all([
      expect(graph.getRoute(node2, node5)).eventually.deep.equal([edge52]),
      expect(graph.getRoute(node5, node2)).eventually.deep.equal([edge52]),
    ]);
  });

  it("Calculate shortest way between two Vertices", () => {
    return Promise.all([
      expect(graph.getRoute(node2, node1)).eventually.deep.equal([edge23, edge31]),
      expect(graph.getRoute(node1, node5)).eventually.deep.equal([edge41, edge45]),
      expect(graph.getRoute(node3, node4)).eventually.deep.equal([edge23, edge42]),
    ]);
  });

  it("Route with unreacheable Vertice", () => {
    return Promise.all([
      expect(graph.getRoute(node6, node1)).eventually.be.undefined,
      expect(graph.getRoute(node4, node6)).eventually.be.undefined,
    ]);
  });
});
