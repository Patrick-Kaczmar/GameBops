const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "375d20d071msh8cfe88476310e89p19559fjsn74b9c5579521",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
    }

};

$.ajax(settings).done(function (response) {
    console.log(response);
});

var userInput = "jebaited"
    var apiKey = "AIzaSyDIdlknMUSqeJZ_ukyOVh2DqTdMzFL0Y9s"
    var queryURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + userInput + "&key=" + apiKey

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL)
        console.log(response)
    })

