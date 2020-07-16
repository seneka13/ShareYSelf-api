const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const error = (res, status, text) => res.status(status).json(text).end()

const getUser = (req, res) => {
  const token = req.get('X-Auth')
  const isAuth = db.get('users').find({ token }).value()
  if (!isAuth) return error(res, 403, 'Access is denied')

  res.send(isAuth)
}

const login = (req, res) => {
  const { username, password } = req.body
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const user = db.get('users').find({username, password }).value()
  if (!user) return error(res, 403, 'incorrect login data')
  res.send({ user })
}

const signup = (req, res) => {
  const { firstname, lastname, username, password } = req.body
  if (!firstname) return error(res, 400, 'firstname attribute is required')
  if (!lastname) return error(res, 400, 'lastname attribute is required')
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const existed = db.get('users').find({ username }).value()
  if (existed) return error(res, 400, 'user with this username already exists')

  if (!password) return error(res, 400, 'password attribute is required')
  const id = shortid.generate()

  db.get('users').push({ id, firstname, lastname, username, password, token: `token_${shortid.generate()}` }).write()
  const user = db.get('users').find({ username, password }).value()
  res.send({ user })
}

const editUser =  (req, res) => {
  const id = req.params.id
  const { username, firstname, lastname, password} = req.body
  if (!firstname) return error(res, 400, 'firstname attribute is required')
  if (!lastname) return error(res, 400, 'lastname attribute is required')
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const user = db.get('users').find({id}).value()
  if (!user) return res.status(404).json('event not found')
  db.get('users').find({ id }).assign({id, eventname, place, date, time, desc, author}).write()
  res.status(200).json('Succes update').end()
}



module.exports = {
    login,
    signup,
    getUser,
    editUser
  }