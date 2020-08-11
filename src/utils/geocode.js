const request = require('request');

const geocode = ( address, apikey, cb ) => {

    const url = 'http://dataservice.accuweather.com/locations/v1/search?apikey='+apikey+'&q='+encodeURIComponent(address);

    request({ url , json: true}, ( error, {body} = {}) => {

        if(error){
            cb('Unable to connect to location services.', undefined)
        } else if (body.Code) { //  == 'ServiceUnavailable'
            return cb( body.Message, undefined)
        } else if (body.length === 0){
            cb('unable to find the given location. Try anathor search.', undefined)
        }
        else{
            cb(undefined, {
            place_name : body[0].LocalizedName +", "+body[0].AdministrativeArea.LocalizedName+", "+body[0].Country.LocalizedName+".",
            locationKey : body[0].Key,
            })
        }
    })
}

module.exports = geocode;