$(document).ready(function() {
  $(appReady);
  //Materialize initializations
  $('.modal').modal();
  $('.button-collapse').sideNav();
  // $('.button-collapse').sideNav('hide')
  //
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

  //Requests function
  function getInfo(event) {
    event.preventDefault()
    var userInput = $('.search').val();
    setLoading(true);
    //Google Books API
    $.get('https://www.googleapis.com/books/v1/volumes?q=' + userInput)
      .then(function(result) {
        //Amazon book url
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_ss_c_2_11?url=search-alias%3Dstripbooks&field-keywords=';
        //dynamically places category title
        $('.bookResults').prepend('<h3 class ="categoryTitle">BOOKS</h3>');
        console.log(result);
        for (let i = 0; i < 5; i++) {
          //title used for Amazon link
          let product = result.items[i].volumeInfo.title
          //url for the google books preview
          let bookPreview = result.items[i].volumeInfo.previewLink
          //button title
          let clickHere = 'Book Preview'
          // let proxy = 'https://images.weserv.nl/'

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
    //The MovieDB - Movies API
    $.get('https://api.themoviedb.org/3/search/movie?api_key=82c848f0d12aeb177346f899a7979c65&language=en-US&query=' + userInput + '&page=1&include_adult=false')
      .then(function(result) {
        //Amazon movie url
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dmovies-tv&field-keywords=';
        //dynamically places category title
        $('.movieResults').prepend('<h3 class ="categoryTitle">MOVIES</h3>');
        console.log(result);
        for (let i = 0; i < 5; i++) {
          //url needed to disply movie poster
          let poster = 'https://image.tmdb.org/t/p/original'
          //title used in Amazon link
          let product = result.results[i].original_title
          //movie ID needed for recommendations
          let movieId = result.results[i].id
          let newImage = 'movie.jpeg'
          if (result.results[i].poster_path == null) {
            $('.movieResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + newImage + '"></div>');
          } else {

            //Card Image
            $('.movieResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + poster + result.results[i].poster_path + '"></div>');
          }
          //Card Title
          $('.movieResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.results[i].original_title + '</span></div>');
          //Card Content
          $('.movieResults').append('<div class="card-content"><p class="card-subtitle black-text text-darken-2">' + result.results[i].overview + '</p></div');

          let $cardContent = $('<div class="card-content1"><a class="waves-effect waves-light btn" href="#modal1">Recommendations</a></div>')
          //get request for movie recommendations
          $.get('https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?api_key=82c848f0d12aeb177346f899a7979c65&language=en-US&page=1')
            .then(function(results) {

              $cardContent.click(function() {

                $('.modal-content').empty()
                $('.modal-content').append('<h4>Recommendations: </h4>')
                //Nested For Loop for Recommendations
                for (let j = 0; j < 5; j++) {
                  //Shows top 5 recommendations
                  $('.modal-content').append('<p>' + results.results[j].original_title + '</p>')
                }
              })
            })

          $('.movieResults').append($cardContent);
          //Amazon Link
          $('.movieResults').append('<div class="card-action"><button class="amazon"><a class="link"href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
          //Result Divider
          $('.movieResults').append('<div class="divide"></div>')

        }
      })
    //GiantBomb - Game API
    $.get('https://galvanize-cors-proxy.herokuapp.com/http://giantbomb.now.sh/?query=' + userInput)
      .then(function(result) {
        console.log(result);
        //Amazon game url
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dvideogames&field-keywords='
        //dynamically places category title
        $('.gameResults').prepend('<h3 class ="categoryTitle">GAMES</h3>');

        for (let i = 0; i < 5; i++) {
          //title to be used in Amazon link
          let product = result.results[i].name
          let newImage = 'videogame.jpeg'
          if (result.results[i].image == null) {
            $('.gameResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + newImage + '"></div>');
          } else {
            //Card Image
            $('.gameResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + result.results[i].image.thumb_url + '"></div>');
          }
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
  $('a.waves-effect').click(function() {;
  })
})
