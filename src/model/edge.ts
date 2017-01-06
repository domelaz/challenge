class Edge implements Elje.Edge {
  public readonly vertices: [Elje.Vertice, Elje.Vertice];
  public readonly weight: number;
  public readonly type = "edge";

  protected hookParent(node: Elje.Vertice) {
    if (Array.isArray(node.edges)) {
      node.edges.push(this);
    } else {
      node.edges = [ this ];
    }
  }

  protected releaseParent(node: Elje.Vertice) {
    if (!Array.isArray(node.edges)) {
      return;
    }

    const position = node.edges.indexOf(this);

    if (position === -1) {
      return;
    }

    node.edges.splice(position, 1);
  }

  constructor (node1: Elje.Vertice, node2: Elje.Vertice) {
    this.vertices = [node1, node2];
    this.vertices.forEach(this.hookParent, this);
    this.weight = this.calcWeight();
  }

  protected calcWeight() {
    const [ node1, node2 ] = this.vertices;
    const xy = [
      node2.location.x - node1.location.x,
      node2.location.y - node1.location.y,
    ];
    return Math.sqrt(Math.pow(xy[0], 2) + Math.pow(xy[1], 2));
  }

  public remove() {
    this.vertices.forEach(this.releaseParent, this);
  }
}

export default Edge
