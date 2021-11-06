// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req: any, operationName: string) => {
  const { body } = req;
  return (
    body.hasOwnProperty("operationName") && body.operationName === operationName
  );
};

// Alias query if operationName matches
export const aliasQuery = (req: any, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (req: any, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};

export const generateData = (number: number) => {
  let resolut = [];
  for (let i = 0; i < number; i++) {
    resolut.push({
      cursor: `cursor${i}`,
      node: {
        url: `https://www.google.com/${i}`,
        name: `name${i}`,
        description: `description${i}`,
        id: `id${i}`,
      },
    });
  }
  return resolut;
};
