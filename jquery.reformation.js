/**
 *  jQuery Reformation v0.1
 *  Simple responsive image gallery plugin
 *  Named after Kiuas' Reformation - http://en.wikipedia.org/wiki/Reformation_(Kiuas_album)
 *
 *  Copyright 2013 Pelle Bjerkestrand - http://pellebjerkestrand.net/
 */

;(function($){
    'use strict';

    $.fn.reform = function(options){
        if(this.length === 0) {
            return this;
        }

        if(this.length > 1){
            this.each(function(){
                $(this).reform(options);
            });

            return this;
        }

        var $this = this;

        var defaults = {
            // General
            gallery: '.gallery',
            slide: '.slide',
            next: '.next',
            prev: '.prev',

            // Variables
            ratio: 1,

            // Controls
            enableControls: true,
            controls: '.controls',

            // Auto
            auto: false,
            speed: 6000,

            // Callbacks
            onLoad: function(){},
            onBefore: function(){},
            onAfter: function(){},
            onNext: function(){},
            onPrev: function(){}
        };

        var app = {
            settings: {

            },
            elements: {
                viewport: null,
                gallery: null,
                slides: null,
                controls: null,
                contents: null
            },
            current: 0,
            clickNext: function(){
                if(app.autoInterval){
                    clearInterval(app.autoInterval);
                }
                app.next();
            },
            clickPrev: function(){
                if(app.autoInterval){
                    clearInterval(app.autoInterval);
                }
                app.prev();
            },
            next: function(){
                app.settings.onNext(app.elements.slides.eq(app.current), app.current);
                var next = app.current + 1;
                app.show(next >= app.elements.slides.length ? 0 : next);
            },
            prev: function(){
                app.settings.onPrev(app.elements.slides.eq(app.current), app.current);
                var prev = app.current - 1;
                app.show(prev <= -1 ? app.elements.slides.length - 1 : prev);
            },
            show: function(index){
                app.settings.onBefore(app.elements.slides.eq(app.current), app.current);

                var $target = app.elements.slides.eq(index).css({
                    opacity: 1,
                    'z-index': 2
                });

                app.elements.slides.not($target).css({
                    opacity: 0,
                    'z-index': 1
                });

                app.current = index;

                app.settings.onAfter(app.elements.slides.eq(app.current), app.current);
            },
            centerContent: function(){
                var windowH = app.elements.gallery.height(),
                    windowW = app.elements.gallery.width(),
                    windowR = windowW / windowH;

                if(windowR === app.settings.ratio){
                    //No op: image is a perfect fit
                } else if(windowR < app.settings.ratio){
                    //Content is shorter than window
                    var widthToSet = windowH * app.settings.ratio;

                    app.elements.contents.css({
                        'margin-top': 0,
                        'margin-left': '-' + ((widthToSet - windowW) / 2) + 'px',
                        height: windowH,
                        width: widthToSet
                    });
                } else {
                    //Content is taller than window
                    var heightToSet = windowW * app.settings.ratio;

                    app.elements.contents.css({
                        'margin-top': '-' + ((heightToSet - windowH) / 2) + 'px',
                        'margin-left': 0,
                        height: heightToSet,
                        width: windowW
                    });
                }
            },
            setInitialStyles: function(){
                app.elements.slides.css({
                    display: 'block',
                    margin: 0,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    top: 0,
                    transition: 'opacity 1.5s ease-in-out'
                });

                app.elements.viewport.css({
                    height: '100%',
                    position: 'relative'
                });

                app.elements.gallery.css({
                    bottom: 0,
                    left: 0,
                    overflow: 'hidden',
                    position: 'absolute',
                    right: 0,
                    top: 0
                });
            },
            bindControls: function(){
                if(app.settings.enableControls){
                    app.elements.controls = app.elements.viewport.find(app.settings.controls);

                    app.elements.controls.find(app.settings.next).off('click').on('click', function(e){
                        app.clickNext();
                        e.preventDefault();
                    });

                    app.elements.controls.find(app.settings.prev).off('click').on('click', function(e){
                        app.clickPrev();
                        e.preventDefault();
                    });
                }
            },
            startAuto: function(){
                if(app.settings.auto && !app.autoInterval) {
                    app.autoInterval = setInterval(function(){
                        app.next();
                    }, app.settings.speed);
                }
            },
            autoInterval: null,
            init: function(){
                if(!app.elements.slides){
                    $.extend(app.settings, defaults, options);

                    app.elements.viewport = $this;
                    app.elements.gallery = app.elements.viewport.find(app.settings.gallery);
                    app.elements.slides = app.elements.viewport.find(app.settings.slide);
                    app.elements.contents = app.elements.slides.children();

                    app.bindControls();
                    app.setInitialStyles();
                    app.show(app.current);
                    app.centerContent();
                    app.startAuto();

                    $(window).bind('resize', function(){
                        app.centerContent();
                    });

                    app.settings.onLoad(app.elements.slides.eq(app.current), app.current);
                }
            }
        };

        $this.next = function(){
            app.next();
        };

        $this.prev = function(){
            app.prev();
        };

        $this.show = function(index){
            app.show(index);
        };

        $this.current = function(){
            return app.current;
        };

        $this.slide = function(index){
            return app.slides.eq(index);
        };

        app.init();

        return $this;
    };
})(jQuery);