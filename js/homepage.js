/* $.jribbble.setToken("a1bb0be70dd07f49f23db9ecb2ce6da6ce19380667e122202b81a18c5096d60f");

$.jribbble.buckets(540854).shots({
  'sort': 'views',
  'per_page': 16,  
  }).then(function(shots) {
  var html = [];
  shots.forEach(function(shot) {

  // Store the images in a variable for later use and less typing.
  var images = shot.images;
  
  // If a hidpi image is available use that, if not fall back to the normal image
  var img = (images.hidpi) ? images.hidpi : images.normal;

    html.push('<li>');
    html.push('<a href="' + img + '" data-lity>');
    html.push('<img src="' + img + '">');
    html.push('</a></li>');
  });
    
  $('.design ul').html(html.join(''));

}); */

jribbble.shots({token: "a1bb0be70dd07f49f23db9ecb2ce6da6ce19380667e122202b81a18c5096d60f"}, function(shotsArray) {
  document.querySelector(".design ul").innerHTML = shotsArray.reduce(function(html, shot) {
    return html + '<li><a href="'+  shot.html_url + '" target="_blank"><img src="' + shot.images.normal + '"></a></li>';
  }, "");
});