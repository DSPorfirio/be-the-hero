const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

routes.get('/ongs', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown()
}), OngsController.listAll);


routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngsController.create);


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.listAll);


routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create);


routes.get('/incidents/ong', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown()
}), IncidentController.listAllOng);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);



routes.put('/incidents/:id', IncidentController.update);



module.exports = routes;