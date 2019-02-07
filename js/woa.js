jQuery.namespace('woa');



woa.resize = function()
{
	$('#game-wrapper').css('height', $(window).height() + 'px');
	$('#game').css('height', $(window).height() + 'px');
}


// on détermine les variables minuimum : le score, le numéro du slides, le nombre de slides ?
woa.score = 0;
woa.slide = -1;
woa.slides = null;


// Je crée la fonction start
woa.start = function()
{
	$('#game-wrapper').removeClass('finished').removeClass('intro').addClass('started');
  //je lance le jeu
	woa.next();
}

// Je détermine une fonction answer qui prend le paramètre "answer", soient "art" ou "waste"
woa.answer = function(answer)
{
  // si la classe "Game Buttons" a déjà la classe Answer alors... on s'en va
	if($('#game-buttons').hasClass('answered')) {
		return;
	}
	//ajoute une classe à game-buttons pour changer le css des 2 boutons de réponse
  $('#game-buttons').addClass('answered');
  // on chache les classes des 2 boutons de réponses
	$('#game-buttons .button-answer').hide();
  // on fait apparaitre
  // 1 le bon bouton de réponse (caché juste avant)
  // 2 le bouton next, la div de lien sur l'image, le bouton finish
  // 4 le mot "art" ou "waste" en grand + bandeau de soulignement
	$('#'+answer+'-button, #next, #cible, #'+answer+'-finish, #'+woa.slides[woa.slide].answer.toLowerCase()).show();

	// j'ajoute le lien sous la photo
  document.querySelector('#cible').innerHTML = `<a href=${woa.slides[woa.slide].cible} target="_blank">${woa.slides[woa.slide].name}</a>`
  // j'ajoute la photo de réponse en entieren css
  $('#game').css('background-image', 'url('+b.imagespath+'/images/'+woa.slides[woa.slide].photo+')');
	// si la réponse est la bonne, alors je fais apparaitre le bouton Next et
  // je mets le timeout à 2,5 s au cas où la personne n'apui
  // sinon je fais faire le horn immonde, puis je set le timout pour le timeout
  if(answer.toUpperCase() == woa.slides[woa.slide].answer) {
    //je donne la couleur à la div result (vert ou rouge)
		$('.result').addClass('success').removeClass('failure');
    var horn = new Audio();
    horn.src = 'http://www.pacdv.com/sounds/voices/woohoo.wav';
    horn.play();
		woa.score = woa.score + 1;
		// Timeout pour prochaine image, woa.nextTimeout = setTimeout('woa.next()', 2500);
	} else {
    //je donne la couleur à la div result (vert ou rouge)
		$('.result').removeClass('success').addClass('failure');
    var horn = new Audio();
    horn.src = 'images/wrong-buzzer.ogg'
    horn.play();
    // 3,5 secondes de répis avant d'aller voir la fonction finish
		// Timeout pour prochaine image, woa.nextTimeout = setTimeout('woa.next()', 2500);
    woa.score = woa.score;
	}
}

woa.nextTimeout = null;

//fonctionnnement de la fonction next
woa.next = function()
{
  // si le slide est egal au nombre d'images, alors on va vers la fonction finish
	if(woa.slide + 1 == woa.slides.length) {
		woa.finish();
		return;
	}
	clearTimeout(woa.nextTimeout);
  // sinon on fait avancer d'1 slide
	woa.slide = woa.slide + 1;
	$('#slide').html(woa.slide + 1);
	$('#game-buttons').removeClass('answered');
	$('#game-buttons .button-answer').show();
	$('#next, #cible, #art-finish, #waste-finish').hide();
	$('.result').hide();
  // l'image de fond change et redevient l'image avec un seul element montré
	$('#game').css('background-image', 'url('+b.imagespath+'/images/'+woa.slides[woa.slide].covered+')');
	$('#preloader').attr('src', b.imagespath+'/images/'+woa.slides[woa.slide].photo);
}

woa.finish = function()
{
	clearTimeout(woa.nextTimeout);
	$('#loader').hide();
	$('#game-wrapper').removeClass('started').removeClass('intro').addClass('finished');
	if(woa.score == woa.slides.length) {
		$('#game').addClass('winner');
	}
	$('#score').html(woa.score);
	$('.score').hide();
	if(woa.score <= Math.round(woa.slides.length * 0.3)) {
		$('#score-1').show();
	} else if(woa.score <= Math.round(woa.slides.length * 0.7)) {
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
woa.restart = function()
{
	window.location.reload();
}

woa.share = function(url)
{
	window.open(url,'','width=500,height=300');
}



woa.shuffle = function(array)
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
	$(window).resize(woa.resize);
	woa.resize();

	woa.slides = woa.shuffle(_preloadedSlides);
});
