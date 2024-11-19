import client from './client';

const endpoint = '/listings'

const getListing = () => {
    return client.get(endpoint)
}

const postListing = listing => {

    const data = new FormData()
    data.append('title', listing.title)
    data.append('price', listing.price)
    data.append('categoryId', 3)
    data.append('description', listing.description)
    data.append('images', listing.images)

    // listing.images.forEach((image, index) => 
    //     data.append('images', {
    //         name: 'image' + index,
    //         type: 'image/jpeg',
    //         uri: image.uri
    //     })
    // )

    // if (listing.location) data.append('location', JSON.stringify(listing.location))
    
    return client.post(endpoint, data)
}

export default {
    postListing,
    getListing,
}