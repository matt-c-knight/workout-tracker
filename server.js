const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const db = require("./models/workoutmodel");
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
    db.find({})
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
    db.find({
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
    db.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
// app.put("api/workouts/:id", (req,res) => {
//     let userId = req.params.id;
//     let updateObj = {exercises: req.body};
//     db.findByIdAndUpdate(userId, updateObj, {new: true}, function(err, res) {
//         if(err) {
//             throw err
//         } else {
//             res.json("Success")
//         }
//     })
// })
app.put("/api/workouts/:id", ({ body }, res) => {
    // var  = req.params.id;
    db.create(body)
        .then(({ _id }) => db.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(dbWorkout);
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

