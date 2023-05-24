const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const Blog=require('./model/blogModel');

const methodOverride = require('method-override');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine',ejs);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('home.ejs');
  });

app.get('/create', function(req, res) {
    res.render('newpost.ejs');
});  

app.get('/post', function(req, res) {
    res.render('post.ejs');
});  

app.get('/update/:id', async (req, res) => {
    try {
      const post = await Blog.findById(req.params.id);
      res.render('updatepost.ejs', { post: post });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  



const blog=require('./routes/blogRoute');

app.use("/api/v1",blog);

module.exports=app;