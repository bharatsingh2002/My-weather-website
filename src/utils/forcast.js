const request= require('postman-request')

const forcast=(latitude,longitude,callback)=>{
    const url='https://api.weatherstack.com/current?access_key=739a8a99f982160608add944cf57ddad&query='+latitude+','+longitude;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(response.body.error){
            callback('Unable to find the for the location',undefined)
        }
        else{
            callback(undefined,`The current Temperature is: ${response.body.current.temperature} Degree Celsius and Weather feel likes ${response.body.current.weather_descriptions[0]}`)
        }
    })
}



// const url='https://api.weatherstack.com/current?access_key=739a8a99f982160608add944cf57ddad&query=37.8267,-122.4233';

// request({url:url,json:true},(error,response)=>{
//   if(error){
//     console.log('Unable to connect to weather service')
//   }else if(response.body.error){
//     console.log('Unable to find the for the location')
//   }else{
//     const current = response.body.current
//     console.log(`${current.weather_descriptions[0]}The current Temp. is :  ${current.temperature}. and It feel likes ${current.feelslike}`)
//   }
//   })


module.exports=forcast