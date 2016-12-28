(function($) {
	$.fn.sublime_slider = function(options) {
		var settings = $.extend({
			interval: 1000,
			keyboard: true,
			mouse: true,
			autoplay: true
		}, options);
		var $me = $(this);
		var $my = $me.find('.item');
		var $active = $me.find(".item.active").attr("data-active", 1);
		var $sl = 0;
		$my.each(function(e, k) {
			$sl++;
			$that = $(this);
			$that.attr("data-sequence", $sl);
			if (!$that.attr('data-delay'))
				$that.attr('data-delay', settings.interval);
		});
		$me.slide(settings);
		settings.keyboard ? $me.keyboard_action() : "";
		settings.mouse ? $me.mouse_action() : "";
		$("[data-slide]").click(function() {
			var $action = $(this).attr("data-slide");
			clearTimeout(autoplay);
			$me.slide({
				go: $action,
				autoplay: settings.autoplay
			});
		});
	}
	$.fn.slide = function(options) {
		var settings = $.extend({
			autoplay: true,
		}, options);
		var $me = $(this);
		var $my = $me.find("[data-active]");
		var current = parseInt($my.attr("data-sequence"));
		if (settings.go == 'next')
			$next = current + 1;
		else if (settings.go == 'prev')
			$next = current - 1;
		else if (!settings.go) $next = current;
		else $next = settings.go;
		if ($next > ($me.find('.item').length))
			$next = 1;
		if (!$next) $next = $me.find('.item').length;
		$you = $("[data-sequence='" + $next + "']");
		$my.removeAttr('data-active');
		$you.attr('data-active', 1);
		$my.hide();
		$you.show();
		$(".slider-indicators").find("[data-slide='" + current + "']").removeClass(
			"active");
		$(".slider-indicators").find("[data-slide='" + $next + "']").addClass(
			"active");
		$you.sublime();
		delay = $you.attr("data-delay");
		autoplay = setTimeout(function() {
			if (settings.autoplay) {
				$me.slide({
					go: "next"
				});
			}
		}, delay);
	}
	$.fn.sublime = function() {
		var $all = $(this).find("[data-start-animation]");
		$all.each(function() {
			$that = $(this);
			var animation = $that.attr("data-start-animation");
			console.log(animation);
			$that.css("animation", animation);
		});
	}
	$.fn.keyboard_action = function() {
		document.onkeydown = function(e) {
			switch (e.keyCode) {
				case 37:
					$("[data-slide='prev']").trigger('click');
					break;
				case 39:
					$("[data-slide='next']").trigger('click');
					break;
			}
		};
	}
	$.fn.mouse_action = function() {
		var touchStart = 0;
		var touchEnd = 0;
		document.addEventListener('touchstart', function(e) {
			var touch = e.touches[0];
			touchStart = touch.clientX;
		}, false);
		document.addEventListener('touchmove', function(e) {
			var touch = e.touches[0];
			touchEnd = touch.clientX;
			//console.log(touchStart + "#" + touchEnd);
		}, false);
		$(document).on('click touchend', function(event) {
			console.log(touchStart + "#" + touchEnd);
		});
		document.addEventListener('click touchend', function(e) {
			// 	var touch2 = e.touches[0];
			// 	console.log(touch2);
			//console.log(touchStart + "#" + touchEnd);
			if (touchStart > touchEnd) {
				$("[data-slide='prev']").trigger('click');
			}
			if (touchStart < touchEnd) {
				$("[data-slide='next']").trigger('click');
			}
		}, true);

	}
}(jQuery));
