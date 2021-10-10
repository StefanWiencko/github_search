export const personalAccessToken = "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";
export const getReposQuery = `query  getStefan ($name:String!,$after:String) {
  search(query:  $name, type: REPOSITORY, first: 30,after:$after) {
    repositoryCount
    edges {
      cursor
      node {
        ... on Repository {
          id
          name
          createdAt
          description
          isFork
          url
        }
      }
    }
  }
}
  `;
