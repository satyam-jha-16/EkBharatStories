import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        title :{
            type:String,
            required:true,
            unique:true,
        },
        content:{
            type:String,
            required:true,

        },
        image :{
            type:String,
            default:"https://i.ytimg.com/vi/84ITUmPZz1A/maxresdefault.jpg"
        },
        slug :{
            type:String,
            required:true,
            unique:true,
        },
        author :{
            type:String,
            default : "Indian"
        },
    }, 
    {
        timestamps:true
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post