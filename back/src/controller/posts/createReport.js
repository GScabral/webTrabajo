const { Report, Post, User } = require('../../db');




const crearReporte = async ({ motivo, post_id, user_id }) => {


 
    if (!motivo || !post_id || !user_id) {
        throw new Error('Faltan datos obligatorios para crear el reporte');
    }

    const post = await Post.findByPk(post_id);
    if (!post) {
        throw new Error('El post no existe');
    }

    const reporte = await Report.create({
        motivo,
        post_id,
        user_id
    });

    return reporte;
};


module.exports=crearReporte;