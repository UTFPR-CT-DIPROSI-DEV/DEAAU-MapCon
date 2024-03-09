const db = require('../../lib/back/db');

/*
    Essa classe fornece os métodos básicos para criação de um CRUD
*/
var base = {


    // Busca todos os registros 
    getModels: async function (table, search, join=null) {

        var getModel = db(table);

        if(join){
            getModel.joinRaw(join)
        }
        

        // Adicionando as buscas
        if (search['filters']) {

            const f =  JSON.parse(search['filters'])
  
            
            f.forEach(filter => {

                
                if (filter.type == 'contain') {
                    let v = filter.value.replace(/ /gi, '%')
                    getModel.where(filter.field, 'ilike', '%' + v + '%');
                }
                if (filter.type == 'equal') {
                    
                    getModel.where(filter.field, filter.value);
                }

            });
        }



        // Adicionando o limit
        let limit = 10;
        if (search['limit']) {
            limit = search['limit'];
        }

        // Adicionando o offset
        let page = 0;
        if (search['page']) {
            page = search['page'];
        }

        var totalCount = await getModel.clone().count();

        // Ordenando
        if (search['order']) {

            const o =  JSON.parse(search['order'])

            if (o.order == 1) {
                getModel.orderBy(o.field, 'ASC');
            } else if (o.order == -1) {
                getModel.orderBy(o.field, 'DESC');
            }
        }

        // Se passou raw order
        if(search['order_raw']){
            getModel.orderByRaw(search['order_raw']);
        }

        // Se passou raw where
        if(search['where_raw']){
            getModel.whereRaw(search['where_raw']);
        }

        if (limit != -1) {
            var data = await getModel.clone().offset((page) * 10).limit(limit)
        }
        else {
            var data = await getModel.clone().offset(0)
        }

        return {
            total: parseInt(totalCount[0]['count']),
            data: data
        };

    },

    // Busca apenas um registro baseado nas chaves passadas
    getModel: async function (table, keys) {

        return await db(table).where(keys).first();

    },

    // Adiciona um registro
    addModel: async function (table, values) {

        return await db(table).insert(values).returning('*');

    },

    // Atualiza um registro
    updateModel: async function (table, keys, values) {

        return await db(table).where(keys).update(values);

    },

    // Remove um registro
    deleteModel: async function (table, keys) {

        return await db(table).delete().where(keys);
    },


    dataLoader: async function (table,key,ids) {

        let resp = await db(table).whereIn(key, ids);

   
        let ret = [];

        ids.forEach(element => {
            let e = resp.find(x => x[key] == element);
            
            ret.push(e);
        });

        return ret;

    }

}


module.exports = base;