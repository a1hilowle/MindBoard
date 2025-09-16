import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// middleware
app.use( cors({origin: "http://localhost:5173",}));
app.use(express.json()); // Don't forget this for POST/PUT requests
app.use(rateLimiter);

// app.use((req,res,next) => {
//     console.log(`Request method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT", PORT);
    });
})

