import { FileUpload } from '../interfaces/file-upload';
import path  from 'path';
import fs from 'fs'
import uniqid from 'uniqid'


export default class FileSystem {
    constructor(){

    }

 // Función que guarda la imagen el la carpeta temp despues de crear la carpeta de usuario si no existe  y generar un nombre único a la imagen   
  guardarImagenTemporal(file:FileUpload,userId:string){

    return new Promise<void>(  (resolve, reject) => {

      // Crear carpetas
      const path = this.crearCarpetaUsuario( userId );

      // Nombre archivo
      const nombreArchivo = this.generarNombreUnico( file.name );
      
      // Mover el archivo del Temp a nuestra carpeta
      file.mv( `${ path }/${ nombreArchivo }`, ( err: any) => {

          if ( err ) {
              reject(err);
          } else {
              resolve();
          }

      });

  });

  }  
// funcion que genera un nombre único a la imagen subida
  private generarNombreUnico(nombre:string){
    const nombreArr=nombre.split('.');
    const ext = nombreArr[nombreArr.length-1]
    const idUnico=uniqid();
    return `${idUnico}.${ext}`;
  }

//función que cre las carpetas con el nombre de usuario y la carpeta temp
  private crearCarpetaUsuario(userId:string){
    const pathUser=path.resolve(__dirname,'../uploads',userId);
    const pathUserTemp=pathUser+'/temp';
 
    const existe =fs.existsSync(pathUser);
    if(!existe){
        fs.mkdirSync(pathUser);
        fs.mkdirSync(pathUserTemp);

    }
    return pathUserTemp
  }

 imgDeTempAArticulos(userId:string){
  userId='jesus'
  const pathTemp=path.resolve(__dirname,'../uploads',userId,'temp');
  const pathArt=path.resolve(__dirname,'../uploads',userId,'articulos');
  if (!fs.existsSync(pathTemp)){
    return [];
  }
  if (!fs.existsSync(pathArt)){
    fs.mkdirSync(pathArt);
  }
  const imgTemp=this.obtenerImgEnTemp(userId);
  imgTemp.forEach(imagen=>{
    fs.renameSync(`${pathTemp}/${imagen}`,`${pathArt}/${imagen}`)
  });
  return imgTemp;

 }

private obtenerImgEnTemp(userId:string){
  const pathTemp=path.resolve(__dirname,'../uploads',userId,'temp');
  return fs.readdirSync(pathTemp) || [];
}

getFotoUrl(userId:string,img:string){
  const pathFoto=path.resolve(__dirname,'../uploads',userId,'articulos',img);
  
  if (!fs.existsSync(pathFoto)){
    return path.resolve(__dirname,'../assets/400x250.jpg',userId,'articulos',img);
  }
  return pathFoto;
}
}