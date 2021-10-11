export const githubAuthenticationToken = "Enter your github token here";
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
