const express = require('express'); 
const routes = express.Router();

const DetailController = require('../controllers/DetailController');
const AuthServices = require('../auth/AuthServices');

// Routes para Detail
routes.get('/detail', DetailController.findAll);
routes.get('/detail/:id', DetailController.show);
routes.post('/detail', AuthServices.isAuthenticate, DetailController.store);
routes.put('/detail/:id', AuthServices.isAuthenticate, DetailController.update);
routes.delete('/detail/:id', AuthServices.isAuthenticate, DetailController.delete);

module.exports = routes;