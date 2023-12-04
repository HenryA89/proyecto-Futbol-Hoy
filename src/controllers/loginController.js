import express from "express";
import conexion from "./conexion.js";
import bcrypt from "bcrypt"
import passport from "passport";
import flash from "connect-flash"
import LocalStrategy from "passport-local";



 passport.use("local.login", new LocalStrategy(async (nombre_de_usuario, password, done) => {
    await conexion.query("SELECT * FROM registro WHERE Nombre_de_usuario AND password = ?", [nombre_de_usuario, password], (err, user) => {
        if (err) throw err;
        if (user) {
            const password = data.password
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    done(null, user, req.flash("success", "Bienvenido", + user.nombre_de_usuario))
                } else { done(null, req.flash("message", "Usuario o contraseña incorrecta!")) }
            })
        }
    }
    ) 
 })
);

export default passport






// const data = req.body;
// const sql = "SELECT * FROM registro WHERE nombre =?";
// const user = conexion.query(sql,data.nombre);
// bcrypt.compare(data.nombre,user)
