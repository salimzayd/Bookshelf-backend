import mongoose from 'mongoose'

const bookschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },

    author:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    }
})

export default mongoose.model("Book",bookschema)