var ScaleHandler = (function() {
    var CORRECT_NOTE_COLOR = "#8BC34A";
    var WRONG_NOTE_COLOR = "red";
    var ROOT_NOTE_COLOR = "#FF9800";
    var notesDots;
    var scales = {
        Mayor: {
            pattern: 'T-T-S-T-T-T-S',
            'C': ['C','D','E','F','G','A','B'],
            'D': ['D','E','F#','G','A','B','C#'],
            'E': ['E','F#','G#','A','B','C#','D#'],
            'F': ['F','G','A','Bb','C','D','E'],
            'G': ['G','A','B','C','D','E','F#'],
            'A': ['A','B','C#','D','E','F#','G#'],
            'B': ['B','C#','D#','E','F#','G#','A#']
        },
        Menor: {
            pattern: 'T-S-T-T-S-T-T',
            'C': ['C','D','Eb','F','G','Ab','Bb'],
            'D': ['D','E','F','G','A','Bb','C'],
            'E': ['E','F#','G','A','B','C','D'],
            'F': ['F','G','Ab','Bb','C','Db','Eb'],
            'G': ['G','A','Bb','C','D','Eb','F'],
            'A': ['A','B','C','D','E','F','G'],
            'B': ['B','C#','D','E','F#','G','A']    
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
            'C': ['C','Eb','F','G','Bb'],
            'D': ['D','F','G','A','C'],
            'E': ['E','G','A','B','D'],
            'F': ['F','Ab','Bb','C','Eb'],
            'G': ['G','Bb','C','D','F'],
            'A': ['A','C','D','E','G'],
            'B': ['B','D','E','F#','A'] 
        },
        ArmonicaMenor: {
            pattern: 'T-S-T-T-S-TS-S',
            'C': ['C','D','Eb','F','G','Ab','B'],
            'D': ['D','E','F','G','A','Bb','C#'],
            'E': ['E','F#','G','A','B','C','D#'],
            'F': ['F','G','Ab','Bb','C','Db','E'],
            'G': ['G','A','Bb','C','D','Eb','F#'],
            'A': ['A','B','C','D','E','F','G#'],
            'B': ['B','C#','D','E','F#','G','A#'] 
        },
        MelodicaMenor: {
            pattern: 'T-ST-T-T-T-T-ST',
            'C': ['C','D','Eb','F','G','A','B'],
            'D': ['D','E','F','G','A','B','C#'],
            'E': ['E','F#','G','A','B','C#','D#'],
            'F': ['F','G','Ab','Bb','C','D','E'],
            'G': ['G','A','Bb','C','D','E','F#'],
            'A': ['A','B','C','D','E','F#','G#'],
            'B': ['B','C#','D','E','F#','G#','A#'] 
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
            $(this).html($(this).attr('data-note').split("/")[0]);
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

    var reset = function(){
        currentScale.key = null;
        currentScale.notes = null;
        currentScale.pattern = null;
        currentScale.scaleMode = null;
    };

    var paintNoteDot = function(fret){
        var el = $('span[data-fret="'+fret+'"]');
        var note = el.attr('data-note').split("/");
        el.toggle();
        if(currentScale.notes){
            for (var i = 0; i < currentScale.notes.length; i++) {
                if(note.indexOf(currentScale.notes[i]) >= 0){
                    if(note.indexOf(currentScale.key) >= 0){
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
        clearFretboard: clearFretboard,
        reset: reset
    };
})();