var express = require('express');
const UserModel = require('../module/user-model.js');
var router = express.Router();
const cors = require("cors");
const userModel = require('../module/user-model.js');
const { useColors } = require('debug/src/browser');
router.use(cors());

router.get('/', async function(req, res, next) {
  const getUser = await UserModel.find()
  res.send(getUser)
});

//add new user
router.post("/add", async function(req,res){
try{
  const newUser = new UserModel(req.body)
  console.log(newUser)
  await newUser.save()
  res.json("sparad")

} catch(error){
  console.log("fel", error)
  res.json(error)
}
})




router.post("/", async function(req,res){
  const { userName, passWord } = req.body
  try{
    const user = await userModel.findOne({userName, passWord})
    console.log(user)
    if(!user){
      console.log("här var det error")
      res.send("Testa logga in igen")
    }else{
      res.send(user)}

  } catch(error){
    console.log("fel", error)
    res.json(error)
  }
  })

  router.put("/", async function(req,res){
    const { _id, newsLetter} = req.body
    const user = await userModel.findById({_id})
    user.newsLetter = newsLetter
    await user.save()
    res.status(200).json(user)
  })

  
module.exports = router;
