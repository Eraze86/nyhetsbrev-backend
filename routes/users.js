var express = require('express');
const UserModel = require('../module/user-model.js');
var router = express.Router();
const cors = require("cors");
router.use(cors());

router.get('/', async function(req, res, next) {
  const getUser = await UserModel.find()
  res.send(getUser)
  console.log(getUser)
});

//add new user
router.post("/add", async function(req,res){
try{

  const newUser = new UserModel(req.body)
  console.log("new user",newUser)
  await newUser.save()
  res.json("sparad").redirect("/")

} catch(error){
  console.log("fel", error)
  res.json(error)
}
})

//check if password and username is right
router.post("/", async function(req,res){
  const { userName, passWord } = req.body
  try{
    const user = await UserModel.findOne({userName, passWord})
    if(!user){
   //no its not
      console.log("här var det error")
      res.send("Testa logga in igen")
    }else{
     //yes it is, send back ID
      res.json(user._id)}
     
  } catch(error){
    console.log("fel", error)
    res.json(error)
  }
  })

  //change newletter
  router.put("/user", async function(req,res){
    const { _id, newsLetter} = req.body
    const user = await UserModel.findById({_id})
    
    user.newsLetter = newsLetter
    await user.save()
    res.status(200).json(user)
  })

//find Id
  router.post("/user", async function(req, res){
  
    const {_id}  = req.body
    const checkUser =  await UserModel.findOne({_id})
   res.json({
    _id: checkUser._id,
    userName: checkUser.userName,
    email: checkUser.email,
    newsLetter: checkUser.newsLetter
  })
   

  })
module.exports = router;
