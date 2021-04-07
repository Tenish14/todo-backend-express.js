const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/mongodbintro", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Todo = require('./models/Todo')

app.use(cors()) //enable ALL cors request
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

//ADD TODO
app.post('/todos', (req, res) => {
    console.log(req.body)
    let todo = new Todo();
    todo.name = req.body.name

    todo.save()

    res.json({
        message: "Todo added successfully",
        todo
    })
})

//VIEW ALL TODO
app.get("/todos", (req, res) => {
    Todo.find({}, function(err, todos) {
        if(!err) {
            res.json(todos)
        } else {
            res.json({
                message: err
            })
        }
    })
})

//VIEW TODO BY ID
app.get("/todos/:id", (req,res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!err) {
            res.json(todo)
        } else {
            res.json({
                message: err
            })
        }
    })
})

//EDIT TODO 
app.put("/todos/:id", (req, res) => {
    console.log(req.params.id)
    let todo = {}
    todo.name = req.body.name
    Todo.findByIdAndUpdate(req.params.id, todo, function(err, todo) {
        if(!err) {
            res.json({
                message: "Todo updated successfully",
                todo
            })
        } else{
            res.json({
                message: err
            })
        }
    })
})

//DELETE
app.delete("/todos/:id", (req,res) => {
    Todo.findByIdAndDelete(req.params.id, function (err, todo) {
        if(!err) {
            res.json({
                message: "Todo Deleted successfully",
                todo
            })
         } else {
                res.json({
                    message: err
            })
        }
    })
})

app.listen(port, () => console.log("App is listening in port " + port))