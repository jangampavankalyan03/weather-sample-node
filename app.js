const express = require("express")
const https = require("https")
const bp = require("body-parser")


const app  = express();
app.use(bp.urlencoded({extended:true}))

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html")
    console.log("in get ");
});

app.post("/",function(req,res){
    const query = req.body.city
    const key = "1f43bc76d0f88e28d61abbce237d1c31"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+key+"&units=" + units

    https.get(url,function(response){
    response.on("data" , function(data){
        const weatherdata = JSON.parse(data)
        const tempdata = weatherdata.main.temp
        const tempdesc = weatherdata.weather[0].description
        res.write("the temperature of the "+query+"is:"+ tempdata)
        res.write("the desc of the weather is "+tempdesc)
        res.send()
    })
})
})
app.listen(process.env.PORT||3000,function(){
    console.log("Server Started")
})


// const express = require("express")
// const https = require("https")
// const bp = require("body-parser")


// const app = express();
// app.use(bp.urlencoded({extended:true}))

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/index.html")
// });

// app.post("/",function(req,res){
//     const  place =req.body.city
//     const apikey = "1f43bc76d0f88e28d61abbce237d1c31"
//     const unit = "metric"
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apikey+"&units="+ unit
//     https.get(url,function(response){
//         console.log(response);

//         response.on("data",function(data){
//             const weatherdata = JSON.parse(data)
//             const temper = weatherdata.main.temp
//             const imgurl = "http://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + "@2x.png" 
//             res.write("The Temperature is : " + temper)
//             res.write("The Description is "+weatherdata.weather[0].description)
//             res.write("<img src="+ imgurl + ">")
//         })
//     })
// })



// app.listen(3000,function(){
//     console.log("Server Started");
// })






