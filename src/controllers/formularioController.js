import express from "express";
import conexion from "./conexion.js";
import bcrypt, { hash } from "bcrypt"
import passport from "passport";
import { encrypt } from "./bcrypt.js";
// import flash from "connect-flash;"




passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await conexion.query("SELEC * FROM registro WHERE ID =?", [id]);
    done(null, rows[0]);
})