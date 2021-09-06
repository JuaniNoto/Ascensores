module.exports = function (sequelize,dataTypes){
    let alias = 'Pagos';
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
        abono_id: {
            type:dataTypes.INTEGER,
            notNull:true
        },
        fecha: {
            type:dataTypes.DATEONLY,
            notNull:true
        },
        monto: {
            type:dataTypes.FLOAT,
            notNull:true
        },
        observaciones: {
            type:dataTypes.STRING,
            notNull:true
        }

    };

    let config = {
        tableName: 'pagos',
        timestamps: false
    };

    const Pagos = sequelize.define(alias,cols,config);

    Pagos.associate = function ( models ) {
        Pagos.belongsTo( models.Clientes , {
            as:"clientes",
            foreignKey: "cliente_id"
        }),
        Pagos.belongsTo( models.Abonos, {
            as:"abonos",
            foreignKey: "abono_id"
        })
    }

    return Pagos;
};