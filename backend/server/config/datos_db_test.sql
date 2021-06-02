/*Empleado*/
INSERT INTO Empleado (nombres, apellidos,fotografia,telefono,sexo) VALUES ('Kenny','McCormick',null,71253656,'m');
INSERT INTO Empleado (nombres, apellidos,fotografia,telefono,sexo) VALUES ('Eric','Cartman',null,72523641,'m');
INSERT INTO Empleado (nombres, apellidos,fotografia,telefono,sexo) VALUES ('Kyle','Broflovski',null,78839651,'m');
INSERT INTO Empleado (nombres, apellidos,fotografia,telefono,sexo) VALUES ('Stan','Marsh',null,78632596,'m');

/*TipoUsuario*/
INSERT INTO TipoUsuario (nombre_tipo_usuario) values ("CAJERO");
INSERT INTO TipoUsuario (nombre_tipo_usuario) values ("CHEF");
INSERT INTO TipoUsuario (nombre_tipo_usuario) values ("ADMIN");

/*Usuario*/
INSERT INTO Usuario (id_empleado, id_tipo_usuario, nombre_usuario, contrasenia, estado) VALUES (1, 1, 'kenny', '$2a$10$qAPQMzdpyPFhkFK9ETMin.wgkRZnejJNybTR6fnZoXshlVxKmzbby', true); 
INSERT INTO Usuario (id_empleado, id_tipo_usuario, nombre_usuario, contrasenia, estado) VALUES (1, 2, 'cartman', '$2a$10$1hQ1U/.U/le/gDryG44pW..bcTw4zd5yTsZznwWDa7d8qQQ1ZiVkW', true); 
INSERT INTO Usuario (id_empleado, id_tipo_usuario, nombre_usuario, contrasenia, estado) VALUES (1, 3, 'kyle', '$2a$10$Ic/3DosUtizvOv8d1I2IkOTIP6MD3sjTghNh3hq4MwbKpk6ccsCSO', true); 

/*Plato*/
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Carne', 7.00, 'Carne asada', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Pollo', 6.00, 'Pollo empanizado', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Camarones', 8.00, 'Camarones al ajillo', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Pizza Personal', 6.00, 'Pizza de peperoni', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Hamburguesa', 7.50, 'Hamburguesa mediana', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Fajitas de pollo', 6.25, 'Fajitas de pollo con ensalada', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Albondigas', 6.00, 'Orden de albondigas', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Paella', 5.00, 'Porción de paella', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Sopa de Tortilla', 5.00, 'Sopa de tortilla pequeña', null);
INSERT INTO Plato (nombre, precio, descripcion, imagen) VALUES ('Pizza Grande', 15.00, 'Pizza de jamón', null);
