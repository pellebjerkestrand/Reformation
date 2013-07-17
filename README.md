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
  controls: '.controls',
  onLoad: function(){},
  onBefore: function(){},
  onAfter: function(){},
  onNext: function(){},
  onPrev: function(){}
}
```

HTML
----

Reformation wants your HTML to be structured like this

* viewport
  * gallery
    * slide
  * controls