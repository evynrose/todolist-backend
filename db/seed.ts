import mongoose from 'mongoose'
import Tasks from '../models/tasks'

//database information, 3 tasks 
const taskData = [
    {id: 1,
        task: "Clean Bathroom"}, 
    {id: 2, 
    task: "Mop Floors"}, 
    {id: 3, 
        task: "Bins"}
]

//connects to mongodb via mongoose. includes database name and db at end of file path
async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/tasksdb')
    console.log('Connected to database.')

// Removes all previous entries to the database.

    await mongoose.connection.db.dropDatabase()
    console.log('Remove existing data.')

    //adds taskData to the db 

    const tasks = await Tasks.create(taskData)
    console.log ('Here are the tasks!')
    console.log(tasks)

    console.log('Disconnecting from database.')
    await mongoose.disconnect()
}

seed()