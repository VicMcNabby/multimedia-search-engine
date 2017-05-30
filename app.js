$(document).ready(function() {
  $(appReady);
  //Materialize initializations
  $('.modal').modal();
  $(".button-collapse").sideNav();

  $('.mobileDesign').hide()

  var userInput = $('.search').val();
  var here = 'Browse Amazon';
  var next = "_blank";

  function appReady() {
    setLoading(false)
    $('.input').submit(getInfo)
  }
  //Loading function
  function setLoading(isLoading) {
    if (isLoading) {
      $('.loading').show()
      $('.landingPage').hide();
      $('.results').hide();
    } else {
      $('.loading').hide();
      $('.results').show();
    }
  }

  //Requests
  function getInfo(event) {
    event.preventDefault()
    var userInput = $('.search').val();
    setLoading(true);
    //Google Books API
    $.get('https://www.googleapis.com/books/v1/volumes?q=' + userInput)
      .then(function(result) {
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_ss_c_2_11?url=search-alias%3Dstripbooks&field-keywords=';

        $('.bookResults').prepend('<h3 class ="categoryTitle">BOOKS</h3>');
        console.log(result);
        for (let i = 0; i < 5; i++) {
          let product = result.items[i].volumeInfo.title
          let bookPreview = result.items[i].volumeInfo.previewLink
          let clickHere = 'Book Preview'
          let proxy = 'https://images.weserv.nl/'

          //Card Image
          $('.bookResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + result.items[i].volumeInfo.imageLinks.thumbnail + '"></div>');
          //Card Title
          $('.bookResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.items[i].volumeInfo.title + '</span></div>');
          //Card Content
          $('.bookResults').append('<div class="card-content"><p class="card-subtitle black-text text-darken-2">' + result.items[i].searchInfo.textSnippet + '</p></div');
          //Book Preview
          $('.bookResults').append('<div class="card-content1"><button class="waves-effect waves-light btn"><a class="link1" href="' + bookPreview + '" target=' + next + '>' + clickHere + '</a></button>');
          //Amazon Link
          $('.bookResults').append('<div class="card-action"><button class="amazon"><a class="link" href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
          //Result Divider
          $('.bookResults').append('<div class="divide"></div>')
        }

      })
    //OMDB - Movies API
    $.get('https://api.themoviedb.org/3/search/movie?api_key=82c848f0d12aeb177346f899a7979c65&language=en-US&query=' + userInput + '&page=1&include_adult=false')
      .then(function(result) {
        console.log(result);
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dmovies-tv&field-keywords=';

        $('.movieResults').prepend('<h3 class ="categoryTitle">MOVIES</h3>');

        for (let i = 0; i < 5; i++) {
          let poster = 'https://image.tmdb.org/t/p/original'
          let product = result.results[i].original_title
          let rating = 'User Rating: '
          //OMDB - Plot request


          //Card Image
          $('.movieResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + poster + result.results[i].poster_path + '"></div>');
          //Card Title
          $('.movieResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.results[i].original_title + '</span></div>');
          //Card Content
          $('.movieResults').append('<div class="card-content"><p class="card-subtitle black-text text-darken-2">' + result.results[i].overview + '</p></div');
          //IMDB Page
          // $('.movieResults').append('<div class="card-content1"><button class="waves-effect waves-light btn"><a class="link1" href="' + imdb +  + '" target=' + next + '>' + rating + '</a></button>');
          $('.movieResults').append('<div class="card-content1"><button class="waves-effect waves-light btn">' + rating + result.results[i].vote_average + '</button>');
          //Amazon Link
          $('.movieResults').append('<div class="card-action"><button class="amazon"><a class="link"href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
          //Result Divider
          $('.movieResults').append('<div class="divide"></div>')

        }
      })
    //GiantBomb - Game API
    $.get('https://galvanize-cors-proxy.herokuapp.com/http://giantbomb.now.sh/?query=' + userInput)
      .then(function(result) {
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dvideogames&field-keywords='

        $('.gameResults').prepend('<h3 class ="categoryTitle">GAMES</h3>');

        for (let i = 0; i < 5; i++) {

          let product = result.results[i].name

          //Card Image
          $('.gameResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + result.results[i].image.thumb_url + '"></div>');
          //Card Title
          $('.gameResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.results[i].name + '</span></div>');
          //Card Content
          $('.gameResults').append('<div class="card-content"><p class="card-subtitle black-text text-darken-2">' + result.results[i].deck + '</p></div>');


          let $cardContent = $('<div class="card-content1"><a class="waves-effect waves-light btn" href="#modal1">Platforms</a></div>')
          $cardContent.click(function() {

            $('.modal-content').empty()
            $('.modal-content').append('<h4>Platforms: </h4>')
            //Nested For Loop for Platform Information
            for (let j = 0; j < result.results[i].platforms.length; j++) {
              //Available Platforms
              $('.modal-content').append('<p>' + result.results[i].platforms[j].name + '</p>')
            }
          })
          $('.gameResults').append($cardContent);

          //Amazon Link
          $('.gameResults').append('<div class="card-action"><button class="amazon"><a class="link" href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
          //Result Divider
          $('.gameResults').append('<div class="divide"></div>')
          setLoading(false);
        }
        $('.mobileDesign').show()
      })
  }
})
