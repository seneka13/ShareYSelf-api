const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const error = (res, status, text) => res.status(status).json(text).end()


const getEvent = (req, res) => {
  const event = db.get('events')
  if (!event) return error(res, 403, 'Not events')

  res.send(event)
}


const createEvent = (req, res) => {
  const { eventname, location, date, time, desc, author } = req.body
  if (!eventname) return error(res, 400, 'eventname attribute is required')
  if (!location) return error(res, 400, 'location attribute is required')
  if (!date) return error(res, 400, 'date attribute is required')
  if (!time) return error(res, 400, 'time attribute is required')
  if (!desc) return error(res, 400, 'desc attribute is required')
  if (!author) return error(res, 400, 'author attribute is required')

  const id = shortid.generate()
  const data = { id, eventname, location, date, time, desc, author }

  db.get('events').push({ data }).write()

  res.send("Событие успешно создано")
}



module.exports = {
    createEvent,
    getEvent,
  }