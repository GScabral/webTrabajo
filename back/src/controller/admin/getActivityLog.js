const { ActivityLog } = require('../../db');

const deleteActivityLog = async (logId) => {
    try {
        const log = await ActivityLog.findByPk(logId);
        if (!log) {
            throw new Error('Registro de actividad no encontrado');
        }
        await log.destroy();
        return { message: 'Registro de actividad eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar registro de actividad:', error);
        throw error;
    }
};

module.exports = deleteActivityLog;