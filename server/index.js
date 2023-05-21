import dotenv from "dotenv"
dotenv.config();
import express from "express"
import connect from "./config/db.js";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const port = process.env.PORT || 5000;
connect();

app.use(express.json());
//middleware
app.use(cors());
app.use(cookieParser());


app.use("/api/v1.0/auth",authRoute)
app.use("/api/v1.0/hotels",hotelsRoute)
app.use("/api/v1.0/rooms",roomsRoute)
app.use("/api/v1.0/users",usersRoute)

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong"
  return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack
  })
})

app.listen(port, () =>{
    console.log(`Server running on port ${port} `)
});