$(document).ready(function() {
    $("#loading").css("display", "none");
    $("#result").css("visibility", "hidden");
    $('#button').click(function() {
        $("#result").css("visibility", "hidden");
        $("#loading").css("display", "block");
        $.ajax({
            url: "http://localhost:8080/analyse/all/"+$('#domain').val(),
            dataType: 'json',
            success: function( data ) {
                $("#loading").css("display", "none");
                $("#result").css("visibility", "visible");

                alexaPageRank = (data.alexa != undefined) ? data.alexa.page_rank : 'n/a';
                googlePageRank = (data.google != undefined) ? data.google.page_rank : 'n/a';
                googleIndexedPages = (data.google != undefined) ? data.google.indexed_pages : 'n/a';
                googleBackLinksTotal = (data.google != undefined) ? data.google.back_links.total : 'n/a';
                googleBackLinksList = (data.google != undefined) ? data.google.back_links.list : null;

                $('#alexa').html(
                    '<a href="#" class="list-group-item list-group-item-info">Alexa</a>' +
                    '<a href="#" class="list-group-item">Rank: ' + alexaPageRank + '</a>'
                );

                $('#google').html(
                    '<a href="#" class="list-group-item list-group-item-info">Google</a>' +
                    '<a href="#" class="list-group-item">PageRank: ' + googlePageRank + '</a>' +
                    '<a href="http://www.google.com/search?q=site:' + $('#domain').val() + '" target="_blank" class="list-group-item">Indexed Pages: ' + googleIndexedPages + '</a>' +
                    '<a href="http://www.google.com/search?q=link:' + $('#domain').val() + '" target="_blank" class="list-group-item">BackLinks: ' + googleBackLinksTotal + '</a>'
                );

                if (googleBackLinksList && googleBackLinksList.length > 0) {
                    $('#google-back-links').html('<a href="#" class="list-group-item list-group-item-info">Google BackLinks (Top 10)</a>');

                    for (i = 0; i < googleBackLinksList.length; i++) {
                        $('#google-back-links').append('<a href="#" class="list-group-item">' + googleBackLinksList[i] + '</a>');
                    }
                } else {
                    $('#google-back-links').html('');
                }
            },
            error: function( data ) {
                $("#loading").css("display", "none");
                $("#result").css("visibility", "hidden");
                alert(JSON.parse(data.responseText).status);
            }
        });
    });
});
