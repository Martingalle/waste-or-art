jQuery.namespace('b.ui');

// RESIZING

b.ui.resize = function()
{
	if(!b.deviceIsMobile) {
		if($(window).width() < 768) {
			b.isMobile = true;
		} else {
			b.isMobile = false;
		}
		if(!b.isMobile && $(window).width() < 1200) {
			b.isTablet = true;
		} else {
			b.isTablet = false;
		}
	}
	
	b.ui.orientation = b.ui.getOrientation();
	
	$('body').removeClass('landscape').removeClass('portrait').addClass(b.ui.orientation).scroll();
	
	if(b.isMobile) {
		$('.mp-level').css('height', $(window).height() + 'px');
	}
}

// RESPONSIVITY

b.ui.viewport = null;

b.ui.orientation = null;

b.ui.getOrientation = function()
{
	var orientation = null;
	if(window.parent == window) {
		if(!b.isMobile) {
			if($(window).width() > $(window).height()) {
				orientation = 'landscape';
			} else {
				orientation = 'portrait';
			}
		} else {
			switch(window.orientation) {
				case -90:
				case 90:
					orientation = 'landscape';
				break; 
				default:
					orientation = 'portrait';
				break;
			}
		}
	} else {
		if(($(window).width() == 600 && $(window).height() == 400) || ($(window).width() == 960 && $(window).height() == 720) || $(window).width() > 960) {
			orientation = 'landscape';
		} else {
			orientation = 'portrait';
		}
	}
	return orientation;
}

b.ui.onOrientationChange = function()
{
	if(!b.isMobile) {
		return;
	}
	
	b.ui.orientation = b.ui.getOrientation();
	
	if(screen.width < 768) {
		if(b.ui.orientation == 'landscape') {
			var scale = Math.round(screen.height / 600 * 10) / 10;
			$('#meta-viewport').attr('content', 'width=600px, initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no'); // landscape mobile
		} else {
			var scale = Math.round(screen.width / 400 * 10) / 10;
			$('#meta-viewport').attr('content', 'width=400px, initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no'); // portrait mobile
		}
	} else if(screen.width >= 768 && screen.width < 1200) {
		var scale = Math.round(screen.width / 960 * 10) / 10;
		$('#meta-viewport').attr('content', 'width=960px, initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no');
	} else if(screen.width >= 1200) {
		$('#meta-viewport').attr('content', 'width=device-width, user-scalable=yes');
	} else {
		$('#meta-viewport').attr('content', 'width=device-width, user-scalable=yes');
	}
	
	b.ui.resize();
}

/* MOBILE */

b.ui.mobile = {};

b.ui.mobile.init = function()
{
	if($('#mp-menu').length == 0) {
		return;
	}
	
	var hasParentClass = function(e, classname) {
		if(e === document) {
			return false;
		}
		if($(e).hasClass(classname)) {
			return true;
		}
		return e.parentNode && hasParentClass(e.parentNode, classname);
	};
	
	var mobilecheck = function() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	
	var container = $('.pusher-container');
	var eventtype = mobilecheck() ? 'touchstart' : 'click';
	var resetMenu = function() {
		$(container).removeClass('pusher-menu-open');
	};
	var bodyClickFn = function(evt) {
		if(!hasParentClass(evt.target, 'pusher-menu')) {
			resetMenu();
			document.removeEventListener( eventtype, bodyClickFn );
		}
	};
	$('#pusher-button').bind(eventtype, function(e) {
		e.stopPropagation();
		e.preventDefault();
		setTimeout(function() {
			$(container).addClass('pusher-menu-open');
		}, 25);
		document.addEventListener(eventtype, bodyClickFn);
	});
	
	new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('pusher-button'), {
		type : 'cover'
	});
	
	$('#mp-menu li').each(function() {
		if($(this).find('.mp-level').length > 0) {
			$(this).click(function() {
				$('.pusher-menu-container').scrollTop(0);
			});
		}
	});
	
	b.ui.resize();
}

// OVERLAYS

b.ui.overlay = function(content, isElement, data, isClosable, multiple, level)
{
    if(!data) data = {};
    if(isClosable == null) isClosable = true;
    var count = multiple ? $('.modal').length : 0;
    if(typeof level !== 'undefined') {
	    count = level;
	    $('.overlayPanel').each(function() {
		    if($(this).attr('data-level') > level) {
			    $(this).modal('hide');
		    }
	    });
    }
    var overlayTemplate = 'overlayPanel' + (count > 0 ? count : '');
    $('body').append('<div id="'+overlayTemplate+'" data-level="'+count+'" class="modal overlayPanel fade" style="z-index:'+(1050 + count * 20)+'"></div>');
    $('#'+overlayTemplate).empty();
    if(isElement) {
    	$('#'+content).tmpl(data).appendTo('#'+overlayTemplate);
    } else {
    	$('#'+overlayTemplate).html('<div class="overlayMessage">'+content+'</div>');
    }
    if(isClosable) {
	    $('#'+overlayTemplate).modal().on('hidden.bs.modal', function(e) {
		    $('#'+overlayTemplate).remove();
	    });
    } else {
	    $('#'+overlayTemplate).modal({backdrop: 'static'}).on('hidden.bs.modal', function(e) {
		    $('#'+overlayTemplate).remove();
	    });;
    }
    var i = 0;
    $('.modal-backdrop').each(function() {
	    $(this).css('z-index', 1040 + i * 20);
	    i++;
    });
    b.ui.tooltips();
};

b.ui.showOverlay = function(title, content, isClosable, multiple, level)
{
	b.ui.overlay('overlayEmpty', true, {title: title, content: content}, isClosable, multiple, level);
}
b.ui.showOverlayMsg = function(msg, isClosable, multiple, level)
{
	b.ui.overlay('overlayMsg', true, {message: msg}, isClosable, multiple, level);
}
b.ui.showOverlayAlert = function(title, msg, isClosable, multiple, level)
{
	if(!title || !msg) {
		if(!msg && title) {
			msg = title;
		}
		title = b.l.get('JS_OVERLAY_ALERT_TITLE');
	}
	b.ui.overlay('overlayAlert', true, {title: title, message: msg}, isClosable, multiple, level);
}
b.ui.showOverlayWarning = function(title, msg, isClosable, multiple, level)
{
	if(!title || !msg) {
		if(!msg && title) {
			msg = title;
		}
		title = b.l.get('JS_OVERLAY_ALERT_TITLE');
	}
	b.ui.overlay('overlayWarning', true, {title: title, message: msg}, isClosable, multiple, level);
}
b.ui.showOverlaySuccess = function(title, msg, isClosable, multiple, level)
{
	if(!title || !msg) {
		if(!msg && title) {
			msg = title;
		}
		title = b.l.get('JS_OVERLAY_SUCCESS_TITLE');
	}
	b.ui.overlay('overlaySuccess', true, {title: title, message: msg}, isClosable, multiple, level);
}
b.ui.showOverlayConfirm = function(title, msg, yes, no, yesmsg, nomsg, isClosable, multiple, level)
{
	if(!title && !msg) {
		if(!msg && title) {
			msg = title;
		}
		title = b.l.get('JS_OVERLAY_CONFIRM_TITLE');
	}
	if(!no) {
		no = 'b.ui.hideOverlayMsg()'
	}
	if(!yesmsg) {
		yesmsg = b.l.get('JS_GENERIC_CONFIRM');
	}
	if(!nomsg) {
		nomsg = b.l.get('JS_GENERIC_CANCEL');
	}
	b.ui.overlay('overlayConfirm', true, {title: title, message: msg, yes: yes, no: no, yesmsg: yesmsg, nomsg: nomsg}, isClosable, multiple, level);
}

b.ui.hideOverlayMsg = function(level)
{
	if(typeof level !== 'undefined') {
		$('.overlayPanel').each(function() {
		    if($(this).attr('data-level') >= level) {
			    $(this).modal('hide');
		    }
	    });
	} else {
		$('.overlayPanel').modal('hide');
	}
}

// AJAX IMAGE LOADING

b.ui.loadImages = function()
{
	$('.image-loader').each(function() {
		if(!$(this).hasClass('image-loaded')) {
			b.ui.loadImage(this);
		}
	});
}

b.ui.loadImage = function(loader)
{
	if(!$(loader).hasClass('image-loaded')) {
		$(loader).html('<i class="fa fa-spin fa-spinner"></i>');
		var img = new Image();
		$(img).load(function () {
			var result;
			if($(loader).data('gallery-id')) {
				var imgArray = $(loader).data('img').split('/');
				var imgname = imgArray[imgArray.length - 1];
				result = '<a id="article-image-'+$(loader).data('image-id')+'" href="'+b.baseUrl+'/gallery/'+$(loader).data('gallery-id')+'/'+$(loader).data('gallery-alias')+'/'+imgname+'"></a>'
			} else {
				result = img;
			}
			$(loader)
				.empty()
				.hide();
			$(this)
				.css('width', $(loader).data('width')+'px')
				.css('margin-left', $(loader).data('margin-left')+'px')
				.attr('data-width', $(loader).data('width'))
				.attr('data-margin-left', $(loader).data('margin-left'))
				.attr('alt', $(loader).data('article-title'));
			$(loader)
				.html(result);
			if($(loader).data('gallery-id')) {
				$('#article-image-' + $(loader).data('image-id')).html(img);
			}
			$(loader)
				.fadeIn('fast')
				.addClass('image-loaded');
		}).error(function () {
			$(loader).remove();
		}).attr('src', $(loader).data('img'));
	}
}

// VOTING

b.ui.hype = function(articleId)
{
	b.ajax({
		data: {
			controller: 'articles',
			action: 'vote',
			id: articleId
		},
		type: 'POST',
		dataType: 'json'
	});
}

b.ui.vote = function(articleId, vote)
{
	b.ajax({
		data: {
			controller: 'articles',
			action: 'vote',
			id: articleId,
			vote: vote
		},
		type: 'POST',
		dataType: 'json'
	});
}

// AUTOCOMPLETE

b.ui.autocompletehistory = [];

b.ui.autocomplete = function(input, params)
{
	if(typeof input == 'string') {
		input = $('#'+input);
	}
	var catalogue = params.catalogue ? params.catalogue : function(request, response) {
		var data = {
	    	controller: params.controller || 'suggestions',
			action: params.action || 'retrieve',
	    	object: params.source || input.attr('source'),
	        query: request.term
	    };
	    if(params.extension) {
		    data.extension = params.extension;
	    }
	    if(params.site) {
		    data.site = params.site;
	    }
	    if(params.skin) {
		    data.skin = params.skin;
	    }
	    if(params.filters) {
	    	if(typeof params.filters == 'function') {
		    	data.filters = params.filters();
	    	} else {
		    	data.filters = params.filters;
	    	}
	    }
        b.ajax({
            data: data,
            success: function(r) {
            	b.ui.autocompletehistory = r.payload;
            	response(r.payload);
            }
        });
    };
	var config = {
    	source: catalogue,
        autoFocus: params.autoFocus || true,
        minLength: params.minLength || 2,
        delay: params.delay || 150
    };
    if(params.select) {
	    config.select = function(event, ui) {
		    event.preventDefault();
			params.select(event, ui);
	    };
	}
	if(params.close) {
	    config.close = function(event, ui) {
		    event.preventDefault();
			params.select(event, ui);
	    };
	}
	if(params.change) {
	    config.change = function(event, ui) {
		    event.preventDefault();
			params.select(event, ui);
	    };
	}
    input.autocomplete(config);
    if(params.template) {
	    input.autocomplete('instance')._renderItem = function(ul, item) {
	    	return $(params.template).tmpl(item).appendTo(ul);
	    };
    }
    if(params.allowNew && params.select) {
	    input.keydown(function(event, ui) {
		    if(event.keyCode == '13') {
		    	params.select(event, ui);
		    }
		});
    } else {
	    input.keydown(function(event, ui) {
		    if(event.keyCode == '13') {
			    input.blur();
		    }
		});
    }
}

// DATEPICKER

b.ui.initDatePicker = function(alias, onSelect)
{
	if(onSelect) {
		$('#'+alias+'DatePicker').datepicker({'onSelect': onSelect});
	} else {
		$('#'+alias+'DatePicker').datepicker();
	}
	if($('#'+alias).val() != '') {
		$('#'+alias+'DatePicker').datepicker('setDate', new Date($('#'+alias).val()));
	} else {
		$('#'+alias+'DatePicker').datepicker('setDate', new Date());
	}
	$('#'+alias+'DatePicker').datepicker('option', 'dateFormat', 'DD, d MM yy');
    $('#'+alias+'DatePicker').datepicker('option', 'altField', '#'+alias);
    $('#'+alias+'DatePicker').datepicker('option', 'altFormat', 'yy-mm-dd');
}

// TOOLTIPS

b.ui.tooltips = function()
{
	if(b.isMobile) {
		return;
	}
	$('.with-tooltip').tooltip();
	$('.with-popover').popover();
}

// SCROLL

b.ui.getScroll = function(target)
{
    if(target) {
	    return $(target).scrollTop();
    }
    var scrollY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        scrollY = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        scrollY = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        scrollY = document.documentElement.scrollTop;
    }
    return scrollY;
}

// PATH

b.ui.getPath = function(fromPath)
{
	var from = 1;
	if(!fromPath) {
		if(location.pathname.indexOf(b.rootUrl) != -1) {
			from = b.rootUrl.length + 1;
		}
	} else {
		if(location.pathname.indexOf(fromPath) != -1) {
			from = fromPath.length + 1;
		}
	}
	return location.pathname.substring(from, location.pathname.length).split('/')
}

// CONTACTS FORM

b.ui.contactsForm = function(success, failure)
{
	var data = {
		controller: 'auth',
		action: 'contacts_form',
		name: $('#contacts-form-name input').val(),
		email: $('#contacts-form-email input').val(),
		message: $('#contacts-form-message textarea').val()
	};
	if($('#contacts-form-recipient').length > 0) {
		data.recipient = $('#contacts-form-recipient select').val();
	}
	if(b.activeSite) {
		data.site = b.activeSite;
	}
	if(b.activeSkin) {
		data.skin = b.activeSkin;
	}
	b.ajax({
		data: data,
		dataType: 'json',
		success: function(r) {
			if(r.success) {
				if(success) {
					success(r);
				} else {
					b.ui.showOverlaySuccess(b.l.get('JS_CONTACTS_FORM_SUCCESS'));
				}
			} else {
				if(failure) {
					failure(r);
				} else {
					b.ui.showOverlayAlert(b.l.get('JS_ERROR_GENERIC'));
				}
			}
		}
	});
}

b.ui.checkContactsForm = function()
{
	var goodForm = true;

	var name = $('#contacts-form-name input').val();
	var email = $('#contacts-form-email input').val();
	var message = $('#contacts-form-message textarea').val();

	if(name == '') {
		$('#contacts-form-name').addClass('has-error');
		$('#contacts-form-name-alert').html(b.l.get('JS_CONTACTS_FORM_NAME_ERROR'));
		goodForm = false;
	} else {
		$('#contacts-form-name').removeClass('has-error');
		$('#contacts-form-name-alert').empty();
	}
	if(!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email))) {
		$('#contacts-form-email').addClass('has-error');
		$('#contacts-form-email-alert').html(b.l.get('JS_CONTACTS_FORM_EMAIL_ERROR'));
		goodForm = false;
	} else {
		$('#contacts-form-email').removeClass('has-error');
		$('#contacts-form-email-alert').empty();
	}
	if(message == '') {
		$('#contacts-form-message').addClass('has-error');
		$('#contacts-form-message-alert').html(b.l.get('JS_CONTACTS_FORM_MSG_ERROR'));
		goodForm = false;
	} else {
		$('#contacts-form-message').removeClass('has-error');
		$('#contacts-form-message-alert').empty();
	}
	
	if(!$('#contacts-form-check input[type="checkbox"]').is(':checked')) {
		$('#contacts-form-check').addClass('has-error');
		$('#contacts-form-check-alert').html(b.l.get('JS_CONTACTS_FORM_CHECK_ERROR'));
		goodForm = false;
	} else {
		$('#contacts-form-check').removeClass('has-error');
		$('#contacts-form-check-alert').empty();
	}

	return goodForm;
}

// NEWSLETTER

b.ui.newsletterSubscribe = function(email, success, failure, newsletterId)
{
	var data = {
		controller: 'auth',
		action: 'newsletter_subscribe',
		email: email
	};
	if(b.activeSite) {
		data.site = b.activeSite;
	}
	if(b.activeSkin) {
		data.skin = b.activeSkin;
	}
	if(newsletterId) {
		data.newsletterId = newsletterId;
	}
	b.ajax({
		data: data,
		dataType: 'json',
		success: function(r)
		{
			if(r.success) {
				if(success) {
					success(r);
				} else {
					b.ui.showOverlaySuccess(b.l.get('JS_NEWSLETTER_SUCCESS'));
				}
			} else {
				if(failure) {
					failure(r);
				} else {
					b.ui.showOverlayAlert(b.l.get('JS_NEWSLETTER_FAILURE'));
				}
			}
		}
	});
}

b.ui.newsletterUnsubscribe = function(email, success, failure, newsletterId)
{
	var data = {
		controller: 'auth',
		action: 'newsletter_unsubscribe',
		email: email
	};
	if(b.activeSite) {
		data.site = b.activeSite;
	}
	if(b.activeSkin) {
		data.skin = b.activeSkin;
	}
	if(newsletterId) {
		data.newsletterId = newsletterId;
	}
	b.ajax({
		data: data,
		dataType: 'json',
		success: function(r)
		{
			if(r.success) {
				if(success) {
					success(r);
				} else {
					b.ui.showOverlaySuccess(b.l.get('JS_NEWSLETTER_UNSUBSCRIBE_SUCCESS'));
				}
			} else {
				if(failure) {
					failure(r);
				} else {
					b.ui.showOverlayAlert(b.l.get('JS_NEWSLETTER_UNSUBSCRIBE_FAILURE'));
				}
			}
		}
	});
}

// NUMBERS

b.ui.numbers = {};

b.ui.numbers.toDisplay = function(number, dec, thousands_sep, dec_point)
{
	number = parseFloat(number);
	var decimals = (typeof decimals === 'undefined') ? 2 : decimals;
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
	    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	    sep = (typeof thousands_sep === 'undefined') ? '' : thousands_sep,
	    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	    s = '',
	    toFixedFix = function(n, prec) {
	      var k = Math.pow(10, prec);
	      return '' + (Math.round(n * k) / k)
	        .toFixed(prec);
	    };
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if(s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

b.ui.numbers.toInt = function(number)
{
	number = '' + number;
	var result = parseInt(b.ui.numbers.toFloat(number));
	if(isNaN(result)) {
		return 0;
	}
	return result;
}

b.ui.numbers.toFloat = function(number, decimals)
{
	number = '' + number;
	var explodedByComma = number.split(',');
	var explodedByDot = number.split('.');
	var decimalSeparator, thousandsSeparator, decimalPart;
	var doReplace = false;
	if(explodedByComma.length > 1 && explodedByComma[explodedByComma.length - 1].length == 2) {
		decimalSeparator = ',';
		thousandsSeparator = '.';
		decimalPart = explodedByComma[explodedByComma.length - 1];
		doReplace = true;
	} else if(explodedByDot.length > 1 && explodedByDot[explodedByDot.length - 1].length == 2) {
		decimalSeparator = '.';
		thousandsSeparator = ',';
		decimalPart = explodedByDot[explodedByDot.length - 1];
		doReplace = true;
	} else {
		decimalSeparator = ',';
		thousandsSeparator = '.';
		decimalPart = '00';
	}
	if(doReplace) {
		number = number.replace(decimalSeparator + decimalPart, '');
		number = number.replace(',', '').replace('.', '');
	}
	if(!decimals) {
		decimals = 2;
	}
	var result = b.ui.numbers.round(parseFloat(number + '.' + decimalPart), decimals);
	if(isNaN(result)) {
		return 0;
	}
	return result;
}

b.ui.numbers.round = function(number, decimals)
{
	var divider = '1';
	for(var i = 0; i < decimals; i++) {
		divider += '0';
	}
	divider = parseInt(divider);
	var result = Math.round(number * divider) / divider;
	if(isNaN(result)) {
		return 0;
	}
	return result;
}

// COUNTDOWN

/* COUNTDOWN */

b.ui.countdown = {
	scroll: function(identifier) {
		$countdown = $(identifier);
		var availableFrom = $countdown.attr('data-available-from');
		if(availableFrom) {
			var finishDate = new Date(availableFrom);
			var now = new Date();
			
			var diff = finishDate - now;
			
			var days = parseInt(diff/86400000);
			diff -= days*86400000;
			var hours = parseInt(diff/3600000);
			diff -= hours*3600000;
			var minutes = parseInt(diff/60000);
			diff -= minutes*60000;
			var seconds = parseInt(diff/1000);
			diff -= seconds*1000;
			
			$countdown.find('.days input').html(days);
			$countdown.find('.hours input').html(hours);
			$countdown.find('.minutes input').html(minutes);
			$countdown.find('.seconds input').html(seconds);
			
			var dispDays = this.pad(days);
			var dispHours = this.pad(hours);
			var dispMinutes = this.pad(minutes);
			var dispSeconds = this.pad(seconds);
			
			$countdown.find('.days .first span').html(dispDays.substring(0,1));
			$countdown.find('.days .second span').html(dispDays.substring(1,2));
			$countdown.find('.hours .first span').html(dispHours.substring(0,1));
			$countdown.find('.hours .second span').html(dispHours.substring(1,2));
			$countdown.find('.minutes .first span').html(dispMinutes.substring(0,1));
			$countdown.find('.minutes .second span').html(dispMinutes.substring(1,2));
			$countdown.find('.seconds .first span').html(dispSeconds.substring(0,1));
			$countdown.find('.seconds .second span').html(dispSeconds.substring(1,2));
			
			setTimeout(function() {
				b.ui.countdown.scroll(identifier);
			}, 1000);
		}
	},
	pad: function(num) {
	    var s = num + "";
	    while (s.length < 2) s = "0" + s;
	    return s;
	}
};

// DOM.READY

$(document).ready(function()
{
	/* Bootstrap init */
	$('.carousel').each(function() {
		var interval = $(this).data('interval') || 3000;
		if($(this).hasClass('paused')) {
			interval = false;
		}
		$(this).carousel({
			interval: interval
		});
		if($(this).hasClass('paused')) {
			$(this).carousel('pause').bind('slid', function() {
				$(this).carousel('pause');
			});
		}
		$(this).on('slid.bs.carousel', function() {
			$(window).scroll();
		});
		$(this).addClass('initialized');
	});
	$(window).scroll();

	if(typeof $.tooltip === 'function') {
		$('.with-tooltip').tooltip();
	}

	/* Masonry init */
	$('.with-masonry').each(function() {
		$(this).masonry({
			itemSelector: '.'+$(this).data('masonry-elem'),
			columnWidth: $(this).data('masonry-column'),
			animationOptions: {
				duration: 400
			}
		});
	});

	/* Fancy Image */
	if($('a[rel="fancy-image"]').length > 0 && typeof $.fancybox !== 'undefined') {
		$('a[rel="fancy-image"]').fancybox({
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'titlePosition' 	: 'over',
			'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
				return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
			}
		});
	}

	/* Twitter Stream */
	if($('#twitter-plugin').length > 0) {
		b.auth.retrieveTweets();
	}

	/* Instagram Stream */
	if($('#instagram-plugin').length > 0) {
		b.auth.retrieveInstagram();
	}
    
    /* Locales */
    $('.zone-switcher a').click(function() {
    	b.cookies.erase('ss');
		window.location = $(this).data('zone');
	});
    $('.language-switcher a').click(function() {
		var root = b.rootUrl;
		root = root.replace(b.language.toLowerCase(), $(this).data('language').toLowerCase());
		var path = window.location.pathname;
		if(path.substring(0, b.rootUrl.length) == b.rootUrl) {
			path = path.replace(b.rootUrl, root);
		} else {
			path = root + path;
		}
		window.location = path;
	});
	$('.country-switcher a').click(function() {
		b.ajax({
			data: {
				controller: 'auth',
				action: 'switchCountry',
				countryId: $(this).data('country')
			},
			dataType: 'json',
			success: function(r) {
				window.location.reload();
			}
		});
		b.ui.showOverlayMsg(b.l.get('JS_GENERIC_LOADING'));
	});
	$('.currency-switcher a').click(function() {
		b.ajax({
			data: {
				controller: 'auth',
				action: 'switchCurrency',
				currency: $(this).data('currency')
			},
			dataType: 'json',
			success: function(r) {
				window.location.reload();
			}
		});
		b.ui.showOverlayMsg(b.l.get('JS_GENERIC_LOADING'));
	});
    
    b.ui.viewport = document.getElementById('meta-viewport');
    
    $(window).resize(b.ui.resize);
	b.ui.resize();
	
	$(window).bind('orientationchange', b.ui.onOrientationChange);
	b.ui.onOrientationChange();
	
	b.ui.mobile.init();
	
	$('input[data-placeholder]').focus(function() {
		if($(this).val() == $(this).data('placeholder')) {
			$(this).val('');
		}
	}).blur(function() {
		if($(this).val() == '') {
			$(this).val($(this).data('placeholder'));
		}
	});
	
	// DFP banners pixel tracking
	if($('.dfp-banner').length > 0) {
		googletag.cmd.push(function() {
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				var dfpBanner = event.slot.getSlotElementId();
				if(dfpBanner) {
					var bannerId = $('#'+dfpBanner).closest('.banner').attr('data-id');
					if(bannerId) {
						$('#banner-'+bannerId).after('<img src="'+b.baseUrl+'/b.banners.impress.'+bannerId+'" class="banner-pixel-tracking" style="width:1px;height:1px;" />');
						console.log('>>> Rendered DFP banner '+bannerId);
					}
				}
			});
		});
	}
});
