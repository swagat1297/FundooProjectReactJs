const axios = require('axios').default;

const post = (url, data, isTokenRequired=false, header=null) =>{
    return axios.post(url, data, isTokenRequired && header);
}
const get = (url, data) =>{
    return axios.get(url, data);
}
module.exports = {post, get};