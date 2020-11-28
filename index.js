var express=require('express');
const path=require('path');
const PORT=process.env.PORT || 5000;
var app=express();

var admin = require("firebase-admin");
var serviceAccount = require("./mykey.json");
const { SIGABRT } = require('constants');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://casuistrynews.firebaseio.com"
});

i=1;

express()
.get('/', (req,res)=>{
    
    var db=admin.database();

    var Signals=db.ref("Signals");

    var NewSignal=Signals.push();

    NewSignal.set({
        Xid:NewSignal.key,
        Number:i
    });

    i++;
    res.send("Hello World "+i);
}).listen(PORT,()=>console.log('Listening On ${PORT}'))
