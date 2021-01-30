import jwt from 'jsonwebtoken'
import {useState} from 'react'
import {setUserSession} from './api/session'

export default function Home() {
  // Variables and variable specific set functions
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  //
  const [message, setMessage] = useState<string>('Not logged in!')
  // Submit function "submitform()"
  async function submitform() {
    //#
    // Add check for empty fields here.
    if (username == '' || password == ''){
      console.log('empty field')
    }
    //#
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }).then((t) => t.json())
    
    // Recive JSON Token from API
    const token = res.token  
    // Process API Token
    if (token) {
      setUserSession(token, username);
      const json = jwt.decode(token) as { [key: string]: string}  // <<== Probably vulnerable element
      setMessage('Welcome ' + json.username) // <<== Probably vulnerable element

    } else {
      setMessage('Invalid credentials!')
    }
  }
  //https://www.cluemediator.com/login-app-create-login-form-in-reactjs-using-secure-rest-api#isia
  //https://medium.com/swlh/all-you-need-to-know-about-json-web-token-jwt-8a5d6131157f
  //https://frontaid.io/blog/using-nextjs-with-json-file/
  return (
    <div>
    <h1>{message}</h1>
    <form>
      <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type='button' value='login' onClick={submitform} />
    </form>
    </div>
  )
}