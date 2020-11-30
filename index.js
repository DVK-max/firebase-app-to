var express=require('express');
const path=require('path');
const PORT=process.env.PORT || 5000;
var app=express();
//var Upstox=require('upstox');

var url=require('url');
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
      if (message.status=="completed" || message.status=="complete")
      {
        active=true;
        price=message.average_price;
        if (message.transaction_type=="B")
        {
          bs=1;          
          stoploss=price-50;
          target=price+20;                    
        } else if (message.transaction_type=="S")
        {
          bs=0;
          stoploss=price+50;
          target=price-20;
        }
      }      
    });

    upstox.on("liveFeed",function(message){
      indexBarCount++;
      if (indexBarCount >=250)
      {
            var db=admin.database();
            var Signals=db.ref();
            var NewRoot=Signals.child("liveFeed");
      
            var NewChild=NewRoot.push();
            NewChild.set(message);
      } 

      if (bs==1)
      {
        if (message.ltp > targetPrice)
        {
          stoploss+=20;
          targetPrice+=20;
        }

        if (message.ltp <=stoploss)
        {
          upstox.cancelAllOrder({})
          .then(function(response){})
          .catch(function(error){});
        }
      }

      if (bs==0)
      {
        if (message.ltp < targetPrice)
        {
          stoploss-=20;
          targetPrice-=20;
        }

        if (message.ltp >= stoploss)
        {
          upstox.cancelAllOrder({})
          .then(function(response){})
          .catch(function(error){});
        }
      }      
    });
  });

  var indexBarCount=0;

  var active=false;
  var stoploss=0;
  var price=0;
  var bs=-1;
  var target=20;
  var targetPrice=0;
*/

express()
.get('/', (req,res)=>{    
    var db=admin.database();
    var q=url.parse(req.url,true).query;
    var Sym=q.Sym;
    var Pri=parseFloat(q.Pri);
    var ST=q.ST;    

    var Signals=db.ref("Signals");

    var NewSignal=Signals.push();

    NewSignal.set({
        Xid:NewSignal.key,
        Price:Pri,
        Symbol:Sym,
        SignalType:ST
    });

    i++;
    res.send("Function Called. Processed.");
}).listen(PORT,()=>console.log('Listening On ${PORT}'))
