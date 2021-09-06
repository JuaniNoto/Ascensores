module.exports = function (sequelize,dataTypes){
    let alias = 'Tareas';
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cliente_id: {
            type:dataTypes.INTEGER,
            notNull:true
        },
        usuario_id: {
            type:dataTypes.INTEGER,
            notNull:true
        },
        tipo_tarea_id: {
            type:dataTypes.INTEGER,
            notNull:true
        },
        descripcion: {
            type:dataTypes.STRING,
            notNull:false
        },
        presupuesto: {
            type:dataTypes.FLOAT,
            notNull:true
        },
        fecha: {
            type:dataTypes.DATEONLY,
            notNull:true
        }
    };
    
    let config = {
        tableName: 'tareas',
        timestamps: false
    };

    const Tareas = sequelize.define(alias,cols,config);

    Tareas.associate = function( models ) {
        Tareas.belongsTo( models.Clientes, {
            as:"clientes",
            foreignKey: "cliente_id"
        }),
        Tareas.belongsTo( models.Usuarios, {
            as:"usuarios",
            foreignKey: "usuario_id"
        }),
        Tareas.belongsTo( models.TipoTareas, {
            as:"tipoTareas",
            foreignKey: "tipo_tarea_id"
        })
    }

    return Tareas;
}