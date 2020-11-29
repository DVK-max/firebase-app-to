var express=require('express');
const path=require('path');
const PORT=process.env.PORT || 5000;
var app=express();
var Upstox=require('upstox');

var admin = require("firebase-admin");
var serviceAccount = require("./mykey.json");
const { SIGABRT } = require('constants');

/*
var upstox=new Upstox("o9ZAnYkbqe9ZJr8D3wLAj4yghBmCBIhG4tnds9s9");
var accessToken;

accessToken="d005f7fd704bbb1ebcc899b5b1a713052b3ff272";

upstox.setToken(accessToken);
*/
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://casuistrynews.firebaseio.com"
});

i=1;
/*
upstox.getProfile().then(function(response){
  var db=admin.database();

    var Signals=db.ref();
    var NewRoot=Signals.child("Upstox");
    
    var NewChild=NewRoot.push();
    NewChild.set(response);

}).catch(function(error){

});

upstox.getLiveFeed({
  "exchange":"nse_fo",
  "symbol":"BANKNIFTY20DECFUT",
  "type":"full"
});

upstox.connectSocket()
  .then(function(){
    upstox.on("orderUpdate",function(message)
    {
      var db=admin.database();

    var Signals=db.ref();
    var NewRoot=Signals.child("UpstoxOrderUpdate");
    
    var NewChild=NewRoot.push();
    NewChild.set(message);      
    });
    upstox.on("liveFeed",function(message){
      var db=admin.database();

      var Signals=db.ref();
      var NewRoot=Signals.child("liveFeed");
      
      var NewChild=NewRoot.push();
      NewChild.set(message);  
    });
  });
*/
express()
.get('/', (req,res)=>{
    
    var db=admin.database();

    var Signals=db.ref("Signals");

    var NewSignal=Signals.push();

    NewSignal.set({
        Xid:NewSignal.key,
        Price:29500,
        Symbol:"BANKNIFTY20DECFUT",
        SignalType:"BUY"
    });

    i++;
    res.send("Hello World Function Called "+i);
}).listen(PORT,()=>console.log('Listening On ${PORT}'))
