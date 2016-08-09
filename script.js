$(document).ready(function() {
  var streamers = ["freecodecamp", "trumpsc", "pokespeedrunbots", "food", "cookingfornoobs", "austenmarie", "automateallthethings", "pajlada", "drathy", "acotn", "comster404", "brunofin", "RobotCaleb", "failstream", "HardlyDifficult", "Guude"]

  var name; //display name
  var logo; //logo
  var message; //if they don't exist, get error message
  var status; //if they exist, online or offline
  var game; //if they're streaming, what they're "playing" (creative, starcraft, etc.)
  var description; //if they're streaming, details about what they're streaming
  var url; //channel url


  for (var i=0; i<streamers.length; i++) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + streamers[i] + "?callback=?")
    .done(function(data) {
      if(data.stream === null) {
        getInfoOffline(data);
      } else if (data.stream === undefined) {
        getInfoClosed(data);
      } else {
        getInfoOnline(data);
      };
    }); //end done

    //get info from channel json if offline and add to html

    function getInfoOffline(data) {
      $.getJSON(data._links.channel, function(dataOff) {
        name = dataOff.display_name;
        logo = dataOff.logo;
        game = dataOff.game;
        url = dataOff.url;

        offlineHTML = '<a href="' + url + '" target="_blank">' +
          '<div class="row offline z-depth-1 hoverable">' +
          '<div class="col s3 col m2">' +
          '<div class="flexCenter">' + //flexbox allows icon to be vertically aligned
          '<img src="' + logo + '" class="responsive-img circle logo-style">' +
          '</div></div>' +
          '<div class="col s9 col m10"><h5 class="name">' + name + '</h5><p>' + game + '</p></div></div></a>';
        $("#offline").append(offlineHTML);
      }); //end getJSON
    }; //end getInfoOffline

    //get info for closed accounts and add to html

    function getInfoClosed(data) {
      message = data.message;
      //extract channel name from error message
      var tmpStr  = data.message.match("'(.*)'");
      var newStr = tmpStr[1];;
      logo = "http://tcteks.com/wp-content/uploads/2014/09/Blank-person-photo-e1412191714122.png";

      closedHTML = '<div class="row closed z-depth-1 hoverable">' +
          '<div class="col s3 col m2">' +
          '<div class="flexCenter">' +
          '<img src="' + logo + '" class="responsive-img circle logo-style">' +
          '</div></div>' +
          '<div class="col s9 col m10"><h5 class="name">' + newStr + '</h5><p>' + message + '</p></div></div></a>';
        $("#closed").append(closedHTML);
    }; //end getInfoClosed

    //get info from stream (original json pull) if online and add to html

    function getInfoOnline(data) {
      name = data.stream.channel.display_name;
      logo = data.stream.channel.logo;
      game = data.stream.game;
      description = data.stream.channel.status;
      url = data.stream.channel.url;

      onlineHTML = '<a href="' + url + '" target="_blank">' +
          '<div class="row online z-depth-1 hoverable">' +
          '<div class="col s3 col m2">' +
          '<div class="flexCenter">' +
          '<img src="' + logo + '" class="responsive-img circle logo-style">' +
          '</div></div>' +
          '<div class="col s9 col m10"><h5 class="name">' + name + '</h5><p>' + game + ': ' + description + '</p></div></div></a>';
        $("#online").prepend(onlineHTML);
    }; //end getInfoOnline
  }; //end for/orignal getJSON

  //click functions for buttons
  $("#all").click(function() {
    $("#online").hide();
    $("#offline").hide();
    $("#closed").hide();
    $("#online").fadeIn(1300);
    $("#offline").fadeIn(1300);
    $("#closed").fadeIn(1300);
  });
  $("#online-button").click(function() {
    $("#online").hide();
    $("#offline").hide();
    $("#closed").hide();
    $("#online").fadeIn(1300);
  });
  $("#offline-button").click(function() {
    $("#online").hide();
    $("#offline").hide();
    $("#closed").hide();
    $("#offline").fadeIn(1300);
    $("#closed").fadeIn(1300);
  }); //end buttons
}); //end ready
