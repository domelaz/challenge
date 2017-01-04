class Model implements Elje.Model {
  public vertices: Elje.Vertice[];

  constructor() {
    this.vertices = [];
  }

  add(node: Elje.NodeType | Elje.NodeType[]) {
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
