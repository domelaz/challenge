class Model implements Elje.Model {
  public vertices: Elje.Vertice[];

  constructor() {
    this.vertices = [];
  }

  public add(node: Elje.NodeType | Elje.NodeType[]) {
    return Promise.resolve(this);
  }

  public remove(node: Elje.NodeType | Elje.NodeType[]) {
    return Promise.resolve(this);
  }

  public getRoute(start: Elje.Vertice, finish: Elje.Vertice) {
    return Promise.resolve([]);
  }
}

export default Model;
