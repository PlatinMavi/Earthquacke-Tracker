fetch("http://localhost:3000/data")
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        data = jsonData;
        GetMap(data.data)
    })

function GetMap(data){
    var map = L.map('map').setView([38.734802, 35.467987], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var markers = L.markerClusterGroup();
    var count = 0

    for (let i = 0; i < data.length; i++) {
        var latitude = data[i].latitude;
        var longitude = data[i].longitude;
        var marker = L.marker([latitude, longitude]);
        markers.addLayer(marker);

        var pp = "Büyülük: " + data[i].magnitude + "<br>Konum: " + data[i].location + "<br>Derinlik (KM) : " + data[i].depth + "<br>Tarih:<br> " + data[i].eventDate.replace("T"," ")

        marker.bindPopup( pp );
        markers.addLayer(marker);

        if (data[i].magnitude >= 3) {
            if (count < 7){
                var divContainer = document.createElement("div");
                divContainer.className = "relative h-44 w-44";
    
                var divRight = document.createElement("div");
                divRight.className = "absolute right-4 bottom-4 h-44 w-44 third rounded-xl";
    
                var divLeft = document.createElement("div");
                divLeft.className = "absolute p-2 h-44 w-44 secondary rounded-xl";
    
                divContainer.appendChild(divRight);
                divContainer.appendChild(divLeft);
                divLeft.innerHTML = pp
    
                document.getElementById("eqk").appendChild(divContainer);
                count++
            }
            else{
                var divContainer = document.createElement("div");
                divContainer.className = "relative h-44 w-44";
    
                var divRight = document.createElement("div");
                divRight.className = "absolute right-4 bottom-4 h-44 w-44 third rounded-xl";
    
                var divLeft = document.createElement("div");
                divLeft.className = "absolute p-2 h-44 w-44 secondary rounded-xl";
    
                divContainer.appendChild(divRight);
                divContainer.appendChild(divLeft);
                divLeft.innerHTML = pp
    
                document.getElementById("storage").appendChild(divContainer);
            }
        }
    }
    map.addLayer(markers);
}

function showStorage(){
    const element = document.getElementById("storage")
    if (element.classList.contains("hidden")){
        element.classList.remove("hidden")
        const btn = document.getElementById("showMoreButton").innerHTML = "Verileri Gizle"
    }
    else{
        element.classList.add("hidden")
    }
}