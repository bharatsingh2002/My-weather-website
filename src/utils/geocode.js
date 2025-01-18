const request=require('postman-request')

const geocode=(address,callback)=>{
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmhhcmF0OTQxMjYiLCJhIjoiY201bXFrN3A5MDNhZjJpczhiMWduMWp5MyJ9.ez-Gc9W8Va1c8lwoJs5qdA&limit=1';

    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location service',undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find the for the location',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}


// const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYmhhcmF0OTQxMjYiLCJhIjoiY201bXFrN3A5MDNhZjJpczhiMWduMWp5MyJ9.ez-Gc9W8Va1c8lwoJs5qdA&limit=1';

// request({url:geocodeURL,json:true},(error,response)=>{



//   if(error){
//         console.log('Unable to connect to location service')
//     }else if(response.body.features===0){
//         console.log('Unable to find the for the location')
//     }else{
//       const latitude = response.body.features[0].center[1]
//       const longitude = response.body.features[0].center[0]
//       console.log(latitude,longitude)
//     }
// })

module.exports=geocode