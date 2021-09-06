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

    check ('password')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isLength ({min:8})
        .withMessage ('La contraseña debe tener como mínimo 8 caracteres'),//.bail()
        /*.isStrongPassword ({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        .withMessage ('La contraseña debe tener como mínimo 1 mayúscula, 1 minúscula, 1 numero, 1 caracter especial'),*/

    body('repassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }else{
            return true;
        }
        
    }),

    check ('email')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio').bail()
        .isEmail()
        .withMessage ('Debés ingresar un email válido. Recordá usar @.'),

    check ('admin')
        .notEmpty ()
        .withMessage ('Este campo es obligatorio')
        
];