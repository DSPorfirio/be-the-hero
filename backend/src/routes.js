const express = require('express');

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngsController.listAll);
routes.post('/ongs', OngsController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.listAll);
routes.get('/incidents/ong', IncidentController.listAllOng);
routes.delete('/incidents/:id', IncidentController.delete);
routes.put('/incidents/:id', IncidentController.update);

module.exports = routes;