// Cookie-notice me senpai

// On load: Check for existing cookie for message.
$(window).on("load", function() {
    if (document.cookie.indexOf("citw_accept_cookie") >= 0) {
        // If cookie is found: hide cookie notice thingy.
         $('#cookie-notice').addClass("hidden");
    }
    else {
        // If cookie is not found: show cookie notice thingy.
        $('#cookie-notice').addClass("visible");

        // Small animation on the beginning.
        $('#cookie-notice').removeClass("fixed-bottom");
        $('#cookie-notice').addClass("fixed-mid");
    }

    // On click: Save/overwrite cookie and hide stuff.
    $('#cookie-button').click(function() {
        // On click: save and/or overwrite existing cookie for this webpage.
        $('#cookie-notice').addClass("hidden");

        document.cookie = "citw_accept_cookie=true";
    });
});

