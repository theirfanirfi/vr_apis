let Service = require('../services/Service');
class Controller {

    constructor(model, required_params){
        this.model = model;
        this.required_params = required_params;
    }

    valiate_obj_for_required_params = (obj) => {
        return this.required_params.every(val => obj[val] != undefined && (obj[val] != "" || obj[val]))
    }

     index = async (req, res) => {
        let data = await Service.find(this.model, {user_id: req.user.id});
        res.status(200).json({status: true, data: data});
    }

    get = async (req, res) => {
        let data = await Service.find(this.model, {user_id: req.user.id});
        res.status(200).json({status: true, data: data});
    }

    create = async (req, res) => {
        let data = req.body;
        if(this.valiate_obj_for_required_params(data)){
            data['user_id'] = req.user.id;
            let isCreated = await Service.create(this.model, data);
            if(isCreated){
                res.status(200).json({
                    status: true,
                    data: isCreated,
                    message: 'success',
                })
            }else {
                res.status(404).json({
                    status: false,
                    data: {},
                    message: 'Error occurred while creating new record, please try again',
                })
            }

        }else {
            res.status(404).json({
                status: false,
                voice_record: {},
                message: 'Required fileds must be provided.',
            })
        }
    }

}

module.exports = Controller;