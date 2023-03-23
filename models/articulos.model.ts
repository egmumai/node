import { Schema,model } from "mongoose";


const articuloSchema=new Schema(
    {
    created:{
    type:Date
    },
    
    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    qr:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
      },
    precio: {
        type: Number,
       
    },
    volumen: {
        type: String,
       
    },
    observaciones: {
        type: String,
       
    },
    imgs:[{
        type:String
    }]
});

articuloSchema.pre<IArticulo>('save',function(next){
    this.created=new Date();
    next();
    
})
interface IArticulo extends Document{
    created:Date,
    nombre:string,
    descripcion:string,
    precio:number,
    obsevaciones:string,
    qr:string,
    volumen:string,
    img:string
}

export const Articulo= model<IArticulo>('Articulo',articuloSchema);