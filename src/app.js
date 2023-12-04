import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import router from "./routers/indexRoutes.js";
import morgan from "morgan";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
// import MySQLStore from "express-mysql-session";
// import database from "./store.js" 
// import conexion from "./controllers/conexion.js";




// llamamos a los metodos
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(session({
  secret: "message",
  resave: false,
  saveUninitialized: false,
  cookie:{secure:true}
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

app.use((req,res,next)=>{app.locals.message = req.flash("message");
next();
})

// RUTAS importada
app.use(router);

// RUN SERVIDOR
app.listen(app.get("port"),()=>{
  console.log("servidor escuchando en el puerto",app.get("port"))
});

export default app

