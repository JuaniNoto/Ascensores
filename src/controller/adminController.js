
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const db = require('../database/models');

module.exports = {

    users: function(req,res){
        
        db.Usuarios.findAll({
            where:{
                status:1
            },
            include:[
                {association:'administrador'}
            ]

        })
        .then(function(usuarios){
            return res.render('usuarios/tablaUsuarios',{usuarios:usuarios})
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })

    },

    create: function(req,res){

        db.Administrador.findAll()
        .then(function(admin){
            return res.render('usuarios/createUsuario',{admin:admin});
        })

    },

    createUser: function(req,res){
        
        let errors = validationResult(req)

        if(errors.isEmpty()){
            
            db.Usuarios.create({
                usuario: req.body.name,
                password: bcrypt.hashSync(req.body.password,12),
                admin_id: req.body.admin,
                status: 1,
                cuil: req.body.cuil,
                direccion: req.body.direccion,
                localidad: req.body.localidad,
                codigo_postal: req.body.codigopostal,
                provincia: req.body.provincia,
                telefono: req.body.telefono,
                mail: req.body.email
            })
            .then(function(usuario){
                return res.send(usuario);
            })
            .catch(function(error){
                console.log('ERROR')
                return res.send(error);
            })

        }
        else{

            db.Administrador.findAll()
            .then(function(admin){
                return res.render('usuarios/createUsuario',
                    {
                        admin:admin,
                        errors:errors.mapped(),
                        old:req.body
                    }
                );
            })
            .catch(function(error){
                res.send(error);
            })
            
        }

    },

    editUserGet: function(req,res){


    },

    editUserPost: function(req,res){

    },

    deleteUser: function(req,res){

        db.Usuarios.update({
            status:0
        },{
            where:{
                id:req.params.id
            }
        })
        .then(function(usuario){
            console.log('USUARIO EDITADO: ' + usuario.dataValues);
            return res.redirect('/admin/users');
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })

    },

    clientes: function(req,res){

        db.Clientes.findAll({
            where:{
                status:1
            }
        })
        .then(function(clientes){
            return res.render('clientes/tablaClientes',{clientes:clientes})
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })

    },

    clientesForm: function(req,res){

        db.Abonos.findAll()
        .then(function(abonos){
            res.render('clientes/createCliente',{abonos:abonos})
        })
        .catch(function(error){
            res.send(error);
        })

    },

    createCliente: function(req,res){
        
        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.Clientes.create({
                cuit:req.body.cuit,
                razon_social:req.body.razon,
                direccion:req.body.direccion,
                localidad:req.body.localidad,
                codigo_postal:req.body.codigopostal,
                provincia:req.body.provincia,
                telefono:req.body.telefono,
                mail:req.body.email,
                status:1,
                abono_id:req.body.abono
            })
            .then(function(cliente){
                console.log(cliente);
                res.send(req.body);
            })
            .catch(function(error){
                res.send(error);
            })

        }
        else {

            db.Abonos.findAll()
            .then(function(abonos){
                return res.render('clientes/createCliente',
                    {
                        abonos:abonos,
                        old:req.body,
                        errors:errors.mapped()
                    }
                    );
            })
            .catch(function(error){
                res.send(error);
            })

        }

    },

    edit: function(req,res){
     
        db.Abonos.findAll()
        .then(function(abonos){
            db.Clientes.findByPk(req.params.id)
            .then(function(cliente){
                return res.render('clientes/editCliente',{
                    abonos:abonos,
                    cliente:cliente
                })

            })
            .catch(function(error){
                console.log(error);
                return res.send(error);
            })

        })
        .catch(function(errors){
            console.log(errors);
            return res.send(errors);
        })

    },

    editCliente: function(req,res){
        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.Clientes.update({
                cuit:req.body.cuit,
                razon_social:req.body.razon,
                direccion:req.body.direccion,
                localidad:req.body.localidad,
                codigo_postal:req.body.codigopostal,
                provincia:req.body.provincia,
                telefono:req.body.telefono,
                mail:req.body.email,
                abono_id:req.body.abono
            },{
                where:{
                    id:req.params.id
                }
            })
            .then(function(cliente){
                console.log(cliente);
                return res.redirect('/admin/clientes');
            })
            .catch(function(error){
                return res.send(error);
            })

        }
        else {

            db.Abonos.findAll()
            .then(function(abonos){
                db.Clientes.findByPk(req.params.id)
                .then(function(cliente){
                    return res.render('clientes/editCliente',
                    {
                        abonos:abonos,
                        cliente:cliente,
                        old:req.body,
                        errors:errors.mapped()
                    }
                    );
                })
                .catch(function(error){
                    console.log(error);
                    return res.send(error);
                })
            })
            .catch(function(error){
                return res.send(error);
            })

        }
        
    },

    deleteCliente: function(req,res){

        db.Clientes.update({
            status:0
        },{
            where:{
                id:req.params.id
            }
        })
        .then(function(cliente){
            console.log('CLIENTE EDITADO: ' + cliente.dataValues);
            return res.redirect('/admin/clientes');
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })

    },
    
    mostar: function(req,res){
        db.Clientes.findAll()
        .then(function(usuarios){
            res.send(usuarios);
        })
    },

    showTareas: function(req,res){
        db.Tareas.findAll({
            include:[
                {association: "clientes"},
                {association: "usuarios"},
                {association: "tipoTareas"}
            ]
        })
        .then(function(tareas){
            return res.render('tareas/tablaTareas',{tareas:tareas})
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })
    },

    tareasForm: function(req,res){
        db.Clientes.findAll({
            where:{
                status:1
            }
        })
        .then(function(clientes){
            db.Usuarios.findAll({
                where:{
                    admin_id:3
                }
            })
            .then(function(usuarios){
                db.TipoTareas.findAll()
                .then(function(tipoTareas){
                    return res.render('tareas/crearTareas',
                        {clientes:clientes,
                        usuarios:usuarios,
                        tipoTareas:tipoTareas}
                        )
                })
                .catch(function(error){
                    console.log(error);
                    return res.send('fallo tipo tarea')
                })
            })
            .catch(function(error){
                console.log(error);
                return res.send('fallo usaurio')
            })
        })
        .catch(function(error){
            console.log(error);
            return res.send('fallo cliente');
        })
    },

    createTarea: function(req,res){

        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.Tareas.create({
                usuario_id:req.body.usuario,
                cliente_id:req.body.cliente,
                tipo_tarea_id:req.body.tipotarea,
                fecha:req.body.fecha,
                presupuesto:req.body.presupuesto,
                descripcion:req.body.descripcion,    
            })
            .then(function(tarea){
                console.log(tarea);
                res.redirect('/admin/tareas');
            })
            .catch(function(error){
                console.log(error);
                res.send(error);
            })

        }

        else {

            db.Clientes.findAll({
                where:{
                    status:1
                }
            })
            .then(function(clientes){
                db.Usuarios.findAll({
                    where:{
                        admin_id:3
                    }
                })
                .then(function(usuarios){
                    db.TipoTareas.findAll()
                    .then(function(tipoTareas){
                        return res.render('tareas/crearTareas',
                            {clientes:clientes,
                            usuarios:usuarios,
                            tipoTareas:tipoTareas,
                            errors:errors.mapped(),
                            old:req.body
                            })
                    })
                    .catch(function(error){
                        console.log(error);
                        return res.send('fallo tipo tarea')
                    })
                })
                .catch(function(error){
                    console.log(error);
                    return res.send('fallo usaurio')
                })
            })
            .catch(function(error){
                console.log(error);
                return res.send('fallo cliente');
            })

        }

    },

    showCompras: function(req,res){
        db.Compras.findAll({
            include:[
                {association:'tipoCbte'}
            ]
        })
        .then(function(compras){
            return res.render('compras/tablaCompras',{
                compras:compras
            });
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })
    },

    comprasForm: function(req,res){
        db.TipoCbte.findAll({
            where:{
                status:1
            }
        })
        .then(function(tipocbte){
            return res.render('compras/compras',{
                tipocbte:tipocbte
            })
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })
    },

    registrarCompra: function(req,res){
        
        let errors = validationResult(req)

        if(errors.isEmpty()){
            db.Compras.create({
                cuit:req.body.cuit,
                razon_social:req.body.razon,
                fecha:req.body.fecha,
                tipo_cbte_id:req.body.tipo_cbte,
                nro_comprobante:req.body.numero_cbte,
                monto_neto:req.body.monto_neto,
                iva:req.body.iva,
                iva_monto:req.body.iva_monto,
                retencion:req.body.retencion,
                retencion_monto:req.body.retencion_monto,
                detalle:req.body.detalle
            })
            .then(function(compra){
                console.log(compra);
                return res.redirect('/admin/compras');
            })
            .catch(function(error){
                console.log(error);
                return res.send(error);
            })
        }
        else {

            db.TipoCbte.findAll({
                where:{
                    status:1
                }
            })
            .then(function(tipocbte){
                return res.render('compras/compras',{
                    tipocbte:tipocbte,
                    old: req.body,
                    errors:errors.mapped()
                })
            })
            .catch(function(error){
                console.log(error);
                return res.send(error);
            })

        }

    }


};



