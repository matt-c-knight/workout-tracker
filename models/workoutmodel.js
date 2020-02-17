const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  
  day: Date,
  exercises:  [
    {
        formType: String,
        name: String,
        totalDuration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;