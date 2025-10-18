const {Favorite} =require("../../db");


const removeFav=async(user_id,target_type,target_id)=>{
    const removeItem=await Favorite.destroy({
        where:{user_id,target_id,target_type}
    });

    if(removeItem === 0){
        throw new Error ('No se encontro este favorito')
    }

    return {message:'Favorito eliminado correctamente'}
}


module.exports = removeFav;