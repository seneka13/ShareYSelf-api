const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const error = (res, status, text) => res.status(status).json(text).end()


const getEvent = (req, res) => {
  const event = db.get('events')
  console.log(event)
  if (!event) return error(res, 403, 'Not events')

  res.send(event)
}


const createEvent = (req, res) => {
  const { eventname, place, date, time, desc, author } = req.body
  if (!eventname) return error(res, 400, 'eventname attribute is required')
  if (!place) return error(res, 400, 'place attribute is required')
  if (!date) return error(res, 400, 'date attribute is required')
  if (!time) return error(res, 400, 'time attribute is required')
  if (!desc) return error(res, 400, 'desc attribute is required')
  if (!author) return error(res, 400, 'author attribute is required')

  const id = shortid.generate()

  db.get('events').push({ id, eventname, place, date, time, desc, author }).write()

  res.status(200).json("Событие успешно создано").end()
}


const deleteEvent = (req, res) => {
  const id = req.params.id
  console.log(id)
  const event = db.get('events').find({id}).value()
  if (!event) return res.status(404).json('Event not founddsdsds')
  db.get('events').remove( {id} ).write()
  res.status(200).json('Succes delete').end()
}

const editEvent =  (req, res) => {
  const id = req.params.id
  const { eventname, place, date, time, desc, author} = req.body
  if (!eventname) return error(res, 400, 'eventname attribute is required')
  if (!place) return error(res, 400, 'place attribute is required')
  if (!date) return error(res, 400, 'date attribute is required')
  if (!time) return error(res, 400, 'time attribute is required')
  if (!desc) return error(res, 400, 'desc attribute is required')
  if (!author) return error(res, 400, 'author attribute is required')
  const event = db.get('events').find( {id} ).value()
  if (!event) return res.status(404).json('event not found')
  db.get('events').find({id}).assign({id, eventname, place, date, time, desc, author}).write()
  res.status(200).json('Succes update').end()
}


module.exports = {
    createEvent,
    getEvent,
    deleteEvent,
    editEvent,
  }