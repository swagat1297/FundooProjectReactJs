const axios = require('./axios_service.js');
var config = require('../config/config');
class UserService{
    register(value){
        let url = config.url + 'user/userSignUp'
        return axios.post(url, value);
    }
    login(value){
        let url = config.url + 'user/login'
        return axios.post(url, value);
    }
    forgot(value){
        let url = config.url + 'user/reset'
        return axios.post(url, value);
    }
    reset(value){
        let url = config.url + 'user/reset-password';
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token);
    }
}

module.exports = new UserService();
