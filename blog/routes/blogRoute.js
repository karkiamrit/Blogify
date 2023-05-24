const express=require('express');
const router=express.Router();
const {getAllPosts,createPost,updatePost,deletePost,getSinglePost}=require('../controllers/postController');
router.route("/posts/all").get(getAllPosts);
router.route("/post/create").post(createPost);
router.route("/post/:id").put(updatePost).delete(deletePost).get(getSinglePost);

module.exports=router;