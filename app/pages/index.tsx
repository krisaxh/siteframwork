import { useState } from "react";

import { setSession, getToken, getLogin } from "./api/session";

// import { EncryptPBKDF2 } from "./api/signature";

export default function Home() {
  // Variables and variable specific set functions
  const [plainusername, setUsername] = useState<string>("");
  const [plainpassword, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("Not logged in!");

  // Submit function "submitform()"
  async function submitform() {
    // Add check for empty fields here.
    if (plainusername.length == 0 || plainpassword.length == 0) {
      setMessage("Empty field/s");
      return;
    }

    const username = plainusername;
    // const password = EncryptPBKDF2(plainpassword);

    const res = await fetch("http://localhost:8000/api/signature", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    if (res) {
    }
  }
  return (
    <div>
      <h1>{message}</h1>
      <form>
        <input
          type="text"
          name="username"
          value={plainusername}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={plainpassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="button" value="login" onClick={submitform} />
      </form>
    </div>
  );
}
