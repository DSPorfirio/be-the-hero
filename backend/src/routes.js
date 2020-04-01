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



routes.get('/ongs/:id', celebrate({    
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), OngsController.listOne);



routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngsController.create);



routes.put('/ongs/:id', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        whatsapp: Joi.string().min(10).max(13),
        city: Joi.string(),
        uf: Joi.string().length(2)
    })
}), OngsController.update);



routes.delete('/ongs/:id', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), OngsController.delete);



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



routes.get('/incidents/ong/', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown()
}), IncidentController.listAllOng);

routes.get('/incidents/ong/:id', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), IncidentController.listOne);


routes.delete('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);



routes.put('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        value: Joi.number()
    })
}), IncidentController.update);



module.exports = routes;