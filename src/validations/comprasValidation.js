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

    check ('fecha')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('tipo_cbte')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('numero_cbte')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('monto_neto')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('iva')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('iva_monto')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('retencion')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),

    check ('retencion_monto')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio'),
        
];