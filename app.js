$(document).ready(function() {
  $(appReady);
  $('.modal').modal();
  $(".button-collapse").sideNav();
  var userInput = $('.search').val();
  var here = 'Browse Amazon';
  var next = "_blank";
  $('.mobileDesign').hide()


  function appReady() {
    setLoading(false)
    $('.input').submit(getInfo)
  }
  let progressInterval = null;

  function setLoading(isLoading) {
    if (isLoading) {
      $('.loading').show()
      $('.landingPage').hide();
      // progressInterval = setInterval(function() {
      //   $('#progressBar').css('width', Math.random() * 100 + '%');
      // }, 500);
      $('.results').hide();
    } else {
      $('.loading').hide();
      $('.results').show();


      clearInterval(progressInterval);
    }


  }

  function getInfo(event) {
    event.preventDefault()
    var userInput = $('.search').val();
    setLoading(true);

    $.get('https://www.googleapis.com/books/v1/volumes?q=' + userInput)
      .then(function(result) {
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_ss_c_2_11?url=search-alias%3Dstripbooks&field-keywords=';
        console.log(result);
        $('.bookResults').prepend('<h3 class ="categoryTitle">BOOKS</h3>');

        for (let i = 0; i < 3; i++) {
          let product = result.items[i].volumeInfo.title
          let bookPreview = result.items[i].volumeInfo.previewLink
          let clickHere = 'Book Preview'

          $('.bookResults').append('<div class="row" >');
          $('.bookResults').append('<div class="col s12 m4 l3" >');
          //Card Image
          $('.bookResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + result.items[i].volumeInfo.imageLinks.thumbnail + '"></div>');
          //Card Title
          $('.bookResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.items[i].volumeInfo.title + '</span></div>');
          //Card Content
          $('.bookResults').append('<div class="card-content"><p class="card-subtitle grey-text text-darken-2">' + result.items[i].searchInfo.textSnippet + '</p></div');
          $('.bookResults').append('<div class="card-content1"><button class="preview"><a class="link1" href="' + bookPreview + '" target=' + next + '>' + clickHere + '</a></button>');
          //Amazon Link
          $('.bookResults').append('<div class="card-action"><button class="amazon"><a class="link" href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
          $('.bookResults').append('<div class="divide"></div>')
        }

      })

    $.get('https://www.omdbapi.com/?s=' + userInput + '&type=movie')
      .then(function(result) {
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dmovies-tv&field-keywords=';

        $('.movieResults').prepend('<h3 class ="categoryTitle">MOVIES</h3>');

        for (let i = 0; i < 3; i++) {
          let product = result.Search[i].Title

          $.get('https://www.omdbapi.com/?t=' + product)
            .then(function(results) {
              let imdb = 'http://www.imdb.com/title/'
              let imdbScore = 'IMDB Rating: ' + results.imdbRating
              console.log(results);
              $('.movieResults').append('<div class="row" >');
              $('.movieResults').append('<div class="col s12 m4 l3" >');
              //Card Image
              $('.movieResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + result.Search[i].Poster + '"></div>');
              //Card Title
              $('.movieResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.Search[i].Title + '</span></div>');
              //Card Content
              $('.movieResults').append('<div class="card-content"><p class="card-subtitle grey-text text-darken-2">' + results.Plot + '</p></div');
              $('.movieResults').append('<div class="card-content1"><button class="preview"><a class="link1" href="' + imdb + results.imdbID + '" target=' + next + '>' + imdbScore + '</a></button>');
              //Amazon Link
              $('.movieResults').append('<div class="card-action"><button class="amazon"><a class="link"href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
              $('.movieResults').append('<div class="divide"></div>')
            })
        }
      })

    $.get('https://galvanize-cors-proxy.herokuapp.com/http://giantbomb.now.sh/?query=' + userInput)
      .then(function(result) {
        let amazon = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dvideogames&field-keywords='
        let platforms = 'Platforms'
        console.log(result);

        $('.gameResults').prepend('<h3 class ="categoryTitle">GAMES</h3>');

        for (let i = 0; i < 3; i++) {
          console.log(result.results[i].platforms.length);
          console.log(result.results[i].platforms[0].name);
          let product = result.results[i].name
          $('.gameResults').append('<div class="row" >');
          $('.gameResults').append('<div class="col s12 m4 l3" >');
          //Card Image
          $('.gameResults').append('<div class="card"><div class="card-image"><img class="pic" src="' + result.results[i].image.thumb_url + '"></div>');
          //Card Title
          $('.gameResults').append('<div class="card"><div class="card-image"><span class="card-title ">' + result.results[i].name + '</span></div>');
          //Card Content
          $('.gameResults').append('<div class="card-content"><p class="card-subtitle grey-text text-darken-2">' + result.results[i].deck + '</p></div');
          $('.modal-content').append('<h4>Platforms: </h4>')
          for (let j = 0; j < result.results[i].platforms.length; j++) {

            $('.modal-content').append('<p>' + result.results[i].platforms[j].name + '</p>')
          }
          $('.gameResults').append('<div class="card-content1"><a class="waves-effect waves-light btn" href="#modal1">' + platforms + '</a></div');

          //Amazon Link
          $('.gameResults').append('<div class="card-action"><button class="amazon"><a class="link" href="' + amazon + product + '" target=' + next + '>' + here + '</a></button>')
          $('.gameResults').append('<div class="divide"></div>')
          setLoading(false);
        }
        $('.mobileDesign').show()
      })
  }
})
