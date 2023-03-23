import Server from './class/server';
import cors from 'cors'
import articulosRoutes from './router/articulos';
import { dbConnection } from './database/config';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
const server=new Server();
//body parser

server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())

// cors

server.app.use(cors({origin:true,credentials:true}))
//FileUpload

server.app.use(fileUpload());
//Rutas de mi app
server.app.use('/articulos',articulosRoutes)

//Conetar DB
// Llamar a la función dbConnection para conectarse a la base de datos
dbConnection()
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((error) => {
    console.log('Error al conectar a la base de datos', error);
  });

server.start(()=>{
    console.log(`servidor corriendo en  ${server.port}`);
    
});
