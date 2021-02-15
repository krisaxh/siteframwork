import { useForm } from "react-hook-form";
import styles from "../styles/form.module.scss";

export default function Form() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmitForm = async (data) => {
    fetch("http://localhost:3080/login");
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <input ref={register({ required: true })} type="text" name="username" />
      {errors.username && (
        <span className={styles.error}>This field is required!</span>
      )}
      <input
        ref={register({ required: true })}
        type="password"
        name="password"
      />
      {errors.password && (
        <span className={styles.error}>This field is required!</span>
      )}
      <input type="submit" />
    </form>
  );
}
