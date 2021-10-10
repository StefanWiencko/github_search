import { ChangeEventHandler, FormEventHandler } from "react";
import styles from "../styles/SearchForm.module.scss";
import { HiOutlineSearch } from "react-icons/hi";
type Props = {
  changeHandler: ChangeEventHandler;
  submitHandler: FormEventHandler;
};
const SearchForm = ({ changeHandler, submitHandler }: Props) => {
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className={styles.h1}>Search for your Github repository:</h1>

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
