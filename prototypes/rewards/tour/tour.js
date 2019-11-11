$(document).ready(function(){

			//display modal
			$('.tour-modal-container').animate({"top":"0"},500);

			//bind start button & skip link
			$('#start-tour').click(function(){
				progress('next');
			})

			$('.skip-tour').click(function(){
				hideModal();

			})

			//bind back & next buttons
			$('.btn-back').click(function(){
				progress('back');
			})
		
			$('.btn-next').click(function(){
				progress('next');
			})

			//bind go to prile button
			$('#go-profile').click(function(){
				highlight();
				hideModal();
			})

			
			//slide progression function

			var slide = 1;
			function progress(dir){
				if(dir=='next'){
					$('.modal-content-container').animate({"left":"-=450"},500)

					if(slide == 1){
					$('.modal-avatar-wrapper').fadeOut(200);
					$('.btn-back, .btn-next').delay(350).fadeIn(200);
					$('.tour-modal-container').animate({"padding-top":"-=25px","top":"25px"},500);
					} else if(slide == 4){
						$('#go-profile').delay(400).fadeIn(200);
						$('.btn-next').text('Close').unbind().click(function(){
							highlight();
							hideModal();
						})
					} else if(slide == 5){
						
					}
				slide++;

				} else {
					$('.modal-content-container').animate({"left":"+=450"},500)

					if(slide == 2){
						$('.modal-avatar-wrapper').delay(500).fadeIn(200);
						$('.btn-back, .btn-next').fadeOut(200);
						$('.tour-modal-container').animate({"padding-top":"+=25px","top":"0px"},500);
					} else if(slide == 5) {
						$('#go-profile').fadeOut(100);
						$('.btn-next').text('Next').unbind().click(function(){
							progress('next');
						})
					}
				slide--;
				}
			highlight(slide);
			}

		//function to highlight correct elemnents

		function highlight(slide){
			$('#see_profile_menu, .getpoints, .winprizes, #aMyAcct').css("z-index","1");
			$('.arrow').remove();

			switch(slide){
				case 2: 
					$('.getpoints').css("z-index","101").append('<img src="img/arrow-getpoints.png" class="arrow" id="arrow-getpoints"></img>');
					$('#arrow-getpoints').animate({"top":"20px"},'300');
					break;
				case 3:
					$('.winprizes').css("z-index","101").append('<img src="img/arrow-usepoints.png" class="arrow" id="arrow-usepoints"></img>');
					$('#arrow-usepoints').animate({"top":"20px"},'300');
					break;
				case 4:
					$('#see_profile_menu').css("z-index","101").append('<img src="img/arrow-profile.png" class="arrow" id="arrow-profile"></img>');
					$('#arrow-profile').animate({"top":"35px"},'300');
					break;
				case 5:
					$('#aMyAcct').css("z-index","101").append('<img src="img/arrow-myaccount.png" class="arrow" id="arrow-myaccount"></img>');
					$('#arrow-myaccount').animate({"top":"40px"},'300');
					break;
				default:
					$('.arrow').remove();
					break;
			}


		}

		function hideModal(){
			$('.tour-modal-container').animate({"top":"600"},500);
			$('.tour-mask').delay(400).fadeOut(200);	
		}
		});
