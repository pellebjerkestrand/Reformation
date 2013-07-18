Reformation
===========

Simple responsive jQuery content gallery

Usage
-----

$('.viewport').reform([options]);


Options
-------

Options is optional. Defaults are as follows:

```javascript
{
  gallery: '.gallery',
  slide: '.slide',
  next: '.next',
  prev: '.prev',
  ratio: 1,
  enableControls: true,
  controls: '.controls',
  auto: false,
  speed: 6000,
  onLoad: function(){},
  onBefore: function(){},
  onAfter: function(){},
  onNext: function(){},
  onPrev: function(){}
}
```

Callbacks
---------

All the callbacks are passed the current slide and the current slide's index like so:

```javascript
onLoad($currentSlide, currentIndex);
```

Their names are self explanatory (I hope).

HTML
----

Reformation wants your HTML to be structured like this.

```html
<div class="viewport">
  <div class="gallery">
    <div class="slide">
      <div class="content">
        <!-- Slide content goes in here -->
      </div>
    </div>
  </div>
  <div class="controls">
    <button class="control prev">prev</button>
    <button class="control next">next</button>
  </div>
</div>
```

Divitis is uncool, but used here just to illustrate structure. Please use semantic elements if possible.

Public Functions
----------------

```javascript
var reformed = $(viewport).reform();

reformed.next();    // Shows the next slide
reformed.prev();    // Shows the previous slide
reformed.show(3);   // Shows the slide number matching the index provided
reformed.current(); // Returns the current index
reformed.slide(3);  // Returns the slide object matching the index provided
```