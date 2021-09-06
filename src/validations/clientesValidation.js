const {check} = require('express-validator');

module.exports = [

    check ('cuit')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isLength ({ min: 11, max: 11})
        .withMessage ('Este campo debe tener contener 11 caracteres'),

    check ('razon')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('email')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isEmail()
        .withMessage ('Debés ingresar un email válido. Recordá usar @.'),

    check ('abono')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),
];