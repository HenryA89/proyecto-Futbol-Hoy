import conexion from "./conexion.js";
import bcrypt from "bcrypt"
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


passport.use("local", new LocalStrategy(async (nombre_de_usuario, password, done) => {
  const [dato] = await conexion.query("SELECT * FROM registro WHERE Nombre_de_usuario = ?", [nombre_de_usuario]);
  if (!dato.length) {
    console.log("no registrado")
    await req.flash("error", "Usuario o contraseña incorrecta!");
    return done(null, false);
  }
  else {
    const user = dato[0];
    const validar = await bcrypt.compare(password, user.password);
    if (validar) {
      await req.flash("error", "Bienvenido " + nombre_de_usuario);
      return done(null, false);
    }
    done(null, user)
  } })
)
    

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await conexion.query("SELECT * FROM registro WHERE id = ?", [id]);
  done(null, rows[0]);
});


