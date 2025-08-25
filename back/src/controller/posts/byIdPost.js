const { Comment, Post, User } = require('../../db');



const getPostById=async(postId)=>{
    try{
        const infoPost= await Post.findByPk(postId,{
            include:{
                model:User,
                attributes:['id','nombre']
            },
            include:{
                model:Comment,
            }
        });
        return infoPost;
    }catch(error){
        console.log("erro al traer por id el post",error)
        throw error;
    }
}


module.exports = getPostById;