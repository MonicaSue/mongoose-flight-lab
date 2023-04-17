import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  console.log("GET NEW WORKS!")
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  console.log(departsDate)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate,
  })
}

function create(req, res) {
  console.log('CREATE WORKS')
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  console.log('INDEX WORKS')
  Flight.find({})
  .then(flights => {
    flights.forEach(flight=> {
      if (flight.departs < new Date()) {
        flight.color = 'red'
        console.log(flight)
      }
    })
    res.render('flights/index', {
    flights: flights.sort((a, b) => a.departs - b.departs),
    title: 'All Flights',
    
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  console.log('SHOW WORKS')
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Detail',
      flight: flight,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteFlight(req, res) {
  console.log('DELETE WORKS!')
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  console.log('EDIT WORKS')
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight',
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  for (let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteTicket(req, res) {
  console.log('TICKET DELETE WORKS!')
  Flight.findById(req.params.flightId)
  .then(flight => {
    console.log(flight.tickets)
    console.log(flight.tickets.indexOf())
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/flights/${flight._id}`)
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  deleteTicket,
}