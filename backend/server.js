require('dotenv').config() //for process.env object to get all the variables in .env to itself (initilize)

const mongoose=require('mongoose')
const express=require('express')

const app=express(); //object app for adding router methods 
const routess=require('./workout/routes.js'); //getting custome created routes object to mount on app routes

app.use(express.json());//converting 
app.use('/',(req,res,next)=>{//global middle ware, url is always optional
   
    console.log(req.path,req.method);
    next()
})
app.use('/api/workouts',routess) //mouting upon /api/workouts

// app.get('/',(req,res)=>{
//     res.send({msg:"home page"});
// })

mongoose.connect(process.env.MONG_URL).then(()=>{ //after connecting with database, listen to port for requests
    app.listen(port, () => {
        console.log("Server connected to port ",port);
    });

}).catch((error)=>{
    console.log(error)
})
const port =process.env.PORT||3000;

