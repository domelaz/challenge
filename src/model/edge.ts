class Edge implements Elje.Edge {
  public readonly vertices: [Elje.Vertice, Elje.Vertice];
  public readonly weight: number;
  public readonly type = "edge";

  constructor (node1: Elje.Vertice, node2: Elje.Vertice) {
    this.vertices = [node1, node2];
    this.weight = this.calcWeight();
    this.vertices.forEach(v => v.hookEdge(this), this);
  }

  /**
   * Return node on the other side of Edge
   *
   * @param {Elje.Vertice} node
   * @return {Elje.Vertice}
   */
  public getOpposite(node: Elje.Vertice) {
    return node === this.vertices[0] ? this.vertices[1] : this.vertices[0];
  }

  /**
   * Euclidean distance used as Edge weight
   */
  protected calcWeight() {
    const [ node1, node2 ] = this.vertices;
    const xy = [
      node2.location.x - node1.location.x,
      node2.location.y - node1.location.y,
    ];
    return Math.sqrt(Math.pow(xy[0], 2) + Math.pow(xy[1], 2));
  }

  /**
   * When remove edge, disconnect from parent vertices
   */
  public remove() {
    this.vertices.forEach(v => v.releaseEdge(this), this);
  }
}

export default Edge;
