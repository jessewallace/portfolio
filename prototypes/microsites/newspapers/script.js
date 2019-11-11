function scrolling() {
    $(this).scrollTop() > 800 ? $("#back-top").fadeIn() : $("#back-top").fadeOut()
}
$(window).load(function() {
    $(".loading").hide()
}), $(function() {
    $("a[href*=#]:not([href=#])").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
            var o = $(this.hash);
            if (o = o.length ? o : $("[name=" + this.hash.slice(1) + "]"), o.length) return $("html,body").animate({
                scrollTop: o.offset().top
            }, 1e3), !1
        }
    }), $(".video").click(function() {
        this.paused ? this.play() : this.pause()
    })
}), $("#back-top").click(function() {
    return $("body,html").animate({
        scrollTop: 0
    }, 800), !1
}), $(window).on("scroll", _.debounce(scrolling, 250)), $("#clientQuotes").bxSlider({
    pager: !1,
    controls: !1,
    auto: !0
});

// Contact Form Area
$(document).ready(function() {
  $('#action-button').click(function() {
    event.stopPropagation();
    $('html, body').animate({
      scrollTop: $('#signuparea').offset().top
    }, 'slow');
    
  });


  // $('.goto-contact-form').on('click', function() {
  //   $('#contact-form').animate({
  //     height: ['toggle','swing']
  //   }, 700, 'linear');
  // });

  $('form input, form textarea').on('focus', function() {
    $(this).parent('p').addClass('focused');
  }).on('blur', function() {  
    $(this).parent('p').removeClass('focused');
  });

  if ($('form input').hasClass('success')) {
    $('form input').parent('p:before').css('color','#60a309');
  }



  $('#amp-newspapers-contact-form').validate({
    debug: true,
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      }
    },
    errorClass: 'invalid',
    validClass: 'success',
    errorPlacement: function(error, element) {
      error.appendTo(element.parent('p').next('input'));
    },
    submitHandler: function(form) {
      $(form).ajaxSubmit({
        type: 'POST',
        data: $(form).serialize(),
        url: 'index.php',
        success: function() {
          $('#amp-newspapers-contact-form :input').attr('disabled', 'disabled');
          $('#amp-newspapers-contact-form').fadeTo('slow', 0.15, function() {
            $(this).find(':input').attr('disabled', 'disabled');
            $('#success').fadeIn();
          });
        },
        error: function() {
          $('#amp-newspapers-contact-form').fadeTo('slow', 0.15, function() {
            $('#error').fadeIn();
          });
        }
      });
    }
  });
});
