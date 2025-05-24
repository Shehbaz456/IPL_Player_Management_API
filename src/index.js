import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

import connect_DB from "./db/index.js";

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to the Cricket API");
});

// import routes
import playerRouter from "./routes/player.router.js";


// use routes
app.use("/api/v1/players", playerRouter);



connect_DB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("mongoDB Connection failed ", err);
});
