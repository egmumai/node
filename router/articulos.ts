import { Router,Request,Response } from "express";
import { isValidObjectId } from "mongoose";
import { Articulo } from '../models/articulos.model';
import FileSystem from '../class/file-system';
import { UploadedFile } from "express-fileupload";



const articulosRoutes =Router();
const fileSystem = new FileSystem();

//.....................................................................................................................//
articulosRoutes.get('/',async(req:Request,res:Response)=>{
    let pagina =Number(req.query.pagina)|| 1;
    let skip =pagina-1;
    skip=skip*10;
     const arts= await Articulo.find()
                               .sort({_id:-1})
                               .limit(skip)
                               .exec();

    res.json({
        ok:true,
        pagina,
        arts
    })
})
//.....................................................................................................................//
articulosRoutes.post('/',(req:Request,res:Response)=>{

    const art ={
      nombre:req.body.nombre,
      gr:req.body.gr,
      volumen:req.body.volumen,
      descripcion:req.body.descripcion,
      precio:req.body.precio,
      observaciones:req.body.observaciones,
    }
  const body=req.body;
  const img = fileSystem.imgDeTempAArticulos('jesus');
  body.imgs=img;
  Articulo.create( body ).then( async articuloDB => {

    res.json({
        ok: true,
        articulo: articuloDB
    });

   }).catch( err => {
         res.json(err)
   });

});
//.....................................................................................................................//
articulosRoutes.get('/:id',async(req:Request,res:Response)=>{
  const id=req.params.id;
  if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'ID no válido' });
  }
   const arts= await Articulo.findById(id)
   res.json({
      ok:true,
      arts
  })
})
//.....................................................................................................................//
articulosRoutes.post('/update',(req:Request,res:Response)=>{

     const art ={
        nombre:req.body.nombre,
        gr:req.body.gr,
        volumen:req.body.volumen,
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        observaciones:req.body.observaciones,
    }

  const body=req.body;
  const img = fileSystem.imgDeTempAArticulos('jesus');
  body.imgs=img;
  Articulo.findByIdAndUpdate(body._id, { new: true })
  .then((articuloDB: any) => {
    if (!articuloDB) {
      res.json({
        ok: false,
        mensaje: "No existe este articulo en la DB"
      });
    } else {
       res.json({
        ok: true,
       articuloDB
      });
    }
  })
  .catch((err: Error) => {
    console.error(err);
    // manejar el error de alguna manera
  });
    })
    
//.....................................................................................................................//
articulosRoutes.delete('/:id',async (req:Request,res:Response)=>{
  const id=req.params.id;
  if (!isValidObjectId(id)) {
    
    return res.status(400).json({ error: 'ID no válido' });
  }
   const arts= await Articulo.findById(id)
 
   if (!arts){
      return res.status(400).json({
        ok:false,
        mensaje:'no existe artículo'
    })
  }
    await Articulo.findByIdAndDelete(id)

    res.json({
      ok: true,
      
    })
 
});
 

//.....................................................................................................................//
articulosRoutes.post('/uploadimagen',async (req:Request,res:Response)=>{

  if (!req.files){
      return res.status(400).json({
          ok:false,
          mensaje:'no se has subido ningún archivo'
      })
    }
    const file: UploadedFile | UploadedFile[] = req.files.image;
     
    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }
    const file1: UploadedFile = Array.isArray(file) ? file[0] : file;

    if ( !file1.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        }); 
    }
    
    await fileSystem.guardarImagenTemporal( file1, 'jesus');

    res.json({
        ok: true,
        file: file1.mimetype
    });

});
//.....................................................................................................................//
articulosRoutes.get('/imagen/:userid/:img',async (req:Request,res:Response)=>{
   const userId='jesus';
   const img=req.params.img;
   
   const pathFoto = fileSystem.getFotoUrl( userId, img );
     res.sendFile( pathFoto );

});

export default articulosRoutes;