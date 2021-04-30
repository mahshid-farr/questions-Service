//load express
const express = require('express')
const app = express()

const port = process.env.PORT || 3000;

//load body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//load mongoose
const mongoose = require('mongoose')

//load models
require('./model/botQuestion')
const BotQuestion = mongoose.model("BotQuestion")
require('./model/interviewScenario')
const Scenario = mongoose.model("InterviewScenario")

//connect
mongoose.connect("mongodb+srv://AcornPurpleSquirrel:c5g83kCRgzjBKqNE@acorn.bzwjn.mongodb.net/questionsService", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Database is connected!")
});

//create function for question
app.post('/addQuestion', (req, res) => {
  var newQuestion = {
    category: req.body.category,
    body: req.body.body,
    estimate_time: req.body.estimate_time
  }
  //create a new question
  var question = new BotQuestion(newQuestion)

  question.save().then(() => {
    console.log("One new question is created successfully");
  }).catch((err) => {
    if (err) {
      throw err
    }
  })
  res.send("One new question is created successfully")
});

//read function to get all questions
app.get("/getAllQuestions", (req, res)=>{
  BotQuestion.find().then((questions)=>{
    res.json(questions)
  }).catch((err)=>{
   if(err){
     throw err
   }
  })
});

//create function
app.post('/addScenario', (req, res) => {
  var newScenario = {
    scenario_name: req.body.scenario_name,
    estimate_time: req.body.estimate_time,
  }

  var questions = req.body.questions.map((question) => {
    return {
      question_id: question.question_id,
      order: question.order,
      prerequisite: question.prerequisite
    }
  })

  newScenario.questions = questions

//create a new scenario
var scenario = new Scenario(newScenario)
//var scenario = new Scenario(req.body)
  scenario.save().then(() => {
    console.log("One new scenario is created successfully");
  }).catch((err) => {
    if (err) {
      throw err
    }
  })
  res.send("One new scenario is created successfully")
});

//read function to get all scenarios
app.get("/getAllScenarios", (req, res)=>{
  Scenario.find().then((scenarios)=>{
    res.json(scenarios)
  }).catch((err)=>{
   if(err){
     throw err
   }
  })
});

app.listen(3000, () => {
  console.log("Server started on: " + port)
});