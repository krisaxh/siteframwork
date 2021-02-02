import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmitForm = async (data) => {
    console.log(data);
  };

  return (
    <div>
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
    </div>
  );
}
