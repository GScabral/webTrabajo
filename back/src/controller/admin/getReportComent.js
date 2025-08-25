const { ReportComment, Comment, User } = require('../../db');

const getReportComment = async (req, res) => {
    try {
        const reports = await ReportComment.findAll({
            include: [
                { model: Comment },
                { model: User, attributes: ['id', 'nombre', 'email'] }
            ]
        });

        res.json(reports);
    } catch (error) {
        console.error('Error obteniendo reportes de comentarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getReportComment;
