const path= require('path')
const express= require('express')
const hbs= require('hbs')

const geocode= require('./utils/geocode')
const forcast= require('./utils/forcast')


const app= express()

const publicDirectoryPath= path.join(__dirname, '../public') 
const viewPath= path.join(__dirname,'../templetes/views')
const partialsPath= path.join(__dirname, '../templetes/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)




app.use(express.static(publicDirectoryPath))



app.get('/',(req, res)=>{
    res.render('index',{
        title: "My Weather App",
        name: "Bharat Singh"
    })
})



app.get('/about',(req, res)=>{
    res.render('about',{
        title: "About",
        name: "Bharat Singh"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: "Help",
        name: "Bharat Singh",
        helpText: "This is some helpful text"
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

if(!req.query.search){
    return res.send({
        error: "You must provide a search term"
    })
}

    res.send({
        products: []
    })
})


app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: "404",
        name: "Bharat Singh",
        errorMessage: "Help article not found"
    })
})




app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Bharat Singh",
        errorMessage: "Page not found"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on the port 3000")
})
