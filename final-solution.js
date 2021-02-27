//const fetch = require('node-fetch');


const getProducts = async(c) => {
    console.log("Fetching products: "+c)
    const r = await fetch("https://bad-api-assignment.reaktor.com/v2/products/"+c)
    const j = await r.json()
    const dict = {}
    j.forEach(p => {
        dict[p.id] = p
    })
    console.log("Fetched products for category: "+c)
    return dict
}

const getManufacturers = (productData) => {
    const manufacturers = []
    for (const c in productData) {
        for (const pid in productData[c]) {
            const p = productData[c][pid]
            if (!manufacturers.includes(p.manufacturer)) {
                manufacturers.push(p.manufacturer)
            }
        }
    }
    return manufacturers
}

const getAvailability = async(m) => {
    const startTime = new Date()
    console.log("Fetching availability for: '"+m+"'")
    var r = await fetch("https://bad-api-assignment.reaktor.com/v2/availability/"+m)
    var j = await r.json()
    var response = j.response
    if ( !(response instanceof Array) ) {
        // Encountered the API bug where response is string '[]' instead of an array
        // Try again to get valid data
        console.log("Encountered API bug with manufacturer: "+m)
        var tries = 0
        while (!(response instanceof Array) && tries < 3) {
            tries += 1
            console.log("Trying to fetch availability for "+m+" again. Try: "+tries)
            r = await fetch("https://bad-api-assignment.reaktor.com/v2/availability/"+m)
            j = await r.json()
            response = j.response
        }
        // If response is still '[]' after 5 tries, move forward with an empty response array
        if (!(response instanceof Array)) {
            response = []
        }
    }
    // Change availability info from array [{id:<String>, DATAPAYLOAD:<String>},{}...]
    // to a dictionary that maps product id to availability data parsed from DATAPAYLOAD
    const availabilities = {}
    for (const productInfo of response) {
        const info = productInfo.DATAPAYLOAD.split("INSTOCKVALUE")[1].slice(1,-2)
        availabilities[productInfo.id.toLowerCase()] = info
    }
    console.log("Availability fetched for: '"+m+"' in "+(((new Date())-startTime)/1000)+" seconds")
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
    const all_availabilities = await Promise.all(manufacturers.map(m => getAvailability(m)))

    for (const i of Array(manufacturers.length).keys()) {
        availabilityInfo[manufacturers[i]] = all_availabilities[i]
    }

    // Update productData with availabilityInfo
    for (const category in productData) {
        for (const pid in productData[category]) {
            const p = productData[category][pid]
            productData[category][p.id]['availability'] = availabilityInfo[p.manufacturer][p.id]
        }
    }


    console.log("Data fetched. Time taken: " + (((new Date())-startTime)/1000) + " seconds")
    return productData

}

//const startTime = new Date()
//getData().then(r => console.log("Data fetched. Time taken: " + (((new Date())-startTime)/1000) + " seconds"))

export { getData }