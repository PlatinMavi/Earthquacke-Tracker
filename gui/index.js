const express = require("express")
const fs = require('fs');

const app = express()

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/templates/index.html")
})

app.get("/data", (req,res)=>{
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          try {
            const jsonData = JSON.parse(data);
            const response = []

            for (let i = 0; i < jsonData.data.length; i++) {
                response.push({
                  "latitude":jsonData.data[i].latitude,
                  "longitude":jsonData.data[i].longitude,
                  "magnitude":jsonData.data[i].magnitude,
                  "location":jsonData.data[i].location,
                  "depth": jsonData.data[i].depth
                })
            }

            res.json({"data":response});
          } catch (jsonError) {
            console.error(jsonError);
            res.status(500).json({ error: 'Error parsing JSON' });
          }
        }
      });
})

app.listen(3000, ()=>{
    console.log("post 3000 on")
})