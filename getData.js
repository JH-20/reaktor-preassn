//const fetch = require('node-fetch');


const getProducts = async(category) => {
    console.log("Fetching products category: "+category)
    const response = await fetch("https://bad-api-assignment.reaktor.com/v2/products/"+category)
    const json_response = await response.json()
    const products = {}
    json_response.forEach(product => {
        products[product.id] = product
    })
    console.log("Fetched products for category: "+category)
    return products
}

const getManufacturers = (productData) => {
    const manufacturers = []
    for (const products of Object.values(productData)) {
        for (const product of Object.values(products)) {
            if (!manufacturers.includes(product.manufacturer)) {
                manufacturers.push(product.manufacturer)
            }
        }
    }
    return manufacturers
}

const getAvailability = async(manufacturer) => {
    const startTime = new Date()
    console.log("Fetching availability for: '"+manufacturer+"'")
    var r = await fetch("https://bad-api-assignment.reaktor.com/v2/availability/"+manufacturer)
    var j = await r.json()
    var response = j.response
    if ( !(response instanceof Array) ) {
        // Encountered the API bug where response is string '[]' instead of an array
        // Try again to get valid data
        console.log("Encountered API bug with manufacturer: "+manufacturer)
        var tries = 0
        while (!(response instanceof Array) && tries < 5) {
            tries += 1
            console.log("Trying to fetch availability for "+manufacturer+" again. Try: "+tries)
            r = await fetch("https://bad-api-assignment.reaktor.com/v2/availability/"+manufacturer)
            j = await r.json()
            response = j.response
        }
        // If response is still '[]' after 5 tries, move forward with an empty response array
        if (!(response instanceof Array)) {
            response = []
        }
    }
    // Change availability into a dictionary that maps [product id => availability data]
    const availabilities = {}
    for (const productInfo of response) {
        const info = productInfo.DATAPAYLOAD.split("INSTOCKVALUE")[1].slice(1,-2) // Parse relevant information from DATAPAYLOAD
        availabilities[productInfo.id.toLowerCase()] = info
    }
    console.log("Availability fetched for: '"+manufacturer+"' in "+(((new Date())-startTime)/1000)+" seconds")
    return availabilities
}

const getData = async() => {
    const startTime = new Date()
    const categories = ['beanies', 'gloves', 'facemasks']
    const productData = {}
    const availabilityInfo = {}

    // Get data from /v2/products/:category API, and store it to productData
    const productDicts = await Promise.all(categories.map(c => getProducts(c)))
    for (const i of Array(categories.length).keys()) {
        productData[categories[i]] = productDicts[i]
    }

    const manufacturers = getManufacturers(productData)

    // Get data from /v2/availability/:manufacturer API, and store it in availabilityInfo
    const availabilities_for_manufacturers = await Promise.all(manufacturers.map(manufacturer => getAvailability(manufacturer)))

    for (const i of Array(manufacturers.length).keys()) {
        availabilityInfo[manufacturers[i]] = availabilities_for_manufacturers[i]
    }

    // Update productData with availabilityInfo
    for (const products of Object.values(productData)) {
        for (const product of Object.values(products)) {
            product['availability'] = availabilityInfo[product.manufacturer][product.id]
        }
    }


    console.log("Data fetched. Time taken: " + (((new Date())-startTime)/1000) + " seconds")
    return productData

}

//const startTime = new Date()
//getData().then(r => console.log("Data fetched. Time taken: " + (((new Date())-startTime)/1000) + " seconds"))

export { getData }