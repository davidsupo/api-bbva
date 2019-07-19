const express = require('express');
const router = express.Router();

const Controller = require('./controllers');

// router.get('/loguin',);
router.post('/login',Controller.Loguin);
router.get('/servicio',Controller.BuscarServicio);
router.get('/empresa/:servicio',Controller.BuscarEmpresa);
router.post('/deuda',Controller.GenerarDeuda);
router.get('/tarjetas/:idcliente',Controller.ListarTarjetas)
router.post('/pago',Controller.RealizarPago);
router.get('/historial/:idcliente',Controller.VerPagos);

module.exports = router;