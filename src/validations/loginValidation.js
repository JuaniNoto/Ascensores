const {check} = require('express-validator');

module.exports = [

    check ('email')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isEmail()
        .withMessage ('Debés ingresar un email válido. Recordá usar @.'),

    check ('password')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio')


];