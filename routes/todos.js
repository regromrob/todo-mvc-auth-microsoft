const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos) //middleware to check whether or not someone is logged in; ensure auth must run before someone can get to todo list; once loggedin todoscontroller can run

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router