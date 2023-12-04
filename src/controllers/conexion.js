// IMPORTAR LIBRERIA
import mysql from "mysql";
import {promisify} from "util"
import database from "../store.js";
 
//  ESTABELECER LOS PARAMETROS
export const conexion = mysql.createPool(database)


conexion.getConnection((err, connection)=>{
    if (err) {
        if (err.code === "POTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED")
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TO MANY CONNECTION")
        }
        if (err.code=== "ENCONNREDFUSE") {
            
        }console.error("DATABASE CONNECTION WAS REFUSED")
    }

    if (connection)connection.release();
    console.log("db is connected");
        return
    });

conexion.query = promisify(conexion.query)

export default conexion