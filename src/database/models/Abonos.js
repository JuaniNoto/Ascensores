module.exports = function (sequelize,dataTypes){
    let alias = "Abonos";
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        tipo:{
            type:dataTypes.STRING,
            notNull:true
        },
        frecuencia:{
            type:dataTypes.STRING,
            notNull:true
        },
        costo:{
            type:dataTypes.FLOAT,
            notNull:true
        }
    } 

    let config = {
        tableName: 'abonos',
        timestamps:false,
        underscored: true
    }

    const Abonos = sequelize.define(alias,cols,config);

    Abonos.associate = function( models ) {
        Abonos.hasMany (models.Clientes, {
            as: "clientes",
            foreignKey: "abono_id"
        }),
        Abonos.hasMany (models.Pagos, {
            as:"pagos",
            foreignKey: "abono_id"
        })
    }

    return Abonos;
}