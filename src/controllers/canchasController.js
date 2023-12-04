import express from "express";
import conexion from "./conexion.js";

export const buscar = async(req,res)=>{
    const data = req.body;
    const verify = "SELECT * FROM registro";
    await conexion.query(verify,[data],(err,res)=>{
        if (err) throw err;
               if(res)
               ;
    })
}