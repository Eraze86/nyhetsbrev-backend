var express = require('express');
const UserModel = require('../module/user-model.js');
var router = express.Router();
const cors = require("cors")
router.use(cors());

router.get('/', async function(req, res, next) {

let loggIn = `<form action="/" method="post">
                    Användarnamn: <input type="text" name="userName"/>
                    Lösenord: <input type="text" name="passWord"/>
                    <button type="submit">Logga in</button></form>`
                    
    res.send(loggIn)
  }); 
  router.post("/", function(req, res){
      console.log("hejhopp")
     if(!req.body.userName == "admin" && !req.body.passWord == "admin"){
        res.send("nopp")
        
     }
     res.redirect("/loggedIn")
  })

  router.get('/loggedIn', async function(req, res, next) {

    const getUser = await UserModel.find()
    
    let sub = `<br/><a href="/admin/loggedIn/sub">prenemurerar</a>`
    let noSub = `<br/><a href="/admin/loggedIn/noSub">Ingen prenumeration</a>`
    res.send(getUser + sub + noSub)
  });

router.get("/loggedIn/sub", async function(req, res, next){
const newsLetterUsers = await UserModel.find({"newsLetter": true})
res.send(newsLetterUsers)
})
router.get("/loggedIn/noSub", async function(req, res, next){
    const newsLetterUsers = await UserModel.find({"newsLetter": false})
    res.send(newsLetterUsers)
    })
module.exports = router;