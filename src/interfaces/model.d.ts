declare namespace Elje {

  interface Node<T> {
    type: "vertice" | "edge";
  }

  interface Edge extends Node<Edge> {
    remove(): void;
    vertices: [Vertice, Vertice];
    weight?: number;
  }

  interface Location {
    x: number;
    y: number;
  }

  interface Vertice extends Node<Vertice> {
    location: Location;
    edges?: Edge[];
  }

  type NodeType = Edge | Vertice;

  interface Model {
    vertices: Vertice[];
    add(node: NodeType | NodeType[]): Promise<Model>;
    remove(node: NodeType | NodeType[]): Promise<Model>;
    getRoute(node1: Vertice, node2: Vertice): Promise<Edge[]>;
  }
}
