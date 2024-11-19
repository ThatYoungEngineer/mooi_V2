import client from './client';

const endpoint = '/categories'

const getCategories = () => {
    return client.get(endpoint)
}

export default {
    getCategories
}