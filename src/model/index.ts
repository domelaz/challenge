class Model implements Elje.Model {
  public vertices: Elje.Vertice[];

  constructor() {
    this.vertices = [];
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
