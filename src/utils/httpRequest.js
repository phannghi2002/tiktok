import axios from 'axios';
//Dùng cái này để ẩn hiện chức năng khác nhau trên các môi trường khác nhau như môi trường development, production ...
//console.log(process.env.REACT_APP_BASE_URL);
const httpRequest = axios.create({
    // baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const post = async (path, data = {}) => {
    const response = await httpRequest.post(path, data);
    return response.data;
};

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    //console.log(response);
    return response.data;
};

export default httpRequest;
