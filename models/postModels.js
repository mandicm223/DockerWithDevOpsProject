const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title : {
        type : String ,
        require : [true , "Post must contain title"]
    } ,

    body : {
        type : String ,
        require : [true , "Post must contain body"]
    }
})

const Post = mongoose.model("Post" , postSchema)
module.exports = Post