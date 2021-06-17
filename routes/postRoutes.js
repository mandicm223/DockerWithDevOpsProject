const express = require('express')
const router = express.Router()
const postController = require('../controllers/postControllers')
const protection = require('../middleware/userMiddleware')
router.route('/')
.get(protection , postController.getAllPosts)
.post(protection , postController.createPost)

router.route('/:id')
.get(protection , postController.getOnePost)
.patch(protection ,postController.updatePost)
.delete(protection ,postController.deletePost)

module.exports = router