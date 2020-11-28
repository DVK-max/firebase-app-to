var express=require('express');
const path=require('path');
const PORT=process.env.PORT || 5000;
var app=express();

i=1;

express()
.get('/', (req,res)=>{
    i++;
    res.send("Hello World "+i);
}).listen(PORT,()=>console.log('Listening On ${PORT}'))
