const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');
const usersValidation = require('../validations/usersValidation');
const clientesValidation = require('../validations/clientesValidation');
const tareasValidation = require('../validations/tareasValidation');
const comprasValidation = require('../validations/comprasValidation');

const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/users', adminMiddleware, adminController.users)

router.get('/users/create', adminMiddleware, adminController.create);
router.post('/users/create', usersValidation, adminController.createUser)

router.get('/users/edit/:id', adminMiddleware, adminController.editUserGet)
router.post('/users/edit/:id',/*falta validation,*/ adminController.editUserPost)

router.delete('/users/delete/:id',adminMiddleware,adminController.deleteUser);


router.get('/clientes', adminMiddleware , adminController.clientes)//Verificar que solo los admin puedan ver los clientes

router.get('/clientes/create', adminMiddleware, adminController.clientesForm);
router.post('/clientes/create',clientesValidation, adminController.createCliente);

router.get('/clientes/edit/:id', adminMiddleware, adminController.edit);
router.put('/clientes/edit/:id', clientesValidation, adminController.editCliente);

router.delete('/clientes/delete/:id',adminMiddleware, adminController.deleteCliente);

router.get('/mostrar',adminController.mostar);

router.get('/tareas', adminMiddleware, adminController.showTareas);

router.get('/tareas/create', adminMiddleware, adminController.tareasForm);
router.post('/tareas/create', tareasValidation, adminController.createTarea);

router.get('/compras', adminMiddleware, adminController.showCompras);

router.get('/compras/registrar', adminMiddleware, adminController.comprasForm);
router.post('/compras/registrar', comprasValidation, adminController.registrarCompra);

module.exports = router;