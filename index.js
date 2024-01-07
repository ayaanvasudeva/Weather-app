import express from "express";
import bodyParser from "body-parser";
import https from "https";
const app = express();
const port = 3000;
import { dirname } from "path";
import { fileURLToPath } from "url";
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
// showing static files
app.use(express.static(__dirname + '/public'));
app.get("/", function(req,res){
  res.render("index.ejs")
  
})
app.post("/submit", function(req,res){
   
  const query = req.body.cityName
const mySecret = process.env['ApiKey']
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&lat=57&lon=-2.15&appid="+mySecret+"&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode)
    
    response.on("data", function(data){
     
      const weatherData = JSON.parse(data)
       console.log(weatherData.sys.country)
      const humidity = weatherData.main.humidity
      const min = weatherData.main.temp_min
      const max = weatherData.main.temp_max
      console.log(min)
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+ icon+"@2x.png"
      console.log(req.body.sys)
      const temp = weatherData.main.temp
      console.log(temp)
      const description = weatherData.weather[0].description
      
      console.log(description)
    res.render("end.ejs", {humidity:humidity,temp:temp, query:query, imageURL:imageURL,description:description, min:min, max:max})
     
     
    })
    
  })
})
app.listen(3000,function(){
  console.log("server started on port 3000")
})