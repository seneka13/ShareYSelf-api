const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const error = (res, status, text) => res.status(status).json(text).end()

const userOn = (req, res) => {
  const token = req.get('X-Auth')
  const isAuth = db.get('users').find({ token }).value()
  if (!isAuth) return error(res, 403, 'Access is denied')

  res.send(isAuth)
}

const login = (req, res) => {
  const { username, password } = req.body
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const user = db.get('users').find({ data: { username, password } }).value()
  if (!user) return error(res, 403, 'incorrect login data')
  res.send({ user })
}

const signup = (req, res) => {
  const { firstname, lastname, username, password } = req.body
  if (!firstname) return error(res, 400, 'firstname attribute is required')
  if (!lastname) return error(res, 400, 'lastname attribute is required')
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const existed = db.get('users').find({ data: { username } }).value()
  if (existed) return error(res, 400, 'user with this username already exists')

  if (!password) return error(res, 400, 'password attribute is required')
  const id = shortid.generate()
  const data = { id, firstname, lastname, username, password }

  db.get('users').push({ data, token: `token_${shortid.generate()}` }).write()
  const user = db.get('users').find({ data: { username, password } }).value()
  res.send({ user })
}


module.exports = {
    login,
    signup,
    userOn
  }