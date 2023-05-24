const blog=require('../model/blogModel');

//createPost
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, author, datePublished, slug } = req.body;
    const post = await blog.create({
      title,
      content,
      author,
      datePublished,
      slug
    });
    res.render('post.ejs', { post:post}); 
    // res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await blog.find();
    res.render('home.ejs', { posts:posts}); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await blog.findById(req.params.id);
    res.render('post.ejs', { post:post}); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;

    const updatedPost = await blog.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.render('post.ejs', { post:updatedPost}); 
    
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const deletedPost = await blog.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // res.status(200).json({ success: true, message: 'Post deleted successfully' });
    res.redirect('/api/v1/posts/all')
   
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};