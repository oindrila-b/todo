// const express = require('express');
// const app = express();
// const connectDB = require('./database/connector')

import express from 'express';
import { connect } from './database/connector.js'
import { Task } from './database/schema.js';
import { PORT } from './config/config.js'

const app = express();
app.use(express.json())

connect()

app.get('/', async (req, res) => {
  try{
    const tasks = await Task.find({});
    return res.status(200).json({
      taskCount : tasks.length,
      data: tasks
    })
  }catch(err) {
    console.log(err);
    return res.status(500).send({message: err.message});
  }
});



app.get('/findByPriority', async (req, res) => {
  try{
    const tasks = await Task.find({priority: req.query.priority});
    return res.status(200).json({
      taskCount : tasks.length,
      data: tasks
    })
  }catch(err) {
    console.log(err);
    return res.status(500).send({message: err.message});
  }
});

app.delete('/delete' , async (req, res) => {
    try {
      const del = await Task.deleteOne({_id: req.query.id})
      console.log(del)
      res.status(200).send({message: 'Deleted Successfully'});
    } catch(err) {
      console.log(err.message)
    }
})

app.post('/add-task', async (req, res) => {
  try {
    if (
      !req.body.taskName || !req.body.taskDescription ||
      !req.body.priority || !req.body.isTaskStarted ||
      !req.body.isTaskCompleted || !req.body.dateOfStart 
    ) {
      res.status(400).send({ message: 'Missing property for successful task initialisation' });
    }
    const newTask = {
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      priority: req.body.priority,
      isTaskStarted: req.body.isTaskStarted,
      isTaskCompleted: req.body.isTaskCompleted,
      dateOfStart: req.body.dateOfStart,
    };
    console.log(newTask);

    const task = await Task.create(newTask);
    return res.status(200).send({ message: 'Added new task' + task });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }

});




app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
