export const githubAuthenticationToken = "key";
export const searchResolutsQuery = `query getSearchResoluts ($name:String!,$after:String) {
  search(query:  $name, type: REPOSITORY, first: 30,after:$after) {
    repositoryCount
    edges {
      cursor
      node {
        ... on Repository {
          id
          name
          description
          url
        }
      }
    }
  }
}
  `;
