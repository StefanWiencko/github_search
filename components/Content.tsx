import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Node, Data } from "../types/types";
import { personalAccessToken, getReposQuery } from "../graphql/query";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import styles from "../styles/Content.module.scss";
type PropsData = { cursor: string; node: Node }[];
type Props = {
  repositoryCount: number;
  data: PropsData;
};
const Content = ({ data, repositoryCount }: Props) => {
  const [searchResoluts, setSearchResoluts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const getMoreResoluts = async () => {
    const { searchQuery } = router.query;
    const lastResolutIndex = searchResoluts.length - 1;
    const lastResolut = searchResoluts[lastResolutIndex];
    const client = new GraphQLClient("https://api.github.com/graphql");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${personalAccessToken}`,
    };
    const variables = { name: searchQuery, after: lastResolut.cursor };
    const data: Data = await client.request(getReposQuery, variables, headers);
    const newResoluts = data.search.edges;
    setSearchResoluts(() => [...searchResoluts, ...newResoluts]);
    if (searchResoluts.length === repositoryCount) {
      setHasMore(false);
    }
    console.log(searchResoluts);
  };
  if (searchResoluts.length === 0) {
    return <h3>No resoluts found</h3>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={searchResoluts.length}
        next={getMoreResoluts}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {searchResoluts.map((data) => (
          <div className={styles.element} key={data.node.id}>
            <a href={data.node.url}>
              <div className={styles.content}>
                <a>{data.node.url}</a>
                <strong> {data.node.name}</strong>
              </div>
              <p className={styles.description}>{data.node.description}</p>
            </a>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Content;
