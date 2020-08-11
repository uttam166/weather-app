const request = require('request');

const issLocation = (cb) => {

    const url = 'https://api.wheretheiss.at/v1/satellites/25544';

    request({ url, json: true }, (error, response) => {
        if(error){
            cb('Unable to connect to iss api services.', undefined)
        }else{
            cb(undefined,{
                latitude: response.body.latitude,
                longitude: response.body.longitude
            })
        }
    })
}

module.exports = issLocation;