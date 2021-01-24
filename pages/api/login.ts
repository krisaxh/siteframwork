import jwt from 'jsonwebtoken'
// Json token cryptography lib

// Encryption key? Im not sure.
const KEY = 'sfwesrbjekgnwlkmbrgerjgwegbljewk'

// Main API to process POST data
export default (req, res) => {
// Reject misuse of API
  if (!req.body) {
    res.statusCode = 404
    res.end('Error')
    return
  }
  // Get required data from POST
  const { username, password } = req.body

  // {status, json.token}
  // Here we check of user and respond
  res.status(200).json({
     token: jwt.sign({ 
       username
      }, KEY) 
    })
}
