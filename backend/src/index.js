import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); //load environment variable first

import connectDB from "./db/database.js";
import { app } from "./app.js";

connectDB() //it return promise so chain .then() and .catch() on it.
.then(() => {
    
    app.listen(process.env.PORT , () => {
        console.log(`server is running on port : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(`mongoDB connection is failed !` , error);
    process.exit(1)
       
})

