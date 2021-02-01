import {useState} from 'react'

import {setSession, getToken, getLogin} from './api/session'
import {JWTValidate, JWTSign, JWTDecode, EncryptPBKDF2, EncryptAES, DecryptAES} from './src/signature'

export default function Home() {
  // Variables and variable specific set functions
  const [plainusername, setUsername] = useState<string>('')
  const [plainpassword, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('Not logged in!')

  // Submit function "submitform()"
  async function submitform() {

    // Add check for empty fields here.
    if (plainusername.length == 0 || plainpassword.length == 0){
      setMessage("Empty field/s")
      return
    }

    const username = EncryptAES(plainusername)
    const password = EncryptAES(EncryptPBKDF2(plainpassword))

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }).then((t) => t.json())
    
    // Recive JSON Token from API
    const token = res.token  

    if (token) setSession(token, JWTSign({username, 'enc_pass': EncryptAES(password)}, false))

    if (JWTValidate(getToken())) {
      setMessage('Welcome ' + DecryptAES(JWTDecode(getLogin()).username) + '!')
    } else {
      setMessage('Invalid credentials!')
    }
  } 
  return (
    <div>
      <h1>{message}</h1>
      <form>
        <input type='text' name='username' value={plainusername} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' name='password' value={plainpassword} onChange={(e) => setPassword(e.target.value)} />
        <input type='button' value='login' onClick={submitform} />
      </form>
    </div>
  )
}