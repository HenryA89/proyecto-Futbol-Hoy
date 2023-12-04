CREATE DATABASE database_canchas:

USE database_canchas:

CREATE TABLE registro(
    id INT(11) NOT NULL,
    cedula VARCHAR(16) NOT NULL,
    nombre_de_usuario VARCHAR(16) NOT NULL,
    correo VARCHAR(16) NOT NULL,
    telefono VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL
);

ALTER TABLE registro
    ADD PRIMARY KEY (id):

ALTER TABLE registro
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE registro;

