import { ChangeEvent, useState } from "react";
import Link from "next/link";
import styles from "../styles/SearchForm.module.scss";
import { HiOutlineSearch } from "react-icons/hi";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  return (
    <form
      className={styles.form}
      action={`/search/${inputValue}`}
      method="POST"
    >
      <Link href="/">
        <a className={styles.a}>Search for your Github repository:</a>
      </Link>

      <input
        type="text"
        minLength={3}
        placeholder="Min 3 characters"
        onChange={changeHandler}
        className={styles.input}
      />
      <input type="submit" value="" className={styles.submit} />
      <HiOutlineSearch className={styles.icon} />
    </form>
  );
};
export default SearchForm;
