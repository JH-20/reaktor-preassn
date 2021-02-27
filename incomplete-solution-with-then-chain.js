//const fetch = require('node-fetch');

const productData = {}
const categories = ['beanies', 'gloves', 'facemasks']
const availabilityInfo = {}
const manufacturers = []


// 5
const combineProductAndAvailabilityInfos = () => {
    for (const category in productData) {
        for (const pid in productData[category]) {
            const p = productData[category][pid]
            productData[category][p.id]['availability'] = availabilityInfo[p.manufacturer][p.id]
        }
    }
}


// 4
const parseAvailabilityFromJson = (full_response) => {
    const response = full_response.response instanceof Array ? full_response.response : []
    const availabilities = {}
    for (const productInfo of response) {
        const info = productInfo.DATAPAYLOAD.split("INSTOCKVALUE")[1].slice(1,-2)
        availabilities[productInfo.id.toLowerCase()] = info
    }
    return availabilities
}


// 3
const fetchAvailabilityInfo = () => {
    const info_promises = manufacturers.map(m => {
        console.log("Fetching: "+m)
        return fetch("https://bad-api-assignment.reaktor.com/v2/availability/"+m)})
    Promise.all(info_promises).then( responses => 
        Promise.all( responses.map(res => res.json()) ).then(manufInfos => {

            for (const i of Array(manufacturers.length).keys()) {
                availabilityInfo[manufacturers[i]] = parseAvailabilityFromJson(manufInfos[i])
            }

            combineProductAndAvailabilityInfos()
            // Data is now ready

            // Draw website
        })
    )
}


// 2
const productArrayToDict = (products) => {
    const dict = {}
    products.forEach(p => {
        dict[p.id] = p
        if (!manufacturers.includes(p.manufacturer)) {
            manufacturers.push(p.manufacturer)
        }
    })
    return dict
}


// 1
const fetch_promises = categories.map(c => fetch("https://bad-api-assignment.reaktor.com/v2/products/"+c))
Promise.all(fetch_promises).then( responses =>
    Promise.all( responses.map(res => res.json()) ).then(productArrays => {
        
        for (const i of Array(3).keys()) {
            productData[categories[i]] = productArrayToDict(productArrays[i])
        }
        
        fetchAvailabilityInfo()

    })
)
