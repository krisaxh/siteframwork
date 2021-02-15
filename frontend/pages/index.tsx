import { useState } from "react";
import { EncryptAES, EncryptPBKDF2 } from "./api/signature";
import { setSession, getAuth, getRefr } from "./api/session";
import { validate } from "./src/database";

export default function Home() {

  const [plainusername, setUsername] = useState<string>("");
  const [plainpassword, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("Not logged in!");

  async function submitform() {

    if (plainusername.length == 0 || plainpassword.length == 0) {
      setMessage("Empty field or fields!");
      return;
    }

    const username = EncryptAES(plainusername);
    const password = EncryptAES(EncryptPBKDF2(plainpassword));
	
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then(t => t.json()).catch(e => { return; });
	
	if (res)  {
		console.log(res);
	} else {
		setMessage("Invalid credentials!")
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
