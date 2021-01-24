import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import jwt from 'jsonwebtoken'



export default function Home() {

  // Variables and variable specific set functions
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  //
  const [message, setMessage] = useState<string>('Not logged in!')
  // Submit function "submitform()"
  async function submitform() {
    // Submit POST data to login API (/api/login.ts)
    console.log(JSON.stringify({username, password}))
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
      const json = jwt.decode(token) as { [key: string]: string}  // <<== Probably vulnerable element
      setMessage('Welcome ' + json.username) // <<== Probably vulnerable element

    } else {
      setMessage('Somthing went wrong!')
      // Token not present, most likley XSS
    }
  }

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

// if ( form.button.isPressed (e) => { submitform() } ); >> {username, password}.