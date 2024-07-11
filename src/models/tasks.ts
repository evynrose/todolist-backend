import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface ITask{ //interface for task schema 
id: number
task: string
}

const taskSchema: Schema<ITask> = new mongoose.Schema<ITask> ({ //defining task schema
task: {
    type: String, 
    min: [1, 'Too short of a task name'], //minimum character length
    required: [true, 'Missing task name'] //needs to be required and can't be blank
},
id: {
    type: Number, 
    required: [true, 'Missing ID Number'] //needs to have an ID number
}
});

taskSchema.plugin(uniqueValidator); //applying Unique Validator plugin

export default mongoose.model<ITask> ('Task', taskSchema); 