const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    },

    async listAll(request, response) {
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
    },

    async listOne(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs').select('*').where('id', id).first();

        if(ong.id != ong_id){
            return response.status(401).json({error: "Operation not permitted."});
        } else {
            return response.json(ong);
        }
    },

    async update(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const update = await connection('ongs').where('id', id).select('ongs.*').first();

        if(update.id != ong_id){
            return response.status(401).json({error: "Operation not permitted."});
        } else {
            await connection('ongs').where('id', id).update({
                name,
                email,
                whatsapp,
                city,
                uf
            });
        }

        return response.status(204).send();
        
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const find = await connection('ongs').where('id', id).select('ongs.*').first();

        if(find.id != ong_id){
            return response.status(401).json({error: "Operation not permitted."});
        } else {
            await connection('ongs').where('id', id).delete();
        }

        return response.status(204).send();
    }
};