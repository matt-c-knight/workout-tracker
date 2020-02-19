const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const Workout = require("./models/workoutmodel");

const app = express();
const path = require('path')
let mongoose = require("mongoose");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use()
mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true });
app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
})
app.get("/exercise", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/exercise.html"));
})
app.get("/stats", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/stats.html"));
})

app.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
            // console.log(dbWorkout[0])
        })
        .catch(err => {
            res.json(err);
        });
    console.log("here")
});
app.get("/:id", (req, res) => {
    let query = req.params.id;
    Workout.find({
        'request': query
    })
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log("Success!")
        })
        .catch(err => {
            res.json(err);
        });
    // console.log("here")
});
app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            console.log("TEST", dbWorkout)
            res.json(dbWorkout);

        })
        .catch(err => {
            res.json(err);
        });
});
app.post("/api/workouts", (req, res) => {
    const day = new Date().setDate(new Date().getDate() - 10);
    const name = req.body.name;
    const totalDuration = req.body.duration;
    const weight = req.body.weight;
    const reps = req.body.reps;
    const sets = req.body.sets;
    const distance = req.body.distance;

    const newWorkout = new Workout({
        day,
        name,
        totalDuration,
        weight,
        reps,
        sets,
        distance
    })
    console.log("new workout", newWorkout);
    newWorkout.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});
// app.put("/api/workouts/:id", ({ body }, res) => {
// //    var myId = req.params.id;
// //    console.log(myId)
//    console.log(body)

//     db.create(body)
//         .then(({ _id }) => db.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//             console.log(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });
// app.put("/api/workouts/:id", function (req, res) {
//     console.log(req.params.id)
//     Workout.findById(req.params.id)
//         .then(workout => {

//             workout.type = req.body.cardioname;
//             workout.name = req.body.name;
//             workout.weight = req.body.weight;
//             workout.sets = req.body.sets;
//             workout.reps = req.body.reps;
//             workout.duration = req.body.duration;

//             workout.save()
//                 .then(() => res.json('Exercise added!'))
//                 .catch(err => res.status(400).json('Error: ' + err))
//         });
//     });
app.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log("Hello", params)

    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })

        .then(workouts => {
            console.log("NEW TEST", workouts)
            res.json(workouts)
        })

})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


//   ------------------------------------------------------
// "/api/workouts/range"
// "/api/workouts"
// "/api/workouts/" + id
// `/api/workouts/range`
// let mongoose = require("mongoose");

