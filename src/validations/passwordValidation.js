const {check, body} = require('express-validator');

module.exports = [

    check ('lastPassword')
    .notEmpty ()
    .withMessage ('Este campo es obligatorio'),
    
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
        
    })

        
];