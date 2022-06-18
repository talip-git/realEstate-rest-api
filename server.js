const express = require("express")
const dontenv = require("dotenv").config()
const morgan = require("morgan")

const userRouter = require("./routes/users")
const houseRouter = require("./routes/houses")
const app = express()
app.use(express.json())
app.use(morgan("common"))

app.use("/api/users",userRouter)
app.use("/api/houses",houseRouter)


app.listen(process.env.PORT,()=>{
    console.log("Server is listening on port",process.env.PORT,"...")
})