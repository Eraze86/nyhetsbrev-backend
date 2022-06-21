var express = require('express');
var router = express.Router();
const cors = require("cors")
router.use(cors());
const fs = require("fs")
const UserModel = require('../module/user-model.js');

router.get("/", function(req, res, next) {
let loggIn = `<form action="admin/loggin" method="post">
                    Användarnamn: <input type="text" name="userName"/>
                    Lösenord: <input type="text" name="passWord"/>
                    <button type="submit">Logga in</button></form>`
                    
    res.send(loggIn)
  }); 

  router.post("/loggin", function(req, res){
      console.log("kommer det hit?",req.body.userName, req.body.passWord)
      fs.readFile("admin.json", (err, data) =>{
        if(err){
          console.log("fel")
        }
        let user = JSON.parse(data);
        console.log(req.body.userName, req.body.passWord)
        if(user.userName === req.body.userName && user.passWord === req.body.passWord){
          console.log("hurra hurra hurra")
        
          res.redirect("logg")
        }
      })
  })

  router.get("/logg", async function(req, res, next) {

    const getUser = await UserModel.find()
    
    let sub = `<br/><a href="/admin/loggedIn/sub">prenemurerar</a>`
    let noSub = `<br/><a href="/admin/loggedIn/noSub">Ingen prenumeration</a>`
    const loggOut = `<br/><a href="/admin" >Logga ut</a>`
    res.send(getUser + sub + noSub + loggOut)
  });

router.get("/loggedIn/sub", async function(req, res, next){
const newsLetterUsers = await UserModel.find({"newsLetter": true})
const back = `<a href="/admin/logg" >Tillbaka</a>`
res.send(newsLetterUsers + back)
})
router.get("/loggedIn/noSub", async function(req, res, next){
    const newsLetterUsers = await UserModel.find({"newsLetter": false})
    const back = `<a href="/admin/logg" >Tillbaka</a>`
    res.send(newsLetterUsers + back)
    })


module.exports = router;