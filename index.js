import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import helmet from "helmet"
const APP = express();
const PORT = 4041;

APP.use(helmet());
APP.use(bodyParser.json());
APP.use(cors());
APP.use(userRouter);
APP.use("*", (req, resp) => resp.send("Cette route n'exist pas !!"));

APP.listen(PORT, ()=>{
    console.log(`Le serveur est demaré à l'adresse : http://127.0.0.1:${PORT}`);
})