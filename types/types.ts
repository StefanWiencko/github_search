export type Node = {
  url: string;
  name: string;
  description: string;
  id: string;
};
export type Data = {
  search: {
    edges: {
      cursor: string;
      node: Node;
    }[];
    repositoryCount: number;
  };
};
export type PropsData = { cursor: string; node: Node }[];
