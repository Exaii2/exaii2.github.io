/* Do some stuff here to propely trigger the menu and stuff. */
if ($(window).width() < 992) {
	/* For Smartphone. */
	$(window).click(function() {
		if ($(this).scrollTop() > 30 || !$('#button-collapse').hasClass("collapsed")) {
			$('#mainNav').addClass("navbar-onscroll");
		} else {
			$('#mainNav').removeClass("navbar-onscroll");
		}
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 30 || !$('#button-collapse').hasClass("collapsed")) {
			$('#mainNav').addClass("navbar-onscroll");
		} else {
			$('#mainNav').removeClass("navbar-onscroll");
		}   
	});
} else {
	/* For PC. */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 30) {
			$('#mainNav').addClass("navbar-onscroll");
		} else {
			$('#mainNav').removeClass("navbar-onscroll");
		}   
	});
}