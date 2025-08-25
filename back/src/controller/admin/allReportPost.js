const { Report, Post, User } = require('../../db');




const obtenerTodosReportes = async () => {
    const reportes = await Report.findAll({
        include: [
            { model: User, attributes: ['id', 'nombre', 'email'] },
            { model: Post, attributes: ['id', 'titulo'] }
        ],
        order: [['fecha_reporte', 'DESC']]
    });

    return reportes;
};



module.exports=obtenerTodosReportes