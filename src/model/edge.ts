class Edge implements Elje.Edge {
  public readonly vertices;
  public readonly weight: number;
  public readonly type = "edge";

  protected hookParent(node: Elje.Vertice) {
    if (Array.isArray(node.edges)) {
      node.edges.push(this);
    } else {
      node.edges = [ this ];
    }
  }

  constructor (node1: Elje.Vertice, node2: Elje.Vertice) {
    this.vertices = [node1, node2];
    this.vertices.forEach(this.hookParent, this);
    this.weight = this.calcWeight();
  }

  calcWeight() {
    return 42;
  }
}

export default Edge
