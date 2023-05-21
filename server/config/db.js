import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
const connect = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://ajay:ajay@cluster0.gbpm7uj.mongodb.net/hoelBooking?retryWrites=true&w=majority");
        console.log("connected to mongoDB");
    }catch(error){
        throw error;
    }
}
mongoose.set("strictQuery", false);
mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected !")
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected !")
})

export default connect;