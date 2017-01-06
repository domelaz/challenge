class Edge implements Elje.Edge {
  public readonly vertices: [Elje.Vertice, Elje.Vertice];
  public readonly type = "edge";

  constructor (node1: Elje.Vertice, node2: Elje.Vertice) {
    this.vertices = [node1, node2];
    this.vertices.forEach(v => v.hookEdge(this), this);
  }

  protected calcWeight() {
    return 42;
  }
}

export default Edge;
