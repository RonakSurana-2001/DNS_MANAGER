const mongoose = require('mongoose');

const connectToDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to mongodb")
    } catch(err){
        console.log(err)
    }
}

module.exports=connectToDb