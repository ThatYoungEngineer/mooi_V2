import client from './client';

const endpoint = '/listings'


const getListing = () => {
    return client.get(endpoint)
}
const postListing = (listing) => {
    const data = new FormData()

    data.append('title', listing.title);
    data.append('categoryId', listing.category);
    data.append('price', listing.price);
    data.append('description', listing.description || null);

    listing.images.forEach((image, index) => {
        data.append('images', {
            name: 'image' + index,
            type: 'image/jpeg',
            uri: image.uri
        });
    });

    return client.post(endpoint, data, { headers: { 'Content-Type': 'multipart/form-data' } });
};


export default {
    postListing,
    getListing,
}