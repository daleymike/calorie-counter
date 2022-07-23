const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/calorie-counter", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Established a connection to Calorie-Counter DB"))
.catch((err) => console.log("Error connecting to DB", err));