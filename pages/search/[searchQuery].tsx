import { GetServerSideProps } from "next";
import Content from "../../components/Content";
import { GraphQLClient } from "graphql-request";
import { personalAccessToken, getReposQuery } from "../../graphql/query";
import { Node, Data } from "../../types/types";
import styles from "../../styles/SearchResoluts.module.scss";
import SearchForm from "../../components/SearchForm";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
type PropsData = [{ cursor: string; node: Node }];
type Props = {
  repositoryCount: number;
  data: PropsData;
};
const SearchResoluts = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    router.push(
      {
        pathname: "/search/[search]",
        query: { search: inputValue },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <main>
      <header className={styles.header}>
        <SearchForm
          changeHandler={changeHandler}
          submitHandler={submitHandler}
        />
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
    Authorization: `bearer ${personalAccessToken}`,
  };
  const res: Data = await client.request(getReposQuery, variables, headers);
  return {
    props: {
      repositoryCount: res.search.repositoryCount,
      data: res.search.edges,
    },
  };
};

export default SearchResoluts;
