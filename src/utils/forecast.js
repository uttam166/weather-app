const request = require('request');

const forecast = (locationKey, apikey, cb) => {

    const url ='http://dataservice.accuweather.com/currentconditions/v1/'+ locationKey +'?apikey='+apikey+'&details=true'

    request({ url , json: true}, ( error, {body} = {} ) => {
        // console.log(url)
        if(error){
            cb('Unable to connect to weather services.', undefined)
        }else if (body.cod == 400){
            cb('unable to find the given location', undefined)
        } else{
            cb(undefined,{
                description : body[0].WeatherText,
                temp : body[0].Temperature.Metric.Value + " "+body[0].Temperature.Metric.Unit,
                feels_like : body[0].RealFeelTemperature.Metric.Value + " "+body[0].RealFeelTemperature.Metric.Unit,
                wind : body[0].Wind.Direction.Localized + " "+ body[0].Wind.Speed.Metric.Value +" "+body[0].Wind.Speed.Metric.Unit,
                Humidity : body[0].RelativeHumidity + " %",
                UVIndex : body[0].UVIndex +" " +body[0].UVIndexText,
            })
        }
    })
}

module.exports = forecast;