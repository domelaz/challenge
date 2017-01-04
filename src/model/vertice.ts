class Vertice implements Elje.Vertice {
  public edges: Elje.Edge[];
  public readonly location: Elje.Location;
  public readonly type: "vertice"; // @fixme

  constructor(location: Elje.Location) {
    this.location = location;
    this.type = "vertice";
  }
}

export default Vertice;
