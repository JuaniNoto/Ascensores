const {check, body} = require('express-validator');

module.exports = [

    check ('name')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isLength ({ min: 2, max: 20})
        .withMessage ('Este campo debe tener como mínimo 2 caracteres y como máximo 20'),

    check ('cuil')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isLength ({ min: 11, max: 11})
        .withMessage ('Este campo debe tener contener 11 caracteres'),

    check ('email')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isEmail()
        .withMessage ('Debés ingresar un email válido. Recordá usar @.')

        
];