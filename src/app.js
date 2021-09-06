const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define las rutas para configurar Express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

// Configura HBS y la ruta de las views y partials
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPaths)    

// Configura el directorio estatico para 'servir'
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Matias Boatella"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Matias Boatella"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "Pagina de ayuda",
        name: "Matias Boatella"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        message: "Help article not found",
        name: "Matias Boatella"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: 'Page not found',
        name: "Matias Boatella"
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

