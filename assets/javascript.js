$(window).ready(function () {
    // initializing foundation js
    $(document).foundation();
    // Get the modal
    var modal = document.getElementById("Modal");
    modal.style.display = "block";
});
// checking if any games have been saved in local storage
if (localStorage.getItem("Favorite Games")) {
    // clearing any existing buttons
    $('#fav-games').empty();
    // favGames array will contain items that were saved in local storage
    var favGames = JSON.parse(localStorage.getItem("Favorite Games"));
    // creating a list item for each game 
    for (var i = 0; i < favGames.length; i++) {
        var g = `
        <li><a target="_blank" href="${favGames[i].href}">${favGames[i].value}</a></li>
        `
        $('#fav-games').append(g);
    }
}
else {
    // if no local storage, favGames is an empty array
    var favGames = [];
};

// checking if any music has been saved in local storage

if (localStorage.getItem("Favorite Tracks")) {
    // clearing any existing buttons
    $('#fav-tracks').empty();
    // favTracks array will contain items that were saved in local storage
    favTracks = JSON.parse(localStorage.getItem("Favorite Tracks"));
    // creating a list item for each track
    for (var i = 0; i < favTracks.length; i++) {
        var t = `
         <li><a target="_blank" href="${favTracks[i].href}">${favTracks[i].value}</a></li>
         `
        $('#fav-tracks').append(t);
    }
}
else {
    // if no local storage, favTracks is an empty array
    var favTracks = [];
}
// free-to-play API
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


function rawgSearch(event) {
    event.preventDefault()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rawg-video-games-database.p.rapidapi.com/games?page_size=1&search=" + userInput.val(),
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "375d20d071msh8cfe88476310e89p19559fjsn74b9c5579521",
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
        }
    };
    $("#gameDisplay").empty();
    $.ajax(settings).done(function (response) {
        console.log(response.results);
        var titles = response.results[0].name;
        var img = response.results[0].background_image;
        var c = `<div>
            <h2>${titles}</h2>
            <img src="${img}" alt="${titles}">
          </div>`;
        $("#gameDisplay").append(c);
    })
}

$(".freeToPlay").empty();
$.ajax(settings).done(function (response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        var a = $("<ul>");
        // storing title,thumbnail, and game url into variables
        var title = response[i].title;
        var thumbnail = response[i].thumbnail;
        var gameUrl = response[i].game_url;
        var a = `
          <div class="free-game-result">
            <a target="_blank" href= "${gameUrl}">
            <h3>${title}</h3>
            <img class="game-img" src="${thumbnail}" alt="${title}">
            </a>
          </div>
          `;
        var b = `
          <button class="game-save-btn" value="${title}" data-url="${gameUrl}"><img class="add" src="assets/images/add-icon-white-24x24.png" alt="Add to">Favorites</button>
        `
        $(".freeToPlay").append(a);
        $(".freeToPlay").append(b);
    }
});

$(document).on("click", ".game-save-btn", function (event) {
    event.preventDefault();
    // console.log(this);
    // creating a variable named game with value of button clicked on
    var game = {
        value: $(this).val(),
        href: $(this).attr("data-url")
    }

    // if favGames contains this track already...
    if (JSON.stringify(favGames).includes(JSON.stringify(game.value))) {
        // *************** can add modal here *************
        // logging track is already saved message to console
        console.log(game + " is already saved");
    }
    else {
        // remove placeholder message
        $('#init-game-message').remove();
        console.log(game);

        // add chosen game to the favgames array
        favGames.push(game);
        // saving array of favorite games to local storage
        localStorage.setItem("Favorite Games", JSON.stringify(favGames));

        // adding game to the favorites list at top of page
        var addFavGame = `
        <li><a target="_blank" href="${game.href}">${game.value}</a></li>
        `
        $('#fav-games').append(addFavGame);
    }

});
var searchBtn = $("#search-btn");
var userInput = $("#input");

function ajaxSearch(event) {
    event.preventDefault()

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + userInput.val() + " Original Soundtrack" + "&limit=1",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b35fd7d145mshb4adf51ded8770dp1c0953jsn373558f355ca",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(userInput);
        console.log(response);

        var albumURL = "https://deezerdevs-deezer.p.rapidapi.com/album/" + response.data[0].album.id
        $.ajax({
            "url": albumURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "b35fd7d145mshb4adf51ded8770dp1c0953jsn373558f355ca",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        }).then(function (albumResponse) {
            console.log(albumResponse)
            // this filters the response and checks if the genre of the soundtrack is a game
            var genreCheck = albumResponse.genres.data
            var isGame = false
            for (var i = 0; i < genreCheck.length; i++)
                if (genreCheck[i].id == 173 || genreCheck[i].id == 179) {
                    isGame = true
                    break;
                } else {
                    console.log("NO ALBUM")
                    return;
                }

            $(".youtube-display").empty()
            $(".youtube-display").append(`<img class="music-img" src="${albumResponse.cover_medium}" alt="${albumResponse.title}"/>`)
            $(".youtube-display").append(`<h3>${albumResponse.title}</h3>`)
            var ol = $(`<ol class="music-result">`)

            $(".youtube-display").append(ol);

            for (i = 0; i < albumResponse.tracks.data.length; i++) {
                var title = albumResponse.tracks.data[i].title;
                var link = albumResponse.tracks.data[i].link;
                ol.append(`<a target="_blank" href="${link}"><li class="track-li">${title}</li></a>`);
                ol.append(`<button class="track-save-btn music-result button large" data-url="${link}" value="${title}"><img class="add" src="assets/images/add-icon-white-24x24.png" alt="Add to">Favorites</button>`);
            }
        })
    })
};
function multiFunction(event) {
    rawgSearch(event);
    ajaxSearch(event);
}
searchBtn.on("click", multiFunction)

$(document).on("click", ".track-save-btn", function (event) {
    event.preventDefault();
    console.log(this);
    // creating a track variable, assigning value and link for track
    var track = {
        value: $(this).val(),
        href: $(this).attr("data-url")
    }
    // if favTracks contains this track already...
    if (JSON.stringify(favTracks).includes(JSON.stringify(track.value))) {
        // ************** can add a modal here if we want ****************************
        // logging track is already saved message to console
        console.log(track + " is already saved");
    }
    else {
        // remove placeholder message
        $('#init-music-message').remove();
        console.log(track);

        // add chosen track to the favTracks array
        favTracks.push(track);
        // saving array of favorite tracks to local storage
        localStorage.setItem("Favorite Tracks", JSON.stringify(favTracks));

        addFavTrack = `
        <li><a href="${track.href}">${track.value}</a></li>
        `
        $('#fav-tracks').append(addFavTrack);
    }
});

// Get the modal
var modal = document.getElementById("Modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


