import { setUserSession, getUser } from "./api/session";
import signature from "./src/signature";
import aes from "crypto-js/aes";
import jwt from "jsonwebtoken";
import { useState } from "react";
import crypto from "crypto";
import styles from "../styles/login.module.css";

// https://en.wikipedia.org/wiki/Access-control_list

export default function Home() {
  // Variables and variable specific set functions
  const [_plainusername, setUsername] = useState<string>("");
  const [_plainpassword, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Submit function "submitform()"
  async function submitform() {
    // Add check for empty fields here.
    if (_plainusername.length == 0 || _plainpassword.length == 0) {
      setMessage("Empty field/s");
      return;
    }

    const username = aes
      .encrypt(JSON.stringify(_plainusername), signature())
      .toString();
    const password = crypto
      .pbkdf2Sync(_plainpassword, "salt", 5000, 256, "sha512")
      .toString("hex");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    // Recive JSON Token from API
    const token = res.token;
    // Process API Token
    if (token) {
      setUserSession(token, _plainusername);
      const json = jwt.decode(token) as { [key: string]: string }; // <<== Probably vulnerable element
      setMessage("Welcome " + getUser()); // <<== Probably vulnerable element
    } else {
      setMessage("Invalid credentials!");
    }
  }
  //https://www.cluemediator.com/login-app-create-login-form-in-reactjs-using-secure-rest-api#isia
  //https://medium.com/swlh/all-you-need-to-know-about-json-web-token-jwt-8a5d6131157f
  //https://frontaid.io/blog/using-nextjs-with-json-file/

  // Move the hashing function to clien side instead of server side (will use less servers resources)
  // Potentialy be a DDOS attack catalyst.
  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <h1>Log in</h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={_plainusername}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={_plainpassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3 className={styles.errorMsg}>{message}</h3>
        </div>
        <input type="button" value="Log in" onClick={submitform} />
      </form>
      <img src="/icon.svg" alt="Logo BG" className={styles.bglogo} />
    </div>
  );
}
