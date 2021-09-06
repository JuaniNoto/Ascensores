module.exports = function (sequelize,dataTypes){
    let alias = 'TipoTareas';
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        tarea: {
            type:dataTypes.STRING,
            notNull:true
        }

    };

    let config = {
        tableName: 'tipo_tareas',
        timestamps: false
    };

    const TipoTareas = sequelize.define(alias,cols,config);

    TipoTareas.associate = function( models ) {
        TipoTareas.hasMany( models.Tareas, {
            as:"tareas",
            foreignKey: "tipo_tarea_id"
        })
    }

    return TipoTareas;
};