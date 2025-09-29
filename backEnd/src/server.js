import express from "express";
import taskRoute from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

//middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontEnd/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontEnd/dist/index.html"));
    });
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bat dau tren cong http://localhost:${PORT}`);
    });
});


