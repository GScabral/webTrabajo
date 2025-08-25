const { Comment } = require('../../db');


const allComment = async()=>{
    try{
        const comments = await Comment.findAll();
        return comments;
    }catch(error){
        console.log("Error al traer los comentarios:",error);
        throw error;
    }
}


module.exports = allComment;


//✅ 
