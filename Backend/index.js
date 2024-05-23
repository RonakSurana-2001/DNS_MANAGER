const express=require("express")
const app=express()
const port=process.env.PORT || 3000
const cors=require('cors')

app.use(express.json())
app.use(cors())

app.use("/user",require("./routes/user"))
app.use("/hostedZones",require("./routes/hostedZones"))
app.use("/dnsRecords",require("./routes/dnsRecords"))

app.get("/",(req,res)=>{
    res.send("Hello")
})


app.listen(port,()=>{
    console.log(`Backend is Running on PORT ${port}`)
})