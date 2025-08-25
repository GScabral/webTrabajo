const { Servicio } = require('../../db');


const allService=async()=>{
    try{
        const listService=await Servicio.findAll();

        return listService
    }catch(error){
        throw error;
    }
}



module.exports = allService;