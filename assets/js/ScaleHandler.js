var ScaleHandler = (function() {
    var CORRECT_NOTE_COLOR = "#8BC34A";
    var WRONG_NOTE_COLOR = "red";
    var ROOT_NOTE_COLOR = "#8BC34A";
    var notesDots;
    var scales = {
        Mayor: {
            pattern: 'T-T-S-T-T-T-S',
            'C': ['C','D','E','F','G','A','B','C'],
            'D': ['D','E','F#','G','A','B','C#','D'],
            'E': ['E','F#','G#','A','B','C#','D#','E'],
            'F': ['F','G','A','Bb','C','D','E','F'],
            'G': ['G','A','B','C','D','E','F#','G'],
            'A': ['A','B','C#','D','E','F#','G#','A'],
            'B': ['B','C#','D#','E','F#','G#','A#','B']
        },
        Menor: {
            pattern: 'T-S-T-T-S-T-T',
            'C': ['C','D','Eb','F','G','Ab','Bb','C'],
            'D': ['D','E','F','G','A','Bb','C','D'],
            'E': ['E','F#','G','A','B','C','D','E'],
            'F': ['F','G','Ab','Bb','C','Db','Eb','F'],
            'G': ['G','A','Bb','C','D','Eb','F','G'],
            'A': ['A','B','C','D','E','F','G','A'],
            'B': ['B','C#','D','E','F#','G','A','B']    
        },
        PentaMayor:{
            pattern: 'T-T-TS-T-TS',
            'C': ['C','D','E','G','A'],
            'D': ['D','E','F#','A','B'],
            'E': ['E','F#','G#','B','C#'],
            'F': ['F','G','A','C','D'],
            'G': ['G','A','B','D','E'],
            'A': ['A','B','C#','E','F#'],
            'B': ['B','C#','D#','F#','G#']  
        },
        PentaMenor:{
            pattern: 'TS-T-T-TS-T',
            'C': ['C','D#','F','G','A#'],
            'D': ['D','F','G','A','C'],
            'E': ['E','G','A','B','D'],
            'F': ['F','G#','A#','C','D#'],
            'G': ['G','A#','C','D','F'],
            'A': ['A','C','D','E','G'],
            'B': ['B','D','E','F#','A'] 
        }
    };

    var currentScale = {
        notes: null,
        key: null,
        tone: null,
        scaleMode: null
    };

    var init = function(){
        notesDots = $('.fret-dot');
        notesDots.each(function(index, el) {
            $(this).html($(this).attr('data-note'));
        });
    };

    var updateScale = function(scaleMode, key){
        if(scaleMode){
            currentScale.scaleMode = scaleMode;
            currentScale.notes = scales[scaleMode][currentScale.key];
            currentScale.pattern = scales[scaleMode].pattern;
        }
        if(currentScale.scaleMode && key){
            currentScale.notes = scales[currentScale.scaleMode][key];        
        }
        if(key){
            currentScale.key = key;
        }
        return currentScale;
    };

    var paintNoteDot = function(fret){
        var el = $('span[data-fret="'+fret+'"]');
        var note = el.attr('data-note');
        el.toggle();
        if(currentScale.notes){
            for (var i = 0; i < currentScale.notes.length; i++) {
                if(currentScale.notes[i] === note){
                    if(currentScale.key === note){
                        el.css('background-color', ROOT_NOTE_COLOR);
                    }else{
                        el.css('background-color', CORRECT_NOTE_COLOR);
                    }
                    return true;
                }
            }
            el.css('background-color', WRONG_NOTE_COLOR);
            _animatedot(el);
        }else{
            el.css('background-color', CORRECT_NOTE_COLOR);
        }
    };

    var getCurrentScale = function(){
        return $.extend(true, {}, currentScale);
    };

    var _animatedot = function(el){
        setTimeout(function(){
            el.animate({opacity: 0}, 'slow', function(){
                el.hide();
                el.css('opacity', 1);
            });

        },500);
    };

    var clearFretboard = function(){
        notesDots.hide();
    };

    return {
        init: init,
        updateScale: updateScale,
        paintNoteDot: paintNoteDot,
        getCurrentScale: getCurrentScale,
        clearFretboard: clearFretboard
    };
})();