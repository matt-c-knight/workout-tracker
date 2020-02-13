const express = require("express");
const logger = require("morgan");


const PORT = process.env.PORT || 3000;

const db = require("./models/Workout");
// console.log(db.Workout)
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


//   ------------------------------------------------------
// "/api/workouts/range"
// "/api/workouts"
// "/api/workouts/" + id
// `/api/workouts/range`
// let mongoose = require("mongoose");



// mongoose.connect("mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// let workoutSeed = [
//   {
//     day: new Date().setDate(new Date().getDate()-10),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Bicep Curl",
//         duration: 20,
//         weight: 100,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-9),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Lateral Pull",
//         duration: 20,
//         weight: 300,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-8),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Push Press",
//         duration: 25,
//         weight: 185,
//         reps: 8,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-7),
//     exercises: [
//       {
//         type: "cardio",
//         name: "Running",
//         duration: 25,
//         distance: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-6),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Bench Press",
//         duration: 20,
//         weight: 285,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-5),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Bench Press",
//         duration: 20,
//         weight: 300,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-4),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Quad Press",
//         duration: 30,
//         weight: 300,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-3),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Bench Press",
//         duration: 20,
//         weight: 300,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-2),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Military Press",
//         duration: 20,
//         weight: 300,
//         reps: 10,
//         sets: 4
//       }
//     ]
//   },
//   {
//     day: new Date().setDate(new Date().getDate()-1),
//     exercises: [
//       {
//         type: "resistance",
//         name: "Bench",
//         duration: 30,
//         distance: 2
//       }
//     ]
//   }
// ];

// db.Workout.insertMany(workoutSeed)
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });