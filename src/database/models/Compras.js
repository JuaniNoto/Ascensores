module.exports = function (sequelize,dataTypes){
    let alias = "Compras";
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cuit:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        razon_social:{
            type:dataTypes.STRING,
            notNull:true
        },
        fecha:{
            type:dataTypes.DATEONLY,
            notNull:true
        },
        tipo_cbte_id:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        nro_comprobante:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        monto_neto:{
            type:dataTypes.FLOAT,
            notNull:true
        },
        iva:{
            type:dataTypes.FLOAT,
            notNull:true
        },
        iva_monto:{
            type:dataTypes.FLOAT,
            notNull:true
        },
        retencion:{
            type:dataTypes.FLOAT,
            notNull:true
        },
        retencion_monto:{
            type:dataTypes.FLOAT,
            notNull:true
        },
        detalle:{
            type:dataTypes.STRING,
            notNull:false
        }
    };

    let config = {
        tableName: 'compras',
        timestamps:false
    };

    const Compras = sequelize.define(alias,cols,config);

    Compras.associate = function( models ) {
        Compras.belongsTo (models.TipoCbte, {
            as: "tipoCbte",
            foreignKey: "tipo_cbte_id"
        }) 
    }

    return Compras;
}