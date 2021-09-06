module.exports = function (sequelize,dataTypes){
    let alias = "Administrador";
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:dataTypes.STRING,
            notNull:true
        }
    } 

    let config = {
        tableName: 'administrador',
        timestamps:false,
        underscored: true
    }

    const Administrador = sequelize.define(alias,cols,config);

    Administrador.associate = function( models ) {
        Administrador.hasMany (models.Usuarios, {
            as: "usuarios",
            foreignKey: "admin_id"
        }) 
    }

    return Administrador;
}