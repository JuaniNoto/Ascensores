const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');

const loguedMiddleware = require('../middlewares/loguedMiddleware');

const editValidation = require('../validations/editValidation');
const passwordValidation = require('../validations/passwordValidation');

router.get('/edit/:id', loguedMiddleware, usersController.editRender);
router.put('/edit/:id', editValidation, usersController.editSave);

router.get('/password/:id', loguedMiddleware, usersController.passwordRender);
router.put('/password/:id', passwordValidation, usersController.passwordSave);

router.get('/tareas/:id', loguedMiddleware, usersController.showTareas);

router.get('/logout',usersController.logOut)

module.exports = router;