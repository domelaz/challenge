class Model implements Elje.Model {
  public edges: Elje.Edge[];
  public vertices: Elje.Vertice[];

  constructor() {
    this.vertices = [];
    this.edges = [];
  }

  /**
   * Returns two arrays difference
   */
  protected diff<T, U extends T>(base: T[], addenum: U[]): T[] {
    return addenum.filter(a => base.indexOf(a) === -1);
  }

  /**
   * Returns two arrays intersection
   */
  protected intersect<T, U extends T>(base: T[], addenum: U[]): T[] {
    return addenum.filter(a => base.indexOf(a) !== -1);
  }

  /**
   * Merges second array into first
   * Mutates first array
   */
  protected merge<T, U extends T>(base: T[], addenum: U[]) {
    const newbies = this.diff(base, addenum);
    base.splice(-1, 0, ...newbies);
    return base;
  }

  /**
   * Cast "maybe array" to array
   */
  protected arrize<T>(arg: T | T[]): T[] {
    return Array.isArray(arg) ? arg : [arg];
  }

  /**
   * TypeScript helper function
   */
  protected isVertices(nodes: Array<Elje.NodeType>): nodes is Elje.Vertice[] {
    return nodes[0].type === "vertice";
  }

  /**
   * TypeScript helper function
   */
  protected isEdges(nodes: Array<Elje.NodeType>): nodes is Elje.Edge[] {
    return nodes[0].type === "edge";
  }

  /**
   * Returns function binded with collection of `nodes` type
   */
  protected typeBind(cb: Function, nodes: Array<Elje.NodeType>) {
    if (this.isVertices(nodes)) {
      return cb.bind(this, this.vertices);
    }

    if (this.isEdges(nodes)) {
      return cb.bind(this, this.edges);
    }
  }

  /**
   * Add node[s] (Vertice or Edge) to graph
   */
  public add(node: Elje.NodeType | Elje.NodeType[]) {
    const args = this.arrize(node);
    const merger = this.typeBind(this.merge, args);
    merger(args);
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
