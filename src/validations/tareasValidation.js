const {check} = require('express-validator');

module.exports = [

    check ('usuario')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('cliente')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('tipotarea')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('fecha')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('presupuesto')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),
        
];