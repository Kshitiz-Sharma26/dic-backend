const mongoose = require("mongoose");
const database = process.env.DATABASE;
const connect = async () =>{
    mongoose.connect(database,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("connection established");
    }).catch((err)=>console.log("error hai"))
    
}
module.exports = connect;