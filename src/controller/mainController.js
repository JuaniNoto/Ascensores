
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const db = require('../database/models');

module.exports = {

    index: function (req,res){
        return res.redirect('/login');
    },

    login: function(req,res){
        return res.render('login');
    },

    main: function(req,res){
        return res.render('main');
    },

    loginIn:function(req,res){

        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.Usuarios.findOne({
                where:{
                    mail:req.body.email
                }
            })
            .then(function(usuario){
                if(usuario != null){
                    if (bcrypt.compareSync(req.body.password,usuario.password)){
                        req.session.user=usuario.dataValues;
                        console.log(req.session.user);
                        return res.redirect('/main')
                    }
                    else{
                        console.log('FALLA LA CONTRASEÑA');
                        return res.render('login',{
                            noCoincidence:'Contraseña incorrecta',
                            old:req.body
                        })
                    }   
                }
                else {
                    console.log('FALLLA EL EMAIL');
                    return res.render('login',{
                        noCoincidence:'Email inexistente'
                    })
                }
            })
            .catch(function(error){
                console.log('ERROR');
                return res.send(error);
            })

        }
        else {
            console.log('FALLAN LOS ERRORS');
            console.log(errors);
            return res.render('login',{
                old:req.body,
                errors:errors.mapped()
            })

        }
        
        
    },

    mostrar: function(req,res){
        db.Usuarios.findAll({
            include:[
                {association:'administrador'}
            ]
        })
        .then(function(usuarios){
            return res.send(usuarios);
        })
    },

    tabla: function(req,res){
        res.render('tabla');
    }






};