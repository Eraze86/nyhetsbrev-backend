var express = require('express');
var router = express.Router();
const cors = require("cors")
router.use(cors());
const fs = require("fs")
const UserModel = require('../module/user-model.js');

router.get('/', function(req, res, next) {

let loggIn = `<form action="/" method="post">
                    Användarnamn: <input type="text" name="userName"/>
                    Lösenord: <input type="text" name="passWord"/>
                    <button type="submit">Logga in</button></form>`
                    
    res.send(loggIn)
  }); 
  
    router.post("/", function(req, res){

      fs.readFile("admin.json", (err, data) =>{
        if(err){
          console.log("fel")
        }
        let user = JSON.parse(data);
        console.log(user.userName , user.passWord)
        if(user.userName === req.body.userName && user.passWord === req.body.passWord){
          console.log("hurra hurra huura")
          res.redirect("/loggedIn")
        }
 
      })
      })



  router.get("/loggedIn", async function(req, res, next) {

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