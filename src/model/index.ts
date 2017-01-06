class Model implements Elje.Model {
  public edges: Elje.Edge[];
  public vertices: Elje.Vertice[];

  constructor() {
    this.vertices = [];
    this.edges = [];
  }

  protected normalizeToArray<T>(arg: T | T[]): T[] {
    return Array.isArray(arg) ? arg : [arg];
  }

  protected isVertices(nodes: Array<Elje.NodeType>): nodes is Elje.Vertice[] {
    return nodes[0].type === "vertice";
  }

  protected isEdges(nodes: Array<Elje.NodeType>): nodes is Elje.Edge[] {
    return nodes[0].type === "edge";
  }

  add(node: Elje.NodeType | Elje.NodeType[]) {
    const _nodes = this.normalizeToArray(node);

    if (_nodes.length === 0) {
      throw new Error("ERR.LIST_EMPTY"); // @fixme
    }

    if (this.isVertices(_nodes)) {
      const existing = this.vertices;
      const arrived = _nodes.filter( n => existing.indexOf(n) === -1 );
      this.vertices = existing.concat(arrived);
    }

    if (this.isEdges(_nodes)) {
      const existing = this.edges;
      const arrived = _nodes.filter( n => existing.indexOf(n) === -1 );
      this.edges = existing.concat(arrived);
    }

    return Promise.resolve(this);
  }

  remove(node: Elje.NodeType | Elje.NodeType[]) {
    const _nodes = this.normalizeToArray(node);

    if (this.isEdges(_nodes)) {
      const existing = this.edges;
      const arrived = _nodes.filter( n => existing.indexOf(n) !== -1 );
      arrived.forEach(edge => edge.remove());
      this.edges = existing.filter( n => arrived.indexOf(n) === -1 );
    }

    return Promise.resolve(this);
  }

  getRoute(node1: Elje.Vertice, node2: Elje.Vertice) {
    return Promise.resolve([]);
  }
}

export default Model;
