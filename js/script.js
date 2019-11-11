$(document).ready(function(){
    
    var nav = responsiveNav(".nav-collapse", {
      insert: "after"
    });

    // grab an element
    var myElement = document.querySelector("header");
    // construct an instance of Headroom, passing the element
    var headroom  = new Headroom(myElement, {
      tolerance : {
        up : 5,
        down : 0
    }
    });
    // initialise
    headroom.init();

    if(window.location.href.indexOf("thanks") > -1) {
      setTimeout(function(){ 
        $('.hero').prepend("<div class='email-thanks animated fadeInUp'>Thanks for your message - I'll get back to you as soon as I can!</div>")
      }, 2000);
    }

    $(document).on('click', '.media a', lity);

    new WOW().init();

});