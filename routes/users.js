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
    const user = await UserModel.findOne({userName, passWord})
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
    const user = await UserModel.findById({_id})
    user.newsLetter = newsLetter
    await user.save()
    res.status(200).json(user)
  })

  
module.exports = router;
