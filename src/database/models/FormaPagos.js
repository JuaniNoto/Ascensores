module.exports = function (sequelize,dataTypes){
    let alias = "FormaPagos";
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        forma: {
            type:dataTypes.STRING,
            notNull:true
        }

    };

    let config = {
        tableName: 'forma_pago',
        timestamps: false
    };

    const FormaPagos = sequelize.define(alias,cols,config);

    return FormaPagos;
}