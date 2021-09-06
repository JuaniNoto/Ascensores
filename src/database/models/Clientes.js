module.exports = function (sequelize,dataTypes){
    let alias = "Clientes";
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cuit:{
            type:dataTypes.STRING,
            notNull:true
        },
        razon_social:{
            type:dataTypes.STRING,
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
            type:dataTypes.STRING,
            notNull:false
        },
        provincia:{
            type:dataTypes.STRING,
            notNull:false
        },
        telefono:{
            type:dataTypes.STRING,
            notNull:false
        },
        mail:{
            type:dataTypes.STRING,
            notNull:true
        },
        status:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        abono_id:{
            type:dataTypes.INTEGER,
            notNull:true
        }
        
    } 

    let config = {
        tableName: 'clientes',
        timestamps:true,
        underscored: true
    }

    const Clientes = sequelize.define(alias,cols,config);

    Clientes.associate = function( models ) {
        Clientes.belongsTo (models.Abonos, {
            as: "abonos",
            foreignKey: "abono_id"
        }),
        Clientes.hasMany (models.Pagos, {
            as:"pagos",
            foreignKey: "cliente_id"
        }),
        Clientes.hasMany (models.Tareas, {
            as:"tareas",
            foreignKey: "cliente_id"
        })
    }

    return Clientes;
}