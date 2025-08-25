const { Report, Post, User } = require('../../db');

const getReportByPost=async(post_id)=>{
    if(!post_id){
        throw new Error('Falta el post_id')
    }


    const reportes =await Report.findAll({
        where:{post_id},
        include:[
            {model:User, attributes:["id",'nombre',"email"]},
            {model:Post, attributes:["id","titulo"]}
        ],
        order:[['fecha_reporte','DESC']]
        
    })

    return reportes;
}



module.exports= getReportByPost;