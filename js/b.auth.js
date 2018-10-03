jQuery.namespace('b.auth');

// FORMS

b.auth.checkUsername = function(username, success, failure)
{
    if(!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    	return false;
    }
    b.ajax(
    {
        data: {
            controller: 'auth',
            action: 'checkUsername',
            username: username
        },
        dataType: 'json',
        success: function(r)
        {
            if(r.exists) {
            	if(failure) {
                	failure(r);
                } else {
	                b.ui.showOverlayAlert(b.l.get('JS_AUTH_USERNAME_IN_USE_ERROR'));
                }
            } else {
            	if(success) {
                	success(r);
                }
            }
        }
    });
    return true;
}

b.auth.checkEmail = function(email, success, failure)
{
    if(!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email))) {
        return false;
    }
    b.ajax(
    {
        data: {
            controller: 'auth',
            action: 'checkEmail',
            email: email
        },
        dataType: 'json',
        success: function(r)
        {
            if(r.exists) {
            	if(failure) {
                	failure(r);
                } else {
	                b.ui.showOverlayAlert(b.l.get('JS_AUTH_EMAIL_IN_USE_ERROR'));
                }
            } else {
            	if(success) {
                	success(r);
                }
            }
        }
    });
    return true;
}

b.auth.checkPassword = function(passw, ignoreEmpty)
{
    if(passw == '') {
    	if(ignoreEmpty) {
    		return true;
    	}
    	return false;
    }
    if(passw.length < 6) {
    	return false;
    }
    return true;
}

b.auth.checkBirthDate = function(selectedDay, selectedMonth, selectedYear, minBirth, hardCheck)
{
	if(selectedDay != 0 && selectedMonth != 0 && selectedYear != 0) {
		var maxMonths = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if(selectedDay > maxMonths[selectedMonth - 1]) {
			return false;
		} else {
			var now = new Date();
		    var past = new Date(selectedYear, selectedMonth, selectedDay);
		    var nowYear = now.getFullYear();
		    var pastYear = past.getFullYear();
		    var age = nowYear - pastYear;
		    return age >= minBirth;
		}
	} else {
		return false;
	}
}

// STANDARD LOGIN

b.auth.login = function(credential, passw, success, failure, extension, site, connectType, connectId)
{
    if(credential == '' || passw == '') {
	    b.ui.showOverlayAlert(b.l.get('JS_AUTH_EMPTY_LOGIN_ERROR'));
	    return;
    }
    var data = {
        controller: 'auth',
        action: 'authenticate',
        type: 'standard',
        credential: credential,
        password: passw
    };
    if(extension) {
    	data.extension = extension;
    }
    if(site) {
	    data.site = site;
    }
    if(connectType && connectId) {
    	data.connectType = connectType;
    	data.connectId = connectId;
    }
    b.ajax(
    {
        data: data,
        dataType: 'json',
        success: function(r)
        {
            if(r.success) {
            	if(success) {
                	success(r);
                } else {
	                window.location.reload();
                }
            } else {
            	if(failure) {
            		failure(r);
            	} else {
	            	b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR'));
            	}
            }
        }
    });
}

// Password Remind

b.auth.passwordRemind = function(credential, success, failure, extension, site)
{
	if(credential == '') {
	    b.ui.showOverlayAlert(b.l.get('JS_AUTH_EMPTY_LOGIN_ERROR'));
	    return;
    }
	var data = {
        controller: 'auth',
        action: 'passwordRemind',
        credential: credential
    };
    if(extension) {
    	data.extension = extension;
    }
    if(site) {
	    data.site = site;
    }
    b.ajax(
    {
        data: data,
        dataType: 'json',
        success: function(r)
        {
            if(r.success) {
            	if(success) {
                	success(r);
                } else {
	                b.ui.showOverlaySuccess(b.l.get('JS_AUTH_ACTIVATION_SENT_SUCCESS'));
                }
            } else {
            	if(failure) {
	                failure(r);
                } else {
	                b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR'));
                }
            }
        }
    });
}

// Resend Activation

b.auth.resendActivation = function(credential, success, failure, extension, site)
{
	if(credential == '') {
	    b.ui.showOverlayAlert(b.l.get('JS_AUTH_EMPTY_LOGIN_ERROR'));
	    return;
    }
	var data = {
        controller: 'auth',
        action: 'resendActivation',
        credential: credential
    };
    if(extension) {
    	data.extension = extension;
    }
    if(site) {
	    data.site = site;
    }
    b.ajax(
    {
        data: data,
        dataType: 'json',
        success: function(r)
        {
            if(r.success) {
            	if(success) {
                	success(r);
                } else {
	                b.ui.showOverlaySuccess(b.l.get('JS_AUTH_RESENT_ACTIVATION_SUCCESS'));
                }
            } else {
            	if(failure) {
	                failure(r);
                } else {
                	switch(r.error) {
                		case 'ALREADY_ACTIVATED':
                			b.ui.showOverlayAlert(b.l.get('JS_AUTH_ALREADY_ACTIVATED_ERROR'));
                		break;
	                	case 'USER_NOT_FOUND':
	                	default:
	                		b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR'));
	                	break;
                	}
                }
            }
        }
    });
}

// STANDARD REGISTRATION

b.auth.register = function(datas, success, failure, extension, site, connectType, connectId)
{
    var data = {
        controller: 'auth',
        action: 'register'
    };
    for(var i in datas) {
	    data[i] = datas[i];
    }
    if(extension) {
    	data.extension = extension;
    }
    if(site) {
	    data.site = site;
    }
    if(connectType && connectId) {
    	switch(connectType) {
    		case 'facebook':
    			data.fuid = connectId;
    		break;
    		case 'twitter':
    			data.twid = connectId;
    		break;
    	}
    	if($('#firstName').length > 0) {
    		data.firstName = $('#firstName').val();
    	}
    	if($('#lastName').length > 0) {
    		data.lastName = $('#lastName').val();
    	}
    	if($('#city').length > 0) {
    		data.city = $('#city').val();
    	}
    	if($('#description').length > 0) {
    		data.description = $('#description').val();
    	}
    }
    data.newsletter = 1;
    b.ajax(
    {
        data: data,
        dataType: 'json',
        success: function(r)
        {
            if(r.success) {
            	if(success) {
                	success(r);
                } else {
                	if(r.needActivation) {
	                	b.ui.showOverlaySuccess(b.l.get('JS_AUTH_REGISTRATION_SUCCESSFUL_GENERIC'));
                	} else {
	                	window.location.reload();
                	}
                }
            } else {
            	if(failure) {
                	failure(r);
                } else {
	                b.ui.showOverlayAlert(b.l.get('JS_AUTH_REGISTRATION_FAILED_GENERIC'));
                }
            }
        }
    });
}

// FACEBOOK

b.auth.facebook = {};

b.auth.facebook.success;
b.auth.facebook.failure;

b.auth.facebook.init = function(callback)
{
	if(typeof FB != undefined) {
	    FB.login(function(response) {
	    	if(response.authResponse) {
	        	callback( response.authResponse );
	        }
	    },{scope:'email'});
    }
};

b.auth.facebook.login = function(success, failure, autoRegister, extension, site)
{
    b.auth.facebook.success = success || function() { window.location.reload(); };
    b.auth.facebook.failure = failure || function() { b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR')); };
    b.auth.facebook.init(function(authResponse) {
        FB.api('/me',function(user) {
			if(!user.error) {
				var data = {
                    controller: 'auth',
	                action: 'authenticate',
	                type: 'facebook',
	                accessToken: authResponse.accessToken,
                    user: user
                };
                if(typeof autoRegister != 'undefined') {
                	data.autoRegister = autoRegister;
                }
                if(typeof extension != 'undefined') {
	                data.extension = extension;
                }
                if(typeof site != 'undefined') {
	                data.site = site;
                }
				b.ajax(
                {
                    data: data,
                    dataType: 'json',
                    success: function(r)
			        {
			            if(r.success) {
			            	b.auth.facebook.success(r);
			            } else {
			            	b.auth.facebook.failure(r);
			            }
			        }
			    });
		    } else {
		    	failure();
		    }
	    });
    });
};

// TWITTER

b.auth.twitter = {};

b.auth.twitter.login = function(success, failure, autoRegister, successUrl, failureUrl, extension, site)
{
	var data = {
		controller: 'auth',
        action: 'authenticate',
        type: 'twitter'
	};
	if(typeof autoRegister !== 'undefined') {
		data.autoRegister = autoRegister;
	}
	if(typeof successUrl !== 'undefined') {
		data.successUrl = successUrl;
	}
	if(typeof failureUrl !== 'undefined') {
		data.failureUrl = failureUrl;
	}
	if(typeof extension != 'undefined') {
        data.extension = extension;
    }
    if(typeof site != 'undefined') {
        data.site = site;
    }
	b.ajax({
		data: data,
		dataType: 'json',
		success: function(r) {
			if(r.success) {
				if(r.redirect_url) {
					if(r.success) {
						if(success) {
							success(r);
						} else {
							window.location.reload();
						}
					} else {
						if(failure) {
							failure(r);
						} else {
							b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR'));
						}
					}
				} else {
					if(failure) {
						failure(r);
					} else {
						b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR'));
					}
				}
			} else {
				if(failure) {
					failure(r);
				} else {
					b.ui.showOverlayAlert(b.l.get('JS_AUTH_GENERIC_LOGIN_ERROR'));
				}
			}
		}
	});
};

// Twitter list

b.auth.retrieveTwitter = function(success, failure)
{
	b.ajax({
		data: {
			controller: 'auth',
			action: 'retrieve_twitter_list'
		},
		dataType: 'json',
		success: function(r)
		{
			if(r.success) {
				success(r);
			} else {
				failure(r);
			}
		}
	});
}

// Instagram list

b.auth.retrieveInstagram = function(success, failure, user)
{
	var data = {
		controller: 'auth',
		action: 'retrieve_instagram_list'
	};
	if(user) {
		data.user = user;
	}
	b.ajax({
		data: data,
		dataType: 'json',
		success: function(r)
		{
			if(r.success) {
				success(r);
			} else {
				failure(r);
			}
		}
	});
}

// LOGOUT

b.auth.logout = function(callback)
{
	b.ajax(
    {
        data: {
            controller: 'auth',
            action: 'logout'
        },
        success: function()
        {
            if(callback) {
            	callback();
            } else {
            	window.location = b.baseUrl;
            }
        }
    });
}
