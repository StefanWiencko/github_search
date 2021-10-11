import Head from "next/head";
import SearchForm from "../components/SearchForm";
const Home = () => {
  return (
    <main className="container">
      <Head>
        <title>Github Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchForm />
    </main>
  );
};

export default Home;
