export type Node = {
  url: string;
  name: string;
  description: string;
  id: string;
  createdAT: string;
};
export type Data = {
  search: {
    edges: [
      {
        cursor: string;
        node: Node;
      }
    ];
    repositoryCount: number;
  };
};
