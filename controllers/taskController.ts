import {Request, Response} from 'express'
import Tasks from '../models/tasks'

export async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await Tasks.find(); //find tasks in database
        res.send(tasks); //sending tasks as a response
    } catch (e) {
        res.send({ message: "There was an issue getting the tasks!"}); //error message
    }
}

export async function getTaskById(req: Request, res: Response) { // get task by ID
 try {
    const taskId = req.params.taskId; //getting task from request parameters
    const foundTask = await Tasks.findById(taskId).exec(); //finding task by ID
    res.send(foundTask) //sending found task as a response
 } catch (e) {
    console.log(e);
    res.send({message: "Task not found. Did you provide a valid task ID?"}); // error message
 }
}

export async function addTask(req: Request, res: Response) { //function to add task
    try {
        console.log('Posting!', req.body);
        const task = await Tasks.create(req.body); //creating a new task in database
        res.send({task, message: "Task created!"}); //success message
    } catch (e) {
        console.log(e);
        res.send({message: "There was a problem adding the task."}) //error message
    }
}

export async function editTask (req: Request, res: Response) { //function to edit task
try {
    const taskId = req.params.taskId //getting task id from request parameters
    const update = req.body; //getting update data from request body
    const editedTask = await Tasks.findOneAndUpdate({ id: taskId }, update); //updating task in database
    if (!editedTask){
        res.send ({message: 'Invalid ID. '})
        return 
}
    res.send ({editedTask, message: "Task has been edited!"}); //success message
    console.log(editedTask);
} catch (e) {
    res.send ({message: "There was a problem editing the task."}); //error message
}
}

export async function deleteTask(req: Request, res: Response) { // Function to delete a task
    try {
        const taskId = req.params.taskId; // Getting task ID from request parameters
        const deletedTask = await Tasks.deleteOne({ id: taskId }); // Deleting the task from the database
        if (deletedTask.deletedCount) {
            res.send({ deletedCount:deletedTask.deletedCount, message: 'Task Deleted!' }); // Sending success message
        } else {
            res.send({ message: 'Task not found.' }); // Sending message if task was not found
        }
        console.log(deletedTask);
    } catch (e) {
        res.send({ message: 'There was a problem deleting your task.' }); // Sending error message
    }
}
