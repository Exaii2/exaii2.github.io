var mainLoaderWrapper;
var mainContent;
var dynamicModalContent;
var dynamicModalLoader;
var dynamicContentModal;
var moadlContentWrapper;

$(document).ready(function() {

	console.log(" READY");

	mainLoaderWrapper = $('#dynamicMainLoaderWrapper');
	mainContent = $('#mainContent');
	dynamicModalContent = $('#dynamicModalContent');
	dynamicModalLoader = $('#dynamicModalLoaderWrapper');
	dynamicContentModal = $('#dynamicContentModal');
	modalContentWrapper = $('#modalContentWrapper');

	setTimeout(function() {
		fadeElementIn(mainLoaderWrapper);
	}, 250);
});

window.onload = function() {
	console.log(" LOADED");

	setTimeout(function() {
		fadeElementOut(mainLoaderWrapper);
		fadeElementIn(mainContent);
		mainContent.removeClass("hidden");
	}, 1250);

	setTimeout(function() {
		mainLoaderWrapper.addClass("hidden");
	}, 2500);

	$(document).on("click", ".dynamicContentLink", function() {

		// Get proper Attribute from clicked Element
		var dynamicContentAttr = $(this).attr("data-content");

		// Reset dynamic contant
		dynamicModalContent.html("");
		dynamicContentModal.css('padding-right', '0px');
		dynamicModalLoader.removeClass("hidden");
		dynamicModalLoader.addClass("maxOpacity visible");
		dynamicModalContent.addClass("zeroOpacity");

		setTimeout(function() {

			// Load new Content for dynamic modal
			$.get("html/" + dynamicContentAttr + ".html").done(function(data) {
				dynamicModalContent.html(data);
				fadeElementOut(dynamicModalLoader);
				fadeElementIn(dynamicModalContent);

				setTimeout(function() {
					dynamicModalLoader.removeClass("visible");
					dynamicModalLoader.addClass("hidden");
				}, 1500);
			});

		}, 500);

	});

	$(document).on("click", ".closeModalButton", function() {
		dynamicModalContent.html("");
	});
}

function fadeElementIn(htmlElement) {
	htmlElement.addClass("zeroOpacity");
	htmlElement.removeClass("fadeOut");
	htmlElement.addClass("fadeIn");
	htmlElement.removeClass("zeroOpacity");
}

function fadeElementOut(htmlElement) {
	htmlElement.addClass("maxOpacity");
	htmlElement.removeClass("fadeIn");
	htmlElement.addClass("fadeOut");
	htmlElement.removeClass("maxOpacity");
}

function initMailFunction(){
	var addMessage = firebase.functions().httpsCallable('addMessage');

	$(function() {

		$("#contactForm input,#contactForm textarea").jqBootstrapValidation({
			preventSubmit : true,

			submitError : function($form, event, errors) {
				// additional error messages or events
			},

			submitSuccess : function($form, event) {

				event.preventDefault(); // prevent default submit
				// behaviour

				// get values from FORM
				var _name = $("input#name").val();
				var _email = $("input#email").val();
				var _message = $("textarea#message").val();
				var _firstName = _name;

				//Write mail to database
				writeDataToDatabase("messages/" + Date.now() + "/", {name:_name, email:_email, message:_message});
				
				// // Check for white space in name for Success/Fail message
				if (_firstName.indexOf(' ') >= 0) {
					_firstName = _name.split(' ').slice(0, -1).join(' ');
				}
				$this = $("#sendMessageButton");
				$this.prop("disabled", true); // Disable submit button until AJAX
				// call is complete to prevent
				// duplicate messages

				var dtTest = firebase.functions().httpsCallable('addDatabaseEntry');
				
				dtTest({
					txt : "Jooooo"
				}).then(function(result) {
					console.log("Message built!");
				});
				
				var addMessage = firebase.functions().httpsCallable('addMessage');
				
				addMessage({
					name : _name,
					email : _email,
					message : _message,

				}).then(function(result) {

					console.log(result.err);
					
					if (result.data == null) {
						// Success message
						$('#success').html("<div class='alert alert-success'>");
						$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
						$('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
						$('#success > .alert-success').append('</div>');
						// clear all fields
						$('#contactForm').trigger("reset");

						setTimeout(function() {
							$this.prop("disabled", false); // Re-enable
						}, 1000);
					} else {
						// Fail message
						$('#success').html("<div class='alert alert-danger'>");
						$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
						$('#success > .alert-danger').append($("<strong>").text("Sorry " + _firstName + ", it seems that my mail server is not responding. Please try again later!"));
						$('#success > .alert-danger').append('</div>');
						// clear all fields
						$('#contactForm').trigger("reset");
					}

				});
			},
			filter : function() {
				return $(this).is(":visible");
			},
		});

		$("a[data-toggle=\"tab\"]").click(function(e) {
			e.preventDefault();
			$(this).tab("show");
		});
	});

	/* When clicking on Full hide fail/success boxes */
	$('#name').focus(function() {
		$('#success').html('');
	});
	
}