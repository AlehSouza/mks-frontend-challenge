import axios from "axios";

const baseURL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/'

const api = axios.create({
    baseURL,
    timeout: 1000,
})

export default api