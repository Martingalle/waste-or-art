jQuery.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=window;
        for (j=0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};

jQuery.namespace('b');

b.ajax = function(config)
{
	var error = function(xhr, ajaxOptions, thrownError) {
		if(xhr.status == 200) {
			return;
		}
		var errorMessage;
		switch(xhr.status) {
			default:
			case 400:
				errorMessage = b.l.get('JS_ERROR_400');
			break;
			case 401:
				errorMessage = b.l.get('JS_ERROR_401');
			break;
			case 403:
				errorMessage = b.l.get('JS_ERROR_403');
			break;
			case 404:
				errorMessage = b.l.get('JS_ERROR_404');
			break;
			case 410:
				errorMessage = b.l.get('JS_ERROR_410');
			break;
			case 500:
				errorMessage = b.l.get('JS_ERROR_500');
			break;
			case 501:
				errorMessage = b.l.get('JS_ERROR_501');
			break;
		}
		if(xhr.responseText) {
        	var result = {};
    		try {
        		result = JSON.parse(xhr.responseText);
        		if(b.debug == 1) {
	        		$('#debugTemplate').tmpl(result).prependTo('#debug');
        		}        		
    		} catch(e) {}
    		if(result.message && b.debug == 1) {
	    		errorMessage += '<br />' + result.message;
    		}
    	}
		b.ui.showOverlayAlert(b.l.get('JS_OVERLAY_ERROR', ['__CODE', '__MSG'], [xhr.status, errorMessage]));
	};
	
	if(b.language != b.defaultLanguage) {
		config.data.language = b.language;
	}
	if(b.zone) {
		config.data.zone = b.zone;
	}

	$.ajax(
	{
		data: config.data,
		url: config.url ? config.url : b.subUrl + '/index.php',
		type: config.type || 'POST',
		dataType: config.dataType || 'json',
		success: function(result) {
			if(b.debug == 1 && result) {
				if(result.debug && result.debug.length > 0) {
					$('#debug-no-errors').remove();
					$('#debugTemplate').tmpl(result.debug).prependTo('#debug');
				}
			}
			if(config.success && result) {
				var callback = config.success;
				callback(result);
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {
			if(xhr.readyState === 0 || xhr.status === 0) {
	            return;
	        } else {
	        	if(config.failure) {
		        	if(xhr.responseText) {
			        	var result = {};
		        		try {
			        		result = JSON.parse(xhr.responseText);
			        		if(b.debug == 1) {
				        		$('#debugTemplate').tmpl(result).prependTo('#debug');
			        		}
		        		} catch(e) {}
		        		config.failure(result);
		        	}
	        	} else {
		        	error(xhr, ajaxOptions, thrownError);
	        	}
	        }
		}
	});
};

b.cookies = {
	acceptLevel: 0,
	allow: true,
    init: function()
    {
        var allCookies = document.cookie.split('; ');
        for (var i=0;i<allCookies.length;i++) {
            var cookiePair = allCookies[i].split('=');
            this[cookiePair[0]] = cookiePair[1];
            if(cookiePair[0] == b.cookiePrefix+'nocookies:u:'+(b.version != '' ? b.version : '')) {
	            this.allow = false;
            }
		if(cookiePair[0] == b.cookiePrefix+'yocookies1:u:'+(b.version != '' ? b.version : '')) {
	            this.acceptLevel = 1;
            } else if(cookiePair[0] == b.cookiePrefix+'yocookies2:u:'+(b.version != '' ? b.version : '')) {
	            this.acceptLevel = 2;
	        }
        }
        if(this.allow && this.acceptLevel < 2) {
	        this.showBanner();
        }
        if(this.allow && this.acceptLevel == 0) {
	        $(window, 'body', '.pusher-content').scroll(function() {
				b.cookies.enable(this.acceptLevel || 1);
			});
			$('body').click(function() {
				b.cookies.enable(this.acceptLevel || 1);
			});
			$('#cookie-law-banner').click(function(e) {
				e.stopPropagation();
			});
		}
    },
    exists: function(name, getRealName)
    {
	    var names = [
		    name,
		    name + ':u:',
		    b.cookiePrefix + name,
		    b.cookiePrefix + name + ':u:'
	    ];
	    if(b.version != '') {
		    names.push(name + b.version);
		    names.push(name + ':u:' + b.version);
		    names.push(b.cookiePrefix + name + b.version);
		    names.push(b.cookiePrefix + name + ':u:' + b.version);
	    }
	    for(var i in names) {
		    if(this[names[i]]) {
			   return getRealName ? names[i] : true;
		    }
	    }
	    return false;
    },
    get: function(name)
    {
	    var realName = this.exists(name, true);
	    if(!realName) {
		    return null;
	    }
	    return this[realName];
    },
    create: function(name, value, days, domain, path, noJs) 
    {
        name = b.cookiePrefix + name + (noJs ? '' : ':u:') + (b.version != '' ? b.version : '');
        var cookie = name + "=" + value;
        if(days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            cookie += "; expires=" + date.toGMTString();
        }
       cookie += "; domain=" + (domain ? domain : b.cookieDomain);
        if(path) {
	        cookie += "; path=" + path;
        } else {
	        cookie += "; path=/";
        }
        document.cookie = cookie;
        this[name] = value;
    },
    erase: function(name)
    {
        var realName = this.exists(name, true);
        if(realName) {
	        this.create(name,'',-1,null,null,true);
	        this.create(name,'',-1);
	        this[realName] = null;
        }
    },
    showBanner: function()
    {
	    $('#cookie-law-banner').addClass('opened');
    },
    hideBanner: function()
    {
	    $('#cookie-law-banner').removeClass('opened');
		this.enable(2);
    },
    enable: function(level)
    {
	    this.acceptLevel = level;
	    this.erase('nocookies');
		if(!level) {
		    level = 1;
	    }
	    var cookiename = 'yocookies' + level;
		this.create(cookiename, (level || 1), 365);
		if(level == 2) {
			window.location.reload();
		}
    },
    disable: function()
    {
	    $('#cookie-law-banner-disable').html(b.l.get('JS_COOKIE_LAW_BANNER_DISABLE_CONFIRM')+'&nbsp;<a href="javascript:b.cookies.confirmDisable();">'+b.l.get('JS_COOKIE_LAW_BANNER_DISABLE_CONFIRM_YES')+'</a>&nbsp;-&nbsp;<strong><a href="javascript:b.cookies.hideBanner();">'+b.l.get('JS_COOKIE_LAW_BANNER_DISABLE_CONFIRM_NO')+'</a></strong>');
    },
    confirmDisable: function()
    {
	    this.create('nocookies', 1, 1);
	    this.erase('yocookies1');
	    this.erase('yocookies2');
	    window.location.reload();
    },
    reenable: function()
    {
	    this.enable(2);
	    window.location.reload();
    }
};

$(document).ready(function() {
	b.cookies.init();
});
