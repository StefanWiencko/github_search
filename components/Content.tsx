import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropsData, Data } from "../types/types";
import {
  githubAuthenticationToken,
  searchResolutsQuery,
} from "../graphql/query";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import styles from "../styles/Content.module.scss";
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
      Authorization: `bearer ${githubAuthenticationToken}`,
    };
    const variables = { name: searchQuery, after: lastResolut.cursor };
    const data: Data = await client.request(
      searchResolutsQuery,
      variables,
      headers
    );
    const newResoluts = data.search.edges;
    setSearchResoluts(() => [...searchResoluts, ...newResoluts]);
    if (searchResoluts.length === repositoryCount) {
      setHasMore(false);
    }
  };
  if (searchResoluts.length === 0) {
    return <h2 className={styles.message}>No resoluts found</h2>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={searchResoluts.length}
        next={getMoreResoluts}
        hasMore={hasMore}
        loader={<h3 className={styles.message}> Loading...</h3>}
        endMessage={<h4 className={styles.message}>Nothing more to show</h4>}
      >
        {searchResoluts.map((data) => (
          <div
            onClick={() => router.push(data.node.url)}
            className={styles.element}
            key={data.node.id}
          >
            <div className={styles.content}>
              <a href={data.node.url}>{data.node.url}</a>

              <strong> {data.node.name}</strong>
            </div>
            <p role="description" className={styles.description}>
              {data.node.description}
            </p>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Content;
