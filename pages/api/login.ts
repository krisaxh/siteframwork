import jwt from 'jsonwebtoken'
import {validate} from '../src/database'

// Signature key for json tokens
import signature from '../src/signature'

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
  const hashid = "example_hash"

  // Check if supplied credentials
  // are correct, if not reject req
  if (validate(username, password)) {
    res.status(200).json({
      token: jwt.sign({ 
        username,
        hashid
      }, signature()) 
    })
    return
  } else {
    // Fix this part up, its way scuffed
    res.status(200).json({
    }, signature())
    return
  }
}