import { Router,Request,Response } from "express";
import { Articulo } from '../models/articulos.model';

const busquedaRoutes =Router();




busquedaRoutes.get('/',async(req:Request,res:Response)=>{

    const busqueda=req.params.busqueda;
    const regex =new RegExp(busqueda,'i')
    
     const arts= await Articulo.find({ nombre:regex},{nombre:1,precio: 1, _id: 0 })
                               .sort({_id:-1})
                               .exec();
    res.json({
        ok:true,
        arts
    })
})
busquedaRoutes.get('/:dato',async(req:Request,res:Response)=>{
 
    const busqueda = req.params.dato;
    const regex = new RegExp(busqueda, 'i');
    
    const arts = await Articulo.find({
        $or: [
            { nombre: regex },
            { descripcion: regex },
            { observaciones: regex }
        ]
    }).sort({_id: -1}).exec();
    
    res.json({
        ok: true,
        arts
    });
})

export default busquedaRoutes;