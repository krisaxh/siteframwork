require('dotenv').config()
import { authenticateUser } from "../src/authenticate"
import jwt from "jsonwebtoken"

export default (req, res) => {
  if (req.method == "POST" && req.body) {
    if (!authenticateUser(req.body.username)) return res.status(403).send()

    const user = { name: req.body.username, password: req.body.pass }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
  }
}