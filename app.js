$(document).ready(function(){
    var topics = ['Tom Brady', 'Bill Belichick', 'OBJ', 'Lamar Jackson', 'Patrick Mahomes', 'Vince Lombardi', 'JJ Watt'];
    //--------------------------------------------------------------------------------------
    function buttonExpress(){
        $('#click').empty();
        
        for ( var i = 0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass('pics');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#click').append(a);
        }
    }    
    buttonExpress();
//--------------------------------------------------------------------------------------
  $(document).on('click', '.pics', function() {

    var nfl = $(this).html();     
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    nfl + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";  

    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            var results = response.data;
         
            $('#show').empty();
                for ( var j = 0; j < results.length; j++) {
                    var output = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                    var image = $('<img>').attr("src", still).attr('data-animate', output).attr('data-still', still);
                    image.attr('data-state', 'still');
                    $('#show').prepend(image);
                    image.on('click', play);
                    
                        var rating = results[j].rating;
                        var displayRated = $('<p>').text("Rating: " + rating);
                        $('#show').prepend(displayRated);
            
                } 
        }); 
  //--------------------------------------------------------------------------------------

        function play() { 
                    var state = $(this).attr('data-state');
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr(newFunction(), 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }


            function newFunction() {
                return 'data-state';
            }
                }               
    }) 
    //--------------------------------------------------------------------------------------
$(document).on('click', '#add', function(){
    if ($('#addNew').val().trim() == ''){
      alert('NFL Button');
   }
   else {
    var nfl = $('#addNew').val().trim();
    topics.push(nfl);
    $('#addNew').val('');
    buttonExpress();
    return false;

    }

});
    //--------------------------------------------------------------------------------------

});  