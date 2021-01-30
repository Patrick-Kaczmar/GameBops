var saveBtn = $('.save-btn');
var favGames = [];

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
 $(".game-display").empty();
$.ajax(settings).done(function (response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        var a = $("<ul>");
        var title = response[i].title;
        // console.log(title);

        var thumbnail = response[i].thumbnail;
        // console.log(thumbnail);

        var gameUrl = response[i].game_url;
        // console.log(gameUrl);

        var a = `
          <div class="free-game-result">
            <img src="${thumbnail}" alt="${title}"/>
            <h1>${title}</h1>
          </div>
          `;
          // backtick method not working for buttons yet...
          //   var b = `
        //   <button class="save-btn">Add to Favorites</button>`
        var b = $("<button>");
        b.addClass("save-btn");
        b.val(title);
        
        b.text("Add to Favorites");
        // saveBtn.val(title);
        console.log(b);
        $(".game-display").append(a);
        $(".game-display").append(b);
    }

    

});

$(document).on("click", ".save-btn", function(event) {
    event.preventDefault();
    console.log(this);
                    // creating a variable named city, assigning text value to it
                    var game = $(this).val();
                    // var game = $(this).val().trim();
                    // was if (city !== null && city !== "")
                    if (favGames.includes(game) === false) {
                        // logging city to console
                        console.log(game);

                        // add chosen game to the favGames array
                        favGames.push(game);
                        // saving array of favorite games to local storage
                        localStorage.setItem("Favorite Games", JSON.stringify(favGames));
                    }
                    else {
                        console.log(game);
                    }
});

var userInput = "jebaited"
var apiKey = "AIzaSyDIdlknMUSqeJZ_ukyOVh2DqTdMzFL0Y9s"
var queryURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + userInput + "&key=" + apiKey

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(queryURL)
    console.log(response)
})

