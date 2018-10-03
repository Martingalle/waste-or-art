jQuery.namespace('b.l');

b.l.get = function(arg1, arg2, arg3, arg4)
{
	if(!arg1) {
		return false;
	}
	var code = arg1;
	var forcedLanguage, search, replace, language;
	if(arg2 && !arg3) {
		forcedLanguage = arg2;
	}
	if(arg2 && arg3) {
		search = arg2;
		replace = arg3;
	}
	if(arg4) {
		forcedLanguage = arg4;
	}
	if(forcedLanguage) {
		language = forcedLanguage;
	} else {
		language = b.language;
	}
	if(typeof b.l.translations[language] == 'undefined') {
		return b.l.get(arg1, arg2, arg3, b.defaultLanguage);
	}
	var text = b.l.translations[language][code];
	if(typeof text == 'undefined') {
		if(b.debug == 1) {
			$('#debug-no-errors').remove();
			$('#debugTranslationsTemplate').tmpl({code: code}).prependTo('#debug');
		}
		if(language != b.defaultLanguage) {
			return b.l.get(arg1, arg2, arg3, b.defaultLanguage);
		}
		return arg1;
	}
	
	if(search && replace) {
		var sarray = [];
		var rarray = [];
		if($.isArray(search)) {
			sarray = search;
		} else {
			sarray.push(search);
		}
		if($.isArray(replace)) {
			rarray = replace;
		} else {
			rarray.push(replace);
		}
		for(var index in sarray) {
			if(rarray[index]) {
				text = text.replace(sarray[index], rarray[index]);
			}
		}
	}
	
	return text;
}
