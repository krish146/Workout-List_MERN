const express=require('express')
 const {Postworkout,
getworkouts,
getworkout,deleteWorkout,updateWorkout}=require('../controllers/workoutcontrollers')
// const Workout=require('../models/workoutmodel')
const router = express.Router()

router.get("/",getworkouts)

//get single workshop
router.get('/:id',getworkout)

//post a new workout
router.post('/',Postworkout)

//delete a workout
router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)
module.exports=router