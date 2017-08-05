var giphys = ["duh", "nintendo", "karate", "taco", "asdf", "aw man", "cmon man", "deadpool", "LotR", "transformers", "boo", "grumpy cat", "lovecraft", "robot", "give up", "fail", "make it stop", "nut shot", "GoT", "nasa", "whoops" ];

function displayGiphy() {

    $("#giphy-view").empty();

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=10&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {

        console.log(response);
        console.log(response.data[0].images.downsized_medium.url);
        console.log(response.data[0].images.downsized_still.url);
        console.log(response.data[0].rating);
        for (var i = 0; i < response.data[0].images.downsized_medium.url.length; i++) {

            var giphyDiv = $("<div class='newGiphy'>");

            var rating = $("<p>").html("Rating: " + response.data[i].rating);

            var animate = response.data[i].images.downsized_medium.url;
            var still = response.data[i].images.downsized_still.url;

            var image = $("<img>").attr("src", still);
            image.attr('data-still', still);
            image.attr('data-animate', animate);
            image.attr('data-state', image.data('state') === 'still' ?
                'animate' :
                'still');
            image.addClass("gif");


            giphyDiv.append(rating, image);


            $("#giphy-view").prepend(giphyDiv);
            event.preventDefault();
        }
    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < giphys.length; i++) {

        var a = $("<button>");

        a.addClass("giphy");
        a.addClass("btn btn-outline-warning btn-rounded waves-effect");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-giphy").on("click", function(event) {

    event.preventDefault();

    var giphy = $("#giphy-input").val().trim();

    giphys.push(giphy);

    renderButtons();

});


$(document).ready(function() {

    renderButtons();
    $("#giphy-input").focus();
    $(document).on("click", ".giphy", displayGiphy);
    $(document).on("click", '.gif', function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});