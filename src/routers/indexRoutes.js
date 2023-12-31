import express from "express";
import { principal } from "../controllers/principalController.js";
import { buscar } from "../controllers/canchasController.js";
import { eventos } from "../controllers/eventosController.js";
import conexion from "../controllers/conexion.js";
import { encrypt } from "../controllers/bcrypt.js";
import {login} from "./autentication.js";



const router = express.Router();


router.get("/", (req, res) => {
    res.render("index")
})

router.post("/", login);


router.get("/formulario", (req, res) => {
    res.render("formulario", { title: "Registrarse" })
})

router.post("/formulario", async (req, res) => {
    const data = req.body;
    const user = await conexion.query("SELECT * FROM registro WHERE Cedula = ?", [data.cedula]);
    if (!user) {
        const password = await encrypt(data.password);
        data.password = password;
        await conexion.query("INSERT INTO registro SET ?", [data]);
        req.flash('message', 'Usuario registrado con éxito');
        res.redirect("/")
    }
    else {
        req.flash("message", "Usuario no ha sido registrado, ya existe!");
        console.log("existe");
        res.redirect("/formulario");
    }
}
)
router.get("/principal", (req, res) => {
    req.getFlash("message")
    res.render("principal", { title: "Home" })
})

router.get("/canchas",  (req, res) => {
    res.render("canchas", { title: "Canchas" })
})

router.get("/eventos",  (req, res) => {
    res.render("eventos", { title: "Eventos" })
})
export default router