//INSTALLED PACKAGES
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");

//USERDEFINED VARIABLES & FUNCTIONS
const port=process.env.port || 8000;
const MONGO_URI=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.aplqb7t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

app.get('/',(req,res,next)=>{
    return res.send("This is a backend for expense tracker app");
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/expense',require("./routes/expense"));

//CONNECTION TO MONGODB ATLAS
mongoose.connect(MONGO_URI,(err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("CONNECTION SUCCESSFULL");
})

//CREATES A SERVER AND LISTEN
app.listen(port,()=>{});