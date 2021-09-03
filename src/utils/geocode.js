const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWJvYXRlbGxhIiwiYSI6ImNrdDFtN3V4ejAwMXkzM3BnMzRidzR6cTkifQ.Dv0n4P_YXLXxSPNg5P1cQQ&limit=1`

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('No se pudo conectar con el servidor del clima', undefined)            
        } else if (body.features === undefined || body.features.length === 0) {
            callback('No se pudo encontrar la localizacion solicitada', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],                
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
