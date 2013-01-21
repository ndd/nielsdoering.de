$(function() {
	
	// evil browser check
	if ($('html').hasClass('csstransitions')) {
		
		// init jmpress with default options
		$('#impress').jmpress({
			stepSelector: 'section',
			mouse: { clickSelects: false },
			keyboard: { use: false },
			afterInit: function(element, eventData) {
				// apply "one page options" to the body
				$('body')
					.css('height', '100%')
					.css('overflow', 'hidden')
					.css('position', 'relative')
					.css('width', '100%');
			},
			beforeChange: function(element, eventData) {
				// highlight according main nav entry and set footer class
				var sectionId = $(element).attr('id');
				var $mainLink = $('nav a[href="#' + sectionId + '"], footer a[href="#' + sectionId + '"]');
							
				if ($mainLink.length > 0) {
					$('nav .selected, footer .selected').removeClass('selected');
					$mainLink.addClass('selected');
				}

				// show / hide all but the first project
				if (sectionId === 'mxp' || sectionId === 'kicker') {
					$('#' + sectionId).fadeIn();
				}
				else {
					$('#mxp, #kicker').fadeOut();
				}
				// $('#mxp, #kicker').on('enterStep', function(event) { $(this).fadeIn(); }).on('leaveStep', function(event) { $(this).fadeOut(); });
			}
		});
	
	}
	else {
		// evil browser found
		$('html').addClass('no-jmpress');
	}

	// fancy box
	$("a[rel=mxp_gallery]").fancybox();
	$("a[rel=kicker_gallery]").fancybox();

	// spam protected mail and phone link
	getMail();
	getPhone();
});

function getMail() {
	var link = decrypt("4zvUP.luvHz4F@u7OUuur.hui", "XbSOKLwsoUaEYv8QCrh2ndgNiZ6GAIyxPu9qjJ3ftMHBR4lFDzeT5pkcV07W1m");

	$('#mail').html('<a href="mailto:' + link + '">' + link + '</a>');
}

function getPhone() {
	var link = decrypt("QrazaalQsjll", "OR4s7DyavAFhnVpLloBX3g6wPxtcUMqCjSKWuY0T2biGm8e1kfQJz9IHd5ZrNE");
	
	$('#phone').html('<a href="tel:+49' + link.substr(1) + '">' + link.slice(0, 4) + ' ' + link.slice(4) + '</a>');
}

// Email obfuscator script 2.1 by Tim Williams, University of Arizona (http://www.jottings.com/obfuscator)
function decrypt(coded, key) {
	var shift = coded.length;
	var link = "";
	
	for (i=0; i<coded.length; i++) {
		if (key.indexOf(coded.charAt(i)) == -1) {
			ltr = coded.charAt(i);
			link += (ltr);
		}
		else {     
				ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
				link += (key.charAt(ltr))
		}
	}

	return link;
}