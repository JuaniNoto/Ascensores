module.exports = function (sequelize,dataTypes){
    let alias = "Usuarios";
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        usuario:{
            type:dataTypes.STRING,
            notNull:true
        },
        password:{
            type:dataTypes.STRING,
            notNull:true
        },
        admin_id:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        status:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        cuil:{
            type:dataTypes.BIGINT,
            notNull:true
        },
        direccion:{
            type:dataTypes.STRING,
            notNull:false
        },
        localidad:{
            type:dataTypes.STRING,
            notNull:false
        },
        codigo_postal:{
            type:dataTypes.INTEGER,
            notNull:false
        },
        provincia:{
            type:dataTypes.STRING,
            notNull:false
        },
        telefono:{
            type:dataTypes.INTEGER,
            notNull:false
        },
        mail:{
            type:dataTypes.STRING,
            notNull:true
        }
    } 

    let config = {
        tableName: 'usuarios',
        timestamps:true,
        underscored: true
    }

    const Usuarios = sequelize.define(alias,cols,config);

    Usuarios.associate = function( models ) {
        Usuarios.belongsTo (models.Administrador, {
            as: "administrador",
            foreignKey: "admin_id"
        }),
        Usuarios.hasMany (models.Tareas, {
            as: "tareas",
            foreignKey: "usuario_id"
        })
    }

    return Usuarios;
}