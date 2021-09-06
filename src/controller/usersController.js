
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const db = require('../database/models');

module.exports = {

    editRender: function(req,res){

        db.Usuarios.findByPk(req.params.id)
        .then(function(usuario){
            return res.render('usuarios/editUsuario',{usuario:usuario});
        })
        .catch(function(error){
            return res.send(error);
        })

        
    },

    editSave: function(req,res){

        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Usuarios.update({
                usuario: req.body.name,
                cuil: req.body.cuil,
                direccion: req.body.direccion,
                localidad: req.body.localidad,
                codigo_postal: req.body.codigopostal,
                provincia: req.body.provincia,
                telefono: req.body.telefono,
                mail: req.body.email
            },{
                where:{
                    id:req.params.id
                }
            })
            .then(function(usuario){
                console.log(usuario + ' = 1 = Fue editado');
                db.Usuarios.findByPk(req.params.id)
                .then(function(usuarioEditado){
                    console.log(usuarioEditado , ' = COMO QUEDA EL USUARIO')
                    req.session.user = usuarioEditado.dataValues;
                    console.log(req.session.user , ' = COMO QUEDA LA SESION');
                    return res.redirect('/main')
                })
                .catch(function(error){
                    return res.send(error);
                })
                
            })
            .catch(function(error){
                return res.send(error);
            })

        }
        else{
            res.render('usuarios/editUsuario',{
                old:req.body,
                errors: errors.mapped()
            })
        }

    },

    passwordRender: function(req,res){

        return res.render('usuarios/cambiarPassword');

    },

    passwordSave: function(req,res){

        let errors = validationResult(req);

        if(errors.isEmpty()){

            if(bcrypt.compareSync(req.body.lastPassword,req.session.user.password)){
                db.Usuarios.update({
                    password:bcrypt.hashSync(req.body.password,12)
                },{
                    where:{
                        id:req.params.id
                    }
                })
                .then(function(modificacionExistosa){
                    console.log(modificacionExistosa , ' = 1 = Fue editado');

                    db.Usuarios.findByPk(req.params.id)
                    .then(function(usuarioUpdate){
                        console.log(usuarioUpdate , ' = COMO QUEDA EL USUARIO')
                        req.session.user = usuarioUpdate.dataValues;
                        console.log(req.session.user , ' = COMO QUEDA LA SESION')
                        return res.redirect('/main');
                    })
                    .catch(function(error){
                        return res.send(error);
                    })
                })
                .catch(function(error){
                    return res.send(error);
                })

            }
            else {
                console.log('NO COINCIDEN')
                return res.render('usuarios/cambiarPassword',{
                    noCoincidence:'Contraseña incorrecta'
                })
            }
            

        }
        else {
            return res.render('usuarios/cambiarPassword',{
                old:req.body,
                errors:errors.mapped()
            })
        }
        
    },

    logOut: function(req,res){
        req.session.destroy();
        return res.redirect('/login');
    },

    showTareas: function(req,res){
        db.Tareas.findAll({
            include:[
                {association: "clientes"},
                {association: "usuarios"},
                {association: "tipoTareas"}
            ]},{
            where:{
                id:req.params.id
            }
        })
        .then(function(tareas){
            return res.render('tareas/tablaTareas',{tareas:tareas})
        })
        .catch(function(error){
            console.log(error);
            return res.send(error);
        })
    }
        

};