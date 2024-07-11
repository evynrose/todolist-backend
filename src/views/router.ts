import express from 'express'
import Tasks from '../models/tasks'
import { addTask, deleteTask, getTaskById, editTask, getTasks } from '../controllers/taskController'


const router = express.Router()


/// get tasks 

router.route('/api/tasks').get(getTasks)


//get single task

router.route('/api/tasks/:taskId').get(getTaskById)

//post a task/create task

router.route('/api/tasks').post(addTask)

//delete a task

router.route('/api/tasks/:taskId').delete(deleteTask)

//edit a task/update a task//put

router.route('/api/tasks/:taskId').put(editTask)

export default router