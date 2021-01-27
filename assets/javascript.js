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