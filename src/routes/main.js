const express = require('express');
const router = express.Router();

const mainController = require ('../controller/mainController');

const guestMiddleware = require('../middlewares/guestMiddleware');

const loginValidation = require('../validations/loginValidation');


router.get('/',mainController.index);

router.get('/login', guestMiddleware,mainController.login);
router.post('/login', loginValidation, mainController.loginIn);

router.get('/mostrar',mainController.mostrar);
router.get('/tabla',mainController.tabla);

router.get('/main', mainController.main);

module.exports = router;