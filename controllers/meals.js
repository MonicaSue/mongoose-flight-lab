import { Meal } from '../models/meal.js'

function newMeal(req, res) {
  console.log('new works')
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      meals: meals.sort((a, b) => a.name - b.name),
      title: 'Add Meal',
    })
  })
  .catch(err => {
    res.redirect('/flights')
  })
}

function create(req, res) {
  console.log("create works")
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals/new')
  })
}

export{
  newMeal as new,
  create
}