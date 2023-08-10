const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);
const todo = new item({
    name:"apple"
})
const todo1 = new item({
    name:"mango"
})
const todo2 = new item({
    name:"guava"
})

async function getItems(){
    const ans = await item.find({});
    return ans;
}
app.get("/",function(req,res){
    getItems().then(function(foundItems){
        res.render("list",{ejes : foundItems})
    })
})
app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name : itemName
    });
    todo4.save();
    res.redirect("/");
});


app.post("/delete" , async ( req , res ) =>{
    try{
        const checked = req.body.checkbox1;
        await item.findOneAndRemove(checked);
        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }

});

app.listen("3000",function(){
    console.log("server is running")
})


