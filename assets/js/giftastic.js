//ovXsXFMTBjk5IddjODlS8KJHu7TOcTN3 // gighy api key
$(document).ready(function(){

    var newSitcom; //used when adding new sitcom using the sitcom search code
    var buttonText;
    var buttonId;
    var properTitle;

    var topics = ["the+goldbergs", "arrested+deveopment", "that+70s+show", "how+i+met+your+mother", "the+big+bang+theory", 
    "parks+and+rec", "the+office", "fawlty+towers", "unbreakable+kimmy+schmidt", "seinfield"]; //sitcom titles array

    
    var i=0; //used for index array iteration

    // console.log(buttonId);

    $('.start-stop').hide(); //hide gif animation instructions
    button_maker();
    
    function button_maker () {
        $(topics).each(function () {  //creates titled button for each item in array at load

            // var buttons = this.tester
            buttonId = ("button_"+[i]); //assigns button id usind array index location

            buttonText = topics[i]; //assigns the text title of the sitcom as the text for each button created

            console.log(buttonText);

            properTitle = buttonText.replace(/\+/g, " "); //removes all "+" signs from array text so button text looks better



            $('.Titled-Buttons').append('<button type = "button" data-title = "' + buttonText + '" class="button_with_title" id='+ buttonId +'>' + properTitle + '</button> &nbsp &nbsp'); //creates new buttons within the sitcom-buttons area of the Title button block
            
            i++; //iterates up through each item in array at end of each loop to allow next loop to grab information from the proper array index during next time through loop, this is set to 0 outside of the loop at has a 0 index value the first time through
            // console.log(buttonId);

        });
    }

  


    //Event Listener for Search Title Submission
    $('#title-search').on('click', function () {
        // event.preventDefault(); //halts bubble up which prevents page reload
        button_add (); //call function button-add
    });


    function button_add () { //using search term to create new button in sitcom-buttons area with the Title button block
    newSitcom = $('#sitcom-title').val().trim(); // get value from text input field for search
    // newSitcom = newSitcom.toLowerCase(); //changes all characters entered to lower case
    // newbuttonId = ("button_"+topics.length); //assigns the button id number as the length of the current array, this works as the array index starts at 0 but the length counter starts at 1

    // $('.Titled-Buttons').append('<button type = "button" data-title = "' + newSitcom + '" class="button_with_title" id='+newbuttonId+'>' + newSitcom + '</button> &nbsp &nbsp'); //adds new button with search term as title to the end of the buttons already shown

    newSitcomPlus=newSitcom.replace(/ /g, "+"); //replaces blanks in title with "+" signs before pushing to array, this is for the api pull search

    topics.push(newSitcomPlus); //adds new title to the end of the array

       console.log(topics);

      button_maker();
    
    };


  


    //Event listener for the sitcom titled buttons
    $(document.body).on('click', '.button_with_title',function() { 

        $('.gif-div-holder').remove();

        // console.log('Caputured the Button Press');

        var sitcomSelected = $(this).attr("data-title"); //set the data-title information for the button selected as the variable value to be used in the API grab

        // console.log(this);
    
        console.log("Will get API for: " + sitcomSelected);


        // Construct Giphy search term for sitcom title
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q='  + sitcomSelected +'&api_key=ovXsXFMTBjk5IddjODlS8KJHu7TOcTN3&limit=10';



        //Giphy Data request using AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        }) //do not use semicolon here, it disrupts use of .then below

            //waits for completeion of data retrieval from the API
            .then(function (response) {
                var apiData = response.data; //places API data retrieved in an array

                var $updateMessage = $('#gif-area-message');
                $updateMessage.html('<h4 id="gif-area-message"><strong>Here Are Your Gifs!</strong></h4>');

                console.log(apiData);

                var indexer = 0;
                //Loop through each item in response stored in the APIdata array
                apiData.forEach(function() {

                    
                    // Eliminate r and pg 13 rated gifs
                    if (apiData[indexer].rating !== 'r' && apiData[indexer].rating !== 'pg-13') {

                                        

                        //new div for the gif, creates one per loop through
                        var giphyDiv = $('<div class="gif-div-holder">'); //creates div with opening and closing html tags

                        //stores the rating of the current gif in loop
                        var ratedWhat = apiData[indexer].rating;

                        //Make text to display rating
                        var ratingText = $('<p class="rating-text">').text('This gif is rated: ' + ratedWhat); //creates paragraph with opening and closing html tags and text indicated

                        //Create html to store gif image data
                        var gifImageStill = $('<img class="giphy-image-still" id="gif-image-still-' + indexer + '" value="'+ indexer +'">'); //creates opening and closing html tags to hold gif image

                        var gifImageMove = $('<img class="giphy-image-move" id="gif-image-move-' + indexer + '" value="'+ indexer +'">'); //creates opening and closing html tags to hold gif image

                        gifImageStill.attr('src', apiData[indexer].images.fixed_height_still.url);  //apiData[indexer].images.fixed_height.url); //insert attributes of gif image for current object in loop, use _still to load a static preview image

                        gifImageMove.attr('src',apiData[indexer].images.fixed_height.url); //animated gif, is hidden at load, becomes visiable on click


                        //Place the giphy and associated rating in the giphyDiv created above
                        giphyDiv.append(gifImageStill);
                        giphyDiv.append(gifImageMove);
                        giphyDiv.append(ratingText);

                        $('#gifs-here').prepend(giphyDiv); //put gifs in gifs-here div

                        $('.giphy-image-move').hide();
                        $('.start-stop').show();
                    }
                
                    indexer++; //increment array index pointer by 1 to use for next time through loop
                });



                //Event listener for the gif stills titled buttons, needs to be within the .then function as gif images need to load first before interaction with js
                $('.gif-div-holder').on('click', function() {

                    var whichButton = event.target.id;
                    var value = $('#'+whichButton).attr('value');
                    // console.log(whichButton);
                    // console.log('The value of the button is: '+ value);

                    switch (value) {

                        case '9':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '8':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '7':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '6':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '5':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '4':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;
                        
                        case '3':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '2':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '1':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                        case '0':

                        $('#gif-image-still-'+ value).toggle();

                        $('#gif-image-move-' + value).toggle(); 

                        break;

                    }

                    // console.log(mover);

                    // history.pushState(null,'',apiData[0].images.fixed_height.url);

                


                });


            });

    });


});
