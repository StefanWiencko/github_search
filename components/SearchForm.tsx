import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/SearchForm.module.scss";
import { HiOutlineSearch } from "react-icons/hi";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/${inputValue}`);
  };
  return (
    <form name="searchbox" className={styles.form} onSubmit={onSubmit}>
      <Link href="/">
        <a className={styles.a}>Search for your Github repository:</a>
      </Link>

      <input
        type="text"
        minLength={3}
        placeholder="Min 3 characters"
        onChange={changeHandler}
        className={styles.input}
        id="searchbox"
        required
      />
      <input type="submit" name="submit" value="" className={styles.submit} />
      <HiOutlineSearch className={styles.icon} />
    </form>
  );
};
export default SearchForm;
