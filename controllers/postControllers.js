const Post = require('../models/postModels')


exports.getAllPosts = async (req,res,next) => {
    try {
        const Posts = await Post.find()
        res.status(200).json({
            status : 'succes' ,
            results : Posts.length ,
            data : {
                Posts
            }
        })
    } catch (e) {
        res.send(404).json({
            status : 'failed'
        })
    }
}

exports.getOnePost = async (req,res,next) => {
    try {
        const onePost = await Post.findById(req.params.id)
        res.status(200).json({
            status : 'success' ,
            data : {
                onePost
            }
        })
    } catch (e) {
        res.status(404).json({
            status : 'failed'
        })
    }
}

exports.createPost = async (req,res,next) => {
    
    try {

        const newPost = await Post.create(req.body)
        res.status(201).json({
            status : 'success' ,
            data : {
                newPost
            }
        })
    } catch (error) {
        res.status(404).json({
            status : 'failed'
        })
    }
}

exports.updatePost = async (req,res,next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id , req.body , {
            new : true ,
            runValidators : true
        })

        res.status(201).json({
            status : 'success' ,
            data : {
                updatedPost
            }
        })
    } catch (e) {
        res.status(404).json({
            status : 'failed'
        })
    }
}

exports.deletePost = async (req , res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id , req.body)
        res.status(200).json({
            status:'succesfull'
        }) 
    } catch (e) {
        res.status(404).json({
            status: 'failed'
        })
    }
}