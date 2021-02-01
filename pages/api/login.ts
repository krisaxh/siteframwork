import {validate} from '../src/database'
import {JWTSign} from '../src/signature'

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
  // Validate user data, and get userid
  const userid = validate(username, password)

  if (0 < userid) {
    res.status(200).json({token: JWTSign({username, userid}, true)})
  } else if (0 == userid) {
    res.status(200).json({token: JWTSign("Invalid credentials", true)})
  } else {
    res.status(401)
  }
}