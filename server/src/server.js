import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";

const app = express();

// Aplly cors & headers - middleware:
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_CLIENT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// config app & body parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

configViewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
