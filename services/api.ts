import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://warren-transactions-api.herokuapp.com/api/transactions'
})