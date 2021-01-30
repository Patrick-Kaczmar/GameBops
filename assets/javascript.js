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
var searchBtn = $("#search-btn")
    var userInput = $("#input")

    function ajaxSearch(event) {
        event.preventDefault()

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + userInput.val() + "&limit=1",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "b35fd7d145mshb4adf51ded8770dp1c0953jsn373558f355ca",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        }
            $.ajax(settings).done(function (response) {
                console.log(userInput)
                console.log(response);

                var albumURL = "https://deezerdevs-deezer.p.rapidapi.com/album/" + response.data[0].album.id

                $.ajax({
                "url": albumURL,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "b35fd7d145mshb4adf51ded8770dp1c0953jsn373558f355ca",
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
                }
            }).then(function (albumResponse){
                console.log(albumResponse)
                $(".youtube-display").append(`<img src="${albumResponse.cover_medium}" alt="${albumResponse.title}"/>`)
                var ol = $(`<ol>`)
                $(".youtube-display").append(ol)

                for (i = 0; i < albumResponse.tracks.data.length; i++) {
                    ol.append(`<a href="${albumResponse.tracks.data[i].link}"><li>${albumResponse.tracks.data[i].title}</li></a>`)
                }
            })
        })
    }
    searchBtn.on("click", ajaxSearch)
