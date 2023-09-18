const ModelFactory = require('../models/ModelFactory');
class Service {
    constructor(){

    }

    static create = async (model, obj) => {
        let modelClass = ModelFactory.getModel(model);
        let data= new modelClass(obj);
        data = await data.save();
        return data ? data : false;
    }
    static update = () => {}
    static delete = () => {}

    static find = async (model, find_obj) => {
        let modelClass = ModelFactory.getModel(model);
        let data = await modelClass.find(find_obj);
        return data;
    }

    static findAll = async (model, find_obj) => {
        let modelClass = ModelFactory.getModel(model);
        let data = await modelClass.find(find_obj);
        return data;
    }

    static get = () => {}
}

module.exports = Service;