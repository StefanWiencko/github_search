import { GetServerSideProps } from "next";
import Head from "next/head";
import Content from "../../components/Content";
import { GraphQLClient } from "graphql-request";
import {
  githubAuthenticationToken,
  searchResolutsQuery,
} from "../../graphql/query";
import { PropsData, Data } from "../../types/types";
import styles from "../../styles/SearchResoluts.module.scss";
import SearchForm from "../../components/SearchForm";
import { useRouter } from "next/router";
type Props = {
  repositoryCount: number;
  data: PropsData;
};
const SearchResoluts = (props: Props) => {
  const router = useRouter();
  const { searchQuery } = router.query;
  return (
    <main>
      <Head>
        <title>{searchQuery} - Github Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <SearchForm />
      </header>
      <section className={styles.section}>
        <Content data={props.data} repositoryCount={props.repositoryCount} />
      </section>
    </main>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  query: { searchQuery },
}) => {
  if (searchQuery === undefined || searchQuery.length < 2) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const client = new GraphQLClient("https://api.github.com/graphql");
  const variables = { name: searchQuery };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${githubAuthenticationToken}`,
  };
  const res: Data = await client.request(
    searchResolutsQuery,
    variables,
    headers
  );
  return {
    props: {
      repositoryCount: res.search.repositoryCount,
      data: res.search.edges,
    },
  };
};

export default SearchResoluts;
