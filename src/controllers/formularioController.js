import {Strategy as LocalStrategy} from "passport-local";
import conexion from "./conexion.js";
import bcrypt, { hash } from "bcrypt"
import passport from "passport";
import { encrypt } from "./bcrypt.js";
// import flash from "connect-flash;"

passport.use("register", new LocalStrategy(async (cedula, password, done) => {
    const dato = await conexion.query("SELECT * FROM registro WHERE Cedula = ?", [cedula]);
    if (dato) {
        console.log("Usuario ya existe!")
        await req.flash("error", "Usuario no encontrado");
        return done(null, false);
    }
    const user = dato.password;
    const validar = await bcrypt.compare(password, user.password);
    if (validar) {
        await req.flash("error", "Incorrect Password");
        return done(null, false);
    }
    done(null, user)
 } )
);






passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await conexion.query("SELEC * FROM registro WHERE ID =?", [id]);
    done(null, rows[0]);
})