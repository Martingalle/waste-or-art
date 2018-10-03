jQuery.namespace('pof.labs.ui');



pof.labs.ui.resize = function()
{
	$('#game-wrapper').css('height', $(window).height() + 'px');
	$('#game').css('height', $(window).height() + 'px');
}


// on détermine les variables minuimum : le score, le numéro du slides, le nombre de slides ?
pof.labs.ui.score = 0;
pof.labs.ui.slide = -1;
pof.labs.ui.slides = null;


// Je crée la fonction start
pof.labs.ui.start = function()
{
	$('#game-wrapper').removeClass('finished').removeClass('intro').addClass('started');
  //je lance le jeu
	pof.labs.ui.next();
}

// Je détermine une fonction answer qui prend le paramètre "answer", soient "art" ou "waste"
pof.labs.ui.answer = function(answer)
{
  // si la classe "Game Buttons" a déjà la classe Answer alors... on s'en va
	if($('#game-buttons').hasClass('answered')) {
		return;
	}
	$('#game-buttons').addClass('answered');
	$('#game-buttons .button-answer').hide();

  // Le mot "art" ou "fasion" apparait en grand
	$('#'+answer+'-button, #'+pof.labs.ui.slides[pof.labs.ui.slide].answer.toLowerCase()).show();
	// j'ajoute la réponse en photo avec le bon resultat
  $('#game').css('background-image', 'url('+b.imagespath+'/photos/'+pof.labs.ui.slides[pof.labs.ui.slide].photo+')');
	// si la réponse est égale à la bonne réponse, alors je met le bouton Next et
  // je mets le timeout à 2,5 s au cas où la personne n'apui
  // sinon je fais faire le horn immonde, puis je set le timout pour le timeout
  if(answer.toUpperCase() == pof.labs.ui.slides[pof.labs.ui.slide].answer) {
		$('.result').addClass('success').removeClass('failure');
		pof.labs.ui.score = pof.labs.ui.score + 1;
		$('#next').show();
		// pof.labs.ui.nextTimeout = setTimeout('pof.labs.ui.next()', 2500);
	} else {
		$('.result').removeClass('success').addClass('failure');
    // joue horn si c'est faux
		var horn = new Audio();
		horn.src = b.assetspath+'/extensions/labs/sites/pof/audio/air-horn-2'+(b.isSafari || b.isIE ? '.mp3' : '.ogg');
		horn.play();
    // 2,5 secondes de répis avant d'aller voir la fonction finish
		pof.labs.ui.nextTimeout = setTimeout('pof.labs.ui.finish()', 2500);
	}
}

pof.labs.ui.nextTimeout = null;

pof.labs.ui.next = function()
{
	if(pof.labs.ui.slide + 1 == pof.labs.ui.slides.length) {
		pof.labs.ui.finish();
		return;
	}
	clearTimeout(pof.labs.ui.nextTimeout);
  // on fait avancer d'1 slide
	pof.labs.ui.slide = pof.labs.ui.slide + 1;
	$('#slide').html(pof.labs.ui.slide + 1);
	$('#game-buttons').removeClass('answered');
	$('#game-buttons .button-answer').show();
	$('#next').hide();
	$('.result').hide();
	$('#game').css('background-image', 'url('+b.imagespath+'/photos/'+pof.labs.ui.slides[pof.labs.ui.slide].covered+')');
	$('#preloader').attr('src', b.imagespath+'/photos/'+pof.labs.ui.slides[pof.labs.ui.slide].photo);
}

pof.labs.ui.finish = function()
{
	clearTimeout(pof.labs.ui.nextTimeout);
	$('#loader').hide();
	$('#game-wrapper').removeClass('started').removeClass('intro').addClass('finished');
	if(pof.labs.ui.score == pof.labs.ui.slides.length) {
		$('#game').addClass('winner');
	}
	$('#score').html(pof.labs.ui.score);
	$('.score').hide();
	if(pof.labs.ui.score <= Math.round(pof.labs.ui.slides.length * 0.3)) {
		$('#score-1').show();
	} else if(pof.labs.ui.score <= Math.round(pof.labs.ui.slides.length * 0.7)) {
		$('#score-2').show();
	} else {
		$('#score-3').show();
	}
	$('.result').hide();
	if(typeof FB !== 'undefined') {
		FB.Event.subscribe('edge.create', function(targetUrl) {
			_gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
		});
	}
}

// la fonction restart, fait juste reloader la page pour recommencer
pof.labs.ui.restart = function()
{
	window.location.reload();
}

pof.labs.ui.share = function(url)
{
	window.open(url,'','width=500,height=300');
}



pof.labs.ui.shuffle = function(array)
{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



$(document).ready(function()
{
	$(window).resize(pof.labs.ui.resize);
	pof.labs.ui.resize();

	pof.labs.ui.slides = pof.labs.ui.shuffle(_preloadedSlides);
});
