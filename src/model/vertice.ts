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

  /**
   * Connect edge to this vertice
   *
   * Resort existnig edges by its weight. Not too good if edges too many
   */
  public hookEdge(edge: Elje.Edge) {
    const result = [...this.edges.add(edge)]
      .sort((a, b) => a.weight > b.weight ? 1 : -1);
    this.edges = new Set(result);
  }
}

export default Vertice;
