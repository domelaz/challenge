class Model implements Elje.Model {
  public vertices: Elje.Vertice[];

  constructor() {
    this.vertices = [];
  }

  protected normalizeToArray<T>(arg: T | T[]): T[] {
    return Array.isArray(arg) ? arg : [arg];
  }

  protected isVertices(nodes: Array<Elje.NodeType>): nodes is Elje.Vertice[] {
    return nodes[0].type === "vertice";
  }

  add(node: Elje.NodeType | Elje.NodeType[]) {
    const _nodes = this.normalizeToArray(node);

    if (_nodes.length === 0) {
      throw new Error("ERR.LIST_EMPTY"); // @fixme
    }

    if (this.isVertices(_nodes)) {
      this.vertices = this.vertices.concat(_nodes);
    }

    return Promise.resolve(this);
  }

  remove(node: Elje.NodeType | Elje.NodeType[]) {
    return Promise.resolve(this);
  }

  getRoute(node1: Elje.Vertice, node2: Elje.Vertice) {
    return Promise.resolve([]);
  }
}

export default Model;
