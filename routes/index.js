var express = require('express');
var router = express.Router();
var User = require("../models/userModel.js")
var passport = require("passport");
var LocalStrategy = require("passport-local");
const upload = require("../utils/upload");

const path = require("path");
const fs = require("fs");
const Post = require("../models/postModel")
passport.use(new LocalStrategy(User.authenticate()));


// sending mail code
const CLIENT_ID = '1097521149049-qc6iu018cmfj73g991o9rm8h05b40k27.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04FxWT-Zb_I6dCgYIARAAGAQSNwF-L9IrfNwzXVr7rK4vHHP4DCwkBzA23yhcAL2phHsdnXHMzIJT3Nv21VX0GZc5JFTEI0fr8yw';
const google = require("googleapis");
const nodemailer = require('nodemailer');
const { use } = require('passport');
const oAuth2Client = new google.Auth.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin', { title: 'SignIn' });
});
router.post('/',
passport.authenticate('local', { failureRedirect: '/invalid-user', successRedirect:"/profile" }),
 function(req, res, next) {
   
 }
 );
 router.get('/invalid-user',function(req,res){
  res.render('userNotFound',{title:"User Not Found"})
})
router.get('/signup',function(req,res){
  res.render('signup',{title:"SignUp"});
})
router.post('/signup', function(req, res, next) {
  const {name ,username,email,password} = req.body;
  var newUser =  new User({
    name , username ,email
  })
  User.register(newUser,password)
  .then(()=>{
    res.render("signin",{title:"SignIn"});
  }).catch(function(){
     res.render('userExists')
  })
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    next();
    return;
  }
  res.redirect('/');
}
router.get('/logout',function(req,res){
 req.logout(function(){
  res.redirect('/');
 });
})
router.get('/forgot-password',function(req,res){
    res.render("forgot-password",{title:"Forgot Password"})
})
router.post("/forgot-password", function (req, res) {
  const { email } = req.body;
  User.findOne({ email })
      .then(function (userFound) {
          if (!userFound)
              return res.send(
                  "User not found <a href='/forgot-password'>go back</a>"
              );

          const link = `${req.protocol}://${req.get(
              "host"
          )}/change-password/${userFound._id}`;
          sendMail(userFound.email,userFound.name, link)
              .then(function (result) {
                  console.log("email sent...");
                  userFound.refreshToken = 1;
                  userFound.save();
                  res.redirect('/')
              })
              .catch(function (err) {
                  console.log(err);
              });
      })
      .catch(function (err) {
          res.send(err);
      });
});
async function sendMail(to,name,link){
  try{
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service:'gmail',
      auth:{
        type:'OAuth2',
        user:'dhananjay2451@gmail.com',
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
      }
    })
    const mailOptions = {
      from:'Dhananjay Yadav <dhananjay2451@gmail.com>',
      to,
      subject:'SocialMedia - Forgot Password',
      text:'Forgot Password',
      html:`<h3 style="color:grey">Hello, ${name} <br> We've recieved a request to reset the password for the SocialMedia account.
      No changes have been made to your account yet. <br>  You can change your password by clicking 
      the link below.<br>
      <a href="${link}">change password</a></h3>`,
    }
    const result = await  transport.sendMail(mailOptions);
     return result;
    }catch(error){
      return error;
    }
}
router.get('/change-password/:id',function(req,res){
  User.findById(req.params.id)
  .then(function(userFound){
      if(userFound.refreshToken == 1){
        res.render('change-password',{title:"Change Password",id:req.params.id})
      }else{
        res.render('link-expire');
      }
  })
})
router.post('/change-password/:id',function(req,res){
  User.findById(req.params.id)
  .then(function(userFound){
    if(!userFound){
     res.redirect('/signup')
    }
      userFound.setPassword(req.body.password,function(err,user){
        if(err) res.send(err)
        userFound.refreshToken = undefined;
        userFound.save();
        res.redirect('/');
      })
  })
  .catch(function(err){
    res.send(err);
  })
})

router.get('/reset-password',isLoggedIn,function(req,res){
  res.render("reset",{title:"Reset Password",user:req.user})
})
router.post('/reset-password',isLoggedIn,function(req,res){ 
  const {oldpassword , newpassword} = req.body;
  req.user.changePassword(oldpassword,newpassword,function(err,user){
    if(err){
      res.redirect('/resetMessage');
    }
    else{
      res.redirect('/logout');
    }
  })
})
router.get('/resetMessage',isLoggedIn,function(req,res){
  res.render('resetMessage',{title:'wrong password',user:req.user})
})
router.get('/delete-warning',isLoggedIn,function(req,res){
  res.render('delete-account',{title:'Delete Account',user:req.user})
})
router.get('/post',isLoggedIn,function(req,res){
  res.render('post',{user:req.user,title:"Create Post"});
})
router.post('/create-post',isLoggedIn,upload.single('avatar'),function(req,res){
    Post.create({
      postTitle:req.body.title,
      postContent:req.body.content,
      postedBy:req.user._id,
      avatar:req.file.filename
    })
    .then(function(postCreated){
      req.user.posts.push(postCreated);
      req.user.save();
      res.redirect('/timeline');
    })
    
})
router.get('/timeline',function(req,res){
  Post.find()
  .then(function(posts){
    User.find()
    .then(function(users){
        res.render("timeline",{posts,users,user:req.user,title:"Home"})
    }).catch(function(err){
      res.send(err);
    })
  })
  .catch(function(err){
    res.send(err);
  })
})
router.get('/profile',isLoggedIn,function(req,res){
  Post.find({postedBy:req.user})
  .then(function(posts){
    res.render('profile',{posts,user:req.user,title:"Profile"});
  })
  .catch(function(err){
    res.send(err);
  })
})
router.get('/delete-post/:id', isLoggedIn,function(req,res){
   Post.findById(req.params.id)
   .then(function(postFound){
    fs.unlinkSync(path.join('public','uploads',postFound.avatar));
    req.user.posts.remove(postFound);
    req.user.save();
    postFound.delete();
    res.redirect('/timeline'); 
   })
   .catch(function(err){
    res.send(err);
   })
})
router.get('/delete-account',isLoggedIn,function(req,res){
  Post.find({
    postedBy:req.user._id
  }).then(function(posts){
    posts.forEach(function(post){
      fs.unlinkSync(path.join("public","uploads",post.avatar));
      post.delete();
    })
  })
    if(req.user.avatar != 'dummy.png'){
      fs.unlinkSync(path.join("public","uploads",req.user.avatar));
    }
    req.user.delete();
    res.redirect('/');
})
router.get('/like/:id',isLoggedIn,function(req,res){
  Post.findById(req.params.id)
  .then(function(post){
    if(post.dislikes.includes(req.user._id)){
      post.dislikes.remove(req.user._id);
    }
    if(!post.likes.includes(req.user._id)){
      post.likes.push(req.user);
    }else{
      post.likes.remove(req.user._id);
    }
    post.save();
    res.redirect('/timeline')
  })
})
router.get('/dislike/:id',isLoggedIn,function(req,res){
  Post.findById(req.params.id)
  .then(function(post){
    if(post.likes.includes(req.user._id)){
      post.likes.remove(req.user._id);
    }
    if(!post.dislikes.includes(req.user._id)){
      post.dislikes.push(req.user);
    }else{
      post.dislikes.remove(req.user._id);
    }
    post.save();
    res.redirect('/timeline')
  })
})
router.post('/upload-image',isLoggedIn,upload.single('avatar'),function(req,res){
  const {oldavatar} = req.body;
  if(oldavatar != 'dummy.png'){
    fs.unlinkSync(path.join(__dirname,'..','public','uploads',oldavatar));
  }
  req.user.update({
    avatar:req.file.filename
  },function(err,result){
    if(err) res.send(err);
    res.redirect('/profile');
  })
})
router.post('/update-profile',isLoggedIn,function(req,res){
  const {username,name,email,phone,gender,about,city} = req.body;
  User.findOne({username})
  .then(function(user){
    if(!user || String(user._id)===(String(req.user._id))){
      req.user.update({
         username,name,phone,gender,about,city,email
       },function(err,result){
         if(err) res.send(err);
         res.redirect('/profile');
       });
      
    }else{
      res.render('userNameExists');
    }
  }).catch(function(err){
    res.send(err);
  })
      
})
router.post('/send-email',async function(req,res){
    sendMail(req.body.sendTo)
    .then(function(){
      res.send('email sent')
    })
    .catch(function(err){
      res.send(err);
    })
})

module.exports = router;
