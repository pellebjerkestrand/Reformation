Reformation
===========

Simple responsive jQuery content gallery that centers the content and crops it equally either top/bottom or left/right based on the wanted display ratio.

Usage
-----

```javascript
$('.viewport').reform([options]);
```

Default Options
---------------

```javascript
{
  gallery: '.gallery',
  slide: '.slide',
  next: '.next',
  prev: '.prev',
  title: '.title',
  desc: '.desc',
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
onLoad($currentSlide, currentIndex);    // Called after the initialization is finished
onBefore($currentSlide, currentIndex);  // Called before each slide switch
onAfter($currentSlide, currentIndex);   // Called after each slide switch
onNext($currentSlide, currentIndex);    // Called before switching to next slide
onPrev($currentSlide, currentIndex);    // Called before switching to previous slide
```

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
  <!-- Controls are optional -->
  <div class="controls">
    <button class="control prev">prev</button>
    <a class="url"> <!-- URL is optional -->
      <h1 class="title"></h1> <!-- Title is optional -->
      <h2 class="desc"></h2> <!-- Description is optional -->
    </a>
    <button class="control next">next</button>
  </div>
</div>
```

Divitis is uncool, but used here just to illustrate structure. Please use semantic elements if possible.

Data Attributes
---------------

These will be used if present on a slide element and enableControls is true.

```javascript
[data-reformation-url]          // URL to whatever you want
[data-reformation-title]        // The title of the slide
[data-reformation-description]  // The slide's description
```

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