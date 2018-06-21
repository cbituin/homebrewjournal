var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

// APP CONFIG    
mongoose.connect("mongodb://localhost/homebrewjournalapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Toicon-icon-sharp-corners-influence.svg/2000px-Toicon-icon-sharp-corners-influence.svg.png"},
    styleName: String,
    batchSize: String,
    mashSchedule: String,
    boilTime: Number,
    grains: String,
    hops: String,
    yeast: String,
    adjuncts: String,
    generalNotes: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up! Relax and have a homebrew!");
})