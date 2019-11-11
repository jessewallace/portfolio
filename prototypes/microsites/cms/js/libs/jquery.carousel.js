/*
 * jQuery Carousel Plugin v1.1
 * http://richardscarrott.co.uk/posts/view/jquery-carousel-plugin
 * Amended by Andrew Brandwood to allow autoscroll, with pause on hover
 * http://www.brandwood.com
 *
 * Copyright (c) 2010 Richard Scarrott
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Requires jQuery v1.4+
 *
 */
// prototypal inheritance
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

(function($) {
	// ie alias
	var headache = $.browser.msie && $.browser.version.substr(0,1)<9;

	// carousel
	var Carousel = {
		settings: {
			itemsPerPage: 1,
			itemsPerTransition: 1,
			noOfRows: 1,
			pagination: true,
			nextPrevLinks: true,
			speed: 'normal',
			easing: 'swing',
			auto: false,


			
		},
		init: function(el, options) {
			if (!el.length) {return false;}
			this.options = $.extend({}, this.settings, options);
			this.itemIndex = 0;	
			this.container = el;
			this.paused = false;
			this.currentIndex = 1;
			this.timer = setTimeout($.proxy(this, 'triggerAction'), this.options.waitTime);
			this.runner = this.container.find('ul');
			this.items = this.runner.children('li');
			this.noOfItems = this.items.length;
			this.setRunnerWidth();
			if (this.noOfItems <= this.options.itemsPerPage) {return false;} // bail if there are too few items to paginate
			this.insertMask();
			this.noOfPages = Math.ceil((this.noOfItems - this.options.itemsPerPage) / this.options.itemsPerTransition) + 1;
			if (this.options.pagination) {this.insertPagination();}
			if (this.options.nextPrevLinks) {this.insertNextPrevLinks();}
			if (this.options.auto){this.initTimer();}
			this.updateBtnStyles();
		},
		initTimer: function(){
			$(this.container).bind('mouseenter', $.proxy(this, 'mouseEnterHandler'));
			$(this.container).bind('mouseleave', $.proxy(this, 'mouseLeaveHandler'));
		},
		mouseEnterHandler: function(){
			clearTimeout(this.timer);
		},
		mouseLeaveHandler: function(){
			clearTimeout(this.timer);
			this.startTimer();
		},
		startTimer: function(){
			this.timer = setTimeout($.proxy(this, 'triggerAction'), this.options.waitTime);
		},
		triggerAction: function(){
			var $item = $('.pagination-links li', this.container).eq(this.currentIndex);
			if (this.options.auto){
				$('a', $item).trigger('click');
			}
			this.currentIndex ++;
			if(this.currentIndex > this.noOfItems-1){this.currentIndex = 0;}
			//restart the timer
			this.startTimer();
		},
		insertMask: function() {
			this.runner.wrap('<div class="mask" />');
			this.mask = this.container.find('div.mask');

			// set mask height so items can be of varying height
			var maskHeight = this.runner.outerHeight(true);
			this.mask = this.container.find('div.mask');
			this.mask.height(maskHeight);
		},
		setRunnerWidth: function() {
			this.noOfItems = Math.round(this.noOfItems / this.options.noOfRows);
			var width =  this.items.outerWidth(true) * this.noOfItems;
			this.runner.width(width);
		},
		insertPagination: function() {
			var i, links = [];
			this.paginationLinks = $('<ol class="pagination-links" />');
			for (i = 0; i < this.noOfPages; i++) {
				links[i] = '<li><a href="#item-' + i + '">' + (i + 1) + '</a></li>';
			}
			this.paginationLinks
				.append(links.join(''))
				.appendTo(this.container)
				.find('a')
					.bind('click.carousel', $.proxy(this, 'paginationHandler'));
		},
		paginationHandler: function(e) {
			this.itemIndex = e.target.hash.substr(1).split('-')[1] * this.options.itemsPerTransition;
			this.animate();
			this.currentIndex = $(e.currentTarget).parents('li').index();
			return false;
		},
		insertNextPrevLinks: function() {
			this.prevLink = $('<a href="#" class="prev">Prev</a>')
								.bind('click.carousel', $.proxy(this, 'prevItem'))
								.appendTo(this.container);
			this.nextLink = $('<a href="#" class="next">Next</a>')
								.bind('click.carousel', $.proxy(this, 'nextItem'))
								.appendTo(this.container);
		},
		nextItem: function() {
			this.itemIndex = this.itemIndex + this.options.itemsPerTransition;
			this.animate();
			this.currentIndex ++;
			return false;
		},
		prevItem: function() {
			this.itemIndex = this.itemIndex - this.options.itemsPerTransition;
			this.animate();
			this.currentIndex --;
			return false;
		},
		updateBtnStyles: function() {
			if (this.options.pagination) {
				this.paginationLinks
					.children('li')
						.removeClass('current')
						.eq(Math.ceil(this.itemIndex / this.options.itemsPerTransition))
							.addClass('current');
			}

			if (this.options.nextPrevLinks) {
				this.nextLink
					.add(this.prevLink)
						.removeClass('disabled');
				if (this.itemIndex === (this.noOfItems - this.options.itemsPerPage)) {
					this.nextLink.addClass('disabled');
				} 
				else if (this.itemIndex === 0) {
					this.prevLink.addClass('disabled');
				}
			}
		},
		animate: function() {
			var nextItem, pos;
			// check whether there are enough items to animate to
			if (this.itemIndex > (this.noOfItems - this.options.itemsPerPage)) {
				this.itemIndex = this.noOfItems - this.options.itemsPerPage; // go to last panel - items per transition
			}
			if (this.itemIndex < 0) {
				this.itemIndex = 0; // go to first
			}
			nextItem = this.items.eq(this.itemIndex);
			pos = nextItem.position();
			
			if (headache) {
				this.runner
					.stop()
					.animate({left: -pos.left}, this.options.speed, this.options.easing);
			}
			else {
				this.mask
					.stop()
					.animate({scrollLeft: pos.left}, this.options.speed, this.options.easing);
			}
			this.updateBtnStyles();
		}
	};
	
	$.fn.touchwipe = function(settings) {
     var config = {
    		min_move_x: 20,
    		min_move_y: 1000,
 			wipeLeft: function() { },
 			wipeRight: function() { },
 			//wipeUp: function() { },
 			//wipeDown: function() { },
			preventDefaultEvents: false
	 };

     if (settings) $.extend(config, settings);

     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
    	 }	

    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			e.preventDefault();
				console.log(e);
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	
				 
	
	    		 var dx = startX - x;
	    	 	 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeDown();
		    			}
		    			else {
		    				config.wipeUp();
		    			}
		    		 }
    		 }
    	 }

    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
				 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
    	 }
     });

     return this;
   };
	

	// bridge
	$.fn.carousel = function(options) {
		return this.each(function() {
			var obj = Object.create(Carousel);
			obj.init($(this), options);
			$.data(this, 'carousel', obj);
		});
	};
})(jQuery);