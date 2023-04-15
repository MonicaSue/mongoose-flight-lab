import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/flights
// router.get('/', function(req, res) {
//   res.send('respond with a resource')
// })

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:flightId', flightsCtrl.show)

router.post('/', flightsCtrl.create)

export { router }
