$(document).ready(function() {
	ScaleHandler.init();
	$('.fret-dot-container').click(function(event) {
		var fret = $(this).attr('data-fret');
		ScaleHandler.paintNoteDot(fret);
	});
	$('.items-escala').click(function(event) {
		scaleMode = $(this).attr('data-escala');
		$('.items-escala').removeClass('active');
		$(this).addClass('active');
		var escala = ScaleHandler.updateScale(scaleMode, null);
		$('#escala').html('Escala: ' + $(this).attr('data-name-escala') + '<span id="tonalidad"></span>' + '<span id="notes-list"></span>');
		$('#pattern').html(escala.pattern);
		if(escala.key){
			$('#tonalidad').html(' ' + escala.key);
		}
		$('.card').css('visibility', 'visible');
		ScaleHandler.clearFretboard();
		checkButtonsState();
	});
	$('.items-tonalidad').click(function(event) {
		$('.items-tonalidad').removeClass('active');
		$(this).addClass('active');
		key = $(this).attr('data-tonalidad');
		$('#tonalidad').html(' ' + key);
		$('#notes-list').html('');
		$('#view-notes-btn').show();
		$('#mark-notes-btn').show();
		ScaleHandler.updateScale(null, key);
		checkButtonsState();		
	});
	$('#view-notes-btn').click(function(event) {
		$(this).toggleClass('active');
		var notes = ScaleHandler.getCurrentScale().notes;
		if($(this).hasClass('active') && notes){
			$('#notes-list').html('/&nbsp;&nbsp;&nbsp;' + notes.join(", "));
		}else{
			$('#notes-list').html('');
		}
	});
	$('#mark-notes-btn').click(function(event) {
		ScaleHandler.clearFretboard();
		$(this).toggleClass('active');
		var notes = ScaleHandler.getCurrentScale().notes;
		if($(this).hasClass('active') && notes){
			$(".fret-dot").each(function(index, el) {
				var fret = $(el).attr('data-fret');
				var note = $(el).attr('data-note').split("/");
				if(notes.indexOf(note[0]) >= 0){
					ScaleHandler.paintNoteDot(fret);								
				}else if(notes.length > 0 && notes.indexOf(note[1]) >= 0){
					ScaleHandler.paintNoteDot(fret);								
				}

			});
		}else{
			ScaleHandler.clearFretboard();
		}
	});
	localizeSite();
});

function checkButtonsState(){
	if(!$('#mark-notes-btn').hasClass('active')){
		ScaleHandler.clearFretboard();
	}
	if($('#view-notes-btn').hasClass('active')){
		$('#view-notes-btn').removeClass('active');
		$('#view-notes-btn').trigger('click');
	}
	if($('#mark-notes-btn').hasClass('active')){
		$('#mark-notes-btn').removeClass('active');
		$('#mark-notes-btn').trigger('click');
	}
}

function localizeSite(){
	$('#nav-brand').html(l("%title"));
	$('#dropdown-scales').html(l("%dropdown_scales"));
	$('#dropdown-tonalidad').html(l("%dropdown_keys"));
	$('a[data-escala="Mayor"]').html(l("%mode_ionian"));
	$('a[data-escala="Menor"]').html(l("%mode_aeolian"));
	$('a[data-escala="PentaMayor"]').html(l("%major_pentatonic"));
	$('a[data-escala="PentaMenor"]').html(l("%minor_pentatonic"));
	$('#mark-notes-btn').html(l("%set_notes_btn"));
	$('#view-notes-btn').html(l("%view_notes_btn"));

}

var l = function (string) {
    return string.toLocaleString();
};