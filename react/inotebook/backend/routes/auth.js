const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const res = require("express/lib/response");
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'payalisagood$girl';

// ROUTE 1= Create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({min: 3}),
  body('email', 'Enter a valid email').isEmail(),
  body('password','password length should be 5').isLength({min: 5}),
], 
 async (req, res) =>

{
    //if there are error, return bad request and the errors
  const errors = validationResult(req);
    if(!errors.isEmpty())
    {
       return res.status(400).json({errors: errors.array()});
     }

  //check weather the user with the same email exist already
  try{
  let user = await User.findOne({email:req.body.email});
  console.log(user);
  if(user){
    return res.status(400).json({error: "sorry a user with this email already exists"})
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt)

  //Create a new user
   user= await User.create({
    name: req.body.name,
    email:req.body.email,
    password: secPass,
  })
  //.then(user => res.json(user))
 // .catch(err=> {console.log(err)
  //  res.json({error: 'please enter a unique value for email', message:err.message})})
  
  const data = {
    user:{
      id:user.id
    }
  }
   const authToken = jwt.sign(data, JWT_SECRET);
   

   res.json({authToken})  // send response of user data
 }
   catch(error)
   {
    console.error(error.message);
    res.status(500).send("Internal server"); 
  }
  
});


// ROUTE 2= Authenticate a user using: POST "/api/auth/login". No login required

router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),

], async (req, res)=>{

  //if there are error, return bad request and the error
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array()})
  }

  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please login with correct credential"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please login with correct credential"});
    }

    const payload = {
      user:{
        id:user.id,
      }
    }
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({authToken})
  } catch(error){
     console.error(error.message);
     res.status(500).send("Internal server error ");
  }
});

//ROUTE 3: Get loggedin user details using:POST "/api/auth/getuser". login required

router.post('/getuser',fetchuser, async (req, res)=>{
 try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
 }catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error");
 }
});
  module.exports = router;