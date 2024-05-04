// const { model } = require('mongoose');
const Workout=require('../models/workoutmodel')
const mongoose=require('mongoose')
//retrieve all workouts , first newly created 

//api : / 
const getworkouts=async(req,res)=>{ //wtever we write in {reps:20} that  documents will be printed., there are only for explicitly created properties
    const workout=await Workout.find({}).sort({createdAt: -1}) //-1 for newest one
    res.status(200).json(workout)
}

const getworkout = async(req,res)=>{ // get a single workout , api  : /:id
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){ //checking if its valid object id or not 
        return res.status(404).json({error: " no such workout , wrong id"})
    }
    const workout= await Workout.find({_id:id}) //can also use.findById(id) in case of error
    if(!workout){
        return res.status(404).json({ error: "no such workout"})
    }
    res.status(200).json(workout) //upon successfull return
}

//creating new collection/workout using post method,in video it is createWorkout
//api : api/workouts
const Postworkout=async(req,res)=>{ //same link can have post,get,put,use ..methods as they will be activated in diff situations
    const {title,load,reps}=req.body; //request body is from frontend 

    //create new workout to push
    try{
        const workout = await Workout.create({title,load,reps}) //creating new document using model interface provided by mongoose
        //here title,load, reps are from req.body
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message}) //error has a message in it
    }
//res.json({msg:'post a new workout'})
}


//deleting workout, api/workouts
const deleteWorkout=async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"no such workout to delete"})
    }

    
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({ error: "no such workout"})
    }

    res.status(200).json({workout})
}

//update the workouts list

const updateWorkout = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"no such workout to delete"})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body}) // just update that field and leave other fields alone
 //req.body is comming from the field input, ... is for spreading the properites in that object to update 
 if(!workout){
    return res.status(404).json({ error: "no such workout"})
}

res.status(200).json({workout})
   
    
}

module.exports={
    Postworkout,getworkout,getworkouts,deleteWorkout,updateWorkout
}