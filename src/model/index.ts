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

  /**
   * Remove nodes from graph
   */
  public remove(node: Elje.NodeType | Elje.NodeType[]) {
    const args = this.arrize(node);
    const intersector = this.typeBind((x: Elje.NodeType[]) => {
      this.intersect(x, args).forEach(n => {
        n.remove();
        x.splice(x.indexOf(n), 1);
      });
    }, args);
    intersector(args);
    return Promise.resolve(this);
  }

  /**
   * Resolves shortest way between two Vertices in the graph
   *
   * Classic Dijkstra's algorithm used
   * @see https://en.wikipedia.org/wiki/Dijkstra's_algorithm
   *
   * @param {Elje.Vertice} start
   * @param {Elje.Vertice} finish
   * @returns {Promise<Elje.Edge[]>}
   */
  public getRoute(start: Elje.Vertice, finish: Elje.Vertice) {
    // Reset movement costs
    this.vertices.forEach(v => v.cost = Infinity);
    start.cost = 0;

    // Prepare reverse routes storage
    const routes = new Map<Elje.Vertice, Elje.Edge[]>();
    routes.set(start, []);

    const visited = new Set<Elje.Vertice>();
    let opened = new Set([start]);

    const visit = (nodeSet: Set<Elje.Vertice>) => {
      const node = nodeSet.values().next().value;
      const set = getReWeightedNeighbors(node);
      visited.add(node);
      opened = new Set([...opened, ...set]);
      opened.delete(node);
      return set;
    };

    /**
     * "Breadcrumb" reverse route from current node to starting node
     */
    const pullReverseRoute = (parent: Elje.Vertice, vertice: Elje.Vertice, edge: Elje.Edge) => {
      const path = routes.get(parent);
      routes.set(vertice, [...path!, edge]);
    };

    /**
     * Update neighbors of vertice
     *
     * Get all connected vertices except already visited,
     * correct its movement costs, if needed,
     * and return array of neighbors sorted by updated costs
     */
    const getReWeightedNeighbors = (node: Elje.Vertice) => {
      return [ ...node.edges ]
        .filter(edge => !visited.has(edge.getOpposite(node)))
        .map(edge => {
          const vertice = edge.getOpposite(node);
          const newRouteCost = node.cost + edge.weight;
          if (vertice.cost > newRouteCost) {
            pullReverseRoute(node, vertice, edge);
            vertice.cost = newRouteCost;
          }
          return vertice;
        })
        .sort((a, b) => a.cost > b.cost ? 1 : -1 );
    };

    /**
     * Main cycle
     */
    while (opened.size > 0) {
      visit(opened);
    }

    /**
     * Resolve array of Edges accumulated at target node
     */
    return Promise.resolve(routes.get(finish));
  }
}

export default Model;
