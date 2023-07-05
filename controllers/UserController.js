const UserService = require("../services/usermanagement/user/UserService");
const Controller = require("./controller");

class UserController extends Controller {

    static index = async (req, res) => {
        let obj = {
            name: 'irfan',
            email: 'irfan@gmail.com',
            username: 'irfan',
            password: 'irfan1234',

        }
        let user = await UserService.create(obj);
        console.log(user);
       res.send('controller/index.html');
    }

}

module.exports = UserController;