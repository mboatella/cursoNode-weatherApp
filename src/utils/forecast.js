const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f81633aaa503b06a741e00ffd9f84fa1&query=${latitude},${longitude}`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('No se pudo conectar con el servidor del clima', undefined)            
        } else if (body.error) {
            callback('No se pudieron localizar las coordenadas ingresadas', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. Hacen ${body.current.temperature} grados y la sensacion termica es de ${body.current.feelslike} grados. Probabilidad de lluvia: ${body.current.precip}%, y la humedad es del ${body.current.humidity}%`)
                // description: body.current.weather_descriptions[0],
                // temperature: body.current.temperature,
                // sensation: body.current.feelslike
        }
    })
}

module.exports = forecast