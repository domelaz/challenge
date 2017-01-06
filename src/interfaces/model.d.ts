declare namespace Elje {

  interface Node<T> {
    type: "vertice" | "edge";
  }

  interface Edge extends Node<Edge> {
    vertices: [Vertice, Vertice];
    weight: number;
  }

  interface Location {
    x: number;
    y: number;
  }

  interface Vertice extends Node<Vertice> {
    cost?: number;
    edges: Set<Edge>;
    location: Location;
    name?: string;
    hookEdge(edge: Edge): void;
  }

  type NodeType = Edge | Vertice;

  interface Model {
    edges: Edge[];
    vertices: Vertice[];
    add(node: NodeType | NodeType[]): Promise<Model>;
    getRoute(start: Vertice, finish: Vertice): Promise<Edge[]>;
    remove(node: NodeType | NodeType[]): Promise<Model>;
  }
}
