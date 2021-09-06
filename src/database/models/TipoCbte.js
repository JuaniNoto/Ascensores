module.exports = function (sequelize,dataTypes){
    let alias = 'TipoCbte';
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        status: {
            type:dataTypes.INTEGER,
            notNull:true
        },
        descripcion: {
            type:dataTypes.STRING,
            notNull:true
        }

    };

    let config = {
        tableName: 'tipo_cbte',
        timestamps: false
    };

    const TipoCbte = sequelize.define(alias,cols,config);

    TipoCbte.associate = function( models ) {
        TipoCbte.hasMany (models.Compras, {
            as: "compras",
            foreignKey: "tipo_cbte_id"
        }) 
    }

    return TipoCbte;
};