import express from "express";
import { principal } from "../controllers/principalController.js";
import { buscar } from "../controllers/canchasController.js";
import { eventos } from "../controllers/eventosController.js";
import passport from "passport"
import conexion from "../controllers/conexion.js";
import { encrypt } from "../controllers/bcrypt.js";
import { comparar } from "../controllers/bcrypt.js";
import bcrypt from "bcrypt"
import flash from "connect-flash"


const router = express.Router();

router.get("/index", (req, res) => {
    res.render("index")
})

router.get("/formulario", (req, res) => {
    res.render("formulario", { title: "Registrarse" })
})

router.post("/formulario", async (req, res) => {
    const data = req.body;
    const user = await conexion.query("SELECT * FROM registro WHERE Cedula = ?", [data.cedula]);
    if (user.password>0) {
        console.log("existe");
    }
    else {
        const password = await encrypt(data.password);
        data.password = password;
        await conexion.query("INSERT INTO registro SET ?", [data]);
        req.flash('message', 'Usuario registrado con éxito');
        res.redirect("index")
    }}
)

router.post("/",async(req,res)=>{
    const {Nomnre_de_usuario, password} = req.body;
    const user = await conexion.query("SELECT * FROM registro WHERE Nombre_de_usuario = ? AND password = ?", [Nomnre_de_usuario, password]);
    if (user) {
        const verify = await bcrypt.compare(password,user.password);
        if (verify) {
            done(null, user, req.flash('message', 'Bienvenido ' + user.Nomnre_de_usuario));
          } else {
            done(null, false, req.flash('message', 'Incorrect Password'));
          }
        } else {
            return done(null, false, req.flash('message', 'Usuario o contraseña incorrectos!'));
          }req.redirect("principal")
    }
);

router.get("/principal", principal, (req, res) => {
    req.flash("message")
    res.render("principal", { title: "Home" })
})

router.get("/canchas", buscar, (req, res) => {
    res.render("canchas", { title: "Canchas" })
})

router.get("/eventos", eventos, (req, res) => {
    res.render("eventos", { title: "Eventos" })
})
export default router