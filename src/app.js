import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import router from "./routers/indexRoutes.js";
import morgan from "morgan";
import {promiseConnectFlash} from "async-connect-flash"
import session from "express-session";
import passport from "passport";
import "./controllers/loginController.js"
import MySQLsession from "express-mysql-session";
import conexion from "./controllers/conexion.js";
import cookieParser from "cookie-parser";



// llamamos a los metodos
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MySQLStore = MySQLsession(session)

// Configuracion Puerto
app.set("port", process.env.PORT || 3000); 

// CONFIGACION HANDLEBARS-PLANTILLAS
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs", 
    engine(
      {
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      defaultLayouts: "main",
      extname: ".hbs",
      helpers: "./funciones/handlebars.js"
  })
)
app.set("view engine", ".hbs");

// LLAMAMOMS A MIDDLWERES
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser("Tabatha1006"));
app.use(session({
  secret: "message",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({}, conexion)
}));
app.use(promiseConnectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  app.locals.success = await req.getFlash("message");
  app.locals.error = await req.getFlash("error");
  app.locals.user = req.user;
  next();
});

// RUTAS importada
app.use(router);


// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   console.log("Error", err);
//   res.status(err.status || 500);
//   res.render("error", {
//     message: err.message,
//     status: err.status,
//   });
// });


// RUN SERVIDOR
app.listen(app.get("port"),()=>{
  console.log("servidor escuchando en el puerto",app.get("port"))
});

export default app

