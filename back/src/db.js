require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');



const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST
} = process.env;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    native: false, dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Render suele necesitar SSL para conexiones seguras
            rejectUnauthorized: false, // Ajusta esto según sea necesario
        },
    },
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, './models'))
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, './models', file));
        modelDefiners.push(model);
    });


modelDefiners.forEach((model) => model(sequelize, DataTypes));

const models = sequelize.models;
if (models) {
    const {
        User,
        Cliente,
        Trabajador,
        Servicio,
        TrabajadorServicio,
        Calificacion,
        Mensaje,
        Reserva,
        ComentarioReportado,
        Admin,
        Comment,
        Post,
        Like,
        ActiveToken,
        Report,
        Notification
    } = models;

    // Relaciones User -> Trabajador y Cliente
    User.hasOne(Trabajador, { foreignKey: 'id' });
    Trabajador.belongsTo(User, { foreignKey: 'id' });

    User.hasOne(Cliente, { foreignKey: 'id' });
    Cliente.belongsTo(User, { foreignKey: 'id' });

    // Relaciones Trabajador <-> Servicio (many-to-many)
    Trabajador.belongsToMany(Servicio, {
        through: TrabajadorServicio,
        foreignKey: 'trabajador_id'
    });
    Servicio.belongsToMany(Trabajador, {
        through: TrabajadorServicio,
        foreignKey: 'servicio_id'
    });

    // Calificaciones (cliente → trabajador)
    Calificacion.belongsTo(Trabajador, { foreignKey: 'trabajador_id' });
    Trabajador.hasMany(Calificacion, { foreignKey: 'trabajador_id' });

    Calificacion.belongsTo(Cliente, { foreignKey: 'cliente_id' });
    Cliente.hasMany(Calificacion, { foreignKey: 'cliente_id' });

    // Mensajes (user ↔ user)
    Mensaje.belongsTo(User, { as: 'Emisor', foreignKey: 'emisor_id' });
    Mensaje.belongsTo(User, { as: 'Receptor', foreignKey: 'receptor_id' });

    // Reservas (cliente → trabajador)
    Reserva.belongsTo(Cliente, { foreignKey: 'cliente_id' });
    Cliente.hasMany(Reserva, { foreignKey: 'cliente_id' });

    Reserva.belongsTo(Trabajador, { foreignKey: 'trabajador_id' });
    Trabajador.hasMany(Reserva, { foreignKey: 'trabajador_id' });

    // Comentarios reportados
    ComentarioReportado.belongsTo(Calificacion, { foreignKey: 'comentario_id' });
    ComentarioReportado.belongsTo(User, { foreignKey: 'reportado_por' });

    // Admin (user → admin)
    Admin.belongsTo(User, { foreignKey: 'usuario_id' });
    User.hasOne(Admin, { foreignKey: 'usuario_id' });


    // Comentarios y publicaciones
    User.hasMany(Comment, { foreignKey: 'user_id' });
    Comment.belongsTo(User, { foreignKey: 'user_id' });

    User.hasMany(Post, { foreignKey: 'user_id' });
    Post.belongsTo(User, { foreignKey: 'user_id' });

    Post.hasMany(Comment, { foreignKey: 'post_id' });
    Comment.belongsTo(Post, { foreignKey: 'post_id' });

    // Likes
    Like.belongsTo(User, { foreignKey: 'user_id' });
    Like.belongsTo(Post, { foreignKey: 'post_id' });

    User.hasMany(Like, { foreignKey: 'user_id' });
    Post.hasMany(Like, { foreignKey: 'post_id' });


    Report.belongsTo(models.User, { foreignKey: 'user_id' });
    Report.belongsTo(models.Post, { foreignKey: 'post_id' });

    Notification.belongsTo(models.User, { as: "recipient", foreignKey: "recipient_id" });
    Notification.belongsTo(models.User, { as: "actor", foreignKey: "actor_id" });


}

module.exports = {
    ...sequelize.models,
    conn: sequelize
}