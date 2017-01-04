/**
 * Graph Vertice
 */
class Vertice implements Elje.Vertice {
  /**
   * Movement cost thru this vertice
   */
  public cost = Infinity;

  /**
   * Edges connected to this vertice
   */
  public edges = new Set<Elje.Edge>();

  /**
   * Vertice location in 2d dimension
   */
  public readonly location: Elje.Location;

  /**
   * Vertice name, used in debugging purposes
   */
  public name: string;

  public readonly type = "vertice";

  constructor(location: Elje.Location) {
    this.location = location;
  }
}

export default Vertice;
