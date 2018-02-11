/**
 * Swiper 4.1.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 11, 2018
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Swiper = factory());
}(this, (function () { 'use strict';

/**
 * SSR Window 1.0.0
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2018, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: February 10, 2018
 */
var d;
if (typeof document === 'undefined') {
  d = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  };
} else {
  // eslint-disable-next-line
  d = document;
}

var doc = d;

var w;
if (typeof window === 'undefined') {
  w = {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  };
} else {
  // eslint-disable-next-line
  w = window;
}

var win = w;

/**
 * Dom7 2.0.2
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2018, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: February 10, 2018
 */
var Dom7 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $$1(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = doc.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [doc.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || doc).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === win || selector === doc) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7(arr);
}

$$1.fn = Dom7.prototype;
$$1.Class = Dom7;
$$1.Dom7 = Dom7;

function unique(arr) {
  var uniqueArray = [];
  for (var i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
  }
  return uniqueArray;
}
// Classes and attributes
function addClass(className) {
  var this$1 = this;

  if (typeof className === 'undefined') {
    return this;
  }
  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
    }
  }
  return this;
}
function removeClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
    }
  }
  return this;
}
function hasClass(className) {
  if (!this[0]) { return false; }
  return this[0].classList.contains(className);
}
function toggleClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
    }
  }
  return this;
}
function attr(attrs, value) {
  var arguments$1 = arguments;
  var this$1 = this;

  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) { return this[0].getAttribute(attrs); }
    return undefined;
  }

  // Set attrs
  for (var i = 0; i < this.length; i += 1) {
    if (arguments$1.length === 2) {
      // String
      this$1[i].setAttribute(attrs, value);
    } else {
      // Object
      // eslint-disable-next-line
      for (var attrName in attrs) {
        this$1[i][attrName] = attrs[attrName];
        this$1[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }
  return this;
}
// eslint-disable-next-line
function removeAttr(attr) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].removeAttribute(attr);
  }
  return this;
}
function data(key, value) {
  var this$1 = this;

  var el;
  if (typeof value === 'undefined') {
    el = this[0];
    // Get value
    if (el) {
      if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
        return el.dom7ElementDataStorage[key];
      }

      var dataKey = el.getAttribute(("data-" + key));
      if (dataKey) {
        return dataKey;
      }
      return undefined;
    }
    return undefined;
  }

  // Set value
  for (var i = 0; i < this.length; i += 1) {
    el = this$1[i];
    if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
    el.dom7ElementDataStorage[key] = value;
  }
  return this;
}
// Transforms
// eslint-disable-next-line
function transform(transform) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransform = transform;
    elStyle.transform = transform;
  }
  return this;
}
function transition(duration) {
  var this$1 = this;

  if (typeof duration !== 'string') {
    duration = duration + "ms"; // eslint-disable-line
  }
  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransitionDuration = duration;
    elStyle.transitionDuration = duration;
  }
  return this;
}
// Events
function on() {
  var this$1 = this;
  var assign;

  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  function handleLiveEvent(e) {
    var target = e.target;
    if (!target) { return; }
    var eventData = e.target.dom7EventData || [];
    eventData.unshift(e);
    if ($$1(target).is(targetSelector)) { listener.apply(target, eventData); }
    else {
      var parents = $$1(target).parents(); // eslint-disable-line
      for (var k = 0; k < parents.length; k += 1) {
        if ($$1(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
      }
    }
  }
  function handleEvent(e) {
    var eventData = e && e.target ? e.target.dom7EventData || [] : [];
    eventData.unshift(e);
    listener.apply(this, eventData);
  }
  var events = eventType.split(' ');
  var j;
  for (var i = 0; i < this.length; i += 1) {
    var el = this$1[i];
    if (!targetSelector) {
      for (j = 0; j < events.length; j += 1) {
        if (!el.dom7Listeners) { el.dom7Listeners = []; }
        el.dom7Listeners.push({
          type: eventType,
          listener: listener,
          proxyListener: handleEvent,
        });
        el.addEventListener(events[j], handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        if (!el.dom7LiveListeners) { el.dom7LiveListeners = []; }
        el.dom7LiveListeners.push({
          type: eventType,
          listener: listener,
          proxyListener: handleLiveEvent,
        });
        el.addEventListener(events[j], handleLiveEvent, capture);
      }
    }
  }
  return this;
}
function off() {
  var this$1 = this;
  var assign;

  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  var events = eventType.split(' ');
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var el = this$1[j];
      if (!targetSelector) {
        if (el.dom7Listeners) {
          for (var k = 0; k < el.dom7Listeners.length; k += 1) {
            if (listener) {
              if (el.dom7Listeners[k].listener === listener) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            } else if (el.dom7Listeners[k].type === events[i]) {
              el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
            }
          }
        }
      } else if (el.dom7LiveListeners) {
        for (var k$1 = 0; k$1 < el.dom7LiveListeners.length; k$1 += 1) {
          if (listener) {
            if (el.dom7LiveListeners[k$1].listener === listener) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
            }
          } else if (el.dom7LiveListeners[k$1].type === events[i]) {
            el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
          }
        }
      }
    }
  }
  return this;
}
function trigger() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var events = args[0].split(' ');
  var eventData = args[1];
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var evt = (void 0);
      try {
        evt = new win.CustomEvent(events[i], {
          detail: eventData,
          bubbles: true,
          cancelable: true,
        });
      } catch (e) {
        evt = doc.createEvent('Event');
        evt.initEvent(events[i], true, true);
        evt.detail = eventData;
      }
      // eslint-disable-next-line
      this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
      this$1[j].dispatchEvent(evt);
      this$1[j].dom7EventData = [];
      delete this$1[j].dom7EventData;
    }
  }
  return this;
}
function transitionEnd(callback) {
  var events = ['webkitTransitionEnd', 'transitionend'];
  var dom = this;
  var i;
  function fireCallBack(e) {
    /* jshint validthis:true */
    if (e.target !== this) { return; }
    callback.call(this, e);
    for (i = 0; i < events.length; i += 1) {
      dom.off(events[i], fireCallBack);
    }
  }
  if (callback) {
    for (i = 0; i < events.length; i += 1) {
      dom.on(events[i], fireCallBack);
    }
  }
  return this;
}
function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    var el = this[0];
    var box = el.getBoundingClientRect();
    var body = doc.body;
    var clientTop = el.clientTop || body.clientTop || 0;
    var clientLeft = el.clientLeft || body.clientLeft || 0;
    var scrollTop = el === win ? win.scrollY : el.scrollTop;
    var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
    return {
      top: (box.top + scrollTop) - clientTop,
      left: (box.left + scrollLeft) - clientLeft,
    };
  }

  return null;
}
function styles() {
  if (this[0]) { return win.getComputedStyle(this[0], null); }
  return {};
}
function css(props, value) {
  var this$1 = this;

  var i;
  if (arguments.length === 1) {
    if (typeof props === 'string') {
      if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
    } else {
      for (i = 0; i < this.length; i += 1) {
        // eslint-disable-next-line
        for (var prop in props) {
          this$1[i].style[prop] = props[prop];
        }
      }
      return this;
    }
  }
  if (arguments.length === 2 && typeof props === 'string') {
    for (i = 0; i < this.length; i += 1) {
      this$1[i].style[props] = value;
    }
    return this;
  }
  return this;
}

// Iterate over the collection passing elements to `callback`
function each(callback) {
  var this$1 = this;

  // Don't bother continuing without a callback
  if (!callback) { return this; }
  // Iterate over the current collection
  for (var i = 0; i < this.length; i += 1) {
    // If the callback returns false
    if (callback.call(this$1[i], i, this$1[i]) === false) {
      // End the loop early
      return this$1;
    }
  }
  // Return `this` to allow chained DOM operations
  return this;
}
// eslint-disable-next-line
function html(html) {
  var this$1 = this;

  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : undefined;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].innerHTML = html;
  }
  return this;
}
// eslint-disable-next-line
function text(text) {
  var this$1 = this;

  if (typeof text === 'undefined') {
    if (this[0]) {
      return this[0].textContent.trim();
    }
    return null;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].textContent = text;
  }
  return this;
}
function is(selector) {
  var el = this[0];
  var compareWith;
  var i;
  if (!el || typeof selector === 'undefined') { return false; }
  if (typeof selector === 'string') {
    if (el.matches) { return el.matches(selector); }
    else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
    else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

    compareWith = $$1(selector);
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) { return true; }
    }
    return false;
  } else if (selector === doc) { return el === doc; }
  else if (selector === win) { return el === win; }

  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) { return true; }
    }
    return false;
  }
  return false;
}
function index() {
  var child = this[0];
  var i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) { i += 1; }
    }
    return i;
  }
  return undefined;
}
// eslint-disable-next-line
function eq(index) {
  if (typeof index === 'undefined') { return this; }
  var length = this.length;
  var returnIndex;
  if (index > length - 1) {
    return new Dom7([]);
  }
  if (index < 0) {
    returnIndex = length + index;
    if (returnIndex < 0) { return new Dom7([]); }
    return new Dom7([this[returnIndex]]);
  }
  return new Dom7([this[index]]);
}
function append() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var newChild;

  for (var k = 0; k < args.length; k += 1) {
    newChild = args[k];
    for (var i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        while (tempDiv.firstChild) {
          this$1[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (var j = 0; j < newChild.length; j += 1) {
          this$1[i].appendChild(newChild[j]);
        }
      } else {
        this$1[i].appendChild(newChild);
      }
    }
  }

  return this;
}
 function prepend(newChild) {
  var this$1 = this;

  var i;
  var j;
  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === 'string') {
      var tempDiv = doc.createElement('div');
      tempDiv.innerHTML = newChild;
      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
      }
    } else {
      this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
    }
  }
  return this;
}
 function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $$1(this[0].nextElementSibling).is(selector)) {
        return new Dom7([this[0].nextElementSibling]);
      }
      return new Dom7([]);
    }

    if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function nextAll(selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.nextElementSibling) {
    var next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if ($$1(next).is(selector)) { nextEls.push(next); }
    } else { nextEls.push(next); }
    el = next;
  }
  return new Dom7(nextEls);
}
function prev(selector) {
  if (this.length > 0) {
    var el = this[0];
    if (selector) {
      if (el.previousElementSibling && $$1(el.previousElementSibling).is(selector)) {
        return new Dom7([el.previousElementSibling]);
      }
      return new Dom7([]);
    }

    if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function prevAll(selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if ($$1(prev).is(selector)) { prevEls.push(prev); }
    } else { prevEls.push(prev); }
    el = prev;
  }
  return new Dom7(prevEls);
}
function parent(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode !== null) {
      if (selector) {
        if ($$1(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
      } else {
        parents.push(this$1[i].parentNode);
      }
    }
  }
  return $$1(unique(parents));
}
function parents(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var parent = this$1[i].parentNode; // eslint-disable-line
    while (parent) {
      if (selector) {
        if ($$1(parent).is(selector)) { parents.push(parent); }
      } else {
        parents.push(parent);
      }
      parent = parent.parentNode;
    }
  }
  return $$1(unique(parents));
}
function closest(selector) {
  var closest = this; // eslint-disable-line
  if (typeof selector === 'undefined') {
    return new Dom7([]);
  }
  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }
  return closest;
}
function find(selector) {
  var this$1 = this;

  var foundElements = [];
  for (var i = 0; i < this.length; i += 1) {
    var found = this$1[i].querySelectorAll(selector);
    for (var j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }
  return new Dom7(foundElements);
}
function children(selector) {
  var this$1 = this;

  var children = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var childNodes = this$1[i].childNodes;

    for (var j = 0; j < childNodes.length; j += 1) {
      if (!selector) {
        if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
      } else if (childNodes[j].nodeType === 1 && $$1(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }
  return new Dom7(unique(children));
}
function remove() {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
  }
  return this;
}
function add() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dom = this;
  var i;
  var j;
  for (i = 0; i < args.length; i += 1) {
    var toAdd = $$1(args[i]);
    for (j = 0; j < toAdd.length; j += 1) {
      dom[dom.length] = toAdd[j];
      dom.length += 1;
    }
  }
  return dom;
}
var noTrigger = ('resize scroll').split(' ');

var Methods = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  toggleClass: toggleClass,
  attr: attr,
  removeAttr: removeAttr,
  data: data,
  transform: transform,
  transition: transition,
  on: on,
  off: off,
  trigger: trigger,
  transitionEnd: transitionEnd,
  outerWidth: outerWidth,
  outerHeight: outerHeight,
  offset: offset,
  css: css,
  each: each,
  html: html,
  text: text,
  is: is,
  index: index,
  eq: eq,
  append: append,
  prepend: prepend,
  next: next,
  nextAll: nextAll,
  prev: prev,
  prevAll: prevAll,
  parent: parent,
  parents: parents,
  closest: closest,
  find: find,
  children: children,
  remove: remove,
  add: add,
  styles: styles,
};

Object.keys(Methods).forEach(function (methodName) {
  $$1.fn[methodName] = Methods[methodName];
});

var Utils = {
  deleteProps: function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {
        // no getter for object
      }
      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  },
  nextTick: function nextTick(callback, delay) {
    if ( delay === void 0 ) delay = 0;

    return setTimeout(callback, delay);
  },
  now: function now() {
    return Date.now();
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var matrix;
    var curTransform;
    var transformMatrix;

    var curStyle = win.getComputedStyle(el, null);

    if (win.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }
    return curTransform || 0;
  },
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || win.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  isObject: function isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

var Support = (function Support() {
  var testDiv = doc.createElement('div');
  return {
    touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
      return !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
    }()),

    pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent),
    prefixedPointerEvents: !!win.navigator.msPointerEnabled,

    transition: (function checkTransition() {
      var style = testDiv.style;
      return ('transition' in style || 'webkitTransition' in style || 'MozTransition' in style);
    }()),
    transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
      var style = testDiv.style;
      return ('webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style);
    }()),

    flexbox: (function checkFlexbox() {
      var style = testDiv.style;
      var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
      for (var i = 0; i < styles.length; i += 1) {
        if (styles[i] in style) { return true; }
      }
      return false;
    }()),

    observer: (function checkObserver() {
      return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
    }()),

    passiveListener: (function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          },
        });
        win.addEventListener('testPassiveListener', null, opts);
      } catch (e) {
        // No support
      }
      return supportsPassive;
    }()),

    gestures: (function checkGestures() {
      return 'ongesturestart' in win;
    }()),
  };
}());

var SwiperClass = function SwiperClass(params) {
  if ( params === void 0 ) params = {};

  var self = this;
  self.params = params;

  // Events
  self.eventsListeners = {};

  if (self.params && self.params.on) {
    Object.keys(self.params.on).forEach(function (eventName) {
      self.on(eventName, self.params.on[eventName]);
    });
  }
};

var staticAccessors = { components: { configurable: true } };
SwiperClass.prototype.on = function on (events, handler) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  events.split(' ').forEach(function (event) {
    if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
    self.eventsListeners[event].push(handler);
  });
  return self;
};
SwiperClass.prototype.once = function once (events, handler) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    handler.apply(self, args);
    self.off(events, onceHandler);
  }
  return self.on(events, onceHandler);
};
SwiperClass.prototype.off = function off (events, handler) {
  var self = this;
  events.split(' ').forEach(function (event) {
    if (typeof handler === 'undefined') {
      self.eventsListeners[event] = [];
    } else {
      self.eventsListeners[event].forEach(function (eventHandler, index) {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
    }
  });
  return self;
};
SwiperClass.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var self = this;
  if (!self.eventsListeners) { return self; }
  var events;
  var data;
  var context;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
  }
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  eventsArray.forEach(function (event) {
    if (self.eventsListeners[event]) {
      var handlers = [];
      self.eventsListeners[event].forEach(function (eventHandler) {
        handlers.push(eventHandler);
      });
      handlers.forEach(function (eventHandler) {
        eventHandler.apply(context, data);
      });
    }
  });
  return self;
};
SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    // Extend params
    if (module.params) {
      Utils.extend(instanceParams, module.params);
    }
  });
};
SwiperClass.prototype.useModules = function useModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    var moduleParams = modulesParams[moduleName] || {};
    // Extend instance methods and props
    if (module.instance) {
      Object.keys(module.instance).forEach(function (modulePropName) {
        var moduleProp = module.instance[modulePropName];
        if (typeof moduleProp === 'function') {
          instance[modulePropName] = moduleProp.bind(instance);
        } else {
          instance[modulePropName] = moduleProp;
        }
      });
    }
    // Add event listeners
    if (module.on && instance.on) {
      Object.keys(module.on).forEach(function (moduleEventName) {
        instance.on(moduleEventName, module.on[moduleEventName]);
      });
    }

    // Module create callback
    if (module.create) {
      module.create.bind(instance)(moduleParams);
    }
  });
};
staticAccessors.components.set = function (components) {
  var Class = this;
  if (!Class.use) { return; }
  Class.use(components);
};
SwiperClass.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (!Class.prototype.modules) { Class.prototype.modules = {}; }
  var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
  Class.prototype.modules[name] = module;
  // Prototype
  if (module.proto) {
    Object.keys(module.proto).forEach(function (key) {
      Class.prototype[key] = module.proto[key];
    });
  }
  // Class
  if (module.static) {
    Object.keys(module.static).forEach(function (key) {
      Class[key] = module.static[key];
    });
  }
  // Callback
  if (module.install) {
    module.install.apply(Class, params);
  }
  return Class;
};
SwiperClass.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (Array.isArray(module)) {
    module.forEach(function (m) { return Class.installModule(m); });
    return Class;
  }
  return Class.installModule.apply(Class, [ module ].concat( params ));
};

Object.defineProperties( SwiperClass, staticAccessors );

var updateSize = function () {
  var swiper = this;
  var width;
  var height;
  var $el = swiper.$el;
  if (typeof swiper.params.width !== 'undefined') {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined') {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
    return;
  }

  // Subtract paddings
  width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
  height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

  Utils.extend(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height,
  });
};

var updateSlides = function () {
  var swiper = this;
  var params = swiper.params;

  var $wrapperEl = swiper.$wrapperEl;
  var swiperSize = swiper.size;
  var rtl = swiper.rtl;
  var wrongRTL = swiper.wrongRTL;
  var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];

  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }

  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }

  var previousSlidesLength = slidesLength;
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.snapGrid.length;

  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
  }

  swiper.virtualSize = -spaceBetween;

  // reset margins
  if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
  else { slides.css({ marginRight: '', marginBottom: '' }); }

  var slidesNumberEvenToRows;
  if (params.slidesPerColumn > 1) {
    if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
    }
    if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
    }
  }

  // Calc slides
  var slideSize;
  var slidesPerColumn = params.slidesPerColumn;
  var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
  var numFullColumns = slidesPerRow - ((params.slidesPerColumn * slidesPerRow) - slidesLength);
  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    var slide = slides.eq(i);
    if (params.slidesPerColumn > 1) {
      // Set slides order
      var newSlideOrderIndex = (void 0);
      var column = (void 0);
      var row = (void 0);
      if (params.slidesPerColumnFill === 'column') {
        column = Math.floor(i / slidesPerColumn);
        row = i - (column * slidesPerColumn);
        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
          row += 1;
          if (row >= slidesPerColumn) {
            row = 0;
            column += 1;
          }
        }
        newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
        slide
          .css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex,
          });
      } else {
        row = Math.floor(i / slidesPerRow);
        column = i - (row * slidesPerRow);
      }
      slide
        .css(
          ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
          (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
        )
        .attr('data-swiper-column', column)
        .attr('data-swiper-row', row);
    }
    if (slide.css('display') === 'none') { continue; } // eslint-disable-line
    if (params.slidesPerView === 'auto') {
      slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }
    } else {
      slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }

      if (slides[i]) {
        if (swiper.isHorizontal()) {
          slides[i].style.width = slideSize + "px";
        } else {
          slides[i].style.height = slideSize + "px";
        }
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);


    if (params.centeredSlides) {
      slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
    } else {
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    swiper.virtualSize += slideSize + spaceBetween;

    prevSlideSize = slideSize;

    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  var newSlidesGrid;

  if (
    rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
  }
  if (!Support.flexbox || params.setWrapperSize) {
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
  }

  if (params.slidesPerColumn > 1) {
    swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    if (params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
        if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(snapGrid[i$1]); }
      }
      snapGrid = newSlidesGrid;
    }
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    newSlidesGrid = [];
    for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
      if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(snapGrid[i$2]);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0) { snapGrid = [0]; }

  if (params.spaceBetween !== 0) {
    if (swiper.isHorizontal()) {
      if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
      else { slides.css({ marginRight: (spaceBetween + "px") }); }
    } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
  }

  Utils.extend(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid,
  });

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateSlidesOffset();
  }
};

var updateAutoHeight = function () {
  var swiper = this;
  var activeSlides = [];
  var newHeight = 0;
  var i;

  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      var index = swiper.activeIndex + i;
      if (index > swiper.slides.length) { break; }
      activeSlides.push(swiper.slides.eq(index)[0]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
};

var updateSlidesOffset = function () {
  var swiper = this;
  var slides = swiper.slides;
  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
};

var updateSlidesProgress = function (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var slides = swiper.slides;
  var rtl = swiper.rtl;

  if (slides.length === 0) { return; }
  if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

  var offsetCenter = -translate;
  if (rtl) { offsetCenter = translate; }

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideProgress =
      (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
    if (params.watchSlidesVisibility) {
      var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible =
                (slideBefore >= 0 && slideBefore < swiper.size) ||
                (slideAfter > 0 && slideAfter <= swiper.size) ||
                (slideBefore <= 0 && slideAfter >= swiper.size);
      if (isVisible) {
        slides.eq(i).addClass(params.slideVisibleClass);
      }
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
  }
};

var updateProgress = function (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress;
  var isBeginning = swiper.isBeginning;
  var isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / (translatesDiff);
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Utils.extend(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd,
  });

  if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    swiper.emit('fromEdge');
  }

  swiper.emit('progress', progress);
};

var updateSlidesClasses = function () {
  var swiper = this;

  var slides = swiper.slides;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;
  var realIndex = swiper.realIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;

  slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

  var activeSlide;
  if (isVirtual) {
    activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    }
  }
  // Next Slide
  var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  // Prev Slide
  var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    }
  }
};

var updateActiveIndex = function (newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtl ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var params = swiper.params;
  var previousIndex = swiper.activeIndex;
  var previousRealIndex = swiper.realIndex;
  var previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }

  // Get real index
  var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

  Utils.extend(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex,
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  swiper.emit('slideChange');
};

var updateClickedSlide = function (e) {
  var swiper = this;
  var params = swiper.params;
  var slide = $$1(e.target).closest(("." + (params.slideClass)))[0];
  var slideFound = false;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) { slideFound = true; }
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($$1(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = $$1(slide).index();
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
};

var update = {
  updateSize: updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide,
};

var getTranslate = function (axis) {
  if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

  var swiper = this;

  var params = swiper.params;
  var rtl = swiper.rtl;
  var translate = swiper.translate;
  var $wrapperEl = swiper.$wrapperEl;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }

  var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
  if (rtl) { currentTranslate = -currentTranslate; }

  return currentTranslate || 0;
};

var setTranslate = function (translate, byController) {
  var swiper = this;
  var rtl = swiper.rtl;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;

  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (!params.virtualTranslate) {
    if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
    else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
  }

  swiper.translate = swiper.isHorizontal() ? x : y;

  // Check if we need to update progress
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  swiper.emit('setTranslate', swiper.translate, byController);
};

var minTranslate = function () {
  return (-this.snapGrid[0]);
};

var maxTranslate = function () {
  return (-this.snapGrid[this.snapGrid.length - 1]);
};

var translate = {
  getTranslate: getTranslate,
  setTranslate: setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate,
};

var setTransition = function (duration, byController) {
  var swiper = this;

  swiper.$wrapperEl.transition(duration);

  swiper.emit('setTransition', duration, byController);
};

var transitionStart = function (runCallbacks, direction) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var params = swiper.params;
  var previousIndex = swiper.previousIndex;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) { dir = 'next'; }
    else if (activeIndex < previousIndex) { dir = 'prev'; }
    else { dir = 'reset'; }
  }

  swiper.emit('transitionStart');

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit('slideResetTransitionStart');
      return;
    }
    swiper.emit('slideChangeTransitionStart');
    if (dir === 'next') {
      swiper.emit('slideNextTransitionStart');
    } else {
      swiper.emit('slidePrevTransitionStart');
    }
  }
};

var transitionEnd$1 = function (runCallbacks, direction) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var previousIndex = swiper.previousIndex;
  swiper.animating = false;
  swiper.setTransition(0);

  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) { dir = 'next'; }
    else if (activeIndex < previousIndex) { dir = 'prev'; }
    else { dir = 'reset'; }
  }

  swiper.emit('transitionEnd');

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit('slideResetTransitionEnd');
      return;
    }
    swiper.emit('slideChangeTransitionEnd');
    if (dir === 'next') {
      swiper.emit('slideNextTransitionEnd');
    } else {
      swiper.emit('slidePrevTransitionEnd');
    }
  }
};

var transition$1 = {
  setTransition: setTransition,
  transitionStart: transitionStart,
  transitionEnd: transitionEnd$1,
};

var slideTo = function (index, speed, runCallbacks, internal) {
  if ( index === void 0 ) index = 0;
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) { slideIndex = 0; }

  var params = swiper.params;
  var snapGrid = swiper.snapGrid;
  var slidesGrid = swiper.slidesGrid;
  var previousIndex = swiper.previousIndex;
  var activeIndex = swiper.activeIndex;
  var rtl = swiper.rtl;
  var $wrapperEl = swiper.$wrapperEl;
  if (swiper.animating && params.preventIntercationOnTransition) {
    return false;
  }

  var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  var translate = -snapGrid[snapIndex];

  // Update progress
  swiper.updateProgress(translate);

  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) { return false; }
    }
  }

  var direction;
  if (slideIndex > activeIndex) { direction = 'next'; }
  else if (slideIndex < activeIndex) { direction = 'prev'; }
  else { direction = 'reset'; }


  // Update Index
  if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }

  if (speed === 0 || !Support.transition) {
    swiper.setTransition(0);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    swiper.transitionEnd(runCallbacks, direction);
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (!swiper.animating) {
      swiper.animating = true;
      $wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.transitionEnd(runCallbacks, direction);
      });
    }
  }

  return true;
};

var slideToLoop = function (index, speed, runCallbacks, internal) {
  if ( index === void 0 ) index = 0;
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var newIndex = index;
  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slideNext = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;
  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slidePrev = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;

  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slideReset = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
};

var slideToClickedSlide = function () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;

  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  if (params.loop) {
    if (swiper.animating) { return; }
    realIndex = parseInt($$1(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        (slideToIndex < swiper.loopedSlides - (slidesPerView / 2)) ||
        (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
      ) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl
        .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
        .eq(0)
        .index();

      Utils.nextTick(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
};

var slide = {
  slideTo: slideTo,
  slideToLoop: slideToLoop,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClickedSlide: slideToClickedSlide,
};

var loopCreate = function () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  // Remove duplicated slides
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

  var slides = $wrapperEl.children(("." + (params.slideClass)));

  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankNode = $$1(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
        $wrapperEl.append(blankNode);
      }
      slides = $wrapperEl.children(("." + (params.slideClass)));
    }
  }

  if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

  swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }

  var prependSlides = [];
  var appendSlides = [];
  slides.each(function (index, el) {
    var slide = $$1(el);
    if (index < swiper.loopedSlides) { appendSlides.push(el); }
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
    slide.attr('data-swiper-slide-index', index);
  });
  for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
    $wrapperEl.append($$1(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
    $wrapperEl.prepend($$1(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
};

var loopFix = function () {
  var swiper = this;
  var params = swiper.params;
  var activeIndex = swiper.activeIndex;
  var slides = swiper.slides;
  var loopedSlides = swiper.loopedSlides;
  var allowSlidePrev = swiper.allowSlidePrev;
  var allowSlideNext = swiper.allowSlideNext;
  var snapGrid = swiper.snapGrid;
  var rtl = swiper.rtl;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;

  var snapTranslate = -snapGrid[activeIndex];
  var diff = snapTranslate - swiper.getTranslate();


  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
    newIndex += loopedSlides;
    var slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex > slides.length - (params.slidesPerView * 2))) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged$1 && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
};

var loopDestroy = function () {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  var slides = swiper.slides;
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();
  slides.removeAttr('data-swiper-slide-index');
};

var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy,
};

var setGrabCursor = function (moving) {
  var swiper = this;
  if (Support.touch || !swiper.params.simulateTouch) { return; }
  var el = swiper.el;
  el.style.cursor = 'move';
  el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
  el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
  el.style.cursor = moving ? 'grabbing' : 'grab';
};

var unsetGrabCursor = function () {
  var swiper = this;
  if (Support.touch) { return; }
  swiper.el.style.cursor = '';
};

var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor,
};

var appendSlide = function (slides) {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  if (params.loop) {
    swiper.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.append(slides[i]); }
    }
  } else {
    $wrapperEl.append(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
};

var prependSlide = function (slides) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndex + 1;
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.prepend(slides[i]); }
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
};

var removeSlide = function (slidesIndexes) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
  }
  var newActiveIndex = activeIndex;
  var indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
    if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
};

var removeAllSlides = function () {
  var swiper = this;

  var slidesIndexes = [];
  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
};

var manipulation = {
  appendSlide: appendSlide,
  prependSlide: prependSlide,
  removeSlide: removeSlide,
  removeAllSlides: removeAllSlides,
};

var Device = (function Device() {
  var ua = win.navigator.userAgent;

  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    ipod: false,
    ipad: false,
    cordova: win.cordova || win.phonegap,
    phonegap: win.cordova || win.phonegap,
  };

  var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


  // Windows
  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
  }
  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);

  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Minimal UI
  if (device.os && device.os === 'ios') {
    var osVersionArr = device.osVersion.split('.');
    var metaViewport = doc.querySelector('meta[name="viewport"]');
    device.minimalUi =
      !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Pixel Ratio
  device.pixelRatio = win.devicePixelRatio || 1;

  // Export object
  return device;
}());

var onTouchStart = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  if (swiper.animating && params.preventIntercationOnTransition) {
    return;
  }
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
  if (data.isTouched && data.isMoved) { return; }
  if (params.noSwiping && $$1(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$$1(e).closest(params.swipeHandler)[0]) { return; }
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

  if (
    Device.ios &&
    !Device.cordova &&
    params.iOSEdgeSwipeDetection &&
    (startX <= params.iOSEdgeSwipeThreshold) &&
    (startX >= win.screen.width - params.iOSEdgeSwipeThreshold)
  ) {
    return;
  }

  Utils.extend(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined,
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = Utils.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) { data.allowThresholdMove = false; }
  if (e.type !== 'touchstart') {
    var preventDefault = true;
    if ($$1(e.target).is(data.formElements)) { preventDefault = false; }
    if (
      doc.activeElement &&
      $$1(doc.activeElement).is(data.formElements) &&
      doc.activeElement !== e.target
    ) {
      doc.activeElement.blur();
    }
    if (preventDefault && swiper.allowTouchMove) {
      e.preventDefault();
    }
  }
  swiper.emit('touchStart', e);
};

var onTouchMove = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtl;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (!data.isTouched) {
    if (data.isMoved && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  if (data.isTouchEvent && e.type === 'mousemove') { return; }
  var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
  var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    // isMoved = true;
    swiper.allowClick = false;
    if (data.isTouched) {
      Utils.extend(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
      });
      data.touchStartTime = Utils.now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (
        (pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
        (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
      ) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (
      (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
      (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
    ) {
      return;
    }
  }
  if (data.isTouchEvent && doc.activeElement) {
    if (e.target === doc.activeElement && $$1(e.target).is(data.formElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) { return; }

  touches.currentX = pageX;
  touches.currentY = pageY;

  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;

  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if ((diffX * diffX) + (diffY * diffY) >= 25) {
        touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  e.preventDefault();
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  if (!data.isMoved) {
    if (params.loop) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;

  var diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;

  diff *= params.touchRatio;
  if (rtl) { diff = -diff; }

  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;

  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }


  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger) { return; }

  // Update active index in free mode
  if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode) {
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime,
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: Utils.now(),
    });
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
};

var onTouchEnd = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;

  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtl;
  var $wrapperEl = swiper.$wrapperEl;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    return;
  }
  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  var touchEndTime = Utils.now();
  var timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    swiper.updateClickedSlide(e);
    swiper.emit('tap', e);
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      data.clickTimeout = Utils.nextTick(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.emit('click', e);
      }, 300);
    }
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      swiper.emit('doubleTap', e);
    }
  }

  data.lastClickTime = Utils.now();
  Utils.nextTick(function () {
    if (!swiper.destroyed) { swiper.allowClick = true; }
  });

  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;

  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.freeMode) {
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    } else if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }

    if (params.freeModeMomentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();

        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeModeMomentumVelocityRatio;

      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeModeMomentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;

      var newPosition = swiper.translate + momentumDistance;
      if (rtl) { newPosition = -newPosition; }
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
      } else if (params.freeModeSticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
      } else if (params.freeModeSticky) {
        swiper.slideReset();
        return;
      }

      if (params.freeModeMomentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
          swiper.emit('momentumBounce');

          swiper.setTransition(params.speed);
          swiper.setTranslate(afterBouncePosition);
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        });
      } else if (swiper.velocity) {
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    return;
  }

  // Find current slide
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
    if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
        stopIndex = i;
        groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }

  // Find current slide size
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      swiper.slideTo(stopIndex + params.slidesPerGroup);
    }
    if (swiper.swipeDirection === 'prev') {
      swiper.slideTo(stopIndex);
    }
  }
};

var onResize = function () {
  var swiper = this;

  var params = swiper.params;
  var el = swiper.el;

  if (el && el.offsetWidth === 0) { return; }

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  var allowSlideNext = swiper.allowSlideNext;
  var allowSlidePrev = swiper.allowSlidePrev;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  if (params.freeMode) {
    var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
    swiper.setTranslate(newTranslate);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
  } else {
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
};

var onClick = function (e) {
  var swiper = this;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) { e.preventDefault(); }
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
};

function attachEvents() {
  var swiper = this;
  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  {
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
  }

  swiper.onClick = onClick.bind(swiper);

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
        target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.addEventListener('mousedown', swiper.onTouchStart, false);
        doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.on('resize observerUpdate', onResize);
}

function detachEvents() {
  var swiper = this;

  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.removeEventListener('mousedown', swiper.onTouchStart, false);
        doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.off('resize observerUpdate', onResize);
}

var events = {
  attachEvents: attachEvents,
  detachEvents: detachEvents,
};

var setBreakpoint = function () {
  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
  var params = swiper.params;
  var breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }
  // Set breakpoint for window width and update parameters
  var breakpoint = swiper.getBreakpoint(breakpoints);
  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    var needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    Utils.extend(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    swiper.currentBreakpoint = breakpoint;

    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
    }
    swiper.emit('breakpoint', breakPointsParams);
  }
};

var getBreakpoint = function (breakpoints) {
  // Get breakpoint for window width
  if (!breakpoints) { return undefined; }
  var breakpoint = false;
  var points = [];
  Object.keys(breakpoints).forEach(function (point) {
    points.push(point);
  });
  points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    if (point >= win.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
};

var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

var Browser = (function Browser() {
  function isSafari() {
    var ua = win.navigator.userAgent.toLowerCase();
    return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
  }
  return {
    isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
  };
}());

var addClasses = function () {
  var swiper = this;
  var classNames = swiper.classNames;
  var params = swiper.params;
  var rtl = swiper.rtl;
  var $el = swiper.$el;
  var suffixes = [];

  suffixes.push(params.direction);

  if (params.freeMode) {
    suffixes.push('free-mode');
  }
  if (!Support.flexbox) {
    suffixes.push('no-flexbox');
  }
  if (params.autoHeight) {
    suffixes.push('autoheight');
  }
  if (rtl) {
    suffixes.push('rtl');
  }
  if (params.slidesPerColumn > 1) {
    suffixes.push('multirow');
  }
  if (Device.android) {
    suffixes.push('android');
  }
  if (Device.ios) {
    suffixes.push('ios');
  }
  // WP8 Touch Events Fix
  if (Browser.isIE && (Support.pointerEvents || Support.prefixedPointerEvents)) {
    suffixes.push(("wp8-" + (params.direction)));
  }

  suffixes.forEach(function (suffix) {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));
};

var removeClasses = function () {
  var swiper = this;
  var $el = swiper.$el;
  var classNames = swiper.classNames;

  $el.removeClass(classNames.join(' '));
};

var classes = { addClasses: addClasses, removeClasses: removeClasses };

var loadImage = function (imageEl, src, srcset, sizes, checkForComplete, callback) {
  var image;
  function onReady() {
    if (callback) { callback(); }
  }
  if (!imageEl.complete || !checkForComplete) {
    if (src) {
      image = new win.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
};

var preloadImages = function () {
  var swiper = this;
  swiper.imagesToLoad = swiper.$el.find('img');
  function onReady() {
    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
    if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady) { swiper.update(); }
      swiper.emit('imagesReady');
    }
  }
  for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
    var imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(
      imageEl,
      imageEl.currentSrc || imageEl.getAttribute('src'),
      imageEl.srcset || imageEl.getAttribute('srcset'),
      imageEl.sizes || imageEl.getAttribute('sizes'),
      true,
      onReady
    );
  }
};

var images = {
  loadImage: loadImage,
  preloadImages: preloadImages,
};

function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked;

  swiper.isLocked = swiper.snapGrid.length === 1;
  swiper.allowTouchMove = !swiper.isLocked;

  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
    swiper.navigation.update();
  }
}

var checkOverflow$1 = { checkOverflow: checkOverflow };

var defaults = {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'container',
  initialSlide: 0,
  speed: 300,
  //
  preventIntercationOnTransition: false,

  // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
  iOSEdgeSwipeDetection: false,
  iOSEdgeSwipeThreshold: 20,

  // Free mode
  freeMode: false,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1,
  freeModeMomentumBounce: true,
  freeModeMomentumBounceRatio: 1,
  freeModeMomentumVelocityRatio: 1,
  freeModeSticky: false,
  freeModeMinimumVelocity: 0.02,

  // Autoheight
  autoHeight: false,

  // Set wrapper width
  setWrapperSize: false,

  // Virtual Translate
  virtualTranslate: false,

  // Effects
  effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,

  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerColumnFill: 'column',
  slidesPerGroup: 1,
  centeredSlides: false,
  slidesOffsetBefore: 0, // in px
  slidesOffsetAfter: 0, // in px
  normalizeSlideIndex: true,

  // Disable swiper and hide navigation when container not overflow
  watchOverflow: false,

  // Round length
  roundLengths: false,

  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: true,
  touchReleaseOnEdges: false,

  // Unique Navigation Elements
  uniqueNavElements: true,

  // Resistance
  resistance: true,
  resistanceRatio: 0.85,

  // Progress
  watchSlidesProgress: false,
  watchSlidesVisibility: false,

  // Cursor
  grabCursor: false,

  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,

  // Images
  preloadImages: true,
  updateOnImagesReady: true,

  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,

  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,

  // Passive Listeners
  passiveListeners: true,

  // NS
  containerModifierClass: 'swiper-container-', // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',

  // Callbacks
  runCallbacksOnInit: true,
};

var prototypes = {
  update: update,
  translate: translate,
  transition: transition$1,
  slide: slide,
  loop: loop,
  grabCursor: grabCursor,
  manipulation: manipulation,
  events: events,
  breakpoints: breakpoints,
  checkOverflow: checkOverflow$1,
  classes: classes,
  images: images,
};

var extendedDefaults = {};

var Swiper$1 = (function (SwiperClass$$1) {
  function Swiper() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var el;
    var params;
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      (assign = args, el = assign[0], params = assign[1]);
    }
    if (!params) { params = {}; }

    params = Utils.extend({}, params);
    if (el && !params.el) { params.el = el; }

    SwiperClass$$1.call(this, params);

    Object.keys(prototypes).forEach(function (prototypeGroup) {
      Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    });

    // Swiper Instance
    var swiper = this;
    if (typeof swiper.modules === 'undefined') {
      swiper.modules = {};
    }
    Object.keys(swiper.modules).forEach(function (moduleName) {
      var module = swiper.modules[moduleName];
      if (module.params) {
        var moduleParamName = Object.keys(module.params)[0];
        var moduleParams = module.params[moduleParamName];
        if (typeof moduleParams !== 'object') { return; }
        if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
        if (params[moduleParamName] === true) {
          params[moduleParamName] = { enabled: true };
        }
        if (
          typeof params[moduleParamName] === 'object' &&
          !('enabled' in params[moduleParamName])
        ) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
      }
    });

    // Extend defaults with modules params
    var swiperParams = Utils.extend({}, defaults);
    swiper.useModulesParams(swiperParams);

    // Extend defaults with passed params
    swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = Utils.extend({}, swiper.params);
    swiper.passedParams = Utils.extend({}, params);

    // Save Dom lib
    swiper.$ = $$1;

    // Find el
    var $el = $$1(swiper.params.el);
    el = $el[0];

    if (!el) {
      return undefined;
    }

    if ($el.length > 1) {
      var swipers = [];
      $el.each(function (index, containerEl) {
        var newParams = Utils.extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }

    el.swiper = swiper;
    $el.data('swiper', swiper);

    // Find Wrapper
    var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

    // Extend Swiper
    Utils.extend(swiper, {
      $el: $el,
      el: el,
      $wrapperEl: $wrapperEl,
      wrapperEl: $wrapperEl[0],

      // Classes
      classNames: [],

      // Slides
      slides: $$1(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // RTL
      rtl: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend'];
        var desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (Support.pointerEvents) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (Support.prefixedPointerEvents) {
          desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        }
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2],
        };
        return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }()),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        formElements: 'input, select, option, textarea, button, video',
        // Last click time
        lastClickTime: Utils.now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined,
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: swiper.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0,

    });

    // Install Modules
    swiper.useModules();

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    return swiper;
  }

  if ( SwiperClass$$1 ) Swiper.__proto__ = SwiperClass$$1;
  Swiper.prototype = Object.create( SwiperClass$$1 && SwiperClass$$1.prototype );
  Swiper.prototype.constructor = Swiper;

  var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };
  Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides;
    var slidesGrid = swiper.slidesGrid;
    var swiperSize = swiper.size;
    var activeIndex = swiper.activeIndex;
    var spv = 1;
    if (params.centeredSlides) {
      var slideSize = slides[activeIndex].swiperSlideSize;
      var breakLoop;
      for (var i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
      for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
        if (slides[i$1] && !breakLoop) {
          slideSize += slides[i$1].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
    } else {
      for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
        if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
          spv += 1;
        }
      }
    }
    return spv;
  };
  Swiper.prototype.update = function update$$1 () {
    var swiper = this;
    if (!swiper || swiper.destroyed) { return; }
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    function setTranslate() {
      var translateValue = swiper.rtl ? swiper.translate * -1 : swiper.translate;
      var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    var translated;
    if (swiper.params.freeMode) {
      setTranslate();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    swiper.emit('update');
  };
  Swiper.prototype.init = function init () {
    var swiper = this;
    if (swiper.initialized) { return; }

    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate();
    }

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    }

    // Slide To Initial Slide
    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    swiper.attachEvents();

    // Init Flag
    swiper.initialized = true;

    // Emit
    swiper.emit('init');
  };
  Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
    if ( deleteInstance === void 0 ) deleteInstance = true;
    if ( cleanStyles === void 0 ) cleanStyles = true;

    var swiper = this;
    var params = swiper.params;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass([
            params.slideVisibleClass,
            params.slideActiveClass,
            params.slideNextClass,
            params.slidePrevClass ].join(' '))
          .removeAttr('style')
          .removeAttr('data-swiper-slide-index')
          .removeAttr('data-swiper-column')
          .removeAttr('data-swiper-row');
      }
    }

    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(function (eventName) {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      swiper.$el.data('swiper', null);
      Utils.deleteProps(swiper);
    }
    swiper.destroyed = true;
  };
  Swiper.extendDefaults = function extendDefaults (newDefaults) {
    Utils.extend(extendedDefaults, newDefaults);
  };
  staticAccessors.extendedDefaults.get = function () {
    return extendedDefaults;
  };
  staticAccessors.defaults.get = function () {
    return defaults;
  };
  staticAccessors.Class.get = function () {
    return SwiperClass$$1;
  };
  staticAccessors.$.get = function () {
    return $$1;
  };

  Object.defineProperties( Swiper, staticAccessors );

  return Swiper;
}(SwiperClass));

var Device$2 = {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    device: Device,
  },
};

var Support$2 = {
  name: 'support',
  proto: {
    support: Support,
  },
  static: {
    support: Support,
  },
};

var Browser$2 = {
  name: 'browser',
  proto: {
    browser: Browser,
  },
  static: {
    browser: Browser,
  },
};

var Resize = {
  name: 'resize',
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      resize: {
        resizeHandler: function resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
          swiper.emit('orientationchange');
        },
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      // Emit resize
      win.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy() {
      var swiper = this;
      win.removeEventListener('resize', swiper.resize.resizeHandler);
      win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
  },
};

var Observer = {
  func: win.MutationObserver || win.WebkitMutationObserver,
  attach: function attach(target, options) {
    if ( options === void 0 ) options = {};

    var swiper = this;

    var ObserverFunc = Observer.func;
    var observer = new ObserverFunc(function (mutations) {
      mutations.forEach(function (mutation) {
        swiper.emit('observerUpdate', mutation);
      });
    });

    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
    });

    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!Support.observer || !swiper.params.observer) { return; }
    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();
      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    }
    // Observe container
    swiper.observer.attach(swiper.$el[0], { childList: false });

    // Observe wrapper
    swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.observer.observers.forEach(function (observer) {
      observer.disconnect();
    });
    swiper.observer.observers = [];
  },
};

var Observer$1 = {
  name: 'observer',
  params: {
    observer: false,
    observeParents: false,
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      observer: {
        init: Observer.init.bind(swiper),
        attach: Observer.attach.bind(swiper),
        destroy: Observer.destroy.bind(swiper),
        observers: [],
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.observer.init();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.destroy();
    },
  },
};

var Virtual = {
  update: function update(force) {
    var swiper = this;
    var ref = swiper.params;
    var slidesPerView = ref.slidesPerView;
    var slidesPerGroup = ref.slidesPerGroup;
    var centeredSlides = ref.centeredSlides;
    var ref$1 = swiper.virtual;
    var previousFrom = ref$1.from;
    var previousTo = ref$1.to;
    var slides = ref$1.slides;
    var previousSlidesGrid = ref$1.slidesGrid;
    var renderSlide = ref$1.renderSlide;
    var previousOffset = ref$1.offset;
    swiper.updateActiveIndex();
    var activeIndex = swiper.activeIndex || 0;

    var offsetProp;
    if (swiper.rtl && swiper.isHorizontal()) { offsetProp = 'right'; }
    else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

    var slidesAfter;
    var slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1);
      slidesBefore = slidesPerGroup;
    }
    var from = Math.max((activeIndex || 0) - slidesBefore, 0);
    var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

    Utils.extend(swiper.virtual, {
      from: from,
      to: to,
      offset: offset,
      slidesGrid: swiper.slidesGrid,
    });

    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      if (swiper.lazy && swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.css(offsetProp, (offset + "px"));
      }
      swiper.updateProgress();
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: (function getSlides() {
          var slidesToRender = [];
          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()),
      });
      onRendered();
      return;
    }
    var prependIndexes = [];
    var appendIndexes = [];
    if (force) {
      swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
        }
      }
    }
    for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
      if (i$1 >= from && i$1 <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(i$1);
        } else {
          if (i$1 > previousTo) { appendIndexes.push(i$1); }
          if (i$1 < previousFrom) { prependIndexes.push(i$1); }
        }
      }
    }
    appendIndexes.forEach(function (index) {
      swiper.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes.sort(function (a, b) { return a < b; }).forEach(function (index) {
      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
    });
    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
    onRendered();
  },
  renderSlide: function renderSlide(slide, index) {
    var swiper = this;
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    var $slideEl = params.renderSlide
      ? $$1(params.renderSlide.call(swiper, slide, index))
      : $$1(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
    if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
    if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
    return $slideEl;
  },
  appendSlide: function appendSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.push(slide);
    swiper.virtual.update(true);
  },
  prependSlide: function prependSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.unshift(slide);
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        newCache[cachedIndex + 1] = cache[cachedIndex];
      });
      swiper.virtual.cache = newCache;
    }
    swiper.virtual.update(true);
    swiper.slideNext(0);
  },
};

var Virtual$1 = {
  name: 'virtual',
  params: {
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      virtual: {
        update: Virtual.update.bind(swiper),
        appendSlide: Virtual.appendSlide.bind(swiper),
        prependSlide: Virtual.prependSlide.bind(swiper),
        renderSlide: Virtual.renderSlide.bind(swiper),
        slides: swiper.params.virtual.slides,
        cache: {},
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
      var overwriteParams = {
        watchSlidesProgress: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);

      swiper.virtual.update();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.virtual.update();
    },
  },
};

var Keyboard = {
  handle: function handle(event) {
    var swiper = this;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; } // jquery fix
    var kc = e.keyCode || e.charCode;
    // Directions locks
    if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40))) {
      return false;
    }
    if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38))) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
      var inView = false;
      // Check that swiper should be inside of visible area of window
      if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
        return undefined;
      }
      var windowWidth = win.innerWidth;
      var windowHeight = win.innerHeight;
      var swiperOffset = swiper.$el.offset();
      if (swiper.rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
      var swiperCoord = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiper.width, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiper.height],
        [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];
        if (
          point[0] >= 0 && point[0] <= windowWidth &&
          point[1] >= 0 && point[1] <= windowHeight
        ) {
          inView = true;
        }
      }
      if (!inView) { return undefined; }
    }
    if (swiper.isHorizontal()) {
      if (kc === 37 || kc === 39) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      if ((kc === 39 && !swiper.rtl) || (kc === 37 && swiper.rtl)) { swiper.slideNext(); }
      if ((kc === 37 && !swiper.rtl) || (kc === 39 && swiper.rtl)) { swiper.slidePrev(); }
    } else {
      if (kc === 38 || kc === 40) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      if (kc === 40) { swiper.slideNext(); }
      if (kc === 38) { swiper.slidePrev(); }
    }
    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable: function enable() {
    var swiper = this;
    if (swiper.keyboard.enabled) { return; }
    $$1(doc).on('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = true;
  },
  disable: function disable() {
    var swiper = this;
    if (!swiper.keyboard.enabled) { return; }
    $$1(doc).off('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = false;
  },
};

var Keyboard$1 = {
  name: 'keyboard',
  params: {
    keyboard: {
      enabled: false,
      onlyInViewport: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      keyboard: {
        enabled: false,
        enable: Keyboard.enable.bind(swiper),
        disable: Keyboard.disable.bind(swiper),
        handle: Keyboard.handle.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.keyboard.enabled) {
        swiper.keyboard.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.keyboard.enabled) {
        swiper.keyboard.disable();
      }
    },
  },
};

function isEventSupported() {
  var eventName = 'onwheel';
  var isSupported = eventName in doc;

  if (!isSupported) {
    var element = doc.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported &&
    doc.implementation &&
    doc.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    doc.implementation.hasFeature('', '') !== true
  ) {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}
var Mousewheel = {
  lastScrollTime: Utils.now(),
  event: (function getEvent() {
    if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
    return isEventSupported() ? 'wheel' : 'mousewheel';
  }()),
  normalize: function normalize(e) {
    // Reasonable defaults
    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    var sX = 0;
    var sY = 0; // spinX, spinY
    var pX = 0;
    var pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }

    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) { // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else { // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = (pX < 1) ? -1 : 1;
    }
    if (pY && !sY) {
      sY = (pY < 1) ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY,
    };
  },
  handle: function handle(event) {
    var e = event;
    var swiper = this;
    var params = swiper.params.mousewheel;
    if (e.originalEvent) { e = e.originalEvent; } // jquery fix
    var delta = 0;
    var rtlFactor = swiper.rtl ? -1 : 1;

    var data = Mousewheel.normalize(e);

    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
        else { return true; }
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
      else { return true; }
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }

    if (delta === 0) { return true; }

    if (params.invert) { delta = -delta; }

    if (!swiper.params.freeMode) {
      if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
        if (delta < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          swiper.emit('scroll', e);
        } else if (params.releaseOnEdges) { return true; }
      }
      swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
    } else {
      // Freemode or scrollContainer:
      var position = swiper.getTranslate() + (delta * params.sensitivity);
      var wasBeginning = swiper.isBeginning;
      var wasEnd = swiper.isEnd;

      if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
      if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

      swiper.setTransition(0);
      swiper.setTranslate(position);
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeModeSticky) {
        clearTimeout(swiper.mousewheel.timeout);
        swiper.mousewheel.timeout = Utils.nextTick(function () {
          swiper.slideReset();
        }, 300);
      }
      // Emit event
      swiper.emit('scroll', e);

      // Stop autoplay
      if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.stopAutoplay(); }
      // Return page scroll on edge positions
      if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
    }

    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    return false;
  },
  enable: function enable() {
    var swiper = this;
    if (!Mousewheel.event) { return false; }
    if (swiper.mousewheel.enabled) { return false; }
    var target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $$1(swiper.params.mousewheel.eventsTarged);
    }
    target.on(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = true;
    return true;
  },
  disable: function disable() {
    var swiper = this;
    if (!Mousewheel.event) { return false; }
    if (!swiper.mousewheel.enabled) { return false; }
    var target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $$1(swiper.params.mousewheel.eventsTarged);
    }
    target.off(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = false;
    return true;
  },
};

var Mousewheel$1 = {
  name: 'mousewheel',
  params: {
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarged: 'container',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      mousewheel: {
        enabled: false,
        enable: Mousewheel.enable.bind(swiper),
        disable: Mousewheel.disable.bind(swiper),
        handle: Mousewheel.handle.bind(swiper),
        lastScrollTime: Utils.now(),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
    },
  },
};

var Navigation = {
  update: function update() {
    // Update Navigation Buttons
    var swiper = this;
    var params = swiper.params.navigation;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        $prevEl.addClass(params.disabledClass);
      } else {
        $prevEl.removeClass(params.disabledClass);
      }
      $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        $nextEl.addClass(params.disabledClass);
      } else {
        $nextEl.removeClass(params.disabledClass);
      }
      $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.navigation;
    if (!(params.nextEl || params.prevEl)) { return; }

    var $nextEl;
    var $prevEl;
    if (params.nextEl) {
      $nextEl = $$1(params.nextEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.nextEl === 'string' &&
        $nextEl.length > 1 &&
        swiper.$el.find(params.nextEl).length === 1
      ) {
        $nextEl = swiper.$el.find(params.nextEl);
      }
    }
    if (params.prevEl) {
      $prevEl = $$1(params.prevEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.prevEl === 'string' &&
        $prevEl.length > 1 &&
        swiper.$el.find(params.prevEl).length === 1
      ) {
        $prevEl = swiper.$el.find(params.prevEl);
      }
    }

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) { return; }
        swiper.slideNext();
      });
    }
    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) { return; }
        swiper.slidePrev();
      });
    }

    Utils.extend(swiper.navigation, {
      $nextEl: $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl: $prevEl,
      prevEl: $prevEl && $prevEl[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;
    if ($nextEl && $nextEl.length) {
      $nextEl.off('click');
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off('click');
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  },
};

var Navigation$1 = {
  name: 'navigation',
  params: {
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      navigation: {
        init: Navigation.init.bind(swiper),
        update: Navigation.update.bind(swiper),
        destroy: Navigation.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.navigation.init();
      swiper.navigation.update();
    },
    toEdge: function toEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.navigation.destroy();
    },
    click: function click(e) {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if (
        swiper.params.navigation.hideOnClick &&
        !$$1(e.target).is($prevEl) &&
        !$$1(e.target).is($nextEl)
      ) {
        if ($nextEl) { $nextEl.toggleClass(swiper.params.navigation.hiddenClass); }
        if ($prevEl) { $prevEl.toggleClass(swiper.params.navigation.hiddenClass); }
      }
    },
  },
};

var Pagination = {
  update: function update() {
    // Render || Update Pagination bullets/items
    var swiper = this;
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    // Current/Total
    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
      if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
        current -= (slidesLength - (swiper.loopedSlides * 2));
      }
      if (current > total - 1) { current -= total; }
      if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;
      if (params.dynamicBullets) {
        swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
          if (current > swiper.previousIndex && swiper.pagination.dynamicBulletIndex < (params.dynamicMainBullets - 1)) {
            swiper.pagination.dynamicBulletIndex += 1;
          } else if (current < swiper.previousIndex && swiper.pagination.dynamicBulletIndex > 0) {
            swiper.pagination.dynamicBulletIndex -= 1;
          }
        }
        firstIndex = current - swiper.pagination.dynamicBulletIndex;
        lastIndex = firstIndex + (params.dynamicMainBullets - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
      if ($el.length > 1) {
        bullets.each(function (index, bullet) {
          var $bullet = $$1(bullet);
          var bulletIndex = $bullet.index();
          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass(((params.bulletActiveClass) + "-main"));
            }
            if (bulletIndex === firstIndex) {
              $bullet
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev"))
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev-prev"));
            }
            if (bulletIndex === lastIndex) {
              $bullet
                .next()
                .addClass(((params.bulletActiveClass) + "-next"))
                .next()
                .addClass(((params.bulletActiveClass) + "-next-next"));
            }
          }
        });
      } else {
        var $bullet = bullets.eq(current);
        $bullet.addClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          var $firstDisplayedBullet = bullets.eq(firstIndex);
          var $lastDisplayedBullet = bullets.eq(lastIndex);
          for (var i = firstIndex; i <= lastIndex; i += 1) {
            bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
          }
          $firstDisplayedBullet
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev"))
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev-prev"));
          $lastDisplayedBullet
            .next()
            .addClass(((params.bulletActiveClass) + "-next"))
            .next()
            .addClass(((params.bulletActiveClass) + "-next-next"));
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
        var offsetProp = rtl ? 'right' : 'left';
        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
      }
    }
    if (params.type === 'fraction') {
      $el.find(("." + (params.currentClass))).text(current + 1);
      $el.find(("." + (params.totalClass))).text(total);
    }
    if (params.type === 'progressbar') {
      var scale = (current + 1) / total;
      var scaleX = scale;
      var scaleY = 1;
      if (!swiper.isHorizontal()) {
        scaleY = scale;
        scaleX = 1;
      }
      $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      swiper.emit('paginationRender', swiper, $el[0]);
    } else {
      swiper.emit('paginationUpdate', swiper, $el[0]);
    }
    $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
  },
  render: function render() {
    // Render Container
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

    var $el = swiper.pagination.$el;
    var paginationHTML = '';
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
        }
      }
      $el.html(paginationHTML);
      swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML =
        "<span class=\"" + (params.currentClass) + "\"></span>" +
        ' / ' +
        "<span class=\"" + (params.totalClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type !== 'custom') {
      swiper.emit('paginationRender', swiper.pagination.$el[0]);
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el) { return; }

    var $el = $$1(params.el);
    if ($el.length === 0) { return; }

    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      swiper.$el.find(params.el).length === 1
    ) {
      $el = swiper.$el.find(params.el);
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);

    if (params.type === 'bullets' && params.dynamicBullets) {
      $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
      swiper.pagination.dynamicBulletIndex = 0;
      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }

    if (params.clickable) {
      $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
        e.preventDefault();
        var index = $$1(this).index() * swiper.params.slidesPerGroup;
        if (swiper.params.loop) { index += swiper.loopedSlides; }
        swiper.slideTo(index);
      });
    }

    Utils.extend(swiper.pagination, {
      $el: $el,
      el: $el[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var $el = swiper.pagination.$el;

    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
    if (params.clickable) {
      $el.off('click', ("." + (params.bulletClass)));
    }
  },
};

var Pagination$1 = {
  name: 'pagination',
  params: {
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      modifierClass: 'swiper-pagination-', // NEW
      currentClass: 'swiper-pagination-current',
      totalClass: 'swiper-pagination-total',
      hiddenClass: 'swiper-pagination-hidden',
      progressbarFillClass: 'swiper-pagination-progressbar-fill',
      clickableClass: 'swiper-pagination-clickable', // NEW
      lockClass: 'swiper-pagination-lock',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      pagination: {
        init: Pagination.init.bind(swiper),
        render: Pagination.render.bind(swiper),
        update: Pagination.update.bind(swiper),
        destroy: Pagination.destroy.bind(swiper),
        dynamicBulletIndex: 0,
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    },
    activeIndexChange: function activeIndexChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.update();
      } else if (typeof swiper.snapIndex === 'undefined') {
        swiper.pagination.update();
      }
    },
    snapIndexChange: function snapIndexChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.update();
      }
    },
    slidesLengthChange: function slidesLengthChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    snapGridLengthChange: function snapGridLengthChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.pagination.destroy();
    },
    click: function click(e) {
      var swiper = this;
      if (
        swiper.params.pagination.el &&
        swiper.params.pagination.hideOnClick &&
        swiper.pagination.$el.length > 0 &&
        !$$1(e.target).hasClass(swiper.params.pagination.bulletClass)
      ) {
        swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
      }
    },
  },
};

var Scrollbar = {
  setTranslate: function setTranslate() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var rtl = swiper.rtl;
    var progress = swiper.progress;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;
    var params = swiper.params.scrollbar;

    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl && swiper.isHorizontal()) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      if (Support.transforms3d) {
        $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
      } else {
        $dragEl.transform(("translateX(" + newPos + "px)"));
      }
      $dragEl[0].style.width = newSize + "px";
    } else {
      if (Support.transforms3d) {
        $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
      } else {
        $dragEl.transform(("translateY(" + newPos + "px)"));
      }
      $dragEl[0].style.height = newSize + "px";
    }
    if (params.hide) {
      clearTimeout(swiper.scrollbar.timeout);
      $el[0].style.opacity = 1;
      swiper.scrollbar.timeout = setTimeout(function () {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    swiper.scrollbar.$dragEl.transition(duration);
  },
  updateSize: function updateSize() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

    var scrollbar = swiper.scrollbar;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    var divider = swiper.size / swiper.virtualSize;
    var moveDivider = divider * (trackSize / swiper.size);
    var dragSize;
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = dragSize + "px";
    } else {
      $dragEl[0].style.height = dragSize + "px";
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (swiper.params.scrollbarHide) {
      $el[0].style.opacity = 0;
    }
    Utils.extend(scrollbar, {
      trackSize: trackSize,
      divider: divider,
      moveDivider: moveDivider,
      dragSize: dragSize,
    });
    scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
  },
  setDragPosition: function setDragPosition(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;

    var pointerPosition;
    if (swiper.isHorizontal()) {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
    } else {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    }
    var positionRatio;
    positionRatio = ((pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (swiper.rtl) {
      positionRatio = 1 - positionRatio;
    }

    var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  },
  onDragStart: function onDragStart(e) {
    var swiper = this;
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;
    swiper.scrollbar.isTouched = true;
    e.preventDefault();
    e.stopPropagation();

    $wrapperEl.transition(100);
    $dragEl.transition(100);
    scrollbar.setDragPosition(e);

    clearTimeout(swiper.scrollbar.dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    swiper.emit('scrollbarDragStart', e);
  },
  onDragMove: function onDragMove(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;

    if (!swiper.scrollbar.isTouched) { return; }
    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    scrollbar.setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    swiper.emit('scrollbarDragMove', e);
  },
  onDragEnd: function onDragEnd(e) {
    var swiper = this;

    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;

    if (!swiper.scrollbar.isTouched) { return; }
    swiper.scrollbar.isTouched = false;
    if (params.hide) {
      clearTimeout(swiper.scrollbar.dragTimeout);
      swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    swiper.emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideReset();
    }
  },
  enableDraggable: function enableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var touchEvents = swiper.touchEvents;
    var touchEventsDesktop = swiper.touchEventsDesktop;
    var params = swiper.params;
    var $el = scrollbar.$el;
    var target = $el[0];
    var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
    var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
      doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
      doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
    } else {
      if (Support.touch) {
        target.addEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.addEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
      }
    }
  },
  disableDraggable: function disableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var touchEvents = swiper.touchEvents;
    var touchEventsDesktop = swiper.touchEventsDesktop;
    var params = swiper.params;
    var $el = scrollbar.$el;
    var target = $el[0];
    var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
    var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
      doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
      doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
    } else {
      if (Support.touch) {
        target.removeEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.removeEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
      }
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $swiperEl = swiper.$el;
    var params = swiper.params.scrollbar;

    var $el = $$1(params.el);
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
      $el = $swiperEl.find(params.el);
    }

    var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
    if ($dragEl.length === 0) {
      $dragEl = $$1(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
      $el.append($dragEl);
    }

    Utils.extend(scrollbar, {
      $el: $el,
      el: $el[0],
      $dragEl: $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.scrollbar.disableDraggable();
  },
};

var Scrollbar$1 = {
  name: 'scrollbar',
  params: {
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      scrollbar: {
        init: Scrollbar.init.bind(swiper),
        destroy: Scrollbar.destroy.bind(swiper),
        updateSize: Scrollbar.updateSize.bind(swiper),
        setTranslate: Scrollbar.setTranslate.bind(swiper),
        setTransition: Scrollbar.setTransition.bind(swiper),
        enableDraggable: Scrollbar.enableDraggable.bind(swiper),
        disableDraggable: Scrollbar.disableDraggable.bind(swiper),
        setDragPosition: Scrollbar.setDragPosition.bind(swiper),
        onDragStart: Scrollbar.onDragStart.bind(swiper),
        onDragMove: Scrollbar.onDragMove.bind(swiper),
        onDragEnd: Scrollbar.onDragEnd.bind(swiper),
        isTouched: false,
        timeout: null,
        dragTimeout: null,
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
      swiper.scrollbar.setTranslate();
    },
    update: function update() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    resize: function resize() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      swiper.scrollbar.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.scrollbar.setTransition(duration);
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.destroy();
    },
  },
};

var Parallax = {
  setTransform: function setTransform(el, progress) {
    var swiper = this;
    var rtl = swiper.rtl;

    var $el = $$1(el);
    var rtlFactor = rtl ? -1 : 1;

    var p = $el.attr('data-swiper-parallax') || '0';
    var x = $el.attr('data-swiper-parallax-x');
    var y = $el.attr('data-swiper-parallax-y');
    var scale = $el.attr('data-swiper-parallax-scale');
    var opacity = $el.attr('data-swiper-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if ((x).indexOf('%') >= 0) {
      x = (parseInt(x, 10) * progress * rtlFactor) + "%";
    } else {
      x = (x * progress * rtlFactor) + "px";
    }
    if ((y).indexOf('%') >= 0) {
      y = (parseInt(y, 10) * progress) + "%";
    } else {
      y = (y * progress) + "px";
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
      $el[0].style.opacity = currentOpacity;
    }
    if (typeof scale === 'undefined' || scale === null) {
      $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
    } else {
      var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
      $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
    }
  },
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    var progress = swiper.progress;
    var snapGrid = swiper.snapGrid;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, el) {
        swiper.parallax.setTransform(el, progress);
      });
    slides.each(function (slideIndex, slideEl) {
      var slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      $$1(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
    });
  },
  setTransition: function setTransition(duration) {
    if ( duration === void 0 ) duration = this.params.speed;

    var swiper = this;
    var $el = swiper.$el;
    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, parallaxEl) {
        var $parallaxEl = $$1(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) { parallaxDuration = 0; }
        $parallaxEl.transition(parallaxDuration);
      });
  },
};

var Parallax$1 = {
  name: 'parallax',
  params: {
    parallax: {
      enabled: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      parallax: {
        setTransform: Parallax.setTransform.bind(swiper),
        setTranslate: Parallax.setTranslate.bind(swiper),
        setTransition: Parallax.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.parallax.enabled) { return; }
      swiper.params.watchSlidesProgress = true;
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTransition(duration);
    },
  },
};

var Zoom = {
  // Calc Scale From Multi-touches
  getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) { return 1; }
    var x1 = e.targetTouches[0].pageX;
    var y1 = e.targetTouches[0].pageY;
    var x2 = e.targetTouches[1].pageX;
    var y2 = e.targetTouches[1].pageY;
    var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
    return distance;
  },
  // Events
  onGestureStart: function onGestureStart(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    zoom.fakeGestureTouched = false;
    zoom.fakeGestureMoved = false;
    if (!Support.gestures) {
      if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureTouched = true;
      gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      gesture.$slideEl = $$1(e.target).closest('.swiper-slide');
      if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (gesture.$imageWrapEl.length === 0) {
        gesture.$imageEl = undefined;
        return;
      }
    }
    gesture.$imageEl.transition(0);
    swiper.zoom.isScaling = true;
  },
  onGestureChange: function onGestureChange(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support.gestures) {
      if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureMoved = true;
      gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (Support.gestures) {
      swiper.zoom.scale = e.scale * zoom.currentScale;
    } else {
      zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
    }
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
    }
    gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  onGestureEnd: function onGestureEnd(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support.gestures) {
      if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
        return;
      }
      if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
        return;
      }
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    zoom.currentScale = zoom.scale;
    zoom.isScaling = false;
    if (zoom.scale === 1) { gesture.$slideEl = undefined; }
  },
  onTouchStart: function onTouchStart(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (image.isTouched) { return; }
    if (Device.android) { e.preventDefault(); }
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  },
  onTouchMove: function onTouchMove(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    swiper.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) { return; }

    if (!image.isMoved) {
      image.width = gesture.$imageEl[0].offsetWidth;
      image.height = gesture.$imageEl[0].offsetHeight;
      image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
      image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
      gesture.$imageWrapEl.transition(0);
      if (swiper.rtl) { image.startX = -image.startX; }
      if (swiper.rtl) { image.startY = -image.startY; }
    }
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;

    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;

    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !zoom.isScaling) {
      if (
        swiper.isHorizontal() &&
        (
          (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x) ||
          (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
        )
      ) {
        image.isTouched = false;
        return;
      } else if (
        !swiper.isHorizontal() &&
        (
          (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y) ||
          (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
        )
      ) {
        image.isTouched = false;
        return;
      }
    }
    e.preventDefault();
    e.stopPropagation();

    image.isMoved = true;
    image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
    image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
    }
    if (image.currentX > image.maxX) {
      image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
    }

    if (image.currentY < image.minY) {
      image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
    }
    if (image.currentY > image.maxY) {
      image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
    }

    // Velocity
    if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
    if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
    if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();

    gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTouchEnd: function onTouchEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    var momentumDurationX = 300;
    var momentumDurationY = 300;
    var momentumDistanceX = velocity.x * momentumDurationX;
    var newPositionX = image.currentX + momentumDistanceX;
    var momentumDistanceY = velocity.y * momentumDurationY;
    var newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
    if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

    image.currentX = newPositionX;
    image.currentY = newPositionY;

    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

    gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTransitionEnd: function onTransitionEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
      gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
      gesture.$imageWrapEl.transform('translate3d(0,0,0)');
      gesture.$slideEl = undefined;
      gesture.$imageEl = undefined;
      gesture.$imageWrapEl = undefined;

      zoom.scale = 1;
      zoom.currentScale = 1;
    }
  },
  // Toggle Zoom
  toggle: function toggle(e) {
    var swiper = this;
    var zoom = swiper.zoom;

    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoom.out();
    } else {
      // Zoom In
      zoom.in(e);
    }
  },
  in: function in$1(e) {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $$1(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

    var touchX;
    var touchY;
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var translateX;
    var translateY;
    var imageWidth;
    var imageHeight;
    var scaledWidth;
    var scaledHeight;
    var translateMinX;
    var translateMinY;
    var translateMaxX;
    var translateMaxY;
    var slideWidth;
    var slideHeight;

    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }

    zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    if (e) {
      slideWidth = gesture.$slideEl[0].offsetWidth;
      slideHeight = gesture.$slideEl[0].offsetHeight;
      offsetX = gesture.$slideEl.offset().left;
      offsetY = gesture.$slideEl.offset().top;
      diffX = (offsetX + (slideWidth / 2)) - touchX;
      diffY = (offsetY + (slideHeight / 2)) - touchY;

      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;

      translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
      translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;

      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;

      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }

      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
    gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  out: function out() {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $$1(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    zoom.scale = 1;
    zoom.currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
    gesture.$slideEl = undefined;
  },
  // Attach/Detach Events
  enable: function enable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (zoom.enabled) { return; }
    zoom.enabled = true;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support.gestures) {
      swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
  },
  disable: function disable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (!zoom.enabled) { return; }

    swiper.zoom.enabled = false;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support.gestures) {
      swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
  },
};

var Zoom$1 = {
  name: 'zoom',
  params: {
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed',
    },
  },
  create: function create() {
    var swiper = this;
    var zoom = {
      enabled: false,
      scale: 1,
      currentScale: 1,
      isScaling: false,
      gesture: {
        $slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        $imageEl: undefined,
        $imageWrapEl: undefined,
        maxRatio: 3,
      },
      image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {},
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined,
      },
    };
    ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
      zoom[methodName] = Zoom[methodName].bind(swiper);
    });
    Utils.extend(swiper, {
      zoom: zoom,
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.zoom.enabled) {
        swiper.zoom.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.zoom.disable();
    },
    touchStart: function touchStart(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchStart(e);
    },
    touchEnd: function touchEnd(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchEnd(e);
    },
    doubleTap: function doubleTap(e) {
      var swiper = this;
      if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
        swiper.zoom.toggle(e);
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        swiper.zoom.onTransitionEnd();
      }
    },
  },
};

var Lazy = {
  loadInSlide: function loadInSlide(index, loadInDuplicate) {
    if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

    var swiper = this;
    var params = swiper.params.lazy;
    if (typeof index === 'undefined') { return; }
    if (swiper.slides.length === 0) { return; }
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

    var $slideEl = isVirtual
      ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
      : swiper.slides.eq(index);

    var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
      $images = $images.add($slideEl[0]);
    }
    if ($images.length === 0) { return; }

    $images.each(function (imageIndex, imageEl) {
      var $imageEl = $$1(imageEl);
      $imageEl.addClass(params.loadingClass);

      var background = $imageEl.attr('data-background');
      var src = $imageEl.attr('data-src');
      var srcset = $imageEl.attr('data-srcset');
      var sizes = $imageEl.attr('data-sizes');

      swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
        if (background) {
          $imageEl.css('background-image', ("url(\"" + background + "\")"));
          $imageEl.removeAttr('data-background');
        } else {
          if (srcset) {
            $imageEl.attr('srcset', srcset);
            $imageEl.removeAttr('data-srcset');
          }
          if (sizes) {
            $imageEl.attr('sizes', sizes);
            $imageEl.removeAttr('data-sizes');
          }
          if (src) {
            $imageEl.attr('src', src);
            $imageEl.removeAttr('data-src');
          }
        }

        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
        $slideEl.find(("." + (params.preloaderClass))).remove();
        if (swiper.params.loop && loadInDuplicate) {
          var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
            var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
            swiper.lazy.loadInSlide(originalSlide.index(), false);
          } else {
            var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
            swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
          }
        }
        swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
      });

      swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  },
  load: function load() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var swiperParams = swiper.params;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
    var params = swiperParams.lazy;

    var slidesPerView = swiperParams.slidesPerView;
    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
          return true;
        }
      } else if (slides[index]) { return true; }
      return false;
    }
    function slideIndex(slideEl) {
      if (isVirtual) {
        return $$1(slideEl).attr('data-swiper-slide-index');
      }
      return $$1(slideEl).index();
    }

    if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
    if (swiper.params.watchSlidesVisibility) {
      $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
        var index = isVirtual ? $$1(slideEl).attr('data-swiper-slide-index') : $$1(slideEl).index();
        swiper.lazy.loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
      }
    } else {
      swiper.lazy.loadInSlide(activeIndex);
    }
    if (params.loadPrevNext) {
      if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
        var amount = params.loadPrevNextAmount;
        var spv = slidesPerView;
        var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
        // Next Slides
        for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
          if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
        }
        // Prev Slides
        for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
          if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
        }
      } else {
        var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
        if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

        var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
        if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
      }
    }
  },
};

var Lazy$1 = {
  name: 'lazy',
  params: {
    lazy: {
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,

      elementClass: 'swiper-lazy',
      loadingClass: 'swiper-lazy-loading',
      loadedClass: 'swiper-lazy-loaded',
      preloaderClass: 'swiper-lazy-preloader',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      lazy: {
        initialImageLoaded: false,
        load: Lazy.load.bind(swiper),
        loadInSlide: Lazy.loadInSlide.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
        swiper.params.preloadImages = false;
      }
    },
    init: function init() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
        swiper.lazy.load();
      }
    },
    scroll: function scroll() {
      var swiper = this;
      if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
        swiper.lazy.load();
      }
    },
    resize: function resize() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    scrollbarDragMove: function scrollbarDragMove() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    transitionStart: function transitionStart() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
          swiper.lazy.load();
        }
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
        swiper.lazy.load();
      }
    },
  },
};

/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
var Controller = {
  LinearSpline: function LinearSpline(x, y) {
    var binarySearch = (function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }());
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1;
    var i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) { return 0; }

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
    };
    return this;
  },
  // xxx: for now i will just save one spline function to to
  getInterpolateFunction: function getInterpolateFunction(c) {
    var swiper = this;
    if (!swiper.controller.spline) {
      swiper.controller.spline = swiper.params.loop ?
        new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) :
        new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
    }
  },
  setTranslate: function setTranslate(setTranslate$1, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    function setControlledTranslate(c) {
      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      var translate = c.rtl && c.params.direction === 'horizontal' ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        swiper.controller.getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
      }

      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper$1) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper$1 && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  },
  setTransition: function setTransition(duration, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        c.$wrapperEl.transitionEnd(function () {
          if (!controlled) { return; }
          if (c.params.loop && swiper.params.controller.by === 'slide') {
            c.loopFix();
          }
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper$1) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper$1 && byController !== controlled) {
      setControlledTransition(controlled);
    }
  },
};
var Controller$1 = {
  name: 'controller',
  params: {
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide', // or 'container'
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      controller: {
        control: swiper.params.controller.control,
        getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
        setTranslate: Controller.setTranslate.bind(swiper),
        setTransition: Controller.setTransition.bind(swiper),
      },
    });
  },
  on: {
    update: function update() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    resize: function resize() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    setTranslate: function setTranslate(translate, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTranslate(translate, byController);
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTransition(duration, byController);
    },
  },
};

var a11y = {
  makeElFocusable: function makeElFocusable($el) {
    $el.attr('tabIndex', '0');
    return $el;
  },
  addElRole: function addElRole($el, role) {
    $el.attr('role', role);
    return $el;
  },
  addElLabel: function addElLabel($el, label) {
    $el.attr('aria-label', label);
    return $el;
  },
  disableEl: function disableEl($el) {
    $el.attr('aria-disabled', true);
    return $el;
  },
  enableEl: function enableEl($el) {
    $el.attr('aria-disabled', false);
    return $el;
  },
  onEnterKey: function onEnterKey(e) {
    var swiper = this;
    var params = swiper.params.a11y;
    if (e.keyCode !== 13) { return; }
    var $targetEl = $$1(e.target);
    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        swiper.a11y.notify(params.lastSlideMessage);
      } else {
        swiper.a11y.notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        swiper.a11y.notify(params.firstSlideMessage);
      } else {
        swiper.a11y.notify(params.prevSlideMessage);
      }
    }
    if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
      $targetEl[0].click();
    }
  },
  notify: function notify(message) {
    var swiper = this;
    var notification = swiper.a11y.liveRegion;
    if (notification.length === 0) { return; }
    notification.html('');
    notification.html(message);
  },
  updateNavigation: function updateNavigation() {
    var swiper = this;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        swiper.a11y.disableEl($prevEl);
      } else {
        swiper.a11y.enableEl($prevEl);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        swiper.a11y.disableEl($nextEl);
      } else {
        swiper.a11y.enableEl($nextEl);
      }
    }
  },
  updatePagination: function updatePagination() {
    var swiper = this;
    var params = swiper.params.a11y;
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
        var $bulletEl = $$1(bulletEl);
        swiper.a11y.makeElFocusable($bulletEl);
        swiper.a11y.addElRole($bulletEl, 'button');
        swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
      });
    }
  },
  init: function init() {
    var swiper = this;

    swiper.$el.append(swiper.a11y.liveRegion);

    // Navigation
    var params = swiper.params.a11y;
    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      swiper.a11y.makeElFocusable($nextEl);
      swiper.a11y.addElRole($nextEl, 'button');
      swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
      $nextEl.on('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      swiper.a11y.makeElFocusable($prevEl);
      swiper.a11y.addElRole($prevEl, 'button');
      swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
      $prevEl.on('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      $nextEl.off('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      $prevEl.off('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
};
var A11y = {
  name: 'a11y',
  params: {
    a11y: {
      enabled: false,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      a11y: {
        liveRegion: $$1(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
      },
    });
    Object.keys(a11y).forEach(function (methodName) {
      swiper.a11y[methodName] = a11y[methodName].bind(swiper);
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.init();
      swiper.a11y.updateNavigation();
    },
    toEdge: function toEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    paginationUpdate: function paginationUpdate() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updatePagination();
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.destroy();
    },
  },
};

var History = {
  init: function init() {
    var swiper = this;
    if (!swiper.params.history) { return; }
    if (!win.history || !win.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    var history = swiper.history;
    history.initialized = true;
    history.paths = History.getPathValues();
    if (!history.paths.key && !history.paths.value) { return; }
    history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      win.addEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (!swiper.params.history.replaceState) {
      win.removeEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  setHistoryPopState: function setHistoryPopState() {
    var swiper = this;
    swiper.history.paths = History.getPathValues();
    swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
  },
  getPathValues: function getPathValues() {
    var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
    var total = pathArray.length;
    var key = pathArray[total - 2];
    var value = pathArray[total - 1];
    return { key: key, value: value };
  },
  setHistory: function setHistory(key, index) {
    var swiper = this;
    if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
    var slide = swiper.slides.eq(index);
    var value = History.slugify(slide.attr('data-history'));
    if (!win.location.pathname.includes(key)) {
      value = key + "/" + value;
    }
    var currentState = win.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      win.history.replaceState({ value: value }, null, value);
    } else {
      win.history.pushState({ value: value }, null, value);
    }
  },
  slugify: function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
  scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
    var swiper = this;
    if (value) {
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides.eq(i);
        var slideHistory = History.slugify(slide.attr('data-history'));
        if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          var index = slide.index();
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  },
};

var History$1 = {
  name: 'history',
  params: {
    history: {
      enabled: false,
      replaceState: false,
      key: 'slides',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      history: {
        init: History.init.bind(swiper),
        setHistory: History.setHistory.bind(swiper),
        setHistoryPopState: History.setHistoryPopState.bind(swiper),
        scrollToSlide: History.scrollToSlide.bind(swiper),
        destroy: History.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.history.enabled) {
        swiper.history.init();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.history.enabled) {
        swiper.history.destroy();
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.history.initialized) {
        swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    },
  },
};

var HashNavigation = {
  onHashCange: function onHashCange() {
    var swiper = this;
    var newHash = doc.location.hash.replace('#', '');
    var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
    if (newHash !== activeSlideHash) {
      swiper.slideTo(swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index());
    }
  },
  setHash: function setHash() {
    var swiper = this;
    if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
    if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
      win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
    } else {
      var slide = swiper.slides.eq(swiper.activeIndex);
      var hash = slide.attr('data-hash') || slide.attr('data-history');
      doc.location.hash = hash || '';
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
    swiper.hashNavigation.initialized = true;
    var hash = doc.location.hash.replace('#', '');
    if (hash) {
      var speed = 0;
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides.eq(i);
        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
        if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          var index = slide.index();
          swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
        }
      }
    }
    if (swiper.params.hashNavigation.watchState) {
      $$1(win).on('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.params.hashNavigation.watchState) {
      $$1(win).off('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
};
var HashNavigation$1 = {
  name: 'hash-navigation',
  params: {
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      hashNavigation: {
        initialized: false,
        init: HashNavigation.init.bind(swiper),
        destroy: HashNavigation.destroy.bind(swiper),
        setHash: HashNavigation.setHash.bind(swiper),
        onHashCange: HashNavigation.onHashCange.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.init();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.destroy();
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.hashNavigation.initialized) {
        swiper.hashNavigation.setHash();
      }
    },
  },
};

var Autoplay = {
  run: function run() {
    var swiper = this;
    var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    var delay = swiper.params.autoplay.delay;
    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }
    swiper.autoplay.timeout = Utils.nextTick(function () {
      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slidePrev(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isBeginning) {
          swiper.slidePrev(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.isEnd) {
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        swiper.slideTo(0, swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else {
        swiper.autoplay.stop();
      }
    }, delay);
  },
  start: function start() {
    var swiper = this;
    if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
    if (swiper.autoplay.running) { return false; }
    swiper.autoplay.running = true;
    swiper.emit('autoplayStart');
    swiper.autoplay.run();
    return true;
  },
  stop: function stop() {
    var swiper = this;
    if (!swiper.autoplay.running) { return false; }
    if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

    if (swiper.autoplay.timeout) {
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = undefined;
    }
    swiper.autoplay.running = false;
    swiper.emit('autoplayStop');
    return true;
  },
  pause: function pause(speed) {
    var swiper = this;
    if (!swiper.autoplay.running) { return; }
    if (swiper.autoplay.paused) { return; }
    if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
    swiper.autoplay.paused = true;
    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      swiper.autoplay.run();
    } else {
      swiper.$wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.autoplay.paused = false;
        if (!swiper.autoplay.running) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.run();
        }
      });
    }
  },
};

var Autoplay$1 = {
  name: 'autoplay',
  params: {
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      autoplay: {
        running: false,
        paused: false,
        run: Autoplay.run.bind(swiper),
        start: Autoplay.start.bind(swiper),
        stop: Autoplay.stop.bind(swiper),
        pause: Autoplay.pause.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.autoplay.enabled) {
        swiper.autoplay.start();
      }
    },
    beforeTransitionStart: function beforeTransitionStart(speed, internal) {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.pause(speed);
        } else {
          swiper.autoplay.stop();
        }
      }
    },
    sliderFirstMove: function sliderFirstMove() {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.pause();
        }
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
    },
  },
};

var Fade = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = swiper.slides.eq(i);
      var offset = $slideEl[0].swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ?
        Math.max(1 - Math.abs($slideEl[0].progress), 0) :
        1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
      $slideEl
        .css({
          opacity: slideOpacity,
        })
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    slides.transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      slides.transitionEnd(function () {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFade = {
  name: 'effect-fade',
  params: {
    fadeEffect: {
      crossFade: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      fadeEffect: {
        setTranslate: Fade.setTranslate.bind(swiper),
        setTransition: Fade.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTransition(duration);
    },
  },
};

var Cube = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var rtl = swiper.rtl;
    var swiperSize = swiper.size;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $$1('<div class="swiper-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }
        $cubeShadowEl.css({ height: (swiperWidth + "px") });
      } else {
        $cubeShadowEl = $el.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $$1('<div class="swiper-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + (round * 4 * swiperSize);
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = (3 * swiperSize) + (swiperSize * 4 * round);
      }
      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
      if (progress <= 1 && progress > -1) {
        wrapperRotate = (slideIndex * 90) + (progress * 90);
        if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
      }
      $slideEl.transform(transform);
      if (params.slideShadows) {
        // Set shadows
        var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
    }
    $wrapperEl.css({
      '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
    });

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
        var multiplier = 1.5 - (
          (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2) +
          (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
        );
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
      }
    }
    var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
    $wrapperEl
      .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      $el.find('.swiper-cube-shadow').transition(duration);
    }
  },
};

var EffectCube = {
  name: 'effect-cube',
  params: {
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      cubeEffect: {
        setTranslate: Cube.setTranslate.bind(swiper),
        setTransition: Cube.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTransition(duration);
    },
  },
};

var Flip = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var progress = $slideEl[0].progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      var offset = $slideEl[0].swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (swiper.rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (swiper.params.flipEffect.slideShadows) {
        // Set shadows
        var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $$1(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $$1(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
      $slideEl
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var $wrapperEl = swiper.$wrapperEl;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      // eslint-disable-next-line
      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFlip = {
  name: 'effect-flip',
  params: {
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      flipEffect: {
        setTranslate: Flip.setTranslate.bind(swiper),
        setTransition: Flip.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTransition(duration);
    },
  },
};

var Coverflow = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth;
    // Each slide offset from center
    for (var i = 0, length = slides.length; i < length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl[0].swiperSlideOffset;
      var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      var translateZ = -translate * Math.abs(offsetMultiplier);

      var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
      var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) { translateX = 0; }
      if (Math.abs(translateY) < 0.001) { translateY = 0; }
      if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
      if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
      if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

      var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append($shadowBeforeEl);
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append($shadowAfterEl);
        }
        if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
        if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
      }
    }

    // Set correct perspective for IE10
    if (Support.pointerEvents || Support.prefixedPointerEvents) {
      var ws = $wrapperEl[0].style;
      ws.perspectiveOrigin = center + "px 50%";
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    swiper.slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
  },
};

var EffectCoverflow = {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      coverflowEffect: {
        setTranslate: Coverflow.setTranslate.bind(swiper),
        setTransition: Coverflow.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }

      swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTransition(duration);
    },
  },
};

// Swiper Class
// Core Modules
var components = [
  Device$2,
  Support$2,
  Browser$2,
  Resize,
  Observer$1,
  Virtual$1,
  Keyboard$1,
  Mousewheel$1,
  Navigation$1,
  Pagination$1,
  Scrollbar$1,
  Parallax$1,
  Zoom$1,
  Lazy$1,
  Controller$1,
  A11y,
  History$1,
  HashNavigation$1,
  Autoplay$1,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow
];

if (typeof Swiper$1.use === 'undefined') {
  Swiper$1.use = Swiper$1.Class.use;
  Swiper$1.installModule = Swiper$1.Class.installModule;
}

Swiper$1.use(components);

return Swiper$1;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9ub2RlX21vZHVsZXMvc3NyLXdpbmRvdy9kaXN0L3Nzci13aW5kb3cuZXNtLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L25vZGVfbW9kdWxlcy9kb203L2Rpc3QvZG9tNy5tb2R1bGFyLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy91dGlscy9kb20uanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL3V0aWxzL3V0aWxzLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy91dGlscy9zdXBwb3J0LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy91dGlscy9jbGFzcy5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3VwZGF0ZS91cGRhdGVTaXplLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvdXBkYXRlL3VwZGF0ZVNsaWRlcy5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3VwZGF0ZS91cGRhdGVBdXRvSGVpZ2h0LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvdXBkYXRlL3VwZGF0ZVNsaWRlc09mZnNldC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3VwZGF0ZS91cGRhdGVTbGlkZXNQcm9ncmVzcy5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3VwZGF0ZS91cGRhdGVQcm9ncmVzcy5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3VwZGF0ZS91cGRhdGVTbGlkZXNDbGFzc2VzLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvdXBkYXRlL3VwZGF0ZUFjdGl2ZUluZGV4LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvdXBkYXRlL3VwZGF0ZUNsaWNrZWRTbGlkZS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3VwZGF0ZS9pbmRleC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3RyYW5zbGF0ZS9nZXRUcmFuc2xhdGUuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS90cmFuc2xhdGUvc2V0VHJhbnNsYXRlLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvdHJhbnNsYXRlL21pblRyYW5zbGF0ZS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3RyYW5zbGF0ZS9tYXhUcmFuc2xhdGUuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS90cmFuc2xhdGUvaW5kZXguanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS90cmFuc2l0aW9uL3NldFRyYW5zaXRpb24uanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS90cmFuc2l0aW9uL3RyYW5zaXRpb25TdGFydC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3RyYW5zaXRpb24vdHJhbnNpdGlvbkVuZC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3RyYW5zaXRpb24vaW5kZXguanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9zbGlkZS9zbGlkZVRvLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvc2xpZGUvc2xpZGVUb0xvb3AuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9zbGlkZS9zbGlkZU5leHQuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9zbGlkZS9zbGlkZVByZXYuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9zbGlkZS9zbGlkZVJlc2V0LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvc2xpZGUvc2xpZGVUb0NsaWNrZWRTbGlkZS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL3NsaWRlL2luZGV4LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvbG9vcC9sb29wQ3JlYXRlLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvbG9vcC9sb29wRml4LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvbG9vcC9sb29wRGVzdHJveS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2xvb3AvaW5kZXguanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9ncmFiLWN1cnNvci9zZXRHcmFiQ3Vyc29yLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvZ3JhYi1jdXJzb3IvdW5zZXRHcmFiQ3Vyc29yLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvZ3JhYi1jdXJzb3IvaW5kZXguanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9tYW5pcHVsYXRpb24vYXBwZW5kU2xpZGUuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9tYW5pcHVsYXRpb24vcHJlcGVuZFNsaWRlLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvbWFuaXB1bGF0aW9uL3JlbW92ZVNsaWRlLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvbWFuaXB1bGF0aW9uL3JlbW92ZUFsbFNsaWRlcy5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL21hbmlwdWxhdGlvbi9pbmRleC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvdXRpbHMvZGV2aWNlLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvZXZlbnRzL29uVG91Y2hTdGFydC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2V2ZW50cy9vblRvdWNoTW92ZS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2V2ZW50cy9vblRvdWNoRW5kLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvZXZlbnRzL29uUmVzaXplLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvZXZlbnRzL29uQ2xpY2suanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9ldmVudHMvaW5kZXguanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9icmVha3BvaW50cy9zZXRCcmVha3BvaW50LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvYnJlYWtwb2ludHMvZ2V0QnJlYWtwb2ludC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2JyZWFrcG9pbnRzL2luZGV4LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy91dGlscy9icm93c2VyLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvY2xhc3Nlcy9hZGRDbGFzc2VzLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvY2xhc3Nlcy9yZW1vdmVDbGFzc2VzLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvY2xhc3Nlcy9pbmRleC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2ltYWdlcy9sb2FkSW1hZ2UuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9pbWFnZXMvcHJlbG9hZEltYWdlcy5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2ltYWdlcy9pbmRleC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9jb3JlL2NoZWNrLW92ZXJmbG93L2luZGV4LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2NvcmUvZGVmYXVsdHMuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29yZS9jb3JlLWNsYXNzLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9tb2R1bGVzL2RldmljZS9kZXZpY2UuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL21vZHVsZXMvc3VwcG9ydC9zdXBwb3J0LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9tb2R1bGVzL2Jyb3dzZXIvYnJvd3Nlci5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvbW9kdWxlcy9yZXNpemUvcmVzaXplLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9tb2R1bGVzL29ic2VydmVyL29ic2VydmVyLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL3ZpcnR1YWwvdmlydHVhbC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9rZXlib2FyZC9rZXlib2FyZC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9tb3VzZXdoZWVsL21vdXNld2hlZWwuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9zY3JvbGxiYXIvc2Nyb2xsYmFyLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL3BhcmFsbGF4L3BhcmFsbGF4LmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL3pvb20vem9vbS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9sYXp5L2xhenkuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvY29udHJvbGxlci9jb250cm9sbGVyLmpzIiwiL1VzZXJzL3p4Yy9Eb3dubG9hZHMvc3dpcGVyLTQuMS41L3NyYy9jb21wb25lbnRzL2ExMXkvYTExeS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9oaXN0b3J5L2hpc3RvcnkuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL2NvbXBvbmVudHMvaGFzaC1uYXZpZ2F0aW9uL2hhc2gtbmF2aWdhdGlvbi5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9hdXRvcGxheS9hdXRvcGxheS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9lZmZlY3QtZmFkZS9lZmZlY3QtZmFkZS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9lZmZlY3QtY3ViZS9lZmZlY3QtY3ViZS5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9lZmZlY3QtZmxpcC9lZmZlY3QtZmxpcC5qcyIsIi9Vc2Vycy96eGMvRG93bmxvYWRzL3N3aXBlci00LjEuNS9zcmMvY29tcG9uZW50cy9lZmZlY3QtY292ZXJmbG93L2VmZmVjdC1jb3ZlcmZsb3cuanMiLCIvVXNlcnMvenhjL0Rvd25sb2Fkcy9zd2lwZXItNC4xLjUvc3JjL3N3aXBlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNTUiBXaW5kb3cgMS4wLjBcbiAqIEJldHRlciBoYW5kbGluZyBmb3Igd2luZG93IG9iamVjdCBpbiBTU1IgZW52aXJvbm1lbnRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2xpbWl0czR3ZWIvc3NyLXdpbmRvd1xuICpcbiAqIENvcHlyaWdodCAyMDE4LCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICpcbiAqIFJlbGVhc2VkIG9uOiBGZWJydWFyeSAxMCwgMjAxOFxuICovXG52YXIgZDtcbmlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gIGQgPSB7XG4gICAgYm9keToge30sXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcigpIHt9LFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgICBhY3RpdmVFbGVtZW50OiB7XG4gICAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge30sXG4gICAgICBub2RlTmFtZTogJycsXG4gICAgfSxcbiAgICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgZ2V0RWxlbWVudEJ5SWQ6IGZ1bmN0aW9uIGdldEVsZW1lbnRCeUlkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbml0RXZlbnQ6IGZ1bmN0aW9uIGluaXRFdmVudCgpIHt9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgICAgICBzdHlsZToge30sXG4gICAgICAgIHNldEF0dHJpYnV0ZTogZnVuY3Rpb24gc2V0QXR0cmlidXRlKCkge30sXG4gICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lOiBmdW5jdGlvbiBnZXRFbGVtZW50c0J5VGFnTmFtZSgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXG4gICAgbG9jYXRpb246IHsgaGFzaDogJycgfSxcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBkID0gZG9jdW1lbnQ7XG59XG5cbnZhciBkb2MgPSBkO1xuXG52YXIgdztcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICB3ID0ge1xuICAgIGRvY3VtZW50OiBkb2MsXG4gICAgbmF2aWdhdG9yOiB7XG4gICAgICB1c2VyQWdlbnQ6ICcnLFxuICAgIH0sXG4gICAgbG9jYXRpb246IHt9LFxuICAgIGhpc3Rvcnk6IHt9LFxuICAgIEN1c3RvbUV2ZW50OiBmdW5jdGlvbiBDdXN0b21FdmVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcigpIHt9LFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgICBnZXRDb21wdXRlZFN0eWxlOiBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvcGVydHlWYWx1ZTogZnVuY3Rpb24gZ2V0UHJvcGVydHlWYWx1ZSgpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXG4gICAgSW1hZ2U6IGZ1bmN0aW9uIEltYWdlKCkge30sXG4gICAgRGF0ZTogZnVuY3Rpb24gRGF0ZSgpIHt9LFxuICAgIHNjcmVlbjoge30sXG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24gc2V0VGltZW91dCgpIHt9LFxuICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24gY2xlYXJUaW1lb3V0KCkge30sXG4gIH07XG59IGVsc2Uge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgdyA9IHdpbmRvdztcbn1cblxudmFyIHdpbiA9IHc7XG5cbmV4cG9ydCB7IHdpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudCB9O1xuIiwiLyoqXG4gKiBEb203IDIuMC4yXG4gKiBNaW5pbWFsaXN0aWMgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBET00gbWFuaXB1bGF0aW9uLCB3aXRoIGEgalF1ZXJ5LWNvbXBhdGlibGUgQVBJXG4gKiBodHRwOi8vZnJhbWV3b3JrNy5pby9kb2NzL2RvbS5odG1sXG4gKlxuICogQ29weXJpZ2h0IDIwMTgsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKiBUaGUgaURhbmdlcm8udXNcbiAqIGh0dHA6Ly93d3cuaWRhbmdlcm8udXMvXG4gKlxuICogTGljZW5zZWQgdW5kZXIgTUlUXG4gKlxuICogUmVsZWFzZWQgb246IEZlYnJ1YXJ5IDEwLCAyMDE4XG4gKi9cbmltcG9ydCB7IGRvY3VtZW50LCB3aW5kb3cgfSBmcm9tICdzc3Itd2luZG93JztcblxuY2xhc3MgRG9tNyB7XG4gIGNvbnN0cnVjdG9yKGFycikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIC8vIENyZWF0ZSBhcnJheS1saWtlIG9iamVjdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBzZWxmW2ldID0gYXJyW2ldO1xuICAgIH1cbiAgICBzZWxmLmxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgLy8gUmV0dXJuIGNvbGxlY3Rpb24gd2l0aCBtZXRob2RzXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gJChzZWxlY3RvciwgY29udGV4dCkge1xuICBjb25zdCBhcnIgPSBbXTtcbiAgbGV0IGkgPSAwO1xuICBpZiAoc2VsZWN0b3IgJiYgIWNvbnRleHQpIHtcbiAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuICB9XG4gIGlmIChzZWxlY3Rvcikge1xuICAgICAgLy8gU3RyaW5nXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBlbHM7XG4gICAgICBsZXQgdGVtcFBhcmVudDtcbiAgICAgIGNvbnN0IGh0bWwgPSBzZWxlY3Rvci50cmltKCk7XG4gICAgICBpZiAoaHRtbC5pbmRleE9mKCc8JykgPj0gMCAmJiBodG1sLmluZGV4T2YoJz4nKSA+PSAwKSB7XG4gICAgICAgIGxldCB0b0NyZWF0ZSA9ICdkaXYnO1xuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8bGknKSA9PT0gMCkgdG9DcmVhdGUgPSAndWwnO1xuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dHInKSA9PT0gMCkgdG9DcmVhdGUgPSAndGJvZHknO1xuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGQnKSA9PT0gMCB8fCBodG1sLmluZGV4T2YoJzx0aCcpID09PSAwKSB0b0NyZWF0ZSA9ICd0cic7XG4gICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0Ym9keScpID09PSAwKSB0b0NyZWF0ZSA9ICd0YWJsZSc7XG4gICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxvcHRpb24nKSA9PT0gMCkgdG9DcmVhdGUgPSAnc2VsZWN0JztcbiAgICAgICAgdGVtcFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodG9DcmVhdGUpO1xuICAgICAgICB0ZW1wUGFyZW50LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0ZW1wUGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBhcnIucHVzaCh0ZW1wUGFyZW50LmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWNvbnRleHQgJiYgc2VsZWN0b3JbMF0gPT09ICcjJyAmJiAhc2VsZWN0b3IubWF0Y2goL1sgLjw+On5dLykpIHtcbiAgICAgICAgICAvLyBQdXJlIElEIHNlbGVjdG9yXG4gICAgICAgICAgZWxzID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yLnRyaW0oKS5zcGxpdCgnIycpWzFdKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXIgc2VsZWN0b3JzXG4gICAgICAgICAgZWxzID0gKGNvbnRleHQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IudHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGVsc1tpXSkgYXJyLnB1c2goZWxzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgc2VsZWN0b3IgPT09IHdpbmRvdyB8fCBzZWxlY3RvciA9PT0gZG9jdW1lbnQpIHtcbiAgICAgIC8vIE5vZGUvZWxlbWVudFxuICAgICAgYXJyLnB1c2goc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IubGVuZ3RoID4gMCAmJiBzZWxlY3RvclswXS5ub2RlVHlwZSkge1xuICAgICAgLy8gQXJyYXkgb2YgZWxlbWVudHMgb3IgaW5zdGFuY2Ugb2YgRG9tXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJyLnB1c2goc2VsZWN0b3JbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IERvbTcoYXJyKTtcbn1cblxuJC5mbiA9IERvbTcucHJvdG90eXBlO1xuJC5DbGFzcyA9IERvbTc7XG4kLkRvbTcgPSBEb203O1xuXG5mdW5jdGlvbiB1bmlxdWUoYXJyKSB7XG4gIGNvbnN0IHVuaXF1ZUFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHVuaXF1ZUFycmF5LmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHVuaXF1ZUFycmF5LnB1c2goYXJyW2ldKTtcbiAgfVxuICByZXR1cm4gdW5pcXVlQXJyYXk7XG59XG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oLikvZywgKG1hdGNoLCBncm91cDEpID0+IGdyb3VwMS50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gIGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XG4gIGVsc2UgaWYgKHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcbiAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xufVxuZnVuY3Rpb24gY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpIHtcbiAgaWYgKHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSkgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gIGVsc2UgaWYgKHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSkgcmV0dXJuIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gIHJldHVybiB3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTtcbn1cblxuLy8gQ2xhc3NlcyBhbmQgYXR0cmlidXRlc1xuZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbal0uY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykgdGhpc1tqXS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICBjb25zdCBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzW2pdLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHRoaXNbal0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgaWYgKCF0aGlzWzBdKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0aGlzWzBdLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xufVxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbal0uY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykgdGhpc1tqXS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIGF0dHIoYXR0cnMsIHZhbHVlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhdHRycyA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBHZXQgYXR0clxuICAgIGlmICh0aGlzWzBdKSByZXR1cm4gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cnMpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBTZXQgYXR0cnNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIFN0cmluZ1xuICAgICAgdGhpc1tpXS5zZXRBdHRyaWJ1dGUoYXR0cnMsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT2JqZWN0XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGZvciAoY29uc3QgYXR0ck5hbWUgaW4gYXR0cnMpIHtcbiAgICAgICAgdGhpc1tpXVthdHRyTmFtZV0gPSBhdHRyc1thdHRyTmFtZV07XG4gICAgICAgIHRoaXNbaV0uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuZnVuY3Rpb24gcmVtb3ZlQXR0cihhdHRyKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoaXNbaV0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5mdW5jdGlvbiBwcm9wKHByb3BzLCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gR2V0IHByb3BcbiAgICBpZiAodGhpc1swXSkgcmV0dXJuIHRoaXNbMF1bcHJvcHNdO1xuICB9IGVsc2Uge1xuICAgIC8vIFNldCBwcm9wc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgLy8gU3RyaW5nXG4gICAgICAgIHRoaXNbaV1bcHJvcHNdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPYmplY3RcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICB0aGlzW2ldW3Byb3BOYW1lXSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuZnVuY3Rpb24gZGF0YShrZXksIHZhbHVlKSB7XG4gIGxldCBlbDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbCA9IHRoaXNbMF07XG4gICAgLy8gR2V0IHZhbHVlXG4gICAgaWYgKGVsKSB7XG4gICAgICBpZiAoZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSAmJiAoa2V5IGluIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UpKSB7XG4gICAgICAgIHJldHVybiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFLZXkgPSBlbC5nZXRBdHRyaWJ1dGUoYGRhdGEtJHtrZXl9YCk7XG4gICAgICBpZiAoZGF0YUtleSkge1xuICAgICAgICByZXR1cm4gZGF0YUtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBTZXQgdmFsdWVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZWwgPSB0aGlzW2ldO1xuICAgIGlmICghZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSkgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSA9IHt9O1xuICAgIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gcmVtb3ZlRGF0YShrZXkpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzW2ldO1xuICAgIGlmIChlbC5kb203RWxlbWVudERhdGFTdG9yYWdlICYmIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2Vba2V5XSkge1xuICAgICAgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldID0gbnVsbDtcbiAgICAgIGRlbGV0ZSBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV07XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBkYXRhc2V0KCkge1xuICBjb25zdCBlbCA9IHRoaXNbMF07XG4gIGlmICghZWwpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IGRhdGFzZXQgPSB7fTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoZWwuZGF0YXNldCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGZvciAoY29uc3QgZGF0YUtleSBpbiBlbC5kYXRhc2V0KSB7XG4gICAgICBkYXRhc2V0W2RhdGFLZXldID0gZWwuZGF0YXNldFtkYXRhS2V5XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGNvbnN0IGF0dHIgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgaWYgKGF0dHIubmFtZS5pbmRleE9mKCdkYXRhLScpID49IDApIHtcbiAgICAgICAgZGF0YXNldFt0b0NhbWVsQ2FzZShhdHRyLm5hbWUuc3BsaXQoJ2RhdGEtJylbMV0pXSA9IGF0dHIudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhc2V0KSB7XG4gICAgaWYgKGRhdGFzZXRba2V5XSA9PT0gJ2ZhbHNlJykgZGF0YXNldFtrZXldID0gZmFsc2U7XG4gICAgZWxzZSBpZiAoZGF0YXNldFtrZXldID09PSAndHJ1ZScpIGRhdGFzZXRba2V5XSA9IHRydWU7XG4gICAgZWxzZSBpZiAocGFyc2VGbG9hdChkYXRhc2V0W2tleV0pID09PSBkYXRhc2V0W2tleV0gKiAxKSBkYXRhc2V0W2tleV0gKj0gMTtcbiAgfVxuICByZXR1cm4gZGF0YXNldDtcbn1cbmZ1bmN0aW9uIHZhbCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICBpZiAodGhpc1swXS5tdWx0aXBsZSAmJiB0aGlzWzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXNbMF0uc2VsZWN0ZWRPcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2godGhpc1swXS5zZWxlY3RlZE9wdGlvbnNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1swXS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoaXNbaV0udmFsdWUgPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIFRyYW5zZm9ybXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuZnVuY3Rpb24gdHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICBlbFN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICBlbFN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgaWYgKHR5cGVvZiBkdXJhdGlvbiAhPT0gJ3N0cmluZycpIHtcbiAgICBkdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGVsU3R5bGUgPSB0aGlzW2ldLnN0eWxlO1xuICAgIGVsU3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgZWxTdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIEV2ZW50c1xuZnVuY3Rpb24gb24oLi4uYXJncykge1xuICBsZXQgW2V2ZW50VHlwZSwgdGFyZ2V0U2VsZWN0b3IsIGxpc3RlbmVyLCBjYXB0dXJlXSA9IGFyZ3M7XG4gIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFtldmVudFR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlXSA9IGFyZ3M7XG4gICAgdGFyZ2V0U2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKCFjYXB0dXJlKSBjYXB0dXJlID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlTGl2ZUV2ZW50KGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgIGNvbnN0IGV2ZW50RGF0YSA9IGUudGFyZ2V0LmRvbTdFdmVudERhdGEgfHwgW107XG4gICAgZXZlbnREYXRhLnVuc2hpZnQoZSk7XG4gICAgaWYgKCQodGFyZ2V0KS5pcyh0YXJnZXRTZWxlY3RvcikpIGxpc3RlbmVyLmFwcGx5KHRhcmdldCwgZXZlbnREYXRhKTtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudHMgPSAkKHRhcmdldCkucGFyZW50cygpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IHBhcmVudHMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgaWYgKCQocGFyZW50c1trXSkuaXModGFyZ2V0U2VsZWN0b3IpKSBsaXN0ZW5lci5hcHBseShwYXJlbnRzW2tdLCBldmVudERhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVFdmVudChlKSB7XG4gICAgY29uc3QgZXZlbnREYXRhID0gZSAmJiBlLnRhcmdldCA/IGUudGFyZ2V0LmRvbTdFdmVudERhdGEgfHwgW10gOiBbXTtcbiAgICBldmVudERhdGEudW5zaGlmdChlKTtcbiAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBldmVudERhdGEpO1xuICB9XG4gIGNvbnN0IGV2ZW50cyA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xuICBsZXQgajtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzW2ldO1xuICAgIGlmICghdGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKCFlbC5kb203TGlzdGVuZXJzKSBlbC5kb203TGlzdGVuZXJzID0gW107XG4gICAgICAgIGVsLmRvbTdMaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICAgIGxpc3RlbmVyLFxuICAgICAgICAgIHByb3h5TGlzdGVuZXI6IGhhbmRsZUV2ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbal0sIGhhbmRsZUV2ZW50LCBjYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGl2ZSBldmVudHNcbiAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVycykgZWwuZG9tN0xpdmVMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgZWwuZG9tN0xpdmVMaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICAgIGxpc3RlbmVyLFxuICAgICAgICAgIHByb3h5TGlzdGVuZXI6IGhhbmRsZUxpdmVFdmVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2pdLCBoYW5kbGVMaXZlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIG9mZiguLi5hcmdzKSB7XG4gIGxldCBbZXZlbnRUeXBlLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmVdID0gYXJncztcbiAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgW2V2ZW50VHlwZSwgbGlzdGVuZXIsIGNhcHR1cmVdID0gYXJncztcbiAgICB0YXJnZXRTZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoIWNhcHR1cmUpIGNhcHR1cmUgPSBmYWxzZTtcblxuICBjb25zdCBldmVudHMgPSBldmVudFR5cGUuc3BsaXQoJyAnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpc1tqXTtcbiAgICAgIGlmICghdGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGVsLmRvbTdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGVsLmRvbTdMaXN0ZW5lcnMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICBpZiAoZWwuZG9tN0xpc3RlbmVyc1trXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgZWwuZG9tN0xpc3RlbmVyc1trXS5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5kb203TGlzdGVuZXJzW2tdLnR5cGUgPT09IGV2ZW50c1tpXSkge1xuICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgZWwuZG9tN0xpc3RlbmVyc1trXS5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZWwuZG9tN0xpdmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBlbC5kb203TGl2ZUxpc3RlbmVycy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKGVsLmRvbTdMaXZlTGlzdGVuZXJzW2tdLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgZWwuZG9tN0xpdmVMaXN0ZW5lcnNba10ucHJveHlMaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChlbC5kb203TGl2ZUxpc3RlbmVyc1trXS50eXBlID09PSBldmVudHNbaV0pIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCBlbC5kb203TGl2ZUxpc3RlbmVyc1trXS5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBvbmNlKC4uLmFyZ3MpIHtcbiAgY29uc3QgZG9tID0gdGhpcztcbiAgbGV0IFtldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZV0gPSBhcmdzO1xuICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBbZXZlbnROYW1lLCBsaXN0ZW5lciwgY2FwdHVyZV0gPSBhcmdzO1xuICAgIHRhcmdldFNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHByb3h5KGUpIHtcbiAgICBjb25zdCBldmVudERhdGEgPSBlLnRhcmdldC5kb203RXZlbnREYXRhIHx8IFtdO1xuICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgZG9tLm9mZihldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBwcm94eSwgY2FwdHVyZSk7XG4gIH1cbiAgcmV0dXJuIGRvbS5vbihldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBwcm94eSwgY2FwdHVyZSk7XG59XG5mdW5jdGlvbiB0cmlnZ2VyKC4uLmFyZ3MpIHtcbiAgY29uc3QgZXZlbnRzID0gYXJnc1swXS5zcGxpdCgnICcpO1xuICBjb25zdCBldmVudERhdGEgPSBhcmdzWzFdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgbGV0IGV2dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV2dCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnRzW2ldLCB7XG4gICAgICAgICAgZGV0YWlsOiBldmVudERhdGEsXG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRzW2ldLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgZXZ0LmRldGFpbCA9IGV2ZW50RGF0YTtcbiAgICAgIH1cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgdGhpc1tqXS5kb203RXZlbnREYXRhID0gYXJncy5maWx0ZXIoKGRhdGEsIGRhdGFJbmRleCkgPT4gZGF0YUluZGV4ID4gMCk7XG4gICAgICB0aGlzW2pdLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIHRoaXNbal0uZG9tN0V2ZW50RGF0YSA9IFtdO1xuICAgICAgZGVsZXRlIHRoaXNbal0uZG9tN0V2ZW50RGF0YTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJ107XG4gIGNvbnN0IGRvbSA9IHRoaXM7XG4gIGxldCBpO1xuICBmdW5jdGlvbiBmaXJlQ2FsbEJhY2soZSkge1xuICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZG9tLm9mZihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgfVxuICB9XG4gIGlmIChjYWxsYmFjaykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGRvbS5vbihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gYW5pbWF0aW9uRW5kKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGV2ZW50cyA9IFsnd2Via2l0QW5pbWF0aW9uRW5kJywgJ2FuaW1hdGlvbmVuZCddO1xuICBjb25zdCBkb20gPSB0aGlzO1xuICBsZXQgaTtcbiAgZnVuY3Rpb24gZmlyZUNhbGxCYWNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGRvbS5vZmYoZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoY2FsbGJhY2spIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBkb20ub24oZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIFNpemluZy9TdHlsZXNcbmZ1bmN0aW9uIHdpZHRoKCkge1xuICBpZiAodGhpc1swXSA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoO1xuICB9XG5cbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMuY3NzKCd3aWR0aCcpKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gb3V0ZXJXaWR0aChpbmNsdWRlTWFyZ2lucykge1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuc3R5bGVzKCk7XG4gICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aCArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1yaWdodCcpKSArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1sZWZ0JykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGhlaWdodCgpIHtcbiAgaWYgKHRoaXNbMF0gPT09IHdpbmRvdykge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5jc3MoJ2hlaWdodCcpKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gb3V0ZXJIZWlnaHQoaW5jbHVkZU1hcmdpbnMpIHtcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIGlmIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xuICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKSArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIG9mZnNldCgpIHtcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGVsID0gdGhpc1swXTtcbiAgICBjb25zdCBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBjbGllbnRUb3AgPSBlbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBjb25zdCBjbGllbnRMZWZ0ID0gZWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFkgOiBlbC5zY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IGVsID09PSB3aW5kb3cgPyB3aW5kb3cuc2Nyb2xsWCA6IGVsLnNjcm9sbExlZnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogKGJveC50b3AgKyBzY3JvbGxUb3ApIC0gY2xpZW50VG9wLFxuICAgICAgbGVmdDogKGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCkgLSBjbGllbnRMZWZ0LFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoaXNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHNob3coKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGVsID0gdGhpc1tpXTtcbiAgICBpZiAoZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpID09PSAnbm9uZScpIHtcbiAgICAgIC8vIFN0aWxsIG5vdCB2aXNpYmxlXG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBzdHlsZXMoKSB7XG4gIGlmICh0aGlzWzBdKSByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCk7XG4gIHJldHVybiB7fTtcbn1cbmZ1bmN0aW9uIGNzcyhwcm9wcywgdmFsdWUpIHtcbiAgbGV0IGk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0aGlzWzBdKSByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0aGlzW2ldLnN0eWxlW3Byb3BzXSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gRG9tIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgY29uc3QgYXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGFyci5wdXNoKHRoaXNbaV0pO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG4vLyBJdGVyYXRlIG92ZXIgdGhlIGNvbGxlY3Rpb24gcGFzc2luZyBlbGVtZW50cyB0byBgY2FsbGJhY2tgXG5mdW5jdGlvbiBlYWNoKGNhbGxiYWNrKSB7XG4gIC8vIERvbid0IGJvdGhlciBjb250aW51aW5nIHdpdGhvdXQgYSBjYWxsYmFja1xuICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgLy8gSWYgdGhlIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAgICBpZiAoY2FsbGJhY2suY2FsbCh0aGlzW2ldLCBpLCB0aGlzW2ldKSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIEVuZCB0aGUgbG9vcCBlYXJseVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG4gIC8vIFJldHVybiBgdGhpc2AgdG8gYWxsb3cgY2hhaW5lZCBET00gb3BlcmF0aW9uc1xuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2spIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGNvbnRpbnVpbmcgd2l0aG91dCBhIGNhbGxiYWNrXG4gIGlmICghY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAvLyBJdGVyYXRlIG92ZXIgdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAvLyBJZiB0aGUgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICAgIGlmIChjYWxsYmFjay5jYWxsKHRoaXNbaV0sIHRoaXNbaV0sIGkpID09PSBmYWxzZSkge1xuICAgICAgLy8gRW5kIHRoZSBsb29wIGVhcmx5XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgLy8gUmV0dXJuIGB0aGlzYCB0byBhbGxvdyBjaGFpbmVkIERPTSBvcGVyYXRpb25zXG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrKSB7XG4gIGNvbnN0IG1hdGNoZWRJdGVtcyA9IFtdO1xuICBjb25zdCBkb20gPSB0aGlzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbS5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChjYWxsYmFjay5jYWxsKGRvbVtpXSwgaSwgZG9tW2ldKSkgbWF0Y2hlZEl0ZW1zLnB1c2goZG9tW2ldKTtcbiAgfVxuICByZXR1cm4gbmV3IERvbTcobWF0Y2hlZEl0ZW1zKTtcbn1cbmZ1bmN0aW9uIG1hcChjYWxsYmFjaykge1xuICBjb25zdCBtb2RpZmllZEl0ZW1zID0gW107XG4gIGNvbnN0IGRvbSA9IHRoaXM7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgbW9kaWZpZWRJdGVtcy5wdXNoKGNhbGxiYWNrLmNhbGwoZG9tW2ldLCBpLCBkb21baV0pKTtcbiAgfVxuICByZXR1cm4gbmV3IERvbTcobW9kaWZpZWRJdGVtcyk7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmZ1bmN0aW9uIGh0bWwoaHRtbCkge1xuICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmlubmVySFRNTCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoaXNbaV0uaW5uZXJIVE1MID0gaHRtbDtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuZnVuY3Rpb24gdGV4dCh0ZXh0KSB7XG4gIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodGhpc1swXSkge1xuICAgICAgcmV0dXJuIHRoaXNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoaXNbaV0udGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gaXMoc2VsZWN0b3IpIHtcbiAgY29uc3QgZWwgPSB0aGlzWzBdO1xuICBsZXQgY29tcGFyZVdpdGg7XG4gIGxldCBpO1xuICBpZiAoIWVsIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoZWwubWF0Y2hlcykgcmV0dXJuIGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgIGVsc2UgaWYgKGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgZWxzZSBpZiAoZWwubXNNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBjb21wYXJlV2l0aCA9ICQoc2VsZWN0b3IpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChzZWxlY3RvciA9PT0gZG9jdW1lbnQpIHJldHVybiBlbCA9PT0gZG9jdW1lbnQ7XG4gIGVsc2UgaWYgKHNlbGVjdG9yID09PSB3aW5kb3cpIHJldHVybiBlbCA9PT0gd2luZG93O1xuXG4gIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICBjb21wYXJlV2l0aCA9IHNlbGVjdG9yLm5vZGVUeXBlID8gW3NlbGVjdG9yXSA6IHNlbGVjdG9yO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpbmRleE9mKGVsKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0aGlzW2ldID09PSBlbCkgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuZnVuY3Rpb24gaW5kZXgoKSB7XG4gIGxldCBjaGlsZCA9IHRoaXNbMF07XG4gIGxldCBpO1xuICBpZiAoY2hpbGQpIHtcbiAgICBpID0gMDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB3aGlsZSAoKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSBpICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmZ1bmN0aW9uIGVxKGluZGV4KSB7XG4gIGlmICh0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcztcbiAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gIGxldCByZXR1cm5JbmRleDtcbiAgaWYgKGluZGV4ID4gbGVuZ3RoIC0gMSkge1xuICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gIH1cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybkluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XG4gICAgaWYgKHJldHVybkluZGV4IDwgMCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbcmV0dXJuSW5kZXhdXSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KFt0aGlzW2luZGV4XV0pO1xufVxuZnVuY3Rpb24gYXBwZW5kKC4uLmFyZ3MpIHtcbiAgbGV0IG5ld0NoaWxkO1xuXG4gIGZvciAobGV0IGsgPSAwOyBrIDwgYXJncy5sZW5ndGg7IGsgKz0gMSkge1xuICAgIG5ld0NoaWxkID0gYXJnc1trXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcbiAgICAgICAgd2hpbGUgKHRlbXBEaXYuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQodGVtcERpdi5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuZXdDaGlsZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGRbal0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmZ1bmN0aW9uIGFwcGVuZFRvKHBhcmVudCkge1xuICAkKHBhcmVudCkuYXBwZW5kKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHByZXBlbmQobmV3Q2hpbGQpIHtcbiAgbGV0IGk7XG4gIGxldCBqO1xuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld0NoaWxkO1xuICAgICAgZm9yIChqID0gdGVtcERpdi5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7IGogPj0gMDsgaiAtPSAxKSB7XG4gICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKHRlbXBEaXYuY2hpbGROb2Rlc1tqXSwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgZm9yIChqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkW2pdLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzW2ldLmluc2VydEJlZm9yZShuZXdDaGlsZCwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5mdW5jdGlvbiBwcmVwZW5kVG8ocGFyZW50KSB7XG4gICQocGFyZW50KS5wcmVwZW5kKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShzZWxlY3Rvcikge1xuICBjb25zdCBiZWZvcmUgPSAkKHNlbGVjdG9yKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGJlZm9yZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGJlZm9yZVswXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLCBiZWZvcmVbMF0pO1xuICAgIH0gZWxzZSBpZiAoYmVmb3JlLmxlbmd0aCA+IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYmVmb3JlLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGJlZm9yZVtqXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLmNsb25lTm9kZSh0cnVlKSwgYmVmb3JlW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGluc2VydEFmdGVyKHNlbGVjdG9yKSB7XG4gIGNvbnN0IGFmdGVyID0gJChzZWxlY3Rvcik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhZnRlci5sZW5ndGggPT09IDEpIHtcbiAgICAgIGFmdGVyWzBdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXNbaV0sIGFmdGVyWzBdLm5leHRTaWJsaW5nKTtcbiAgICB9IGVsc2UgaWYgKGFmdGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWZ0ZXIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgYWZ0ZXJbal0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpc1tpXS5jbG9uZU5vZGUodHJ1ZSksIGFmdGVyW2pdLm5leHRTaWJsaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIG5leHQoc2VsZWN0b3IpIHtcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nICYmICQodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cblxuICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZykgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pO1xuICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KFtdKTtcbn1cbmZ1bmN0aW9uIG5leHRBbGwoc2VsZWN0b3IpIHtcbiAgY29uc3QgbmV4dEVscyA9IFtdO1xuICBsZXQgZWwgPSB0aGlzWzBdO1xuICBpZiAoIWVsKSByZXR1cm4gbmV3IERvbTcoW10pO1xuICB3aGlsZSAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgY29uc3QgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCQobmV4dCkuaXMoc2VsZWN0b3IpKSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgfSBlbHNlIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICBlbCA9IG5leHQ7XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KG5leHRFbHMpO1xufVxuZnVuY3Rpb24gcHJldihzZWxlY3Rvcikge1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzWzBdO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgJChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb203KFtlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cblxuICAgIGlmIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSByZXR1cm4gbmV3IERvbTcoW2VsLnByZXZpb3VzRWxlbWVudFNpYmxpbmddKTtcbiAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICB9XG4gIHJldHVybiBuZXcgRG9tNyhbXSk7XG59XG5mdW5jdGlvbiBwcmV2QWxsKHNlbGVjdG9yKSB7XG4gIGNvbnN0IHByZXZFbHMgPSBbXTtcbiAgbGV0IGVsID0gdGhpc1swXTtcbiAgaWYgKCFlbCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICBjb25zdCBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCQocHJldikuaXMoc2VsZWN0b3IpKSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgfSBlbHNlIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICBlbCA9IHByZXY7XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KHByZXZFbHMpO1xufVxuZnVuY3Rpb24gc2libGluZ3Moc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMubmV4dEFsbChzZWxlY3RvcikuYWRkKHRoaXMucHJldkFsbChzZWxlY3RvcikpO1xufVxuZnVuY3Rpb24gcGFyZW50KHNlbGVjdG9yKSB7XG4gIGNvbnN0IHBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodGhpc1tpXS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCQodGhpc1tpXS5wYXJlbnROb2RlKS5pcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50cy5wdXNoKHRoaXNbaV0ucGFyZW50Tm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAkKHVuaXF1ZShwYXJlbnRzKSk7XG59XG5mdW5jdGlvbiBwYXJlbnRzKHNlbGVjdG9yKSB7XG4gIGNvbnN0IHBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBsZXQgcGFyZW50ID0gdGhpc1tpXS5wYXJlbnROb2RlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICgkKHBhcmVudCkuaXMoc2VsZWN0b3IpKSBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG4gIHJldHVybiAkKHVuaXF1ZShwYXJlbnRzKSk7XG59XG5mdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG4gIGxldCBjbG9zZXN0ID0gdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gIH1cbiAgaWYgKCFjbG9zZXN0LmlzKHNlbGVjdG9yKSkge1xuICAgIGNsb3Nlc3QgPSBjbG9zZXN0LnBhcmVudHMoc2VsZWN0b3IpLmVxKDApO1xuICB9XG4gIHJldHVybiBjbG9zZXN0O1xufVxuZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICBjb25zdCBmb3VuZEVsZW1lbnRzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGZvdW5kID0gdGhpc1tpXS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvdW5kLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBmb3VuZEVsZW1lbnRzLnB1c2goZm91bmRbal0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IERvbTcoZm91bmRFbGVtZW50cyk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihzZWxlY3Rvcikge1xuICBjb25zdCBjaGlsZHJlbiA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSB0aGlzW2ldLmNoaWxkTm9kZXM7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkTm9kZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGNoaWxkTm9kZXNbal0ubm9kZVR5cGUgPT09IDEpIGNoaWxkcmVuLnB1c2goY2hpbGROb2Rlc1tqXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZXNbal0ubm9kZVR5cGUgPT09IDEgJiYgJChjaGlsZE5vZGVzW2pdKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KHVuaXF1ZShjaGlsZHJlbikpO1xufVxuZnVuY3Rpb24gcmVtb3ZlKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodGhpc1tpXS5wYXJlbnROb2RlKSB0aGlzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBkZXRhY2goKSB7XG4gIHJldHVybiB0aGlzLnJlbW92ZSgpO1xufVxuZnVuY3Rpb24gYWRkKC4uLmFyZ3MpIHtcbiAgY29uc3QgZG9tID0gdGhpcztcbiAgbGV0IGk7XG4gIGxldCBqO1xuICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRvQWRkID0gJChhcmdzW2ldKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgdG9BZGQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGRvbVtkb20ubGVuZ3RoXSA9IHRvQWRkW2pdO1xuICAgICAgZG9tLmxlbmd0aCArPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZG9tO1xufVxuZnVuY3Rpb24gZW1wdHkoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGVsID0gdGhpc1tpXTtcbiAgICBpZiAoZWwubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWwuY2hpbGROb2Rlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAoZWwuY2hpbGROb2Rlc1tqXS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgZWwuY2hpbGROb2Rlc1tqXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsLmNoaWxkTm9kZXNbal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gc2Nyb2xsVG8oLi4uYXJncykge1xuICBsZXQgW2xlZnQsIHRvcCwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2tdID0gYXJncztcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBlYXNpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGVhc2luZztcbiAgICBbbGVmdCwgdG9wLCBkdXJhdGlvbiwgY2FsbGJhY2ssIGVhc2luZ10gPSBhcmdzO1xuICB9XG4gIGlmICh0eXBlb2YgZWFzaW5nID09PSAndW5kZWZpbmVkJykgZWFzaW5nID0gJ3N3aW5nJztcblxuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzO1xuICAgIGxldCBjdXJyZW50VG9wO1xuICAgIGxldCBjdXJyZW50TGVmdDtcbiAgICBsZXQgbWF4VG9wO1xuICAgIGxldCBtYXhMZWZ0O1xuICAgIGxldCBuZXdUb3A7XG4gICAgbGV0IG5ld0xlZnQ7XG4gICAgbGV0IHNjcm9sbFRvcDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGxldCBzY3JvbGxMZWZ0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbGV0IGFuaW1hdGVUb3AgPSB0b3AgPiAwIHx8IHRvcCA9PT0gMDtcbiAgICBsZXQgYW5pbWF0ZUxlZnQgPSBsZWZ0ID4gMCB8fCBsZWZ0ID09PSAwO1xuICAgIGlmICh0eXBlb2YgZWFzaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZWFzaW5nID0gJ3N3aW5nJztcbiAgICB9XG4gICAgaWYgKGFuaW1hdGVUb3ApIHtcbiAgICAgIGN1cnJlbnRUb3AgPSBlbC5zY3JvbGxUb3A7XG4gICAgICBpZiAoIWR1cmF0aW9uKSB7XG4gICAgICAgIGVsLnNjcm9sbFRvcCA9IHRvcDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFuaW1hdGVMZWZ0KSB7XG4gICAgICBjdXJyZW50TGVmdCA9IGVsLnNjcm9sbExlZnQ7XG4gICAgICBpZiAoIWR1cmF0aW9uKSB7XG4gICAgICAgIGVsLnNjcm9sbExlZnQgPSBsZWZ0O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWR1cmF0aW9uKSByZXR1cm47XG4gICAgaWYgKGFuaW1hdGVUb3ApIHtcbiAgICAgIG1heFRvcCA9IGVsLnNjcm9sbEhlaWdodCAtIGVsLm9mZnNldEhlaWdodDtcbiAgICAgIG5ld1RvcCA9IE1hdGgubWF4KE1hdGgubWluKHRvcCwgbWF4VG9wKSwgMCk7XG4gICAgfVxuICAgIGlmIChhbmltYXRlTGVmdCkge1xuICAgICAgbWF4TGVmdCA9IGVsLnNjcm9sbFdpZHRoIC0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICBuZXdMZWZ0ID0gTWF0aC5tYXgoTWF0aC5taW4obGVmdCwgbWF4TGVmdCksIDApO1xuICAgIH1cbiAgICBsZXQgc3RhcnRUaW1lID0gbnVsbDtcbiAgICBpZiAoYW5pbWF0ZVRvcCAmJiBuZXdUb3AgPT09IGN1cnJlbnRUb3ApIGFuaW1hdGVUb3AgPSBmYWxzZTtcbiAgICBpZiAoYW5pbWF0ZUxlZnQgJiYgbmV3TGVmdCA9PT0gY3VycmVudExlZnQpIGFuaW1hdGVMZWZ0ID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gcmVuZGVyKHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCkge1xuICAgICAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigodGltZSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbiwgMSksIDApO1xuICAgICAgY29uc3QgZWFzZVByb2dyZXNzID0gZWFzaW5nID09PSAnbGluZWFyJyA/IHByb2dyZXNzIDogKDAuNSAtIChNYXRoLmNvcyhwcm9ncmVzcyAqIE1hdGguUEkpIC8gMikpO1xuICAgICAgbGV0IGRvbmU7XG4gICAgICBpZiAoYW5pbWF0ZVRvcCkgc2Nyb2xsVG9wID0gY3VycmVudFRvcCArIChlYXNlUHJvZ3Jlc3MgKiAobmV3VG9wIC0gY3VycmVudFRvcCkpO1xuICAgICAgaWYgKGFuaW1hdGVMZWZ0KSBzY3JvbGxMZWZ0ID0gY3VycmVudExlZnQgKyAoZWFzZVByb2dyZXNzICogKG5ld0xlZnQgLSBjdXJyZW50TGVmdCkpO1xuICAgICAgaWYgKGFuaW1hdGVUb3AgJiYgbmV3VG9wID4gY3VycmVudFRvcCAmJiBzY3JvbGxUb3AgPj0gbmV3VG9wKSB7XG4gICAgICAgIGVsLnNjcm9sbFRvcCA9IG5ld1RvcDtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoYW5pbWF0ZVRvcCAmJiBuZXdUb3AgPCBjdXJyZW50VG9wICYmIHNjcm9sbFRvcCA8PSBuZXdUb3ApIHtcbiAgICAgICAgZWwuc2Nyb2xsVG9wID0gbmV3VG9wO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRlTGVmdCAmJiBuZXdMZWZ0ID4gY3VycmVudExlZnQgJiYgc2Nyb2xsTGVmdCA+PSBuZXdMZWZ0KSB7XG4gICAgICAgIGVsLnNjcm9sbExlZnQgPSBuZXdMZWZ0O1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRlTGVmdCAmJiBuZXdMZWZ0IDwgY3VycmVudExlZnQgJiYgc2Nyb2xsTGVmdCA8PSBuZXdMZWZ0KSB7XG4gICAgICAgIGVsLnNjcm9sbExlZnQgPSBuZXdMZWZ0O1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoYW5pbWF0ZVRvcCkgZWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgaWYgKGFuaW1hdGVMZWZ0KSBlbC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgfSk7XG59XG4vLyBzY3JvbGxUb3AodG9wLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjaykge1xuZnVuY3Rpb24gc2Nyb2xsVG9wKC4uLmFyZ3MpIHtcbiAgbGV0IFt0b3AsIGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrXSA9IGFyZ3M7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2YgZWFzaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgW3RvcCwgZHVyYXRpb24sIGNhbGxiYWNrLCBlYXNpbmddID0gYXJncztcbiAgfVxuICBjb25zdCBkb20gPSB0aGlzO1xuICBpZiAodHlwZW9mIHRvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoZG9tLmxlbmd0aCA+IDApIHJldHVybiBkb21bMF0uc2Nyb2xsVG9wO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBkb20uc2Nyb2xsVG8odW5kZWZpbmVkLCB0b3AsIGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIHNjcm9sbExlZnQoLi4uYXJncykge1xuICBsZXQgW2xlZnQsIGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrXSA9IGFyZ3M7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2YgZWFzaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgW2xlZnQsIGR1cmF0aW9uLCBjYWxsYmFjaywgZWFzaW5nXSA9IGFyZ3M7XG4gIH1cbiAgY29uc3QgZG9tID0gdGhpcztcbiAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChkb20ubGVuZ3RoID4gMCkgcmV0dXJuIGRvbVswXS5zY3JvbGxMZWZ0O1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBkb20uc2Nyb2xsVG8obGVmdCwgdW5kZWZpbmVkLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoaW5pdGlhbFByb3BzLCBpbml0aWFsUGFyYW1zKSB7XG4gIGNvbnN0IGVscyA9IHRoaXM7XG4gIGNvbnN0IGEgPSB7XG4gICAgcHJvcHM6ICQuZXh0ZW5kKHt9LCBpbml0aWFsUHJvcHMpLFxuICAgIHBhcmFtczogJC5leHRlbmQoe1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGVhc2luZzogJ3N3aW5nJywgLy8gb3IgJ2xpbmVhcidcbiAgICAgIC8qIENhbGxiYWNrc1xuICAgICAgYmVnaW4oZWxlbWVudHMpXG4gICAgICBjb21wbGV0ZShlbGVtZW50cylcbiAgICAgIHByb2dyZXNzKGVsZW1lbnRzLCBjb21wbGV0ZSwgcmVtYWluaW5nLCBzdGFydCwgdHdlZW5WYWx1ZSlcbiAgICAgICovXG4gICAgfSwgaW5pdGlhbFBhcmFtcyksXG5cbiAgICBlbGVtZW50czogZWxzLFxuICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgcXVlOiBbXSxcblxuICAgIGVhc2luZ1Byb2dyZXNzKGVhc2luZywgcHJvZ3Jlc3MpIHtcbiAgICAgIGlmIChlYXNpbmcgPT09ICdzd2luZycpIHtcbiAgICAgICAgcmV0dXJuIDAuNSAtIChNYXRoLmNvcyhwcm9ncmVzcyAqIE1hdGguUEkpIC8gMik7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGVhc2luZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZWFzaW5nKHByb2dyZXNzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9ncmVzcztcbiAgICB9LFxuICAgIHN0b3AoKSB7XG4gICAgICBpZiAoYS5mcmFtZUlkKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGEuZnJhbWVJZCk7XG4gICAgICB9XG4gICAgICBhLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgYS5lbGVtZW50cy5lYWNoKChpbmRleCwgZWwpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsO1xuICAgICAgICBkZWxldGUgZWxlbWVudC5kb203QW5pbWF0ZUluc3RhbmNlO1xuICAgICAgfSk7XG4gICAgICBhLnF1ZSA9IFtdO1xuICAgIH0sXG4gICAgZG9uZShjb21wbGV0ZSkge1xuICAgICAgYS5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIGEuZWxlbWVudHMuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbDtcbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuZG9tN0FuaW1hdGVJbnN0YW5jZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGNvbXBsZXRlKSBjb21wbGV0ZShlbHMpO1xuICAgICAgaWYgKGEucXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgcXVlID0gYS5xdWUuc2hpZnQoKTtcbiAgICAgICAgYS5hbmltYXRlKHF1ZVswXSwgcXVlWzFdKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFuaW1hdGUocHJvcHMsIHBhcmFtcykge1xuICAgICAgaWYgKGEuYW5pbWF0aW5nKSB7XG4gICAgICAgIGEucXVlLnB1c2goW3Byb3BzLCBwYXJhbXNdKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9XG4gICAgICBjb25zdCBlbGVtZW50cyA9IFtdO1xuXG4gICAgICAvLyBEZWZpbmUgJiBDYWNoZSBJbml0aWFscyAmIFVuaXRzXG4gICAgICBhLmVsZW1lbnRzLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICBsZXQgaW5pdGlhbEZ1bGxWYWx1ZTtcbiAgICAgICAgbGV0IGluaXRpYWxWYWx1ZTtcbiAgICAgICAgbGV0IHVuaXQ7XG4gICAgICAgIGxldCBmaW5hbFZhbHVlO1xuICAgICAgICBsZXQgZmluYWxGdWxsVmFsdWU7XG5cbiAgICAgICAgaWYgKCFlbC5kb203QW5pbWF0ZUluc3RhbmNlKSBhLmVsZW1lbnRzW2luZGV4XS5kb203QW5pbWF0ZUluc3RhbmNlID0gYTtcblxuICAgICAgICBlbGVtZW50c1tpbmRleF0gPSB7XG4gICAgICAgICAgY29udGFpbmVyOiBlbCxcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICBpbml0aWFsRnVsbFZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcCkucmVwbGFjZSgnLCcsICcuJyk7XG4gICAgICAgICAgaW5pdGlhbFZhbHVlID0gcGFyc2VGbG9hdChpbml0aWFsRnVsbFZhbHVlKTtcbiAgICAgICAgICB1bml0ID0gaW5pdGlhbEZ1bGxWYWx1ZS5yZXBsYWNlKGluaXRpYWxWYWx1ZSwgJycpO1xuICAgICAgICAgIGZpbmFsVmFsdWUgPSBwYXJzZUZsb2F0KHByb3BzW3Byb3BdKTtcbiAgICAgICAgICBmaW5hbEZ1bGxWYWx1ZSA9IHByb3BzW3Byb3BdICsgdW5pdDtcbiAgICAgICAgICBlbGVtZW50c1tpbmRleF1bcHJvcF0gPSB7XG4gICAgICAgICAgICBpbml0aWFsRnVsbFZhbHVlLFxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlLFxuICAgICAgICAgICAgdW5pdCxcbiAgICAgICAgICAgIGZpbmFsVmFsdWUsXG4gICAgICAgICAgICBmaW5hbEZ1bGxWYWx1ZSxcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZTogaW5pdGlhbFZhbHVlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBzdGFydFRpbWUgPSBudWxsO1xuICAgICAgbGV0IHRpbWU7XG4gICAgICBsZXQgZWxlbWVudHNEb25lID0gMDtcbiAgICAgIGxldCBwcm9wc0RvbmUgPSAwO1xuICAgICAgbGV0IGRvbmU7XG4gICAgICBsZXQgYmVnYW4gPSBmYWxzZTtcblxuICAgICAgYS5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgbGV0IHByb2dyZXNzO1xuICAgICAgICBsZXQgZWFzZVByb2dyZXNzO1xuICAgICAgICAvLyBsZXQgZWw7XG4gICAgICAgIGlmICghYmVnYW4pIHtcbiAgICAgICAgICBiZWdhbiA9IHRydWU7XG4gICAgICAgICAgaWYgKHBhcmFtcy5iZWdpbikgcGFyYW1zLmJlZ2luKGVscyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5wcm9ncmVzcykge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIHBhcmFtcy5wcm9ncmVzcyhlbHMsIE1hdGgubWF4KE1hdGgubWluKCh0aW1lIC0gc3RhcnRUaW1lKSAvIHBhcmFtcy5kdXJhdGlvbiwgMSksIDApLCAoKHN0YXJ0VGltZSArIHBhcmFtcy5kdXJhdGlvbikgLSB0aW1lIDwgMCA/IDAgOiAoc3RhcnRUaW1lICsgcGFyYW1zLmR1cmF0aW9uKSAtIHRpbWUpLCBzdGFydFRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsID0gZWxlbWVudDtcbiAgICAgICAgICBpZiAoZG9uZSB8fCBlbC5kb25lKSByZXR1cm47XG4gICAgICAgICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICAgIGlmIChkb25lIHx8IGVsLmRvbmUpIHJldHVybjtcbiAgICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oKHRpbWUgLSBzdGFydFRpbWUpIC8gcGFyYW1zLmR1cmF0aW9uLCAxKSwgMCk7XG4gICAgICAgICAgICBlYXNlUHJvZ3Jlc3MgPSBhLmVhc2luZ1Byb2dyZXNzKHBhcmFtcy5lYXNpbmcsIHByb2dyZXNzKTtcbiAgICAgICAgICAgIGNvbnN0IHsgaW5pdGlhbFZhbHVlLCBmaW5hbFZhbHVlLCB1bml0IH0gPSBlbFtwcm9wXTtcbiAgICAgICAgICAgIGVsW3Byb3BdLmN1cnJlbnRWYWx1ZSA9IGluaXRpYWxWYWx1ZSArIChlYXNlUHJvZ3Jlc3MgKiAoZmluYWxWYWx1ZSAtIGluaXRpYWxWYWx1ZSkpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gZWxbcHJvcF0uY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChmaW5hbFZhbHVlID4gaW5pdGlhbFZhbHVlICYmIGN1cnJlbnRWYWx1ZSA+PSBmaW5hbFZhbHVlKSB8fFxuICAgICAgICAgICAgICAoZmluYWxWYWx1ZSA8IGluaXRpYWxWYWx1ZSAmJiBjdXJyZW50VmFsdWUgPD0gZmluYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgZWwuY29udGFpbmVyLnN0eWxlW3Byb3BdID0gZmluYWxWYWx1ZSArIHVuaXQ7XG4gICAgICAgICAgICAgIHByb3BzRG9uZSArPSAxO1xuICAgICAgICAgICAgICBpZiAocHJvcHNEb25lID09PSBPYmplY3Qua2V5cyhwcm9wcykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWwuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNEb25lICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzRG9uZSA9PT0gZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgIGEuZG9uZShwYXJhbXMuY29tcGxldGUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC5jb250YWluZXIuc3R5bGVbcHJvcF0gPSBjdXJyZW50VmFsdWUgKyB1bml0O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgLy8gVGhlbiBjYWxsXG4gICAgICAgIGEuZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgfVxuICAgICAgYS5mcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICByZXR1cm4gYTtcbiAgICB9LFxuICB9O1xuXG4gIGlmIChhLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBlbHM7XG4gIH1cblxuICBsZXQgYW5pbWF0ZUluc3RhbmNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGEuZWxlbWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoYS5lbGVtZW50c1tpXS5kb203QW5pbWF0ZUluc3RhbmNlKSB7XG4gICAgICBhbmltYXRlSW5zdGFuY2UgPSBhLmVsZW1lbnRzW2ldLmRvbTdBbmltYXRlSW5zdGFuY2U7XG4gICAgfSBlbHNlIGEuZWxlbWVudHNbaV0uZG9tN0FuaW1hdGVJbnN0YW5jZSA9IGE7XG4gIH1cbiAgaWYgKCFhbmltYXRlSW5zdGFuY2UpIHtcbiAgICBhbmltYXRlSW5zdGFuY2UgPSBhO1xuICB9XG5cbiAgaWYgKGluaXRpYWxQcm9wcyA9PT0gJ3N0b3AnKSB7XG4gICAgYW5pbWF0ZUluc3RhbmNlLnN0b3AoKTtcbiAgfSBlbHNlIHtcbiAgICBhbmltYXRlSW5zdGFuY2UuYW5pbWF0ZShhLnByb3BzLCBhLnBhcmFtcyk7XG4gIH1cblxuICByZXR1cm4gZWxzO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICBjb25zdCBlbHMgPSB0aGlzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChlbHNbaV0uZG9tN0FuaW1hdGVJbnN0YW5jZSkge1xuICAgICAgZWxzW2ldLmRvbTdBbmltYXRlSW5zdGFuY2Uuc3RvcCgpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBub1RyaWdnZXIgPSAoJ3Jlc2l6ZSBzY3JvbGwnKS5zcGxpdCgnICcpO1xuZnVuY3Rpb24gZXZlbnRTaG9ydGN1dChuYW1lLCAuLi5hcmdzKSB7XG4gIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChub1RyaWdnZXIuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgICAgaWYgKG5hbWUgaW4gdGhpc1tpXSkgdGhpc1tpXVtuYW1lXSgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkKHRoaXNbaV0pLnRyaWdnZXIobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIHRoaXMub24obmFtZSwgLi4uYXJncyk7XG59XG5cbmZ1bmN0aW9uIGNsaWNrKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgnY2xpY2snLCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGJsdXIoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdibHVyJywgLi4uYXJncyk7XG59XG5mdW5jdGlvbiBmb2N1cyguLi5hcmdzKSB7XG4gIHJldHVybiBldmVudFNob3J0Y3V0LmJpbmQodGhpcykoJ2ZvY3VzJywgLi4uYXJncyk7XG59XG5mdW5jdGlvbiBmb2N1c2luKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgnZm9jdXNpbicsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gZm9jdXNvdXQoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdmb2N1c291dCcsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24ga2V5dXAoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdrZXl1cCcsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24ga2V5ZG93biguLi5hcmdzKSB7XG4gIHJldHVybiBldmVudFNob3J0Y3V0LmJpbmQodGhpcykoJ2tleWRvd24nLCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGtleXByZXNzKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgna2V5cHJlc3MnLCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdCguLi5hcmdzKSB7XG4gIHJldHVybiBldmVudFNob3J0Y3V0LmJpbmQodGhpcykoJ3N1Ym1pdCcsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gY2hhbmdlKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgnY2hhbmdlJywgLi4uYXJncyk7XG59XG5mdW5jdGlvbiBtb3VzZWRvd24oLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdtb3VzZWRvd24nLCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIG1vdXNlbW92ZSguLi5hcmdzKSB7XG4gIHJldHVybiBldmVudFNob3J0Y3V0LmJpbmQodGhpcykoJ21vdXNlbW92ZScsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gbW91c2V1cCguLi5hcmdzKSB7XG4gIHJldHVybiBldmVudFNob3J0Y3V0LmJpbmQodGhpcykoJ21vdXNldXAnLCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIG1vdXNlZW50ZXIoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdtb3VzZWVudGVyJywgLi4uYXJncyk7XG59XG5mdW5jdGlvbiBtb3VzZWxlYXZlKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgnbW91c2VsZWF2ZScsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gbW91c2VvdXQoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdtb3VzZW91dCcsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gbW91c2VvdmVyKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgnbW91c2VvdmVyJywgLi4uYXJncyk7XG59XG5mdW5jdGlvbiB0b3VjaHN0YXJ0KC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgndG91Y2hzdGFydCcsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gdG91Y2hlbmQoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCd0b3VjaGVuZCcsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gdG91Y2htb3ZlKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGV2ZW50U2hvcnRjdXQuYmluZCh0aGlzKSgndG91Y2htb3ZlJywgLi4uYXJncyk7XG59XG5mdW5jdGlvbiByZXNpemUoLi4uYXJncykge1xuICByZXR1cm4gZXZlbnRTaG9ydGN1dC5iaW5kKHRoaXMpKCdyZXNpemUnLCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIHNjcm9sbCguLi5hcmdzKSB7XG4gIHJldHVybiBldmVudFNob3J0Y3V0LmJpbmQodGhpcykoJ3Njcm9sbCcsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgeyAkLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsIGhhc0NsYXNzLCB0b2dnbGVDbGFzcywgYXR0ciwgcmVtb3ZlQXR0ciwgcHJvcCwgZGF0YSwgcmVtb3ZlRGF0YSwgZGF0YXNldCwgdmFsLCB0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIG9uLCBvZmYsIG9uY2UsIHRyaWdnZXIsIHRyYW5zaXRpb25FbmQsIGFuaW1hdGlvbkVuZCwgd2lkdGgsIG91dGVyV2lkdGgsIGhlaWdodCwgb3V0ZXJIZWlnaHQsIG9mZnNldCwgaGlkZSwgc2hvdywgc3R5bGVzLCBjc3MsIHRvQXJyYXksIGVhY2gsIGZvckVhY2gsIGZpbHRlciwgbWFwLCBodG1sLCB0ZXh0LCBpcywgaW5kZXhPZiwgaW5kZXgsIGVxLCBhcHBlbmQsIGFwcGVuZFRvLCBwcmVwZW5kLCBwcmVwZW5kVG8sIGluc2VydEJlZm9yZSwgaW5zZXJ0QWZ0ZXIsIG5leHQsIG5leHRBbGwsIHByZXYsIHByZXZBbGwsIHNpYmxpbmdzLCBwYXJlbnQsIHBhcmVudHMsIGNsb3Nlc3QsIGZpbmQsIGNoaWxkcmVuLCByZW1vdmUsIGRldGFjaCwgYWRkLCBlbXB0eSwgc2Nyb2xsVG8sIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgYW5pbWF0ZSwgc3RvcCwgY2xpY2ssIGJsdXIsIGZvY3VzLCBmb2N1c2luLCBmb2N1c291dCwga2V5dXAsIGtleWRvd24sIGtleXByZXNzLCBzdWJtaXQsIGNoYW5nZSwgbW91c2Vkb3duLCBtb3VzZW1vdmUsIG1vdXNldXAsIG1vdXNlZW50ZXIsIG1vdXNlbGVhdmUsIG1vdXNlb3V0LCBtb3VzZW92ZXIsIHRvdWNoc3RhcnQsIHRvdWNoZW5kLCB0b3VjaG1vdmUsIHJlc2l6ZSwgc2Nyb2xsIH07XG4iLCJpbXBvcnQge1xuICAkLFxuICBhZGRDbGFzcyxcbiAgcmVtb3ZlQ2xhc3MsXG4gIGhhc0NsYXNzLFxuICB0b2dnbGVDbGFzcyxcbiAgYXR0cixcbiAgcmVtb3ZlQXR0cixcbiAgZGF0YSxcbiAgdHJhbnNmb3JtLFxuICB0cmFuc2l0aW9uLFxuICBvbixcbiAgb2ZmLFxuICB0cmlnZ2VyLFxuICB0cmFuc2l0aW9uRW5kLFxuICBvdXRlcldpZHRoLFxuICBvdXRlckhlaWdodCxcbiAgb2Zmc2V0LFxuICBjc3MsXG4gIGVhY2gsXG4gIGh0bWwsXG4gIHRleHQsXG4gIGlzLFxuICBpbmRleCxcbiAgZXEsXG4gIGFwcGVuZCxcbiAgcHJlcGVuZCxcbiAgbmV4dCxcbiAgbmV4dEFsbCxcbiAgcHJldixcbiAgcHJldkFsbCxcbiAgcGFyZW50LFxuICBwYXJlbnRzLFxuICBjbG9zZXN0LFxuICBmaW5kLFxuICBjaGlsZHJlbixcbiAgcmVtb3ZlLFxuICBhZGQsXG4gIHN0eWxlcyxcbn0gZnJvbSAnZG9tNy9kaXN0L2RvbTcubW9kdWxhcic7XG5cbmNvbnN0IE1ldGhvZHMgPSB7XG4gIGFkZENsYXNzLFxuICByZW1vdmVDbGFzcyxcbiAgaGFzQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzLFxuICBhdHRyLFxuICByZW1vdmVBdHRyLFxuICBkYXRhLFxuICB0cmFuc2Zvcm0sXG4gIHRyYW5zaXRpb24sXG4gIG9uLFxuICBvZmYsXG4gIHRyaWdnZXIsXG4gIHRyYW5zaXRpb25FbmQsXG4gIG91dGVyV2lkdGgsXG4gIG91dGVySGVpZ2h0LFxuICBvZmZzZXQsXG4gIGNzcyxcbiAgZWFjaCxcbiAgaHRtbCxcbiAgdGV4dCxcbiAgaXMsXG4gIGluZGV4LFxuICBlcSxcbiAgYXBwZW5kLFxuICBwcmVwZW5kLFxuICBuZXh0LFxuICBuZXh0QWxsLFxuICBwcmV2LFxuICBwcmV2QWxsLFxuICBwYXJlbnQsXG4gIHBhcmVudHMsXG4gIGNsb3Nlc3QsXG4gIGZpbmQsXG4gIGNoaWxkcmVuLFxuICByZW1vdmUsXG4gIGFkZCxcbiAgc3R5bGVzLFxufTtcblxuT2JqZWN0LmtleXMoTWV0aG9kcykuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAkLmZuW21ldGhvZE5hbWVdID0gTWV0aG9kc1ttZXRob2ROYW1lXTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCAkO1xuIiwiaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnc3NyLXdpbmRvdyc7XG5cbmNvbnN0IFV0aWxzID0ge1xuICBkZWxldGVQcm9wcyhvYmopIHtcbiAgICBjb25zdCBvYmplY3QgPSBvYmo7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gbnVsbDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbm8gZ2V0dGVyIGZvciBvYmplY3RcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIGdvdCB3cm9uZ1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBuZXh0VGljayhjYWxsYmFjaywgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5KTtcbiAgfSxcbiAgbm93KCkge1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xuICB9LFxuICBnZXRUcmFuc2xhdGUoZWwsIGF4aXMgPSAneCcpIHtcbiAgICBsZXQgbWF0cml4O1xuICAgIGxldCBjdXJUcmFuc2Zvcm07XG4gICAgbGV0IHRyYW5zZm9ybU1hdHJpeDtcblxuICAgIGNvbnN0IGN1clN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xuXG4gICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIHtcbiAgICAgIGN1clRyYW5zZm9ybSA9IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgICBpZiAoY3VyVHJhbnNmb3JtLnNwbGl0KCcsJykubGVuZ3RoID4gNikge1xuICAgICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJUcmFuc2Zvcm0uc3BsaXQoJywgJykubWFwKGEgPT4gYS5yZXBsYWNlKCcsJywgJy4nKSkuam9pbignLCAnKTtcbiAgICAgIH1cbiAgICAgIC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIFdlYmtpdCBjaG9rZSB3aGVuICdub25lJyBpcyBwYXNzZWQ7IHBhc3NcbiAgICAgIC8vIGVtcHR5IHN0cmluZyBpbnN0ZWFkIGluIHRoaXMgY2FzZVxuICAgICAgdHJhbnNmb3JtTWF0cml4ID0gbmV3IHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgoY3VyVHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IGN1clRyYW5zZm9ybSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKS5yZXBsYWNlKCd0cmFuc2xhdGUoJywgJ21hdHJpeCgxLCAwLCAwLCAxLCcpO1xuICAgICAgbWF0cml4ID0gdHJhbnNmb3JtTWF0cml4LnRvU3RyaW5nKCkuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAvLyBMYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7XG4gICAgICAvLyBDcmF6eSBJRTEwIE1hdHJpeFxuICAgICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEyXSk7XG4gICAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNF0pO1xuICAgIH1cbiAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAvLyBMYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDI7XG4gICAgICAvLyBDcmF6eSBJRTEwIE1hdHJpeFxuICAgICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEzXSk7XG4gICAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNV0pO1xuICAgIH1cbiAgICByZXR1cm4gY3VyVHJhbnNmb3JtIHx8IDA7XG4gIH0sXG4gIHBhcnNlVXJsUXVlcnkodXJsKSB7XG4gICAgY29uc3QgcXVlcnkgPSB7fTtcbiAgICBsZXQgdXJsVG9QYXJzZSA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBsZXQgaTtcbiAgICBsZXQgcGFyYW1zO1xuICAgIGxldCBwYXJhbTtcbiAgICBsZXQgbGVuZ3RoO1xuICAgIGlmICh0eXBlb2YgdXJsVG9QYXJzZSA9PT0gJ3N0cmluZycgJiYgdXJsVG9QYXJzZS5sZW5ndGgpIHtcbiAgICAgIHVybFRvUGFyc2UgPSB1cmxUb1BhcnNlLmluZGV4T2YoJz8nKSA+IC0xID8gdXJsVG9QYXJzZS5yZXBsYWNlKC9cXFMqXFw/LywgJycpIDogJyc7XG4gICAgICBwYXJhbXMgPSB1cmxUb1BhcnNlLnNwbGl0KCcmJykuZmlsdGVyKHBhcmFtc1BhcnQgPT4gcGFyYW1zUGFydCAhPT0gJycpO1xuICAgICAgbGVuZ3RoID0gcGFyYW1zLmxlbmd0aDtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHBhcmFtID0gcGFyYW1zW2ldLnJlcGxhY2UoLyNcXFMrL2csICcnKS5zcGxpdCgnPScpO1xuICAgICAgICBxdWVyeVtkZWNvZGVVUklDb21wb25lbnQocGFyYW1bMF0pXSA9IHR5cGVvZiBwYXJhbVsxXSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBkZWNvZGVVUklDb21wb25lbnQocGFyYW1bMV0pIHx8ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnk7XG4gIH0sXG4gIGlzT2JqZWN0KG8pIHtcbiAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8gIT09IG51bGwgJiYgby5jb25zdHJ1Y3RvciAmJiBvLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gIH0sXG4gIGV4dGVuZCguLi5hcmdzKSB7XG4gICAgY29uc3QgdG8gPSBPYmplY3QoYXJnc1swXSk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBuZXh0U291cmNlID0gYXJnc1tpXTtcbiAgICAgIGlmIChuZXh0U291cmNlICE9PSB1bmRlZmluZWQgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgICAgICBmb3IgKGxldCBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCArPSAxKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNPYmplY3QodG9bbmV4dEtleV0pICYmIFV0aWxzLmlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICAgIFV0aWxzLmV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFVdGlscy5pc09iamVjdCh0b1tuZXh0S2V5XSkgJiYgVXRpbHMuaXNPYmplY3QobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSB7fTtcbiAgICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvO1xuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuIiwiaW1wb3J0IHsgd2luZG93LCBkb2N1bWVudCB9IGZyb20gJ3Nzci13aW5kb3cnO1xuXG5jb25zdCBTdXBwb3J0ID0gKGZ1bmN0aW9uIFN1cHBvcnQoKSB7XG4gIGNvbnN0IHRlc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcmV0dXJuIHtcbiAgICB0b3VjaDogKHdpbmRvdy5Nb2Rlcm5penIgJiYgd2luZG93Lk1vZGVybml6ci50b3VjaCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uIGNoZWNrVG91Y2goKSB7XG4gICAgICByZXR1cm4gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcbiAgICB9KCkpLFxuXG4gICAgcG9pbnRlckV2ZW50czogISEod2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB8fCB3aW5kb3cuUG9pbnRlckV2ZW50KSxcbiAgICBwcmVmaXhlZFBvaW50ZXJFdmVudHM6ICEhd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkLFxuXG4gICAgdHJhbnNpdGlvbjogKGZ1bmN0aW9uIGNoZWNrVHJhbnNpdGlvbigpIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gdGVzdERpdi5zdHlsZTtcbiAgICAgIHJldHVybiAoJ3RyYW5zaXRpb24nIGluIHN0eWxlIHx8ICd3ZWJraXRUcmFuc2l0aW9uJyBpbiBzdHlsZSB8fCAnTW96VHJhbnNpdGlvbicgaW4gc3R5bGUpO1xuICAgIH0oKSksXG4gICAgdHJhbnNmb3JtczNkOiAod2luZG93Lk1vZGVybml6ciAmJiB3aW5kb3cuTW9kZXJuaXpyLmNzc3RyYW5zZm9ybXMzZCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uIGNoZWNrVHJhbnNmb3JtczNkKCkge1xuICAgICAgY29uc3Qgc3R5bGUgPSB0ZXN0RGl2LnN0eWxlO1xuICAgICAgcmV0dXJuICgnd2Via2l0UGVyc3BlY3RpdmUnIGluIHN0eWxlIHx8ICdNb3pQZXJzcGVjdGl2ZScgaW4gc3R5bGUgfHwgJ09QZXJzcGVjdGl2ZScgaW4gc3R5bGUgfHwgJ01zUGVyc3BlY3RpdmUnIGluIHN0eWxlIHx8ICdwZXJzcGVjdGl2ZScgaW4gc3R5bGUpO1xuICAgIH0oKSksXG5cbiAgICBmbGV4Ym94OiAoZnVuY3Rpb24gY2hlY2tGbGV4Ym94KCkge1xuICAgICAgY29uc3Qgc3R5bGUgPSB0ZXN0RGl2LnN0eWxlO1xuICAgICAgY29uc3Qgc3R5bGVzID0gKCdhbGlnbkl0ZW1zIHdlYmtpdEFsaWduSXRlbXMgd2Via2l0Qm94QWxpZ24gbXNGbGV4QWxpZ24gbW96Qm94QWxpZ24gd2Via2l0RmxleERpcmVjdGlvbiBtc0ZsZXhEaXJlY3Rpb24gbW96Qm94RGlyZWN0aW9uIG1vekJveE9yaWVudCB3ZWJraXRCb3hEaXJlY3Rpb24gd2Via2l0Qm94T3JpZW50Jykuc3BsaXQoJyAnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzdHlsZXNbaV0gaW4gc3R5bGUpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0oKSksXG5cbiAgICBvYnNlcnZlcjogKGZ1bmN0aW9uIGNoZWNrT2JzZXJ2ZXIoKSB7XG4gICAgICByZXR1cm4gKCdNdXRhdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cgfHwgJ1dlYmtpdE11dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdyk7XG4gICAgfSgpKSxcblxuICAgIHBhc3NpdmVMaXN0ZW5lcjogKGZ1bmN0aW9uIGNoZWNrUGFzc2l2ZUxpc3RlbmVyKCkge1xuICAgICAgbGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlTGlzdGVuZXInLCBudWxsLCBvcHRzKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gTm8gc3VwcG9ydFxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZTtcbiAgICB9KCkpLFxuXG4gICAgZ2VzdHVyZXM6IChmdW5jdGlvbiBjaGVja0dlc3R1cmVzKCkge1xuICAgICAgcmV0dXJuICdvbmdlc3R1cmVzdGFydCcgaW4gd2luZG93O1xuICAgIH0oKSksXG4gIH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0O1xuIiwiaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5jbGFzcyBTd2lwZXJDbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5wYXJhbXMgPSBwYXJhbXM7XG5cbiAgICAvLyBFdmVudHNcbiAgICBzZWxmLmV2ZW50c0xpc3RlbmVycyA9IHt9O1xuXG4gICAgaWYgKHNlbGYucGFyYW1zICYmIHNlbGYucGFyYW1zLm9uKSB7XG4gICAgICBPYmplY3Qua2V5cyhzZWxmLnBhcmFtcy5vbikuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIHNlbGYub24oZXZlbnROYW1lLCBzZWxmLnBhcmFtcy5vbltldmVudE5hbWVdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHJldHVybiBzZWxmO1xuICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICBvbmNlKGV2ZW50cywgaGFuZGxlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG4gICAgZnVuY3Rpb24gb25jZUhhbmRsZXIoLi4uYXJncykge1xuICAgICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIHNlbGYub2ZmKGV2ZW50cywgb25jZUhhbmRsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZi5vbihldmVudHMsIG9uY2VIYW5kbGVyKTtcbiAgfVxuICBvZmYoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaCgoZXZlbnRIYW5kbGVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudEhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgZW1pdCguLi5hcmdzKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgbGV0IGV2ZW50cztcbiAgICBsZXQgZGF0YTtcbiAgICBsZXQgY29udGV4dDtcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGV2ZW50cyA9IGFyZ3NbMF07XG4gICAgICBkYXRhID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XG4gICAgICBjb250ZXh0ID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzID0gYXJnc1swXS5ldmVudHM7XG4gICAgICBkYXRhID0gYXJnc1swXS5kYXRhO1xuICAgICAgY29udGV4dCA9IGFyZ3NbMF0uY29udGV4dCB8fCBzZWxmO1xuICAgIH1cbiAgICBjb25zdCBldmVudHNBcnJheSA9IEFycmF5LmlzQXJyYXkoZXZlbnRzKSA/IGV2ZW50cyA6IGV2ZW50cy5zcGxpdCgnICcpO1xuICAgIGV2ZW50c0FycmF5LmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gW107XG4gICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKChldmVudEhhbmRsZXIpID0+IHtcbiAgICAgICAgICBoYW5kbGVycy5wdXNoKGV2ZW50SGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChldmVudEhhbmRsZXIpID0+IHtcbiAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIHVzZU1vZHVsZXNQYXJhbXMoaW5zdGFuY2VQYXJhbXMpIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXM7XG4gICAgaWYgKCFpbnN0YW5jZS5tb2R1bGVzKSByZXR1cm47XG4gICAgT2JqZWN0LmtleXMoaW5zdGFuY2UubW9kdWxlcykuZm9yRWFjaCgobW9kdWxlTmFtZSkgPT4ge1xuICAgICAgY29uc3QgbW9kdWxlID0gaW5zdGFuY2UubW9kdWxlc1ttb2R1bGVOYW1lXTtcbiAgICAgIC8vIEV4dGVuZCBwYXJhbXNcbiAgICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XG4gICAgICAgIFV0aWxzLmV4dGVuZChpbnN0YW5jZVBhcmFtcywgbW9kdWxlLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgdXNlTW9kdWxlcyhtb2R1bGVzUGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXM7XG4gICAgaWYgKCFpbnN0YW5jZS5tb2R1bGVzKSByZXR1cm47XG4gICAgT2JqZWN0LmtleXMoaW5zdGFuY2UubW9kdWxlcykuZm9yRWFjaCgobW9kdWxlTmFtZSkgPT4ge1xuICAgICAgY29uc3QgbW9kdWxlID0gaW5zdGFuY2UubW9kdWxlc1ttb2R1bGVOYW1lXTtcbiAgICAgIGNvbnN0IG1vZHVsZVBhcmFtcyA9IG1vZHVsZXNQYXJhbXNbbW9kdWxlTmFtZV0gfHwge307XG4gICAgICAvLyBFeHRlbmQgaW5zdGFuY2UgbWV0aG9kcyBhbmQgcHJvcHNcbiAgICAgIGlmIChtb2R1bGUuaW5zdGFuY2UpIHtcbiAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlLmluc3RhbmNlKS5mb3JFYWNoKChtb2R1bGVQcm9wTmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZVByb3AgPSBtb2R1bGUuaW5zdGFuY2VbbW9kdWxlUHJvcE5hbWVdO1xuICAgICAgICAgIGlmICh0eXBlb2YgbW9kdWxlUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5zdGFuY2VbbW9kdWxlUHJvcE5hbWVdID0gbW9kdWxlUHJvcC5iaW5kKGluc3RhbmNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5zdGFuY2VbbW9kdWxlUHJvcE5hbWVdID0gbW9kdWxlUHJvcDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgaWYgKG1vZHVsZS5vbiAmJiBpbnN0YW5jZS5vbikge1xuICAgICAgICBPYmplY3Qua2V5cyhtb2R1bGUub24pLmZvckVhY2goKG1vZHVsZUV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAgIGluc3RhbmNlLm9uKG1vZHVsZUV2ZW50TmFtZSwgbW9kdWxlLm9uW21vZHVsZUV2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gTW9kdWxlIGNyZWF0ZSBjYWxsYmFja1xuICAgICAgaWYgKG1vZHVsZS5jcmVhdGUpIHtcbiAgICAgICAgbW9kdWxlLmNyZWF0ZS5iaW5kKGluc3RhbmNlKShtb2R1bGVQYXJhbXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBzZXQgY29tcG9uZW50cyhjb21wb25lbnRzKSB7XG4gICAgY29uc3QgQ2xhc3MgPSB0aGlzO1xuICAgIGlmICghQ2xhc3MudXNlKSByZXR1cm47XG4gICAgQ2xhc3MudXNlKGNvbXBvbmVudHMpO1xuICB9XG4gIHN0YXRpYyBpbnN0YWxsTW9kdWxlKG1vZHVsZSwgLi4ucGFyYW1zKSB7XG4gICAgY29uc3QgQ2xhc3MgPSB0aGlzO1xuICAgIGlmICghQ2xhc3MucHJvdG90eXBlLm1vZHVsZXMpIENsYXNzLnByb3RvdHlwZS5tb2R1bGVzID0ge307XG4gICAgY29uc3QgbmFtZSA9IG1vZHVsZS5uYW1lIHx8IChgJHtPYmplY3Qua2V5cyhDbGFzcy5wcm90b3R5cGUubW9kdWxlcykubGVuZ3RofV8ke1V0aWxzLm5vdygpfWApO1xuICAgIENsYXNzLnByb3RvdHlwZS5tb2R1bGVzW25hbWVdID0gbW9kdWxlO1xuICAgIC8vIFByb3RvdHlwZVxuICAgIGlmIChtb2R1bGUucHJvdG8pIHtcbiAgICAgIE9iamVjdC5rZXlzKG1vZHVsZS5wcm90bykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtrZXldID0gbW9kdWxlLnByb3RvW2tleV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2xhc3NcbiAgICBpZiAobW9kdWxlLnN0YXRpYykge1xuICAgICAgT2JqZWN0LmtleXMobW9kdWxlLnN0YXRpYykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIENsYXNzW2tleV0gPSBtb2R1bGUuc3RhdGljW2tleV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2FsbGJhY2tcbiAgICBpZiAobW9kdWxlLmluc3RhbGwpIHtcbiAgICAgIG1vZHVsZS5pbnN0YWxsLmFwcGx5KENsYXNzLCBwYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gQ2xhc3M7XG4gIH1cbiAgc3RhdGljIHVzZShtb2R1bGUsIC4uLnBhcmFtcykge1xuICAgIGNvbnN0IENsYXNzID0gdGhpcztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtb2R1bGUpKSB7XG4gICAgICBtb2R1bGUuZm9yRWFjaChtID0+IENsYXNzLmluc3RhbGxNb2R1bGUobSkpO1xuICAgICAgcmV0dXJuIENsYXNzO1xuICAgIH1cbiAgICByZXR1cm4gQ2xhc3MuaW5zdGFsbE1vZHVsZShtb2R1bGUsIC4uLnBhcmFtcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3dpcGVyQ2xhc3M7XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGxldCB3aWR0aDtcbiAgbGV0IGhlaWdodDtcbiAgY29uc3QgJGVsID0gc3dpcGVyLiRlbDtcbiAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpZHRoID0gc3dpcGVyLnBhcmFtcy53aWR0aDtcbiAgfSBlbHNlIHtcbiAgICB3aWR0aCA9ICRlbFswXS5jbGllbnRXaWR0aDtcbiAgfVxuICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhlaWdodCA9IHN3aXBlci5wYXJhbXMuaGVpZ2h0O1xuICB9IGVsc2Uge1xuICAgIGhlaWdodCA9ICRlbFswXS5jbGllbnRIZWlnaHQ7XG4gIH1cbiAgaWYgKCh3aWR0aCA9PT0gMCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHx8IChoZWlnaHQgPT09IDAgJiYgc3dpcGVyLmlzVmVydGljYWwoKSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTdWJ0cmFjdCBwYWRkaW5nc1xuICB3aWR0aCA9IHdpZHRoIC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy1sZWZ0JyksIDEwKSAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctcmlnaHQnKSwgMTApO1xuICBoZWlnaHQgPSBoZWlnaHQgLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLXRvcCcpLCAxMCkgLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLWJvdHRvbScpLCAxMCk7XG5cbiAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBzaXplOiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB3aWR0aCA6IGhlaWdodCxcbiAgfSk7XG59XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcblxuICBjb25zdCB7XG4gICAgJHdyYXBwZXJFbCwgc2l6ZTogc3dpcGVyU2l6ZSwgcnRsLCB3cm9uZ1JUTCxcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qgc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBjb25zdCBzbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc2xpZGVzLmxlbmd0aDtcbiAgbGV0IHNuYXBHcmlkID0gW107XG4gIGNvbnN0IHNsaWRlc0dyaWQgPSBbXTtcbiAgY29uc3Qgc2xpZGVzU2l6ZXNHcmlkID0gW107XG5cbiAgbGV0IG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmU7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0QmVmb3JlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZS5jYWxsKHN3aXBlcik7XG4gIH1cblxuICBsZXQgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXI7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0QWZ0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlci5jYWxsKHN3aXBlcik7XG4gIH1cblxuICBjb25zdCBwcmV2aW91c1NsaWRlc0xlbmd0aCA9IHNsaWRlc0xlbmd0aDtcbiAgY29uc3QgcHJldmlvdXNTbmFwR3JpZExlbmd0aCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gIGNvbnN0IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG5cbiAgbGV0IHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gIGxldCBzbGlkZVBvc2l0aW9uID0gLW9mZnNldEJlZm9yZTtcbiAgbGV0IHByZXZTbGlkZVNpemUgPSAwO1xuICBsZXQgaW5kZXggPSAwO1xuICBpZiAodHlwZW9mIHN3aXBlclNpemUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSAnc3RyaW5nJyAmJiBzcGFjZUJldHdlZW4uaW5kZXhPZignJScpID49IDApIHtcbiAgICBzcGFjZUJldHdlZW4gPSAocGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZSgnJScsICcnKSkgLyAxMDApICogc3dpcGVyU2l6ZTtcbiAgfVxuXG4gIHN3aXBlci52aXJ0dWFsU2l6ZSA9IC1zcGFjZUJldHdlZW47XG5cbiAgLy8gcmVzZXQgbWFyZ2luc1xuICBpZiAocnRsKSBzbGlkZXMuY3NzKHsgbWFyZ2luTGVmdDogJycsIG1hcmdpblRvcDogJycgfSk7XG4gIGVsc2Ugc2xpZGVzLmNzcyh7IG1hcmdpblJpZ2h0OiAnJywgbWFyZ2luQm90dG9tOiAnJyB9KTtcblxuICBsZXQgc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgaWYgKE1hdGguZmxvb3Ioc2xpZGVzTGVuZ3RoIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbikgPT09IHNsaWRlc0xlbmd0aCAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gc2xpZGVzTGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gTWF0aC5jZWlsKHNsaWRlc0xlbmd0aCAvIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pICogcGFyYW1zLnNsaWRlc1BlckNvbHVtbjtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgcGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdyb3cnKSB7XG4gICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gTWF0aC5tYXgoc2xpZGVzTnVtYmVyRXZlblRvUm93cywgcGFyYW1zLnNsaWRlc1BlclZpZXcgKiBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uKTtcbiAgICB9XG4gIH1cblxuICAvLyBDYWxjIHNsaWRlc1xuICBsZXQgc2xpZGVTaXplO1xuICBjb25zdCBzbGlkZXNQZXJDb2x1bW4gPSBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uO1xuICBjb25zdCBzbGlkZXNQZXJSb3cgPSBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzIC8gc2xpZGVzUGVyQ29sdW1uO1xuICBjb25zdCBudW1GdWxsQ29sdW1ucyA9IHNsaWRlc1BlclJvdyAtICgocGFyYW1zLnNsaWRlc1BlckNvbHVtbiAqIHNsaWRlc1BlclJvdykgLSBzbGlkZXNMZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0xlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVTaXplID0gMDtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlcy5lcShpKTtcbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgIC8vIFNldCBzbGlkZXMgb3JkZXJcbiAgICAgIGxldCBuZXdTbGlkZU9yZGVySW5kZXg7XG4gICAgICBsZXQgY29sdW1uO1xuICAgICAgbGV0IHJvdztcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyQ29sdW1uRmlsbCA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihpIC8gc2xpZGVzUGVyQ29sdW1uKTtcbiAgICAgICAgcm93ID0gaSAtIChjb2x1bW4gKiBzbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICBpZiAoY29sdW1uID4gbnVtRnVsbENvbHVtbnMgfHwgKGNvbHVtbiA9PT0gbnVtRnVsbENvbHVtbnMgJiYgcm93ID09PSBzbGlkZXNQZXJDb2x1bW4gLSAxKSkge1xuICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICAgIGlmIChyb3cgPj0gc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICAgICAgICByb3cgPSAwO1xuICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ld1NsaWRlT3JkZXJJbmRleCA9IGNvbHVtbiArICgocm93ICogc2xpZGVzTnVtYmVyRXZlblRvUm93cykgLyBzbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICBzbGlkZVxuICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgJy13ZWJraXQtYm94LW9yZGluYWwtZ3JvdXAnOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgICAnLW1vei1ib3gtb3JkaW5hbC1ncm91cCc6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICctbXMtZmxleC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICctd2Via2l0LW9yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgb3JkZXI6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdyA9IE1hdGguZmxvb3IoaSAvIHNsaWRlc1BlclJvdyk7XG4gICAgICAgIGNvbHVtbiA9IGkgLSAocm93ICogc2xpZGVzUGVyUm93KTtcbiAgICAgIH1cbiAgICAgIHNsaWRlXG4gICAgICAgIC5jc3MoXG4gICAgICAgICAgYG1hcmdpbi0ke3N3aXBlci5pc0hvcml6b250YWwoKSA/ICd0b3AnIDogJ2xlZnQnfWAsXG4gICAgICAgICAgKHJvdyAhPT0gMCAmJiBwYXJhbXMuc3BhY2VCZXR3ZWVuKSAmJiAoYCR7cGFyYW1zLnNwYWNlQmV0d2Vlbn1weGApXG4gICAgICAgIClcbiAgICAgICAgLmF0dHIoJ2RhdGEtc3dpcGVyLWNvbHVtbicsIGNvbHVtbilcbiAgICAgICAgLmF0dHIoJ2RhdGEtc3dpcGVyLXJvdycsIHJvdyk7XG4gICAgfVxuICAgIGlmIChzbGlkZS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICBzbGlkZVNpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZS5vdXRlcldpZHRoKHRydWUpIDogc2xpZGUub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZVNpemUgPSAoc3dpcGVyU2l6ZSAtICgocGFyYW1zLnNsaWRlc1BlclZpZXcgLSAxKSAqIHNwYWNlQmV0d2VlbikpIC8gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuXG4gICAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICBzbGlkZXNbaV0uc3R5bGUud2lkdGggPSBgJHtzbGlkZVNpemV9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZS5oZWlnaHQgPSBgJHtzbGlkZVNpemV9cHhgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgfVxuICAgIHNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG5cblxuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgKHNsaWRlU2l6ZSAvIDIpICsgKHByZXZTbGlkZVNpemUgLyAyKSArIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChwcmV2U2xpZGVTaXplID09PSAwICYmIGkgIT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gKHN3aXBlclNpemUgLyAyKSAtIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChpID09PSAwKSBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIChzd2lwZXJTaXplIC8gMikgLSBzcGFjZUJldHdlZW47XG4gICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMTAwMCkgc2xpZGVQb3NpdGlvbiA9IDA7XG4gICAgICBpZiAoKGluZGV4KSAlIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKChpbmRleCkgJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICB9XG5cbiAgICBzd2lwZXIudmlydHVhbFNpemUgKz0gc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuXG4gICAgcHJldlNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcblxuICAgIGluZGV4ICs9IDE7XG4gIH1cbiAgc3dpcGVyLnZpcnR1YWxTaXplID0gTWF0aC5tYXgoc3dpcGVyLnZpcnR1YWxTaXplLCBzd2lwZXJTaXplKSArIG9mZnNldEFmdGVyO1xuICBsZXQgbmV3U2xpZGVzR3JpZDtcblxuICBpZiAoXG4gICAgcnRsICYmIHdyb25nUlRMICYmIChwYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHBhcmFtcy5lZmZlY3QgPT09ICdjb3ZlcmZsb3cnKSkge1xuICAgICR3cmFwcGVyRWwuY3NzKHsgd2lkdGg6IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW59cHhgIH0pO1xuICB9XG4gIGlmICghU3VwcG9ydC5mbGV4Ym94IHx8IHBhcmFtcy5zZXRXcmFwcGVyU2l6ZSkge1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpICR3cmFwcGVyRWwuY3NzKHsgd2lkdGg6IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW59cHhgIH0pO1xuICAgIGVsc2UgJHdyYXBwZXJFbC5jc3MoeyBoZWlnaHQ6IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW59cHhgIH0pO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgc3dpcGVyLnZpcnR1YWxTaXplID0gKHNsaWRlU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICogc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICBzd2lwZXIudmlydHVhbFNpemUgPSBNYXRoLmNlaWwoc3dpcGVyLnZpcnR1YWxTaXplIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbikgLSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpICR3cmFwcGVyRWwuY3NzKHsgd2lkdGg6IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW59cHhgIH0pO1xuICAgIGVsc2UgJHdyYXBwZXJFbC5jc3MoeyBoZWlnaHQ6IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW59cHhgIH0pO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIG5ld1NsaWRlc0dyaWQgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25hcEdyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHNuYXBHcmlkW2ldIDwgc3dpcGVyLnZpcnR1YWxTaXplICsgc25hcEdyaWRbMF0pIG5ld1NsaWRlc0dyaWQucHVzaChzbmFwR3JpZFtpXSk7XG4gICAgICB9XG4gICAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGxhc3QgZ3JpZCBlbGVtZW50cyBkZXBlbmRpbmcgb24gd2lkdGhcbiAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICBuZXdTbGlkZXNHcmlkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFwR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNuYXBHcmlkW2ldIDw9IHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIHtcbiAgICAgICAgbmV3U2xpZGVzR3JpZC5wdXNoKHNuYXBHcmlkW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuICAgIGlmIChNYXRoLmZsb29yKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIC0gTWF0aC5mbG9vcihzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XG4gICAgICBzbmFwR3JpZC5wdXNoKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpO1xuICAgIH1cbiAgfVxuICBpZiAoc25hcEdyaWQubGVuZ3RoID09PSAwKSBzbmFwR3JpZCA9IFswXTtcblxuICBpZiAocGFyYW1zLnNwYWNlQmV0d2VlbiAhPT0gMCkge1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIGlmIChydGwpIHNsaWRlcy5jc3MoeyBtYXJnaW5MZWZ0OiBgJHtzcGFjZUJldHdlZW59cHhgIH0pO1xuICAgICAgZWxzZSBzbGlkZXMuY3NzKHsgbWFyZ2luUmlnaHQ6IGAke3NwYWNlQmV0d2Vlbn1weGAgfSk7XG4gICAgfSBlbHNlIHNsaWRlcy5jc3MoeyBtYXJnaW5Cb3R0b206IGAke3NwYWNlQmV0d2Vlbn1weGAgfSk7XG4gIH1cblxuICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgc2xpZGVzLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgc2xpZGVzU2l6ZXNHcmlkLFxuICB9KTtcblxuICBpZiAoc2xpZGVzTGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0xlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KCdzbGlkZXNMZW5ndGhDaGFuZ2UnKTtcbiAgfVxuICBpZiAoc25hcEdyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICBzd2lwZXIuZW1pdCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKTtcbiAgfVxuICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KCdzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJyk7XG4gIH1cblxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBhY3RpdmVTbGlkZXMgPSBbXTtcbiAgbGV0IG5ld0hlaWdodCA9IDA7XG4gIGxldCBpO1xuXG4gIC8vIEZpbmQgc2xpZGVzIGN1cnJlbnRseSBpbiB2aWV3XG4gIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcpOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4ICsgaTtcbiAgICAgIGlmIChpbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoKSBicmVhaztcbiAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpWzBdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlU2xpZGVzLnB1c2goc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpWzBdKTtcbiAgfVxuXG4gIC8vIEZpbmQgbmV3IGhlaWdodCBmcm9tIGhpZ2hlc3Qgc2xpZGUgaW4gdmlld1xuICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZXNbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBhY3RpdmVTbGlkZXNbaV0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgbmV3SGVpZ2h0ID0gaGVpZ2h0ID4gbmV3SGVpZ2h0ID8gaGVpZ2h0IDogbmV3SGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBIZWlnaHRcbiAgaWYgKG5ld0hlaWdodCkgc3dpcGVyLiR3cmFwcGVyRWwuY3NzKCdoZWlnaHQnLCBgJHtuZXdIZWlnaHR9cHhgKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVPZmZzZXQgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZXNbaV0ub2Zmc2V0TGVmdCA6IHNsaWRlc1tpXS5vZmZzZXRUb3A7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0cmFuc2xhdGUgPSB0aGlzLnRyYW5zbGF0ZSB8fCAwKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG5cbiAgY29uc3QgeyBzbGlkZXMsIHJ0bCB9ID0gc3dpcGVyO1xuXG4gIGlmIChzbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0ID09PSAndW5kZWZpbmVkJykgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuXG4gIGxldCBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlO1xuICBpZiAocnRsKSBvZmZzZXRDZW50ZXIgPSB0cmFuc2xhdGU7XG5cbiAgLy8gVmlzaWJsZSBTbGlkZXNcbiAgc2xpZGVzLnJlbW92ZUNsYXNzKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlc1tpXTtcbiAgICBjb25zdCBzbGlkZVByb2dyZXNzID1cbiAgICAgIChcbiAgICAgICAgKG9mZnNldENlbnRlciArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSkgLSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldFxuICAgICAgKSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKTtcbiAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgICAgY29uc3Qgc2xpZGVCZWZvcmUgPSAtKG9mZnNldENlbnRlciAtIHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0KTtcbiAgICAgIGNvbnN0IHNsaWRlQWZ0ZXIgPSBzbGlkZUJlZm9yZSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgICBjb25zdCBpc1Zpc2libGUgPVxuICAgICAgICAgICAgICAgIChzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDwgc3dpcGVyLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgKHNsaWRlQWZ0ZXIgPiAwICYmIHNsaWRlQWZ0ZXIgPD0gc3dpcGVyLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgKHNsaWRlQmVmb3JlIDw9IDAgJiYgc2xpZGVBZnRlciA+PSBzd2lwZXIuc2l6ZSk7XG4gICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgIHNsaWRlcy5lcShpKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBzbGlkZS5wcm9ncmVzcyA9IHJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uL3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlIHx8IDApIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcblxuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgbGV0IHsgcHJvZ3Jlc3MsIGlzQmVnaW5uaW5nLCBpc0VuZCB9ID0gc3dpcGVyO1xuICBjb25zdCB3YXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZztcbiAgY29uc3Qgd2FzRW5kID0gaXNFbmQ7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIHByb2dyZXNzID0gMDtcbiAgICBpc0JlZ2lubmluZyA9IHRydWU7XG4gICAgaXNFbmQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xuICAgIGlzQmVnaW5uaW5nID0gcHJvZ3Jlc3MgPD0gMDtcbiAgICBpc0VuZCA9IHByb2dyZXNzID49IDE7XG4gIH1cbiAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgIHByb2dyZXNzLFxuICAgIGlzQmVnaW5uaW5nLFxuICAgIGlzRW5kLFxuICB9KTtcblxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkgc3dpcGVyLnVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZSk7XG5cbiAgaWYgKGlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHtcbiAgICBzd2lwZXIuZW1pdCgncmVhY2hCZWdpbm5pbmcgdG9FZGdlJyk7XG4gIH1cbiAgaWYgKGlzRW5kICYmICF3YXNFbmQpIHtcbiAgICBzd2lwZXIuZW1pdCgncmVhY2hFbmQgdG9FZGdlJyk7XG4gIH1cbiAgaWYgKCh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nKSB8fCAod2FzRW5kICYmICFpc0VuZCkpIHtcbiAgICBzd2lwZXIuZW1pdCgnZnJvbUVkZ2UnKTtcbiAgfVxuXG4gIHN3aXBlci5lbWl0KCdwcm9ncmVzcycsIHByb2dyZXNzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcblxuICBjb25zdCB7XG4gICAgc2xpZGVzLCBwYXJhbXMsICR3cmFwcGVyRWwsIGFjdGl2ZUluZGV4LCByZWFsSW5kZXgsXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG5cbiAgc2xpZGVzLnJlbW92ZUNsYXNzKGAke3BhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzfSAke3BhcmFtcy5zbGlkZU5leHRDbGFzc30gJHtwYXJhbXMuc2xpZGVQcmV2Q2xhc3N9ICR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3N9ICR7cGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzfSAke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzc31gKTtcblxuICBsZXQgYWN0aXZlU2xpZGU7XG4gIGlmIChpc1ZpcnR1YWwpIHtcbiAgICBhY3RpdmVTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmZpbmQoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7YWN0aXZlSW5kZXh9XCJdYCk7XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZXEoYWN0aXZlSW5kZXgpO1xuICB9XG5cbiAgLy8gQWN0aXZlIGNsYXNzZXNcbiAgYWN0aXZlU2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xuXG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgIGlmIChhY3RpdmVTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICR3cmFwcGVyRWxcbiAgICAgICAgLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc306bm90KC4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSlbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl1gKVxuICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYClcbiAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcbiAgICB9XG4gIH1cbiAgLy8gTmV4dCBTbGlkZVxuICBsZXQgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dEFsbChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YCkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgaWYgKHBhcmFtcy5sb29wICYmIG5leHRTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICBuZXh0U2xpZGUgPSBzbGlkZXMuZXEoMCk7XG4gICAgbmV4dFNsaWRlLmFkZENsYXNzKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gIH1cbiAgLy8gUHJldiBTbGlkZVxuICBsZXQgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldkFsbChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YCkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgaWYgKHBhcmFtcy5sb29wICYmIHByZXZTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICBwcmV2U2xpZGUgPSBzbGlkZXMuZXEoLTEpO1xuICAgIHByZXZTbGlkZS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgIGlmIChuZXh0U2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9Om5vdCguJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtuZXh0U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKX1cIl1gKVxuICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHdyYXBwZXJFbFxuICAgICAgICAuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfS4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7bmV4dFNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyl9XCJdYClcbiAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk7XG4gICAgfVxuICAgIGlmIChwcmV2U2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9Om5vdCguJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKX1cIl1gKVxuICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHdyYXBwZXJFbFxuICAgICAgICAuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfS4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cHJldlNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyl9XCJdYClcbiAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmV3QWN0aXZlSW5kZXgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgY29uc3Qge1xuICAgIHNsaWRlc0dyaWQsIHNuYXBHcmlkLCBwYXJhbXMsIGFjdGl2ZUluZGV4OiBwcmV2aW91c0luZGV4LCByZWFsSW5kZXg6IHByZXZpb3VzUmVhbEluZGV4LCBzbmFwSW5kZXg6IHByZXZpb3VzU25hcEluZGV4LFxuICB9ID0gc3dpcGVyO1xuICBsZXQgYWN0aXZlSW5kZXggPSBuZXdBY3RpdmVJbmRleDtcbiAgbGV0IHNuYXBJbmRleDtcbiAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSAtICgoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpKSB7XG4gICAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHNsaWRlc0dyaWRbaSArIDFdKSB7XG4gICAgICAgICAgYWN0aXZlSW5kZXggPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gICAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgICBpZiAoYWN0aXZlSW5kZXggPCAwIHx8IHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIGFjdGl2ZUluZGV4ID0gMDtcbiAgICB9XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKSA+PSAwKSB7XG4gICAgc25hcEluZGV4ID0gc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUpO1xuICB9IGVsc2Uge1xuICAgIHNuYXBJbmRleCA9IE1hdGguZmxvb3IoYWN0aXZlSW5kZXggLyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICB9XG4gIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICBpZiAoc25hcEluZGV4ICE9PSBwcmV2aW91c1NuYXBJbmRleCkge1xuICAgICAgc3dpcGVyLnNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgIHN3aXBlci5lbWl0KCdzbmFwSW5kZXhDaGFuZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IHJlYWwgaW5kZXhcbiAgY29uc3QgcmVhbEluZGV4ID0gcGFyc2VJbnQoc3dpcGVyLnNsaWRlcy5lcShhY3RpdmVJbmRleCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSB8fCBhY3RpdmVJbmRleCwgMTApO1xuXG4gIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICBzbmFwSW5kZXgsXG4gICAgcmVhbEluZGV4LFxuICAgIHByZXZpb3VzSW5kZXgsXG4gICAgYWN0aXZlSW5kZXgsXG4gIH0pO1xuICBzd2lwZXIuZW1pdCgnYWN0aXZlSW5kZXhDaGFuZ2UnKTtcbiAgc3dpcGVyLmVtaXQoJ3NuYXBJbmRleENoYW5nZScpO1xuICBpZiAocHJldmlvdXNSZWFsSW5kZXggIT09IHJlYWxJbmRleCkge1xuICAgIHN3aXBlci5lbWl0KCdyZWFsSW5kZXhDaGFuZ2UnKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2UnKTtcbn1cbiIsImltcG9ydCAkIGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChlKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHNsaWRlID0gJChlLnRhcmdldCkuY2xvc2VzdChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YClbMF07XG4gIGxldCBzbGlkZUZvdW5kID0gZmFsc2U7XG4gIGlmIChzbGlkZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaV0gPT09IHNsaWRlKSBzbGlkZUZvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2xpZGUgJiYgc2xpZGVGb3VuZCkge1xuICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSBzbGlkZTtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBwYXJzZUludCgkKHNsaWRlKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSAkKHNsaWRlKS5pbmRleCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gdW5kZWZpbmVkO1xuICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuc2xpZGVUb0NsaWNrZWRTbGlkZSAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSB1bmRlZmluZWQgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XG4gICAgc3dpcGVyLnNsaWRlVG9DbGlja2VkU2xpZGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVwZGF0ZVNpemUgZnJvbSAnLi91cGRhdGVTaXplJztcbmltcG9ydCB1cGRhdGVTbGlkZXMgZnJvbSAnLi91cGRhdGVTbGlkZXMnO1xuaW1wb3J0IHVwZGF0ZUF1dG9IZWlnaHQgZnJvbSAnLi91cGRhdGVBdXRvSGVpZ2h0JztcbmltcG9ydCB1cGRhdGVTbGlkZXNPZmZzZXQgZnJvbSAnLi91cGRhdGVTbGlkZXNPZmZzZXQnO1xuaW1wb3J0IHVwZGF0ZVNsaWRlc1Byb2dyZXNzIGZyb20gJy4vdXBkYXRlU2xpZGVzUHJvZ3Jlc3MnO1xuaW1wb3J0IHVwZGF0ZVByb2dyZXNzIGZyb20gJy4vdXBkYXRlUHJvZ3Jlc3MnO1xuaW1wb3J0IHVwZGF0ZVNsaWRlc0NsYXNzZXMgZnJvbSAnLi91cGRhdGVTbGlkZXNDbGFzc2VzJztcbmltcG9ydCB1cGRhdGVBY3RpdmVJbmRleCBmcm9tICcuL3VwZGF0ZUFjdGl2ZUluZGV4JztcbmltcG9ydCB1cGRhdGVDbGlja2VkU2xpZGUgZnJvbSAnLi91cGRhdGVDbGlja2VkU2xpZGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHVwZGF0ZVNpemUsXG4gIHVwZGF0ZVNsaWRlcyxcbiAgdXBkYXRlQXV0b0hlaWdodCxcbiAgdXBkYXRlU2xpZGVzT2Zmc2V0LFxuICB1cGRhdGVTbGlkZXNQcm9ncmVzcyxcbiAgdXBkYXRlUHJvZ3Jlc3MsXG4gIHVwZGF0ZVNsaWRlc0NsYXNzZXMsXG4gIHVwZGF0ZUFjdGl2ZUluZGV4LFxuICB1cGRhdGVDbGlja2VkU2xpZGUsXG59O1xuXG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYXhpcyA9IHRoaXMuaXNIb3Jpem9udGFsKCkgPyAneCcgOiAneScpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcblxuICBjb25zdCB7XG4gICAgcGFyYW1zLCBydGwsIHRyYW5zbGF0ZSwgJHdyYXBwZXJFbCxcbiAgfSA9IHN3aXBlcjtcblxuICBpZiAocGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICByZXR1cm4gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgfVxuXG4gIGxldCBjdXJyZW50VHJhbnNsYXRlID0gVXRpbHMuZ2V0VHJhbnNsYXRlKCR3cmFwcGVyRWxbMF0sIGF4aXMpO1xuICBpZiAocnRsKSBjdXJyZW50VHJhbnNsYXRlID0gLWN1cnJlbnRUcmFuc2xhdGU7XG5cbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGUgfHwgMDtcbn1cbiIsImltcG9ydCBTdXBwb3J0IGZyb20gJy4uLy4uLy4uL3V0aWxzL3N1cHBvcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHJ0bCwgcGFyYW1zLCAkd3JhcHBlckVsLCBwcm9ncmVzcyxcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IDA7XG4gIGNvbnN0IHogPSAwO1xuXG4gIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICB4ID0gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gdHJhbnNsYXRlO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgfVxuXG4gIGlmICghcGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICBpZiAoU3VwcG9ydC50cmFuc2Zvcm1zM2QpICR3cmFwcGVyRWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgJHt6fXB4KWApO1xuICAgIGVsc2UgJHdyYXBwZXJFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgKTtcbiAgfVxuXG4gIHN3aXBlci50cmFuc2xhdGUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB4IDogeTtcblxuICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSBwcm9ncmVzc1xuICBsZXQgbmV3UHJvZ3Jlc3M7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBuZXdQcm9ncmVzcyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvICh0cmFuc2xhdGVzRGlmZik7XG4gIH1cbiAgaWYgKG5ld1Byb2dyZXNzICE9PSBwcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICB9XG5cbiAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zbGF0ZScsIHN3aXBlci50cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAoLXRoaXMuc25hcEdyaWRbMF0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKC10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoIC0gMV0pO1xufVxuIiwiaW1wb3J0IGdldFRyYW5zbGF0ZSBmcm9tICcuL2dldFRyYW5zbGF0ZSc7XG5pbXBvcnQgc2V0VHJhbnNsYXRlIGZyb20gJy4vc2V0VHJhbnNsYXRlJztcbmltcG9ydCBtaW5UcmFuc2xhdGUgZnJvbSAnLi9taW5UcmFuc2xhdGUnO1xuaW1wb3J0IG1heFRyYW5zbGF0ZSBmcm9tICcuL21heFRyYW5zbGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0VHJhbnNsYXRlLFxuICBzZXRUcmFuc2xhdGUsXG4gIG1pblRyYW5zbGF0ZSxcbiAgbWF4VHJhbnNsYXRlLFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgc3dpcGVyLiR3cmFwcGVyRWwudHJhbnNpdGlvbihkdXJhdGlvbik7XG5cbiAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zaXRpb24nLCBkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChydW5DYWxsYmFja3MgPSB0cnVlLCBkaXJlY3Rpb24pIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgeyBhY3RpdmVJbmRleCwgcGFyYW1zLCBwcmV2aW91c0luZGV4IH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gIH1cblxuICBsZXQgZGlyID0gZGlyZWN0aW9uO1xuICBpZiAoIWRpcikge1xuICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIGRpciA9ICduZXh0JztcbiAgICBlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIGRpciA9ICdwcmV2JztcbiAgICBlbHNlIGRpciA9ICdyZXNldCc7XG4gIH1cblxuICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvblN0YXJ0Jyk7XG5cbiAgaWYgKHJ1bkNhbGxiYWNrcyAmJiBhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xuICAgIGlmIChkaXIgPT09ICdyZXNldCcpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCcpO1xuICAgIGlmIChkaXIgPT09ICduZXh0Jykge1xuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuZW1pdCgnc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0Jyk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocnVuQ2FsbGJhY2tzID0gdHJ1ZSwgZGlyZWN0aW9uKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHsgYWN0aXZlSW5kZXgsIHByZXZpb3VzSW5kZXggfSA9IHN3aXBlcjtcbiAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcblxuICBsZXQgZGlyID0gZGlyZWN0aW9uO1xuICBpZiAoIWRpcikge1xuICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIGRpciA9ICduZXh0JztcbiAgICBlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIGRpciA9ICdwcmV2JztcbiAgICBlbHNlIGRpciA9ICdyZXNldCc7XG4gIH1cblxuICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvbkVuZCcpO1xuXG4gIGlmIChydW5DYWxsYmFja3MgJiYgYWN0aXZlSW5kZXggIT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICBpZiAoZGlyID09PSAncmVzZXQnKSB7XG4gICAgICBzd2lwZXIuZW1pdCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCcpO1xuICAgIGlmIChkaXIgPT09ICduZXh0Jykge1xuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlUHJldlRyYW5zaXRpb25FbmQnKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzZXRUcmFuc2l0aW9uIGZyb20gJy4vc2V0VHJhbnNpdGlvbic7XG5pbXBvcnQgdHJhbnNpdGlvblN0YXJ0IGZyb20gJy4vdHJhbnNpdGlvblN0YXJ0JztcbmltcG9ydCB0cmFuc2l0aW9uRW5kIGZyb20gJy4vdHJhbnNpdGlvbkVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2V0VHJhbnNpdGlvbixcbiAgdHJhbnNpdGlvblN0YXJ0LFxuICB0cmFuc2l0aW9uRW5kLFxufTtcbiIsImltcG9ydCBTdXBwb3J0IGZyb20gJy4uLy4uLy4uL3V0aWxzL3N1cHBvcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoaW5kZXggPSAwLCBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkLCBydW5DYWxsYmFja3MgPSB0cnVlLCBpbnRlcm5hbCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgc2xpZGVJbmRleCA9IGluZGV4O1xuICBpZiAoc2xpZGVJbmRleCA8IDApIHNsaWRlSW5kZXggPSAwO1xuXG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsIHNuYXBHcmlkLCBzbGlkZXNHcmlkLCBwcmV2aW91c0luZGV4LCBhY3RpdmVJbmRleCwgcnRsLCAkd3JhcHBlckVsLFxuICB9ID0gc3dpcGVyO1xuICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyY2F0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IHNuYXBJbmRleCA9IE1hdGguZmxvb3Ioc2xpZGVJbmRleCAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuXG4gIGlmICgoYWN0aXZlSW5kZXggfHwgcGFyYW1zLmluaXRpYWxTbGlkZSB8fCAwKSA9PT0gKHByZXZpb3VzSW5kZXggfHwgMCkgJiYgcnVuQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVNsaWRlQ2hhbmdlU3RhcnQnKTtcbiAgfVxuXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IC1zbmFwR3JpZFtzbmFwSW5kZXhdO1xuXG4gIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcblxuICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICgtTWF0aC5mbG9vcih0cmFuc2xhdGUgKiAxMDApID49IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCkpIHtcbiAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCAmJiBzbGlkZUluZGV4ICE9PSBhY3RpdmVJbmRleCkge1xuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHRyYW5zbGF0ZSA8IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlIDwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHRyYW5zbGF0ZSA+IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlID4gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbGV0IGRpcmVjdGlvbjtcbiAgaWYgKHNsaWRlSW5kZXggPiBhY3RpdmVJbmRleCkgZGlyZWN0aW9uID0gJ25leHQnO1xuICBlbHNlIGlmIChzbGlkZUluZGV4IDwgYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9ICdwcmV2JztcbiAgZWxzZSBkaXJlY3Rpb24gPSAncmVzZXQnO1xuXG5cbiAgLy8gVXBkYXRlIEluZGV4XG4gIGlmICgocnRsICYmIC10cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUpIHx8ICghcnRsICYmIHRyYW5zbGF0ZSA9PT0gc3dpcGVyLnRyYW5zbGF0ZSkpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgLy8gVXBkYXRlIEhlaWdodFxuICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICB9XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBpZiAocGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJykge1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aW9uICE9PSAncmVzZXQnKSB7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHNwZWVkID09PSAwIHx8ICFTdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoaW5kZXggPSAwLCBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkLCBydW5DYWxsYmFja3MgPSB0cnVlLCBpbnRlcm5hbCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgbmV3SW5kZXggPSBpbmRleDtcbiAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgIG5ld0luZGV4ICs9IHN3aXBlci5sb29wZWRTbGlkZXM7XG4gIH1cblxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cbiIsIi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQsIHJ1bkNhbGxiYWNrcyA9IHRydWUsIGludGVybmFsKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHsgcGFyYW1zLCBhbmltYXRpbmcgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKGFuaW1hdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIHBhcmFtcy5zbGlkZXNQZXJHcm91cCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuIiwiLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZCwgcnVuQ2FsbGJhY2tzID0gdHJ1ZSwgaW50ZXJuYWwpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgeyBwYXJhbXMsIGFuaW1hdGluZyB9ID0gc3dpcGVyO1xuXG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChhbmltYXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQ7XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCAtIDEsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4IC0gMSwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuIiwiLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZCwgcnVuQ2FsbGJhY2tzID0gdHJ1ZSwgaW50ZXJuYWwpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgeyBwYXJhbXMsICR3cmFwcGVyRWwgfSA9IHN3aXBlcjtcblxuICBjb25zdCBzbGlkZXNQZXJWaWV3ID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gIGxldCBzbGlkZVRvSW5kZXggPSBzd2lwZXIuY2xpY2tlZEluZGV4O1xuICBsZXQgcmVhbEluZGV4O1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykgcmV0dXJuO1xuICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KCQoc3dpcGVyLmNsaWNrZWRTbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKHNsaWRlVG9JbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMgLSAoc2xpZGVzUGVyVmlldyAvIDIpKSB8fFxuICAgICAgICAoc2xpZGVUb0luZGV4ID4gKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc3dpcGVyLmxvb3BlZFNsaWRlcykgKyAoc2xpZGVzUGVyVmlldyAvIDIpKVxuICAgICAgKSB7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgIHNsaWRlVG9JbmRleCA9ICR3cmFwcGVyRWxcbiAgICAgICAgICAuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXTpub3QoLiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9KWApXG4gICAgICAgICAgLmVxKDApXG4gICAgICAgICAgLmluZGV4KCk7XG5cbiAgICAgICAgVXRpbHMubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc2xpZGVzUGVyVmlldykge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgIHNsaWRlVG9JbmRleCA9ICR3cmFwcGVyRWxcbiAgICAgICAgLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl06bm90KC4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSlgKVxuICAgICAgICAuZXEoMClcbiAgICAgICAgLmluZGV4KCk7XG5cbiAgICAgIFV0aWxzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQgc2xpZGVUbyBmcm9tICcuL3NsaWRlVG8nO1xuaW1wb3J0IHNsaWRlVG9Mb29wIGZyb20gJy4vc2xpZGVUb0xvb3AnO1xuaW1wb3J0IHNsaWRlTmV4dCBmcm9tICcuL3NsaWRlTmV4dCc7XG5pbXBvcnQgc2xpZGVQcmV2IGZyb20gJy4vc2xpZGVQcmV2JztcbmltcG9ydCBzbGlkZVJlc2V0IGZyb20gJy4vc2xpZGVSZXNldCc7XG5pbXBvcnQgc2xpZGVUb0NsaWNrZWRTbGlkZSBmcm9tICcuL3NsaWRlVG9DbGlja2VkU2xpZGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNsaWRlVG8sXG4gIHNsaWRlVG9Mb29wLFxuICBzbGlkZU5leHQsXG4gIHNsaWRlUHJldixcbiAgc2xpZGVSZXNldCxcbiAgc2xpZGVUb0NsaWNrZWRTbGlkZSxcbn07XG4iLCJpbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJ3Nzci13aW5kb3cnO1xuaW1wb3J0ICQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7IHBhcmFtcywgJHdyYXBwZXJFbCB9ID0gc3dpcGVyO1xuICAvLyBSZW1vdmUgZHVwbGljYXRlZCBzbGlkZXNcbiAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9YCkucmVtb3ZlKCk7XG5cbiAgbGV0IHNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApO1xuXG4gIGlmIChwYXJhbXMubG9vcEZpbGxHcm91cFdpdGhCbGFuaykge1xuICAgIGNvbnN0IGJsYW5rU2xpZGVzTnVtID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwIC0gKHNsaWRlcy5sZW5ndGggJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgIGlmIChibGFua1NsaWRlc051bSAhPT0gcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYW5rU2xpZGVzTnVtOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgYmxhbmtOb2RlID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkuYWRkQ2xhc3MoYCR7cGFyYW1zLnNsaWRlQ2xhc3N9ICR7cGFyYW1zLnNsaWRlQmxhbmtDbGFzc31gKTtcbiAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoYmxhbmtOb2RlKTtcbiAgICAgIH1cbiAgICAgIHNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmICFwYXJhbXMubG9vcGVkU2xpZGVzKSBwYXJhbXMubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcblxuICBzd2lwZXIubG9vcGVkU2xpZGVzID0gcGFyc2VJbnQocGFyYW1zLmxvb3BlZFNsaWRlcyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApO1xuICBzd2lwZXIubG9vcGVkU2xpZGVzICs9IHBhcmFtcy5sb29wQWRkaXRpb25hbFNsaWRlcztcbiAgaWYgKHN3aXBlci5sb29wZWRTbGlkZXMgPiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IHNsaWRlcy5sZW5ndGg7XG4gIH1cblxuICBjb25zdCBwcmVwZW5kU2xpZGVzID0gW107XG4gIGNvbnN0IGFwcGVuZFNsaWRlcyA9IFtdO1xuICBzbGlkZXMuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgY29uc3Qgc2xpZGUgPSAkKGVsKTtcbiAgICBpZiAoaW5kZXggPCBzd2lwZXIubG9vcGVkU2xpZGVzKSBhcHBlbmRTbGlkZXMucHVzaChlbCk7XG4gICAgaWYgKGluZGV4IDwgc2xpZGVzLmxlbmd0aCAmJiBpbmRleCA+PSBzbGlkZXMubGVuZ3RoIC0gc3dpcGVyLmxvb3BlZFNsaWRlcykgcHJlcGVuZFNsaWRlcy5wdXNoKGVsKTtcbiAgICBzbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwZW5kU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgJHdyYXBwZXJFbC5hcHBlbmQoJChhcHBlbmRTbGlkZXNbaV0uY2xvbmVOb2RlKHRydWUpKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpO1xuICB9XG4gIGZvciAobGV0IGkgPSBwcmVwZW5kU2xpZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgJHdyYXBwZXJFbC5wcmVwZW5kKCQocHJlcGVuZFNsaWRlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcywgYWN0aXZlSW5kZXgsIHNsaWRlcywgbG9vcGVkU2xpZGVzLCBhbGxvd1NsaWRlUHJldiwgYWxsb3dTbGlkZU5leHQsIHNuYXBHcmlkLCBydGwsXG4gIH0gPSBzd2lwZXI7XG4gIGxldCBuZXdJbmRleDtcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcblxuICBjb25zdCBzbmFwVHJhbnNsYXRlID0gLXNuYXBHcmlkW2FjdGl2ZUluZGV4XTtcbiAgY29uc3QgZGlmZiA9IHNuYXBUcmFuc2xhdGUgLSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCk7XG5cblxuICAvLyBGaXggRm9yIE5lZ2F0aXZlIE92ZXJzbGlkaW5nXG4gIGlmIChhY3RpdmVJbmRleCA8IGxvb3BlZFNsaWRlcykge1xuICAgIG5ld0luZGV4ID0gKHNsaWRlcy5sZW5ndGggLSAobG9vcGVkU2xpZGVzICogMykpICsgYWN0aXZlSW5kZXg7XG4gICAgbmV3SW5kZXggKz0gbG9vcGVkU2xpZGVzO1xuICAgIGNvbnN0IHNsaWRlQ2hhbmdlZCA9IHN3aXBlci5zbGlkZVRvKG5ld0luZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgaWYgKHNsaWRlQ2hhbmdlZCAmJiBkaWZmICE9PSAwKSB7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKChydGwgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpIC0gZGlmZik7XG4gICAgfVxuICB9IGVsc2UgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIGFjdGl2ZUluZGV4ID49IGxvb3BlZFNsaWRlcyAqIDIpIHx8IChhY3RpdmVJbmRleCA+IHNsaWRlcy5sZW5ndGggLSAocGFyYW1zLnNsaWRlc1BlclZpZXcgKiAyKSkpIHtcbiAgICAvLyBGaXggRm9yIFBvc2l0aXZlIE92ZXJzbGlkaW5nXG4gICAgbmV3SW5kZXggPSAtc2xpZGVzLmxlbmd0aCArIGFjdGl2ZUluZGV4ICsgbG9vcGVkU2xpZGVzO1xuICAgIG5ld0luZGV4ICs9IGxvb3BlZFNsaWRlcztcbiAgICBjb25zdCBzbGlkZUNoYW5nZWQgPSBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgIGlmIChzbGlkZUNoYW5nZWQgJiYgZGlmZiAhPT0gMCkge1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSgocnRsID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKSAtIGRpZmYpO1xuICAgIH1cbiAgfVxuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHsgJHdyYXBwZXJFbCwgcGFyYW1zLCBzbGlkZXMgfSA9IHN3aXBlcjtcbiAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9YCkucmVtb3ZlKCk7XG4gIHNsaWRlcy5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xufVxuIiwiaW1wb3J0IGxvb3BDcmVhdGUgZnJvbSAnLi9sb29wQ3JlYXRlJztcbmltcG9ydCBsb29wRml4IGZyb20gJy4vbG9vcEZpeCc7XG5pbXBvcnQgbG9vcERlc3Ryb3kgZnJvbSAnLi9sb29wRGVzdHJveSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbG9vcENyZWF0ZSxcbiAgbG9vcEZpeCxcbiAgbG9vcERlc3Ryb3ksXG59O1xuIiwiaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtb3ZpbmcpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKFN1cHBvcnQudG91Y2ggfHwgIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCkgcmV0dXJuO1xuICBjb25zdCBlbCA9IHN3aXBlci5lbDtcbiAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLXdlYmtpdC1ncmFiYmluZycgOiAnLXdlYmtpdC1ncmFiJztcbiAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJy1tb3otZ3JhYmJpbicgOiAnLW1vei1ncmFiJztcbiAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJ2dyYWJiaW5nJyA6ICdncmFiJztcbn1cbiIsImltcG9ydCBTdXBwb3J0IGZyb20gJy4uLy4uLy4uL3V0aWxzL3N1cHBvcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChTdXBwb3J0LnRvdWNoKSByZXR1cm47XG4gIHN3aXBlci5lbC5zdHlsZS5jdXJzb3IgPSAnJztcbn1cbiIsImltcG9ydCBzZXRHcmFiQ3Vyc29yIGZyb20gJy4vc2V0R3JhYkN1cnNvcic7XG5pbXBvcnQgdW5zZXRHcmFiQ3Vyc29yIGZyb20gJy4vdW5zZXRHcmFiQ3Vyc29yJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZXRHcmFiQ3Vyc29yLFxuICB1bnNldEdyYWJDdXJzb3IsXG59O1xuIiwiaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzbGlkZXMpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgeyAkd3JhcHBlckVsLCBwYXJhbXMgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2xpZGVzW2ldKSAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXNbaV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXMpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCEocGFyYW1zLm9ic2VydmVyICYmIFN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3VwcG9ydCBmcm9tICcuLi8uLi8uLi91dGlscy9zdXBwb3J0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNsaWRlcykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7IHBhcmFtcywgJHdyYXBwZXJFbCwgYWN0aXZlSW5kZXggfSA9IHN3aXBlcjtcblxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgfVxuICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIDE7XG4gIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNsaWRlc1tpXSkgJHdyYXBwZXJFbC5wcmVwZW5kKHNsaWRlc1tpXSk7XG4gICAgfVxuICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyBzbGlkZXMubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgICR3cmFwcGVyRWwucHJlcGVuZChzbGlkZXMpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCEocGFyYW1zLm9ic2VydmVyICYmIFN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG4gIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG59XG4iLCJpbXBvcnQgU3VwcG9ydCBmcm9tICcuLi8uLi8uLi91dGlscy9zdXBwb3J0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNsaWRlc0luZGV4ZXMpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgeyBwYXJhbXMsICR3cmFwcGVyRWwsIGFjdGl2ZUluZGV4IH0gPSBzd2lwZXI7XG5cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgc3dpcGVyLnNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApO1xuICB9XG4gIGxldCBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4O1xuICBsZXQgaW5kZXhUb1JlbW92ZTtcblxuICBpZiAodHlwZW9mIHNsaWRlc0luZGV4ZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlc0luZGV4ZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0luZGV4ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzW2ldO1xuICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHN3aXBlci5zbGlkZXMuZXEoaW5kZXhUb1JlbW92ZSkucmVtb3ZlKCk7XG4gICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleCAtPSAxO1xuICAgIH1cbiAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgfSBlbHNlIHtcbiAgICBpbmRleFRvUmVtb3ZlID0gc2xpZGVzSW5kZXhlcztcbiAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgc3dpcGVyLnNsaWRlcy5lcShpbmRleFRvUmVtb3ZlKS5yZW1vdmUoKTtcbiAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleCAtPSAxO1xuICAgIG5ld0FjdGl2ZUluZGV4ID0gTWF0aC5tYXgobmV3QWN0aXZlSW5kZXgsIDApO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuXG4gIGlmICghKHBhcmFtcy5vYnNlcnZlciAmJiBTdXBwb3J0Lm9ic2VydmVyKSkge1xuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgY29uc3Qgc2xpZGVzSW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gIH1cbiAgc3dpcGVyLnJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpO1xufVxuIiwiaW1wb3J0IGFwcGVuZFNsaWRlIGZyb20gJy4vYXBwZW5kU2xpZGUnO1xuaW1wb3J0IHByZXBlbmRTbGlkZSBmcm9tICcuL3ByZXBlbmRTbGlkZSc7XG5pbXBvcnQgcmVtb3ZlU2xpZGUgZnJvbSAnLi9yZW1vdmVTbGlkZSc7XG5pbXBvcnQgcmVtb3ZlQWxsU2xpZGVzIGZyb20gJy4vcmVtb3ZlQWxsU2xpZGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhcHBlbmRTbGlkZSxcbiAgcHJlcGVuZFNsaWRlLFxuICByZW1vdmVTbGlkZSxcbiAgcmVtb3ZlQWxsU2xpZGVzLFxufTtcbiIsImltcG9ydCB7IHdpbmRvdywgZG9jdW1lbnQgfSBmcm9tICdzc3Itd2luZG93JztcblxuY29uc3QgRGV2aWNlID0gKGZ1bmN0aW9uIERldmljZSgpIHtcbiAgY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBjb25zdCBkZXZpY2UgPSB7XG4gICAgaW9zOiBmYWxzZSxcbiAgICBhbmRyb2lkOiBmYWxzZSxcbiAgICBhbmRyb2lkQ2hyb21lOiBmYWxzZSxcbiAgICBkZXNrdG9wOiBmYWxzZSxcbiAgICB3aW5kb3dzOiBmYWxzZSxcbiAgICBpcGhvbmU6IGZhbHNlLFxuICAgIGlwb2Q6IGZhbHNlLFxuICAgIGlwYWQ6IGZhbHNlLFxuICAgIGNvcmRvdmE6IHdpbmRvdy5jb3Jkb3ZhIHx8IHdpbmRvdy5waG9uZWdhcCxcbiAgICBwaG9uZWdhcDogd2luZG93LmNvcmRvdmEgfHwgd2luZG93LnBob25lZ2FwLFxuICB9O1xuXG4gIGNvbnN0IHdpbmRvd3MgPSB1YS5tYXRjaCgvKFdpbmRvd3MgUGhvbmUpOz9bXFxzXFwvXSsoW1xcZC5dKyk/Lyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3QgYW5kcm9pZCA9IHVhLm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBpcGFkID0gdWEubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKTtcbiAgY29uc3QgaXBvZCA9IHVhLm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/Lyk7XG4gIGNvbnN0IGlwaG9uZSA9ICFpcGFkICYmIHVhLm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pO1xuXG5cbiAgLy8gV2luZG93c1xuICBpZiAod2luZG93cykge1xuICAgIGRldmljZS5vcyA9ICd3aW5kb3dzJztcbiAgICBkZXZpY2Uub3NWZXJzaW9uID0gd2luZG93c1syXTtcbiAgICBkZXZpY2Uud2luZG93cyA9IHRydWU7XG4gIH1cbiAgLy8gQW5kcm9pZFxuICBpZiAoYW5kcm9pZCAmJiAhd2luZG93cykge1xuICAgIGRldmljZS5vcyA9ICdhbmRyb2lkJztcbiAgICBkZXZpY2Uub3NWZXJzaW9uID0gYW5kcm9pZFsyXTtcbiAgICBkZXZpY2UuYW5kcm9pZCA9IHRydWU7XG4gICAgZGV2aWNlLmFuZHJvaWRDaHJvbWUgPSB1YS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2Nocm9tZScpID49IDA7XG4gIH1cbiAgaWYgKGlwYWQgfHwgaXBob25lIHx8IGlwb2QpIHtcbiAgICBkZXZpY2Uub3MgPSAnaW9zJztcbiAgICBkZXZpY2UuaW9zID0gdHJ1ZTtcbiAgfVxuICAvLyBpT1NcbiAgaWYgKGlwaG9uZSAmJiAhaXBvZCkge1xuICAgIGRldmljZS5vc1ZlcnNpb24gPSBpcGhvbmVbMl0ucmVwbGFjZSgvXy9nLCAnLicpO1xuICAgIGRldmljZS5pcGhvbmUgPSB0cnVlO1xuICB9XG4gIGlmIChpcGFkKSB7XG4gICAgZGV2aWNlLm9zVmVyc2lvbiA9IGlwYWRbMl0ucmVwbGFjZSgvXy9nLCAnLicpO1xuICAgIGRldmljZS5pcGFkID0gdHJ1ZTtcbiAgfVxuICBpZiAoaXBvZCkge1xuICAgIGRldmljZS5vc1ZlcnNpb24gPSBpcG9kWzNdID8gaXBvZFszXS5yZXBsYWNlKC9fL2csICcuJykgOiBudWxsO1xuICAgIGRldmljZS5pcGhvbmUgPSB0cnVlO1xuICB9XG4gIC8vIGlPUyA4KyBjaGFuZ2VkIFVBXG4gIGlmIChkZXZpY2UuaW9zICYmIGRldmljZS5vc1ZlcnNpb24gJiYgdWEuaW5kZXhPZignVmVyc2lvbi8nKSA+PSAwKSB7XG4gICAgaWYgKGRldmljZS5vc1ZlcnNpb24uc3BsaXQoJy4nKVswXSA9PT0gJzEwJykge1xuICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IHVhLnRvTG93ZXJDYXNlKCkuc3BsaXQoJ3ZlcnNpb24vJylbMV0uc3BsaXQoJyAnKVswXTtcbiAgICB9XG4gIH1cblxuICAvLyBEZXNrdG9wXG4gIGRldmljZS5kZXNrdG9wID0gIShkZXZpY2Uub3MgfHwgZGV2aWNlLmFuZHJvaWQgfHwgZGV2aWNlLndlYlZpZXcpO1xuXG4gIC8vIFdlYnZpZXdcbiAgZGV2aWNlLndlYlZpZXcgPSAoaXBob25lIHx8IGlwYWQgfHwgaXBvZCkgJiYgdWEubWF0Y2goLy4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaSk7XG5cbiAgLy8gTWluaW1hbCBVSVxuICBpZiAoZGV2aWNlLm9zICYmIGRldmljZS5vcyA9PT0gJ2lvcycpIHtcbiAgICBjb25zdCBvc1ZlcnNpb25BcnIgPSBkZXZpY2Uub3NWZXJzaW9uLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgbWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidmlld3BvcnRcIl0nKTtcbiAgICBkZXZpY2UubWluaW1hbFVpID1cbiAgICAgICFkZXZpY2Uud2ViVmlldyAmJlxuICAgICAgKGlwb2QgfHwgaXBob25lKSAmJlxuICAgICAgKG9zVmVyc2lvbkFyclswXSAqIDEgPT09IDcgPyBvc1ZlcnNpb25BcnJbMV0gKiAxID49IDEgOiBvc1ZlcnNpb25BcnJbMF0gKiAxID4gNykgJiZcbiAgICAgIG1ldGFWaWV3cG9ydCAmJiBtZXRhVmlld3BvcnQuZ2V0QXR0cmlidXRlKCdjb250ZW50JykuaW5kZXhPZignbWluaW1hbC11aScpID49IDA7XG4gIH1cblxuICAvLyBQaXhlbCBSYXRpb1xuICBkZXZpY2UucGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgLy8gRXhwb3J0IG9iamVjdFxuICByZXR1cm4gZGV2aWNlO1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgRGV2aWNlO1xuIiwiaW1wb3J0IHsgd2luZG93LCBkb2N1bWVudCB9IGZyb20gJ3Nzci13aW5kb3cnO1xuaW1wb3J0ICQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBEZXZpY2UgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGV2aWNlJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgY29uc3QgeyBwYXJhbXMsIHRvdWNoZXMgfSA9IHN3aXBlcjtcbiAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmNhdGlvbk9uVHJhbnNpdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgZSA9IGV2ZW50O1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBkYXRhLmlzVG91Y2hFdmVudCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnO1xuICBpZiAoIWRhdGEuaXNUb3VjaEV2ZW50ICYmICd3aGljaCcgaW4gZSAmJiBlLndoaWNoID09PSAzKSByZXR1cm47XG4gIGlmIChkYXRhLmlzVG91Y2hlZCAmJiBkYXRhLmlzTW92ZWQpIHJldHVybjtcbiAgaWYgKHBhcmFtcy5ub1N3aXBpbmcgJiYgJChlLnRhcmdldCkuY2xvc2VzdChwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgPyBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgOiBgLiR7cGFyYW1zLm5vU3dpcGluZ0NsYXNzfWApWzBdKSB7XG4gICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgIGlmICghJChlKS5jbG9zZXN0KHBhcmFtcy5zd2lwZUhhbmRsZXIpWzBdKSByZXR1cm47XG4gIH1cblxuICB0b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICBjb25zdCBzdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICBjb25zdCBzdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuXG4gIC8vIERvIE5PVCBzdGFydCBpZiBpT1MgZWRnZSBzd2lwZSBpcyBkZXRlY3RlZC4gT3RoZXJ3aXNlIGlPUyBhcHAgKFVJV2ViVmlldykgY2Fubm90IHN3aXBlLXRvLWdvLWJhY2sgYW55bW9yZVxuXG4gIGlmIChcbiAgICBEZXZpY2UuaW9zICYmXG4gICAgIURldmljZS5jb3Jkb3ZhICYmXG4gICAgcGFyYW1zLmlPU0VkZ2VTd2lwZURldGVjdGlvbiAmJlxuICAgIChzdGFydFggPD0gcGFyYW1zLmlPU0VkZ2VTd2lwZVRocmVzaG9sZCkgJiZcbiAgICAoc3RhcnRYID49IHdpbmRvdy5zY3JlZW4ud2lkdGggLSBwYXJhbXMuaU9TRWRnZVN3aXBlVGhyZXNob2xkKVxuICApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBVdGlscy5leHRlbmQoZGF0YSwge1xuICAgIGlzVG91Y2hlZDogdHJ1ZSxcbiAgICBpc01vdmVkOiBmYWxzZSxcbiAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB0cnVlLFxuICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgc3RhcnRNb3Zpbmc6IHVuZGVmaW5lZCxcbiAgfSk7XG5cbiAgdG91Y2hlcy5zdGFydFggPSBzdGFydFg7XG4gIHRvdWNoZXMuc3RhcnRZID0gc3RhcnRZO1xuICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gVXRpbHMubm93KCk7XG4gIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gZmFsc2U7XG4gIGlmIChlLnR5cGUgIT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIGxldCBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgaWYgKCQoZS50YXJnZXQpLmlzKGRhdGEuZm9ybUVsZW1lbnRzKSkgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmXG4gICAgICAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKGRhdGEuZm9ybUVsZW1lbnRzKSAmJlxuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZS50YXJnZXRcbiAgICApIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIH1cbiAgICBpZiAocHJldmVudERlZmF1bHQgJiYgc3dpcGVyLmFsbG93VG91Y2hNb3ZlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIHN3aXBlci5lbWl0KCd0b3VjaFN0YXJ0JywgZSk7XG59XG4iLCJpbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJ3Nzci13aW5kb3cnO1xuaW1wb3J0ICQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgY29uc3QgeyBwYXJhbXMsIHRvdWNoZXMsIHJ0bCB9ID0gc3dpcGVyO1xuICBsZXQgZSA9IGV2ZW50O1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlT3Bwb3NpdGUnLCBlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBlLnR5cGUgPT09ICdtb3VzZW1vdmUnKSByZXR1cm47XG4gIGNvbnN0IHBhZ2VYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gIGNvbnN0IHBhZ2VZID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgdG91Y2hlcy5zdGFydFggPSBwYWdlWDtcbiAgICB0b3VjaGVzLnN0YXJ0WSA9IHBhZ2VZO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xuICAgIC8vIGlzTW92ZWQgPSB0cnVlO1xuICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgaWYgKGRhdGEuaXNUb3VjaGVkKSB7XG4gICAgICBVdGlscy5leHRlbmQodG91Y2hlcywge1xuICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICAgIGN1cnJlbnRZOiBwYWdlWSxcbiAgICAgIH0pO1xuICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IFV0aWxzLm5vdygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGRhdGEuaXNUb3VjaEV2ZW50ICYmIHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzICYmICFwYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICAvLyBWZXJ0aWNhbFxuICAgICAgaWYgKFxuICAgICAgICAocGFnZVkgPCB0b3VjaGVzLnN0YXJ0WSAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgfHxcbiAgICAgICAgKHBhZ2VZID4gdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpXG4gICAgICApIHtcbiAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHBhZ2VYIDwgdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHx8XG4gICAgICAocGFnZVggPiB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuaXNUb3VjaEV2ZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgJChlLnRhcmdldCkuaXMoZGF0YS5mb3JtRWxlbWVudHMpKSB7XG4gICAgICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KCd0b3VjaE1vdmUnLCBlKTtcbiAgfVxuICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSByZXR1cm47XG5cbiAgdG91Y2hlcy5jdXJyZW50WCA9IHBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gcGFnZVk7XG5cbiAgY29uc3QgZGlmZlggPSB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFg7XG4gIGNvbnN0IGRpZmZZID0gdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuXG4gIGlmICh0eXBlb2YgZGF0YS5pc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsZXQgdG91Y2hBbmdsZTtcbiAgICBpZiAoKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRZID09PSB0b3VjaGVzLnN0YXJ0WSkgfHwgKHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYgdG91Y2hlcy5jdXJyZW50WCA9PT0gdG91Y2hlcy5zdGFydFgpKSB7XG4gICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaWYgKChkaWZmWCAqIGRpZmZYKSArIChkaWZmWSAqIGRpZmZZKSA+PSAyNSkge1xuICAgICAgICB0b3VjaEFuZ2xlID0gKE1hdGguYXRhbjIoTWF0aC5hYnMoZGlmZlkpLCBNYXRoLmFicyhkaWZmWCkpICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGUgOiAoOTAgLSB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xuICAgIHN3aXBlci5lbWl0KCd0b3VjaE1vdmVPcHBvc2l0ZScsIGUpO1xuICB9XG4gIGlmICh0eXBlb2Ygc3RhcnRNb3ZpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHRvdWNoZXMuY3VycmVudFggIT09IHRvdWNoZXMuc3RhcnRYIHx8IHRvdWNoZXMuY3VycmVudFkgIT09IHRvdWNoZXMuc3RhcnRZKSB7XG4gICAgICBkYXRhLnN0YXJ0TW92aW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWRhdGEuc3RhcnRNb3ZpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAocGFyYW1zLnRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbiAmJiAhcGFyYW1zLm5lc3RlZCkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBpZiAoIWRhdGEuaXNNb3ZlZCkge1xuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICB9XG4gICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwudHJpZ2dlcignd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgfVxuICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IGZhbHNlO1xuICAgIC8vIEdyYWIgQ3Vyc29yXG4gICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IodHJ1ZSk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdzbGlkZXJGaXJzdE1vdmUnLCBlKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgnc2xpZGVyTW92ZScsIGUpO1xuICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuXG4gIGxldCBkaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZGlmZlggOiBkaWZmWTtcbiAgdG91Y2hlcy5kaWZmID0gZGlmZjtcblxuICBkaWZmICo9IHBhcmFtcy50b3VjaFJhdGlvO1xuICBpZiAocnRsKSBkaWZmID0gLWRpZmY7XG5cbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gZGlmZiA+IDAgPyAncHJldicgOiAnbmV4dCc7XG4gIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuXG4gIGxldCBkaXNhYmxlUGFyZW50U3dpcGVyID0gdHJ1ZTtcbiAgbGV0IHJlc2lzdGFuY2VSYXRpbyA9IHBhcmFtcy5yZXNpc3RhbmNlUmF0aW87XG4gIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgIHJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gIH1cbiAgaWYgKChkaWZmID4gMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gKHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIDEpICsgKCgtc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgZGF0YS5zdGFydFRyYW5zbGF0ZSArIGRpZmYpICoqIHJlc2lzdGFuY2VSYXRpbyk7XG4gIH0gZWxzZSBpZiAoZGlmZiA8IDAgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIDEpIC0gKChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBkYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvKTtcbiAgfVxuXG4gIGlmIChkaXNhYmxlUGFyZW50U3dpcGVyKSB7XG4gICAgZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlciA9IHRydWU7XG4gIH1cblxuICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG5cblxuICAvLyBUaHJlc2hvbGRcbiAgaWYgKHBhcmFtcy50aHJlc2hvbGQgPiAwKSB7XG4gICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcGFyYW1zLnRocmVzaG9sZCB8fCBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgaWYgKCFkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IHRydWU7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgdG91Y2hlcy5zdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICB0b3VjaGVzLmRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAoIXBhcmFtcy5mb2xsb3dGaW5nZXIpIHJldHVybjtcblxuICAvLyBVcGRhdGUgYWN0aXZlIGluZGV4IGluIGZyZWUgbW9kZVxuICBpZiAocGFyYW1zLmZyZWVNb2RlIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAvLyBWZWxvY2l0eVxuICAgIGlmIChkYXRhLnZlbG9jaXRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBkYXRhLnZlbG9jaXRpZXMucHVzaCh7XG4gICAgICAgIHBvc2l0aW9uOiB0b3VjaGVzW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdzdGFydFgnIDogJ3N0YXJ0WSddLFxuICAgICAgICB0aW1lOiBkYXRhLnRvdWNoU3RhcnRUaW1lLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRhdGEudmVsb2NpdGllcy5wdXNoKHtcbiAgICAgIHBvc2l0aW9uOiB0b3VjaGVzW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdjdXJyZW50WCcgOiAnY3VycmVudFknXSxcbiAgICAgIHRpbWU6IFV0aWxzLm5vdygpLFxuICAgIH0pO1xuICB9XG4gIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbiAgLy8gVXBkYXRlIHRyYW5zbGF0ZVxuICBzd2lwZXIuc2V0VHJhbnNsYXRlKGRhdGEuY3VycmVudFRyYW5zbGF0ZSk7XG59XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG5cbiAgY29uc3Qge1xuICAgIHBhcmFtcywgdG91Y2hlcywgcnRsLCAkd3JhcHBlckVsLCBzbGlkZXNHcmlkLCBzbmFwR3JpZCxcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGUgPSBldmVudDtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KCd0b3VjaEVuZCcsIGUpO1xuICB9XG4gIGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcyA9IGZhbHNlO1xuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBwYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICAgIH1cbiAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gUmV0dXJuIEdyYWIgQ3Vyc29yXG4gIGlmIChwYXJhbXMuZ3JhYkN1cnNvciAmJiBkYXRhLmlzTW92ZWQgJiYgZGF0YS5pc1RvdWNoZWQgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICB9XG5cbiAgLy8gVGltZSBkaWZmXG4gIGNvbnN0IHRvdWNoRW5kVGltZSA9IFV0aWxzLm5vdygpO1xuICBjb25zdCB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIGRhdGEudG91Y2hTdGFydFRpbWU7XG5cbiAgLy8gVGFwLCBkb3VibGVUYXAsIENsaWNrXG4gIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIHN3aXBlci51cGRhdGVDbGlja2VkU2xpZGUoZSk7XG4gICAgc3dpcGVyLmVtaXQoJ3RhcCcsIGUpO1xuICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lKSA+IDMwMCkge1xuICAgICAgaWYgKGRhdGEuY2xpY2tUaW1lb3V0KSBjbGVhclRpbWVvdXQoZGF0YS5jbGlja1RpbWVvdXQpO1xuICAgICAgZGF0YS5jbGlja1RpbWVvdXQgPSBVdGlscy5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ2NsaWNrJywgZSk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgICBpZiAodGltZURpZmYgPCAzMDAgJiYgKHRvdWNoRW5kVGltZSAtIGRhdGEubGFzdENsaWNrVGltZSkgPCAzMDApIHtcbiAgICAgIGlmIChkYXRhLmNsaWNrVGltZW91dCkgY2xlYXJUaW1lb3V0KGRhdGEuY2xpY2tUaW1lb3V0KTtcbiAgICAgIHN3aXBlci5lbWl0KCdkb3VibGVUYXAnLCBlKTtcbiAgICB9XG4gIH1cblxuICBkYXRhLmxhc3RDbGlja1RpbWUgPSBVdGlscy5ub3coKTtcbiAgVXRpbHMubmV4dFRpY2soKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLmRlc3Ryb3llZCkgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICB9KTtcblxuICBpZiAoIWRhdGEuaXNUb3VjaGVkIHx8ICFkYXRhLmlzTW92ZWQgfHwgIXN3aXBlci5zd2lwZURpcmVjdGlvbiB8fCB0b3VjaGVzLmRpZmYgPT09IDAgfHwgZGF0YS5jdXJyZW50VHJhbnNsYXRlID09PSBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG5cbiAgbGV0IGN1cnJlbnRQb3M7XG4gIGlmIChwYXJhbXMuZm9sbG93RmluZ2VyKSB7XG4gICAgY3VycmVudFBvcyA9IHJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UG9zID0gLWRhdGEuY3VycmVudFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgaWYgKGN1cnJlbnRQb3MgPCAtc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBvcyA+IC1zd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgIGlmIChzd2lwZXIuc2xpZGVzLmxlbmd0aCA8IHNuYXBHcmlkLmxlbmd0aCkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbmFwR3JpZC5sZW5ndGggLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5mcmVlTW9kZU1vbWVudHVtKSB7XG4gICAgICBpZiAoZGF0YS52ZWxvY2l0aWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgbGFzdE1vdmVFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcbiAgICAgICAgY29uc3QgdmVsb2NpdHlFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcblxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGxhc3RNb3ZlRXZlbnQucG9zaXRpb24gLSB2ZWxvY2l0eUV2ZW50LnBvc2l0aW9uO1xuICAgICAgICBjb25zdCB0aW1lID0gbGFzdE1vdmVFdmVudC50aW1lIC0gdmVsb2NpdHlFdmVudC50aW1lO1xuICAgICAgICBzd2lwZXIudmVsb2NpdHkgPSBkaXN0YW5jZSAvIHRpbWU7XG4gICAgICAgIHN3aXBlci52ZWxvY2l0eSAvPSAyO1xuICAgICAgICBpZiAoTWF0aC5hYnMoc3dpcGVyLnZlbG9jaXR5KSA8IHBhcmFtcy5mcmVlTW9kZU1pbmltdW1WZWxvY2l0eSkge1xuICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyBpbXBsaWVzIHRoYXQgdGhlIHVzZXIgc3RvcHBlZCBtb3ZpbmcgYSBmaW5nZXIgdGhlbiByZWxlYXNlZC5cbiAgICAgICAgLy8gVGhlcmUgd291bGQgYmUgbm8gZXZlbnRzIHdpdGggZGlzdGFuY2UgemVybywgc28gdGhlIGxhc3QgZXZlbnQgaXMgc3RhbGUuXG4gICAgICAgIGlmICh0aW1lID4gMTUwIHx8IChVdGlscy5ub3coKSAtIGxhc3RNb3ZlRXZlbnQudGltZSkgPiAzMDApIHtcbiAgICAgICAgICBzd2lwZXIudmVsb2NpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIudmVsb2NpdHkgPSAwO1xuICAgICAgfVxuICAgICAgc3dpcGVyLnZlbG9jaXR5ICo9IHBhcmFtcy5mcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbztcblxuICAgICAgZGF0YS52ZWxvY2l0aWVzLmxlbmd0aCA9IDA7XG4gICAgICBsZXQgbW9tZW50dW1EdXJhdGlvbiA9IDEwMDAgKiBwYXJhbXMuZnJlZU1vZGVNb21lbnR1bVJhdGlvO1xuICAgICAgY29uc3QgbW9tZW50dW1EaXN0YW5jZSA9IHN3aXBlci52ZWxvY2l0eSAqIG1vbWVudHVtRHVyYXRpb247XG5cbiAgICAgIGxldCBuZXdQb3NpdGlvbiA9IHN3aXBlci50cmFuc2xhdGUgKyBtb21lbnR1bURpc3RhbmNlO1xuICAgICAgaWYgKHJ0bCkgbmV3UG9zaXRpb24gPSAtbmV3UG9zaXRpb247XG4gICAgICBsZXQgZG9Cb3VuY2UgPSBmYWxzZTtcbiAgICAgIGxldCBhZnRlckJvdW5jZVBvc2l0aW9uO1xuICAgICAgY29uc3QgYm91bmNlQW1vdW50ID0gTWF0aC5hYnMoc3dpcGVyLnZlbG9jaXR5KSAqIDIwICogcGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbztcbiAgICAgIGlmIChuZXdQb3NpdGlvbiA8IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcbiAgICAgICAgICBpZiAobmV3UG9zaXRpb24gKyBzd2lwZXIubWF4VHJhbnNsYXRlKCkgPCAtYm91bmNlQW1vdW50KSB7XG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIGJvdW5jZUFtb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWZ0ZXJCb3VuY2VQb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgICBkb0JvdW5jZSA9IHRydWU7XG4gICAgICAgICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdQb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdQb3NpdGlvbiA+IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcbiAgICAgICAgICBpZiAobmV3UG9zaXRpb24gLSBzd2lwZXIubWluVHJhbnNsYXRlKCkgPiBib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgYm91bmNlQW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICBsZXQgbmV4dFNsaWRlO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNuYXBHcmlkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKHNuYXBHcmlkW2pdID4gLW5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUgPSBqO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhzbmFwR3JpZFtuZXh0U2xpZGVdIC0gbmV3UG9zaXRpb24pIDwgTWF0aC5hYnMoc25hcEdyaWRbbmV4dFNsaWRlIC0gMV0gLSBuZXdQb3NpdGlvbikgfHwgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICBuZXdQb3NpdGlvbiA9IHNuYXBHcmlkW25leHRTbGlkZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3UG9zaXRpb24gPSBzbmFwR3JpZFtuZXh0U2xpZGUgLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBuZXdQb3NpdGlvbiA9IC1uZXdQb3NpdGlvbjtcbiAgICAgIH1cbiAgICAgIC8vIEZpeCBkdXJhdGlvblxuICAgICAgaWYgKHN3aXBlci52ZWxvY2l0eSAhPT0gMCkge1xuICAgICAgICBpZiAocnRsKSB7XG4gICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGguYWJzKCgtbmV3UG9zaXRpb24gLSBzd2lwZXIudHJhbnNsYXRlKSAvIHN3aXBlci52ZWxvY2l0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGguYWJzKChuZXdQb3NpdGlvbiAtIHN3aXBlci50cmFuc2xhdGUpIC8gc3dpcGVyLnZlbG9jaXR5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlUmVzZXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UgJiYgZG9Cb3VuY2UpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKGFmdGVyQm91bmNlUG9zaXRpb24pO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdQb3NpdGlvbik7XG4gICAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQodHJ1ZSwgc3dpcGVyLnN3aXBlRGlyZWN0aW9uKTtcbiAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhZGF0YS5hbGxvd01vbWVudHVtQm91bmNlKSByZXR1cm47XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ21vbWVudHVtQm91bmNlJyk7XG5cbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihwYXJhbXMuc3BlZWQpO1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKCgpID0+IHtcbiAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChzd2lwZXIudmVsb2NpdHkpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3UG9zaXRpb24pO1xuICAgICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHRydWUsIHN3aXBlci5zd2lwZURpcmVjdGlvbik7XG4gICAgICAgIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MobmV3UG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgfVxuICAgIGlmICghcGFyYW1zLmZyZWVNb2RlTW9tZW50dW0gfHwgdGltZURpZmYgPj0gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZpbmQgY3VycmVudCBzbGlkZVxuICBsZXQgc3RvcEluZGV4ID0gMDtcbiAgbGV0IGdyb3VwU2l6ZSA9IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbMF07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSAmJiBjdXJyZW50UG9zIDwgc2xpZGVzR3JpZFtpICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwXSkge1xuICAgICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdIC0gc2xpZGVzR3JpZFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgIGdyb3VwU2l6ZSA9IHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAxXSAtIHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAyXTtcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIGN1cnJlbnQgc2xpZGUgc2l6ZVxuICBjb25zdCByYXRpbyA9IChjdXJyZW50UG9zIC0gc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcblxuICBpZiAodGltZURpZmYgPiBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgLy8gTG9uZyB0b3VjaGVzXG4gICAgaWYgKCFwYXJhbXMubG9uZ1N3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICBpZiAocmF0aW8gPj0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGVsc2Ugc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICBpZiAocmF0aW8gPiAoMSAtIHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pKSBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgZWxzZSBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBTaG9ydCBzd2lwZXNcbiAgICBpZiAoIXBhcmFtcy5zaG9ydFN3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgY29uc3QgeyBwYXJhbXMsIGVsIH0gPSBzd2lwZXI7XG5cbiAgaWYgKGVsICYmIGVsLm9mZnNldFdpZHRoID09PSAwKSByZXR1cm47XG5cbiAgLy8gQnJlYWtwb2ludHNcbiAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xuICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gIH1cblxuICAvLyBTYXZlIGxvY2tzXG4gIGNvbnN0IHsgYWxsb3dTbGlkZU5leHQsIGFsbG93U2xpZGVQcmV2IH0gPSBzd2lwZXI7XG5cbiAgLy8gRGlzYWJsZSBsb2NrcyBvbiByZXNpemVcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcblxuICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG5cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgIGNvbnN0IG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHN3aXBlci50cmFuc2xhdGUsIHN3aXBlci5tYXhUcmFuc2xhdGUoKSksIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIC8vIFJldHVybiBsb2NrcyBhZnRlciByZXNpemVcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGUpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHByb2Nlc3MuZW52LlRBUkdFVCA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RhcCBjbGljaycsIGUpO1xuICB9IGVsc2UgaWYgKCFzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3MpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24gJiYgc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJ3Nzci13aW5kb3cnO1xuaW1wb3J0IERldmljZSBmcm9tICcuLi8uLi8uLi91dGlscy9kZXZpY2UnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmltcG9ydCBvblRvdWNoU3RhcnQgZnJvbSAnLi9vblRvdWNoU3RhcnQnO1xuaW1wb3J0IG9uVG91Y2hNb3ZlIGZyb20gJy4vb25Ub3VjaE1vdmUnO1xuaW1wb3J0IG9uVG91Y2hFbmQgZnJvbSAnLi9vblRvdWNoRW5kJztcbmltcG9ydCBvblJlc2l6ZSBmcm9tICcuL29uUmVzaXplJztcbmltcG9ydCBvbkNsaWNrIGZyb20gJy4vb25DbGljayc7XG5cbmZ1bmN0aW9uIGF0dGFjaEV2ZW50cygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcywgdG91Y2hFdmVudHMsIGVsLCB3cmFwcGVyRWwsXG4gIH0gPSBzd2lwZXI7XG5cbiAgaWYgKHByb2Nlc3MuZW52LlRBUkdFVCAhPT0gJ2Rlc2t0b3AnKSB7XG4gICAgc3dpcGVyLm9uVG91Y2hTdGFydCA9IG9uVG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XG4gICAgc3dpcGVyLm9uVG91Y2hNb3ZlID0gb25Ub3VjaE1vdmUuYmluZChzd2lwZXIpO1xuICAgIHN3aXBlci5vblRvdWNoRW5kID0gb25Ub3VjaEVuZC5iaW5kKHN3aXBlcik7XG4gIH1cblxuICBzd2lwZXIub25DbGljayA9IG9uQ2xpY2suYmluZChzd2lwZXIpO1xuXG4gIGNvbnN0IHRhcmdldCA9IHBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBlbCA6IHdyYXBwZXJFbDtcbiAgY29uc3QgY2FwdHVyZSA9ICEhcGFyYW1zLm5lc3RlZDtcblxuICAvLyBUb3VjaCBFdmVudHNcbiAgaWYgKHByb2Nlc3MuZW52LlRBUkdFVCAhPT0gJ2Rlc2t0b3AnKSB7XG4gICAgaWYgKCFTdXBwb3J0LnRvdWNoICYmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpKSB7XG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChTdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgIGNvbnN0IHBhc3NpdmVMaXN0ZW5lciA9IHRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5vblRvdWNoU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5vblRvdWNoTW92ZSwgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgPyB7IHBhc3NpdmU6IGZhbHNlLCBjYXB0dXJlIH0gOiBjYXB0dXJlKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGlmICgocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIURldmljZS5pb3MgJiYgIURldmljZS5hbmRyb2lkKSB8fCAocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIVN1cHBvcnQudG91Y2ggJiYgRGV2aWNlLmlvcykpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN3aXBlci5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG4gICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXBlci5vbkNsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpcGVyLm9uQ2xpY2ssIGZhbHNlKTtcbiAgfVxuXG4gIC8vIFJlc2l6ZSBoYW5kbGVyXG4gIHN3aXBlci5vbigncmVzaXplIG9ic2VydmVyVXBkYXRlJywgb25SZXNpemUpO1xufVxuXG5mdW5jdGlvbiBkZXRhY2hFdmVudHMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgY29uc3Qge1xuICAgIHBhcmFtcywgdG91Y2hFdmVudHMsIGVsLCB3cmFwcGVyRWwsXG4gIH0gPSBzd2lwZXI7XG5cbiAgY29uc3QgdGFyZ2V0ID0gcGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/IGVsIDogd3JhcHBlckVsO1xuICBjb25zdCBjYXB0dXJlID0gISFwYXJhbXMubmVzdGVkO1xuXG4gIC8vIFRvdWNoIEV2ZW50c1xuICBpZiAocHJvY2Vzcy5lbnYuVEFSR0VUICE9PSAnZGVza3RvcCcpIHtcbiAgICBpZiAoIVN1cHBvcnQudG91Y2ggJiYgKFN1cHBvcnQucG9pbnRlckV2ZW50cyB8fCBTdXBwb3J0LnByZWZpeGVkUG9pbnRlckV2ZW50cykpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5vblRvdWNoTW92ZSwgY2FwdHVyZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFN1cHBvcnQudG91Y2gpIHtcbiAgICAgICAgY29uc3QgcGFzc2l2ZUxpc3RlbmVyID0gdG91Y2hFdmVudHMuc3RhcnQgPT09ICdvblRvdWNoU3RhcnQnICYmIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgaWYgKChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhRGV2aWNlLmlvcyAmJiAhRGV2aWNlLmFuZHJvaWQpIHx8IChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhU3VwcG9ydC50b3VjaCAmJiBEZXZpY2UuaW9zKSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUHJldmVudCBMaW5rcyBDbGlja3NcbiAgICBpZiAocGFyYW1zLnByZXZlbnRDbGlja3MgfHwgcGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikge1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpcGVyLm9uQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2lwZXIub25DbGljaywgdHJ1ZSk7XG4gIH1cblxuICAvLyBSZXNpemUgaGFuZGxlclxuICBzd2lwZXIub2ZmKCdyZXNpemUgb2JzZXJ2ZXJVcGRhdGUnLCBvblJlc2l6ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXR0YWNoRXZlbnRzLFxuICBkZXRhY2hFdmVudHMsXG59O1xuIiwiaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uL3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7IGFjdGl2ZUluZGV4LCBsb29wZWRTbGlkZXMgPSAwLCBwYXJhbXMgfSA9IHN3aXBlcjtcbiAgY29uc3QgYnJlYWtwb2ludHMgPSBwYXJhbXMuYnJlYWtwb2ludHM7XG4gIGlmICghYnJlYWtwb2ludHMgfHwgKGJyZWFrcG9pbnRzICYmIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5sZW5ndGggPT09IDApKSByZXR1cm47XG4gIC8vIFNldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGggYW5kIHVwZGF0ZSBwYXJhbWV0ZXJzXG4gIGNvbnN0IGJyZWFrcG9pbnQgPSBzd2lwZXIuZ2V0QnJlYWtwb2ludChicmVha3BvaW50cyk7XG4gIGlmIChicmVha3BvaW50ICYmIHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCAhPT0gYnJlYWtwb2ludCkge1xuICAgIGNvbnN0IGJyZWFrUG9pbnRzUGFyYW1zID0gYnJlYWtwb2ludCBpbiBicmVha3BvaW50cyA/IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogc3dpcGVyLm9yaWdpbmFsUGFyYW1zO1xuICAgIGNvbnN0IG5lZWRzUmVMb29wID0gcGFyYW1zLmxvb3AgJiYgKGJyZWFrUG9pbnRzUGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3KTtcblxuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBicmVha1BvaW50c1BhcmFtcyk7XG5cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgICAgYWxsb3dTbGlkZVByZXY6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZVByZXYsXG4gICAgfSk7XG5cbiAgICBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuXG4gICAgaWYgKG5lZWRzUmVMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgICBzd2lwZXIuc2xpZGVUbygoYWN0aXZlSW5kZXggLSBsb29wZWRTbGlkZXMpICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgZmFsc2UpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnYnJlYWtwb2ludCcsIGJyZWFrUG9pbnRzUGFyYW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnc3NyLXdpbmRvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChicmVha3BvaW50cykge1xuICAvLyBHZXQgYnJlYWtwb2ludCBmb3Igd2luZG93IHdpZHRoXG4gIGlmICghYnJlYWtwb2ludHMpIHJldHVybiB1bmRlZmluZWQ7XG4gIGxldCBicmVha3BvaW50ID0gZmFsc2U7XG4gIGNvbnN0IHBvaW50cyA9IFtdO1xuICBPYmplY3Qua2V5cyhicmVha3BvaW50cykuZm9yRWFjaCgocG9pbnQpID0+IHtcbiAgICBwb2ludHMucHVzaChwb2ludCk7XG4gIH0pO1xuICBwb2ludHMuc29ydCgoYSwgYikgPT4gcGFyc2VJbnQoYSwgMTApIC0gcGFyc2VJbnQoYiwgMTApKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcbiAgICBpZiAocG9pbnQgPj0gd2luZG93LmlubmVyV2lkdGggJiYgIWJyZWFrcG9pbnQpIHtcbiAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJyZWFrcG9pbnQgfHwgJ21heCc7XG59XG4iLCJpbXBvcnQgc2V0QnJlYWtwb2ludCBmcm9tICcuL3NldEJyZWFrcG9pbnQnO1xuaW1wb3J0IGdldEJyZWFrcG9pbnQgZnJvbSAnLi9nZXRCcmVha3BvaW50JztcblxuZXhwb3J0IGRlZmF1bHQgeyBzZXRCcmVha3BvaW50LCBnZXRCcmVha3BvaW50IH07XG4iLCJpbXBvcnQgeyB3aW5kb3cgfSBmcm9tICdzc3Itd2luZG93JztcblxuY29uc3QgQnJvd3NlciA9IChmdW5jdGlvbiBCcm93c2VyKCkge1xuICBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcbiAgICBjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuICh1YS5pbmRleE9mKCdzYWZhcmknKSA+PSAwICYmIHVhLmluZGV4T2YoJ2Nocm9tZScpIDwgMCAmJiB1YS5pbmRleE9mKCdhbmRyb2lkJykgPCAwKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGlzSUU6ICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQvZykgfHwgISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTVNJRS9nKSxcbiAgICBpc1NhZmFyaTogaXNTYWZhcmkoKSxcbiAgICBpc1VpV2ViVmlldzogLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgfTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJyb3dzZXI7XG4iLCJpbXBvcnQgU3VwcG9ydCBmcm9tICcuLi8uLi8uLi91dGlscy9zdXBwb3J0JztcbmltcG9ydCBEZXZpY2UgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGV2aWNlJztcbmltcG9ydCBCcm93c2VyIGZyb20gJy4uLy4uLy4uL3V0aWxzL2Jyb3dzZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBjbGFzc05hbWVzLCBwYXJhbXMsIHJ0bCwgJGVsLFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBzdWZmaXhlcyA9IFtdO1xuXG4gIHN1ZmZpeGVzLnB1c2gocGFyYW1zLmRpcmVjdGlvbik7XG5cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgIHN1ZmZpeGVzLnB1c2goJ2ZyZWUtbW9kZScpO1xuICB9XG4gIGlmICghU3VwcG9ydC5mbGV4Ym94KSB7XG4gICAgc3VmZml4ZXMucHVzaCgnbm8tZmxleGJveCcpO1xuICB9XG4gIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHN1ZmZpeGVzLnB1c2goJ2F1dG9oZWlnaHQnKTtcbiAgfVxuICBpZiAocnRsKSB7XG4gICAgc3VmZml4ZXMucHVzaCgncnRsJyk7XG4gIH1cbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgc3VmZml4ZXMucHVzaCgnbXVsdGlyb3cnKTtcbiAgfVxuICBpZiAoRGV2aWNlLmFuZHJvaWQpIHtcbiAgICBzdWZmaXhlcy5wdXNoKCdhbmRyb2lkJyk7XG4gIH1cbiAgaWYgKERldmljZS5pb3MpIHtcbiAgICBzdWZmaXhlcy5wdXNoKCdpb3MnKTtcbiAgfVxuICAvLyBXUDggVG91Y2ggRXZlbnRzIEZpeFxuICBpZiAoQnJvd3Nlci5pc0lFICYmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpKSB7XG4gICAgc3VmZml4ZXMucHVzaChgd3A4LSR7cGFyYW1zLmRpcmVjdGlvbn1gKTtcbiAgfVxuXG4gIHN1ZmZpeGVzLmZvckVhY2goKHN1ZmZpeCkgPT4ge1xuICAgIGNsYXNzTmFtZXMucHVzaChwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArIHN1ZmZpeCk7XG4gIH0pO1xuXG4gICRlbC5hZGRDbGFzcyhjbGFzc05hbWVzLmpvaW4oJyAnKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHsgJGVsLCBjbGFzc05hbWVzIH0gPSBzd2lwZXI7XG5cbiAgJGVsLnJlbW92ZUNsYXNzKGNsYXNzTmFtZXMuam9pbignICcpKTtcbn1cbiIsImltcG9ydCBhZGRDbGFzc2VzIGZyb20gJy4vYWRkQ2xhc3Nlcyc7XG5pbXBvcnQgcmVtb3ZlQ2xhc3NlcyBmcm9tICcuL3JlbW92ZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7IGFkZENsYXNzZXMsIHJlbW92ZUNsYXNzZXMgfTtcbiIsImltcG9ydCB7IHdpbmRvdyB9IGZyb20gJ3Nzci13aW5kb3cnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoaW1hZ2VFbCwgc3JjLCBzcmNzZXQsIHNpemVzLCBjaGVja0ZvckNvbXBsZXRlLCBjYWxsYmFjaykge1xuICBsZXQgaW1hZ2U7XG4gIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICB9XG4gIGlmICghaW1hZ2VFbC5jb21wbGV0ZSB8fCAhY2hlY2tGb3JDb21wbGV0ZSkge1xuICAgIGlmIChzcmMpIHtcbiAgICAgIGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uub25sb2FkID0gb25SZWFkeTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSBvblJlYWR5O1xuICAgICAgaWYgKHNpemVzKSB7XG4gICAgICAgIGltYWdlLnNpemVzID0gc2l6ZXM7XG4gICAgICB9XG4gICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgIGltYWdlLnNyY3NldCA9IHNyY3NldDtcbiAgICAgIH1cbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvblJlYWR5KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGltYWdlIGFscmVhZHkgbG9hZGVkLi4uXG4gICAgb25SZWFkeSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIHN3aXBlci5pbWFnZXNUb0xvYWQgPSBzd2lwZXIuJGVsLmZpbmQoJ2ltZycpO1xuICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgIGlmICh0eXBlb2Ygc3dpcGVyID09PSAndW5kZWZpbmVkJyB8fCBzd2lwZXIgPT09IG51bGwgfHwgIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5pbWFnZXNMb2FkZWQgIT09IHVuZGVmaW5lZCkgc3dpcGVyLmltYWdlc0xvYWRlZCArPSAxO1xuICAgIGlmIChzd2lwZXIuaW1hZ2VzTG9hZGVkID09PSBzd2lwZXIuaW1hZ2VzVG9Mb2FkLmxlbmd0aCkge1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMudXBkYXRlT25JbWFnZXNSZWFkeSkgc3dpcGVyLnVwZGF0ZSgpO1xuICAgICAgc3dpcGVyLmVtaXQoJ2ltYWdlc1JlYWR5Jyk7XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLmltYWdlc1RvTG9hZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGltYWdlRWwgPSBzd2lwZXIuaW1hZ2VzVG9Mb2FkW2ldO1xuICAgIHN3aXBlci5sb2FkSW1hZ2UoXG4gICAgICBpbWFnZUVsLFxuICAgICAgaW1hZ2VFbC5jdXJyZW50U3JjIHx8IGltYWdlRWwuZ2V0QXR0cmlidXRlKCdzcmMnKSxcbiAgICAgIGltYWdlRWwuc3Jjc2V0IHx8IGltYWdlRWwuZ2V0QXR0cmlidXRlKCdzcmNzZXQnKSxcbiAgICAgIGltYWdlRWwuc2l6ZXMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NpemVzJyksXG4gICAgICB0cnVlLFxuICAgICAgb25SZWFkeVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnLi9sb2FkSW1hZ2UnO1xuaW1wb3J0IHByZWxvYWRJbWFnZXMgZnJvbSAnLi9wcmVsb2FkSW1hZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBsb2FkSW1hZ2UsXG4gIHByZWxvYWRJbWFnZXMsXG59O1xuIiwiXG5mdW5jdGlvbiBjaGVja092ZXJmbG93KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB3YXNMb2NrZWQgPSBzd2lwZXIuaXNMb2NrZWQ7XG5cbiAgc3dpcGVyLmlzTG9ja2VkID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aCA9PT0gMTtcbiAgc3dpcGVyLmFsbG93VG91Y2hNb3ZlID0gIXN3aXBlci5pc0xvY2tlZDtcblxuICBpZiAod2FzTG9ja2VkICYmIHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgc3dpcGVyLmlzRW5kID0gZmFsc2U7XG4gICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBjaGVja092ZXJmbG93IH07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IHRydWUsXG4gIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICB0b3VjaEV2ZW50c1RhcmdldDogJ2NvbnRhaW5lcicsXG4gIGluaXRpYWxTbGlkZTogMCxcbiAgc3BlZWQ6IDMwMCxcbiAgLy9cbiAgcHJldmVudEludGVyY2F0aW9uT25UcmFuc2l0aW9uOiBmYWxzZSxcblxuICAvLyBUbyBzdXBwb3J0IGlPUydzIHN3aXBlLXRvLWdvLWJhY2sgZ2VzdHVyZSAod2hlbiBiZWluZyB1c2VkIGluLWFwcCwgd2l0aCBVSVdlYlZpZXcpLlxuICBpT1NFZGdlU3dpcGVEZXRlY3Rpb246IGZhbHNlLFxuICBpT1NFZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuXG4gIC8vIEZyZWUgbW9kZVxuICBmcmVlTW9kZTogZmFsc2UsXG4gIGZyZWVNb2RlTW9tZW50dW06IHRydWUsXG4gIGZyZWVNb2RlTW9tZW50dW1SYXRpbzogMSxcbiAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZTogdHJ1ZSxcbiAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiAxLFxuICBmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbzogMSxcbiAgZnJlZU1vZGVTdGlja3k6IGZhbHNlLFxuICBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogMC4wMixcblxuICAvLyBBdXRvaGVpZ2h0XG4gIGF1dG9IZWlnaHQ6IGZhbHNlLFxuXG4gIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gIHNldFdyYXBwZXJTaXplOiBmYWxzZSxcblxuICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxuICB2aXJ0dWFsVHJhbnNsYXRlOiBmYWxzZSxcblxuICAvLyBFZmZlY3RzXG4gIGVmZmVjdDogJ3NsaWRlJywgLy8gJ3NsaWRlJyBvciAnZmFkZScgb3IgJ2N1YmUnIG9yICdjb3ZlcmZsb3cnIG9yICdmbGlwJ1xuXG4gIC8vIEJyZWFrcG9pbnRzXG4gIGJyZWFrcG9pbnRzOiB1bmRlZmluZWQsXG5cbiAgLy8gU2xpZGVzIGdyaWRcbiAgc3BhY2VCZXR3ZWVuOiAwLFxuICBzbGlkZXNQZXJWaWV3OiAxLFxuICBzbGlkZXNQZXJDb2x1bW46IDEsXG4gIHNsaWRlc1BlckNvbHVtbkZpbGw6ICdjb2x1bW4nLFxuICBzbGlkZXNQZXJHcm91cDogMSxcbiAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsIC8vIGluIHB4XG4gIHNsaWRlc09mZnNldEFmdGVyOiAwLCAvLyBpbiBweFxuICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuXG4gIC8vIERpc2FibGUgc3dpcGVyIGFuZCBoaWRlIG5hdmlnYXRpb24gd2hlbiBjb250YWluZXIgbm90IG92ZXJmbG93XG4gIHdhdGNoT3ZlcmZsb3c6IGZhbHNlLFxuXG4gIC8vIFJvdW5kIGxlbmd0aFxuICByb3VuZExlbmd0aHM6IGZhbHNlLFxuXG4gIC8vIFRvdWNoZXNcbiAgdG91Y2hSYXRpbzogMSxcbiAgdG91Y2hBbmdsZTogNDUsXG4gIHNpbXVsYXRlVG91Y2g6IHRydWUsXG4gIHNob3J0U3dpcGVzOiB0cnVlLFxuICBsb25nU3dpcGVzOiB0cnVlLFxuICBsb25nU3dpcGVzUmF0aW86IDAuNSxcbiAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gIGZvbGxvd0ZpbmdlcjogdHJ1ZSxcbiAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gIHRocmVzaG9sZDogMCxcbiAgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxuICB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcblxuICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICB1bmlxdWVOYXZFbGVtZW50czogdHJ1ZSxcblxuICAvLyBSZXNpc3RhbmNlXG4gIHJlc2lzdGFuY2U6IHRydWUsXG4gIHJlc2lzdGFuY2VSYXRpbzogMC44NSxcblxuICAvLyBQcm9ncmVzc1xuICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcbiAgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiBmYWxzZSxcblxuICAvLyBDdXJzb3JcbiAgZ3JhYkN1cnNvcjogZmFsc2UsXG5cbiAgLy8gQ2xpY2tzXG4gIHByZXZlbnRDbGlja3M6IHRydWUsXG4gIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG5cbiAgLy8gSW1hZ2VzXG4gIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gIHVwZGF0ZU9uSW1hZ2VzUmVhZHk6IHRydWUsXG5cbiAgLy8gbG9vcFxuICBsb29wOiBmYWxzZSxcbiAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDAsXG4gIGxvb3BlZFNsaWRlczogbnVsbCxcbiAgbG9vcEZpbGxHcm91cFdpdGhCbGFuazogZmFsc2UsXG5cbiAgLy8gU3dpcGluZy9ubyBzd2lwaW5nXG4gIGFsbG93U2xpZGVQcmV2OiB0cnVlLFxuICBhbGxvd1NsaWRlTmV4dDogdHJ1ZSxcbiAgc3dpcGVIYW5kbGVyOiBudWxsLCAvLyAnLnN3aXBlLWhhbmRsZXInLFxuICBub1N3aXBpbmc6IHRydWUsXG4gIG5vU3dpcGluZ0NsYXNzOiAnc3dpcGVyLW5vLXN3aXBpbmcnLFxuICBub1N3aXBpbmdTZWxlY3RvcjogbnVsbCxcblxuICAvLyBQYXNzaXZlIExpc3RlbmVyc1xuICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuXG4gIC8vIE5TXG4gIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItY29udGFpbmVyLScsIC8vIE5FV1xuICBzbGlkZUNsYXNzOiAnc3dpcGVyLXNsaWRlJyxcbiAgc2xpZGVCbGFua0NsYXNzOiAnc3dpcGVyLXNsaWRlLWludmlzaWJsZS1ibGFuaycsXG4gIHNsaWRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtYWN0aXZlJyxcbiAgc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtYWN0aXZlJyxcbiAgc2xpZGVWaXNpYmxlQ2xhc3M6ICdzd2lwZXItc2xpZGUtdmlzaWJsZScsXG4gIHNsaWRlRHVwbGljYXRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlJyxcbiAgc2xpZGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtbmV4dCcsXG4gIHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1uZXh0JyxcbiAgc2xpZGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtcHJldicsXG4gIHNsaWRlRHVwbGljYXRlUHJldkNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1wcmV2JyxcbiAgd3JhcHBlckNsYXNzOiAnc3dpcGVyLXdyYXBwZXInLFxuXG4gIC8vIENhbGxiYWNrc1xuICBydW5DYWxsYmFja3NPbkluaXQ6IHRydWUsXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuLi8uLi91dGlscy9zdXBwb3J0JztcblxuaW1wb3J0IFN3aXBlckNsYXNzIGZyb20gJy4uLy4uL3V0aWxzL2NsYXNzJztcblxuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3VwZGF0ZS9pbmRleCc7XG5pbXBvcnQgdHJhbnNsYXRlIGZyb20gJy4vdHJhbnNsYXRlL2luZGV4JztcbmltcG9ydCB0cmFuc2l0aW9uIGZyb20gJy4vdHJhbnNpdGlvbi9pbmRleCc7XG5pbXBvcnQgc2xpZGUgZnJvbSAnLi9zbGlkZS9pbmRleCc7XG5pbXBvcnQgbG9vcCBmcm9tICcuL2xvb3AvaW5kZXgnO1xuaW1wb3J0IGdyYWJDdXJzb3IgZnJvbSAnLi9ncmFiLWN1cnNvci9pbmRleCc7XG5pbXBvcnQgbWFuaXB1bGF0aW9uIGZyb20gJy4vbWFuaXB1bGF0aW9uL2luZGV4JztcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMvaW5kZXgnO1xuaW1wb3J0IGJyZWFrcG9pbnRzIGZyb20gJy4vYnJlYWtwb2ludHMvaW5kZXgnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9jbGFzc2VzL2luZGV4JztcbmltcG9ydCBpbWFnZXMgZnJvbSAnLi9pbWFnZXMvaW5kZXgnO1xuaW1wb3J0IGNoZWNrT3ZlcmZsb3cgZnJvbSAnLi9jaGVjay1vdmVyZmxvdy9pbmRleCc7XG5cbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJztcblxuY29uc3QgcHJvdG90eXBlcyA9IHtcbiAgdXBkYXRlLFxuICB0cmFuc2xhdGUsXG4gIHRyYW5zaXRpb24sXG4gIHNsaWRlLFxuICBsb29wLFxuICBncmFiQ3Vyc29yLFxuICBtYW5pcHVsYXRpb24sXG4gIGV2ZW50cyxcbiAgYnJlYWtwb2ludHMsXG4gIGNoZWNrT3ZlcmZsb3csXG4gIGNsYXNzZXMsXG4gIGltYWdlcyxcbn07XG5cbmNvbnN0IGV4dGVuZGVkRGVmYXVsdHMgPSB7fTtcblxuY2xhc3MgU3dpcGVyIGV4dGVuZHMgU3dpcGVyQ2xhc3Mge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgbGV0IGVsO1xuICAgIGxldCBwYXJhbXM7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGFyZ3NbMF0uY29uc3RydWN0b3IgJiYgYXJnc1swXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICBwYXJhbXMgPSBhcmdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBbZWwsIHBhcmFtc10gPSBhcmdzO1xuICAgIH1cbiAgICBpZiAoIXBhcmFtcykgcGFyYW1zID0ge307XG5cbiAgICBwYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHBhcmFtcyk7XG4gICAgaWYgKGVsICYmICFwYXJhbXMuZWwpIHBhcmFtcy5lbCA9IGVsO1xuXG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXMpLmZvckVhY2goKHByb3RvdHlwZUdyb3VwKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXSkuZm9yRWFjaCgocHJvdG9NZXRob2QpID0+IHtcbiAgICAgICAgaWYgKCFTd2lwZXIucHJvdG90eXBlW3Byb3RvTWV0aG9kXSkge1xuICAgICAgICAgIFN3aXBlci5wcm90b3R5cGVbcHJvdG9NZXRob2RdID0gcHJvdG90eXBlc1twcm90b3R5cGVHcm91cF1bcHJvdG9NZXRob2RdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFN3aXBlciBJbnN0YW5jZVxuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiBzd2lwZXIubW9kdWxlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHN3aXBlci5tb2R1bGVzID0ge307XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHN3aXBlci5tb2R1bGVzKS5mb3JFYWNoKChtb2R1bGVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBtb2R1bGUgPSBzd2lwZXIubW9kdWxlc1ttb2R1bGVOYW1lXTtcbiAgICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZVBhcmFtTmFtZSA9IE9iamVjdC5rZXlzKG1vZHVsZS5wYXJhbXMpWzBdO1xuICAgICAgICBjb25zdCBtb2R1bGVQYXJhbXMgPSBtb2R1bGUucGFyYW1zW21vZHVsZVBhcmFtTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlUGFyYW1zICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgICAgICBpZiAoIShtb2R1bGVQYXJhbU5hbWUgaW4gcGFyYW1zICYmICdlbmFibGVkJyBpbiBtb2R1bGVQYXJhbXMpKSByZXR1cm47XG4gICAgICAgIGlmIChwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0geyBlbmFibGVkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAhKCdlbmFibGVkJyBpbiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7IGVuYWJsZWQ6IGZhbHNlIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBtb2R1bGVzIHBhcmFtc1xuICAgIGNvbnN0IHN3aXBlclBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgZGVmYXVsdHMpO1xuICAgIHN3aXBlci51c2VNb2R1bGVzUGFyYW1zKHN3aXBlclBhcmFtcyk7XG5cbiAgICAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBwYXNzZWQgcGFyYW1zXG4gICAgc3dpcGVyLnBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgc3dpcGVyUGFyYW1zLCBleHRlbmRlZERlZmF1bHRzLCBwYXJhbXMpO1xuICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgc3dpcGVyLnBhcmFtcyk7XG4gICAgc3dpcGVyLnBhc3NlZFBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgcGFyYW1zKTtcblxuICAgIC8vIFNhdmUgRG9tIGxpYlxuICAgIHN3aXBlci4kID0gJDtcblxuICAgIC8vIEZpbmQgZWxcbiAgICBjb25zdCAkZWwgPSAkKHN3aXBlci5wYXJhbXMuZWwpO1xuICAgIGVsID0gJGVsWzBdO1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHN3aXBlcnMgPSBbXTtcbiAgICAgICRlbC5lYWNoKChpbmRleCwgY29udGFpbmVyRWwpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UGFyYW1zID0gVXRpbHMuZXh0ZW5kKHt9LCBwYXJhbXMsIHsgZWw6IGNvbnRhaW5lckVsIH0pO1xuICAgICAgICBzd2lwZXJzLnB1c2gobmV3IFN3aXBlcihuZXdQYXJhbXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN3aXBlcnM7XG4gICAgfVxuXG4gICAgZWwuc3dpcGVyID0gc3dpcGVyO1xuICAgICRlbC5kYXRhKCdzd2lwZXInLCBzd2lwZXIpO1xuXG4gICAgLy8gRmluZCBXcmFwcGVyXG4gICAgY29uc3QgJHdyYXBwZXJFbCA9ICRlbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3N9YCk7XG5cbiAgICAvLyBFeHRlbmQgU3dpcGVyXG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgJGVsLFxuICAgICAgZWwsXG4gICAgICAkd3JhcHBlckVsLFxuICAgICAgd3JhcHBlckVsOiAkd3JhcHBlckVsWzBdLFxuXG4gICAgICAvLyBDbGFzc2VzXG4gICAgICBjbGFzc05hbWVzOiBbXSxcblxuICAgICAgLy8gU2xpZGVzXG4gICAgICBzbGlkZXM6ICQoKSxcbiAgICAgIHNsaWRlc0dyaWQ6IFtdLFxuICAgICAgc25hcEdyaWQ6IFtdLFxuICAgICAgc2xpZGVzU2l6ZXNHcmlkOiBbXSxcblxuICAgICAgLy8gaXNEaXJlY3Rpb25cbiAgICAgIGlzSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICB9LFxuICAgICAgaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnO1xuICAgICAgfSxcbiAgICAgIC8vIFJUTFxuICAgICAgcnRsOiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIChlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gJ3J0bCcgfHwgJGVsLmNzcygnZGlyZWN0aW9uJykgPT09ICdydGwnKSxcbiAgICAgIHdyb25nUlRMOiAkd3JhcHBlckVsLmNzcygnZGlzcGxheScpID09PSAnLXdlYmtpdC1ib3gnLFxuXG4gICAgICAvLyBJbmRleGVzXG4gICAgICBhY3RpdmVJbmRleDogMCxcbiAgICAgIHJlYWxJbmRleDogMCxcblxuICAgICAgLy9cbiAgICAgIGlzQmVnaW5uaW5nOiB0cnVlLFxuICAgICAgaXNFbmQ6IGZhbHNlLFxuXG4gICAgICAvLyBQcm9wc1xuICAgICAgdHJhbnNsYXRlOiAwLFxuICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICB2ZWxvY2l0eTogMCxcbiAgICAgIGFuaW1hdGluZzogZmFsc2UsXG5cbiAgICAgIC8vIExvY2tzXG4gICAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcbiAgICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2LFxuXG4gICAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAgIHRvdWNoRXZlbnRzOiAoZnVuY3Rpb24gdG91Y2hFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHRvdWNoID0gWyd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZScsICd0b3VjaGVuZCddO1xuICAgICAgICBsZXQgZGVza3RvcCA9IFsnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJ107XG4gICAgICAgIGlmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgICBkZXNrdG9wID0gWydwb2ludGVyZG93bicsICdwb2ludGVybW92ZScsICdwb2ludGVydXAnXTtcbiAgICAgICAgfSBlbHNlIGlmIChTdXBwb3J0LnByZWZpeGVkUG9pbnRlckV2ZW50cykge1xuICAgICAgICAgIGRlc2t0b3AgPSBbJ01TUG9pbnRlckRvd24nLCAnTVNQb2ludGVyTW92ZScsICdNU1BvaW50ZXJVcCddO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci50b3VjaEV2ZW50c1RvdWNoID0ge1xuICAgICAgICAgIHN0YXJ0OiB0b3VjaFswXSxcbiAgICAgICAgICBtb3ZlOiB0b3VjaFsxXSxcbiAgICAgICAgICBlbmQ6IHRvdWNoWzJdLFxuICAgICAgICB9O1xuICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wID0ge1xuICAgICAgICAgIHN0YXJ0OiBkZXNrdG9wWzBdLFxuICAgICAgICAgIG1vdmU6IGRlc2t0b3BbMV0sXG4gICAgICAgICAgZW5kOiBkZXNrdG9wWzJdLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3VwcG9ydC50b3VjaCB8fCAhc3dpcGVyLnBhcmFtcy5zaW11bGF0ZVRvdWNoID8gc3dpcGVyLnRvdWNoRXZlbnRzVG91Y2ggOiBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wO1xuICAgICAgfSgpKSxcbiAgICAgIHRvdWNoRXZlbnRzRGF0YToge1xuICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB1bmRlZmluZWQsXG4gICAgICAgIHRvdWNoU3RhcnRUaW1lOiB1bmRlZmluZWQsXG4gICAgICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgICAgIGN1cnJlbnRUcmFuc2xhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRUcmFuc2xhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlOiB1bmRlZmluZWQsXG4gICAgICAgIC8vIEZvcm0gZWxlbWVudHMgdG8gbWF0Y2hcbiAgICAgICAgZm9ybUVsZW1lbnRzOiAnaW5wdXQsIHNlbGVjdCwgb3B0aW9uLCB0ZXh0YXJlYSwgYnV0dG9uLCB2aWRlbycsXG4gICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICBsYXN0Q2xpY2tUaW1lOiBVdGlscy5ub3coKSxcbiAgICAgICAgY2xpY2tUaW1lb3V0OiB1bmRlZmluZWQsXG4gICAgICAgIC8vIFZlbG9jaXRpZXNcbiAgICAgICAgdmVsb2NpdGllczogW10sXG4gICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2U6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNUb3VjaEV2ZW50OiB1bmRlZmluZWQsXG4gICAgICAgIHN0YXJ0TW92aW5nOiB1bmRlZmluZWQsXG4gICAgICB9LFxuXG4gICAgICAvLyBDbGlja3NcbiAgICAgIGFsbG93Q2xpY2s6IHRydWUsXG5cbiAgICAgIC8vIFRvdWNoZXNcbiAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuXG4gICAgICB0b3VjaGVzOiB7XG4gICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgc3RhcnRZOiAwLFxuICAgICAgICBjdXJyZW50WDogMCxcbiAgICAgICAgY3VycmVudFk6IDAsXG4gICAgICAgIGRpZmY6IDAsXG4gICAgICB9LFxuXG4gICAgICAvLyBJbWFnZXNcbiAgICAgIGltYWdlc1RvTG9hZDogW10sXG4gICAgICBpbWFnZXNMb2FkZWQ6IDAsXG5cbiAgICB9KTtcblxuICAgIC8vIEluc3RhbGwgTW9kdWxlc1xuICAgIHN3aXBlci51c2VNb2R1bGVzKCk7XG5cbiAgICAvLyBJbml0XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuaW5pdCkge1xuICAgICAgc3dpcGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYXBwIGluc3RhbmNlXG4gICAgcmV0dXJuIHN3aXBlcjtcbiAgfVxuICBzbGlkZXNQZXJWaWV3RHluYW1pYygpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIHBhcmFtcywgc2xpZGVzLCBzbGlkZXNHcmlkLCBzaXplOiBzd2lwZXJTaXplLCBhY3RpdmVJbmRleCxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGxldCBzcHYgPSAxO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIGxldCBzbGlkZVNpemUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgIGxldCBicmVha0xvb3A7XG4gICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICBzbGlkZVNpemUgKz0gc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplKSB7XG4gICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNwdjtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcblxuICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVZhbHVlID0gc3dpcGVyLnJ0bCA/IHN3aXBlci50cmFuc2xhdGUgKiAtMSA6IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICBjb25zdCBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heCh0cmFuc2xhdGVWYWx1ZSwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICB9XG4gICAgbGV0IHRyYW5zbGF0ZWQ7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRyYW5zbGF0ZWQpIHtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCd1cGRhdGUnKTtcbiAgfVxuICBpbml0KCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuXG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZUluaXQnKTtcblxuICAgIC8vIFNldCBicmVha3BvaW50XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIENsYXNzZXNcbiAgICBzd2lwZXIuYWRkQ2xhc3NlcygpO1xuXG4gICAgLy8gQ3JlYXRlIGxvb3BcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBzaXplXG4gICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcblxuICAgIC8vIFVwZGF0ZSBzbGlkZXNcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG5cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSB7XG4gICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgIH1cblxuICAgIC8vIFNldCBHcmFiIEN1cnNvclxuICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgfVxuXG4gICAgaWYgKHN3aXBlci5wYXJhbXMucHJlbG9hZEltYWdlcykge1xuICAgICAgc3dpcGVyLnByZWxvYWRJbWFnZXMoKTtcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBUbyBJbml0aWFsIFNsaWRlXG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUgKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgfVxuXG4gICAgLy8gQXR0YWNoIGV2ZW50c1xuICAgIHN3aXBlci5hdHRhY2hFdmVudHMoKTtcblxuICAgIC8vIEluaXQgRmxhZ1xuICAgIHN3aXBlci5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyBFbWl0XG4gICAgc3dpcGVyLmVtaXQoJ2luaXQnKTtcbiAgfVxuICBkZXN0cm95KGRlbGV0ZUluc3RhbmNlID0gdHJ1ZSwgY2xlYW5TdHlsZXMgPSB0cnVlKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBwYXJhbXMsICRlbCwgJHdyYXBwZXJFbCwgc2xpZGVzLFxuICAgIH0gPSBzd2lwZXI7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZURlc3Ryb3knKTtcblxuICAgIC8vIEluaXQgRmxhZ1xuICAgIHN3aXBlci5pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgLy8gRGV0YWNoIGV2ZW50c1xuICAgIHN3aXBlci5kZXRhY2hFdmVudHMoKTtcblxuICAgIC8vIERlc3Ryb3kgbG9vcFxuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW51cCBzdHlsZXNcbiAgICBpZiAoY2xlYW5TdHlsZXMpIHtcbiAgICAgIHN3aXBlci5yZW1vdmVDbGFzc2VzKCk7XG4gICAgICAkZWwucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICR3cmFwcGVyRWwucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgIGlmIChzbGlkZXMgJiYgc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICBzbGlkZXNcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoW1xuICAgICAgICAgICAgcGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzLFxuICAgICAgICAgICAgcGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MsXG4gICAgICAgICAgICBwYXJhbXMuc2xpZGVOZXh0Q2xhc3MsXG4gICAgICAgICAgICBwYXJhbXMuc2xpZGVQcmV2Q2xhc3MsXG4gICAgICAgICAgXS5qb2luKCcgJykpXG4gICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKVxuICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1jb2x1bW4nKVxuICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1yb3cnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2lwZXIuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgLy8gRGV0YWNoIGVtaXR0ZXIgZXZlbnRzXG4gICAgT2JqZWN0LmtleXMoc3dpcGVyLmV2ZW50c0xpc3RlbmVycykuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICBzd2lwZXIub2ZmKGV2ZW50TmFtZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZGVsZXRlSW5zdGFuY2UgIT09IGZhbHNlKSB7XG4gICAgICBzd2lwZXIuJGVsWzBdLnN3aXBlciA9IG51bGw7XG4gICAgICBzd2lwZXIuJGVsLmRhdGEoJ3N3aXBlcicsIG51bGwpO1xuICAgICAgVXRpbHMuZGVsZXRlUHJvcHMoc3dpcGVyKTtcbiAgICB9XG4gICAgc3dpcGVyLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbiAgc3RhdGljIGV4dGVuZERlZmF1bHRzKG5ld0RlZmF1bHRzKSB7XG4gICAgVXRpbHMuZXh0ZW5kKGV4dGVuZGVkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKTtcbiAgfVxuICBzdGF0aWMgZ2V0IGV4dGVuZGVkRGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIGV4dGVuZGVkRGVmYXVsdHM7XG4gIH1cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4gZGVmYXVsdHM7XG4gIH1cbiAgc3RhdGljIGdldCBDbGFzcygpIHtcbiAgICByZXR1cm4gU3dpcGVyQ2xhc3M7XG4gIH1cbiAgc3RhdGljIGdldCAkKCkge1xuICAgIHJldHVybiAkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN3aXBlcjtcbiIsImltcG9ydCBEZXZpY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGV2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZGV2aWNlJyxcbiAgcHJvdG86IHtcbiAgICBkZXZpY2U6IERldmljZSxcbiAgfSxcbiAgc3RhdGljOiB7XG4gICAgZGV2aWNlOiBEZXZpY2UsXG4gIH0sXG59O1xuIiwiaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N1cHBvcnQnLFxuICBwcm90bzoge1xuICAgIHN1cHBvcnQ6IFN1cHBvcnQsXG4gIH0sXG4gIHN0YXRpYzoge1xuICAgIHN1cHBvcnQ6IFN1cHBvcnQsXG4gIH0sXG59O1xuIiwiaW1wb3J0IEJyb3dzZXIgZnJvbSAnLi4vLi4vdXRpbHMvYnJvd3Nlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2Jyb3dzZXInLFxuICBwcm90bzoge1xuICAgIGJyb3dzZXI6IEJyb3dzZXIsXG4gIH0sXG4gIHN0YXRpYzoge1xuICAgIGJyb3dzZXI6IEJyb3dzZXIsXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnc3NyLXdpbmRvdyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdyZXNpemUnLFxuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICByZXNpemU6IHtcbiAgICAgICAgcmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlUmVzaXplJyk7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3Jlc2l6ZScpO1xuICAgICAgICB9LFxuICAgICAgICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIoKSB7XG4gICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ29yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgLy8gRW1pdCByZXNpemVcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzd2lwZXIucmVzaXplLnJlc2l6ZUhhbmRsZXIpO1xuXG4gICAgICAvLyBFbWl0IG9yaWVudGF0aW9uY2hhbmdlXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBzd2lwZXIucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgfSxcbiAgICBkZXN0cm95KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzd2lwZXIucmVzaXplLnJlc2l6ZUhhbmRsZXIpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgc3dpcGVyLnJlc2l6ZS5vcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnc3NyLXdpbmRvdyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmNvbnN0IE9ic2VydmVyID0ge1xuICBmdW5jOiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciB8fCB3aW5kb3cuV2Via2l0TXV0YXRpb25PYnNlcnZlcixcbiAgYXR0YWNoKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcblxuICAgIGNvbnN0IE9ic2VydmVyRnVuYyA9IE9ic2VydmVyLmZ1bmM7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXJGdW5jKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICBzd2lwZXIuZW1pdCgnb2JzZXJ2ZXJVcGRhdGUnLCBtdXRhdGlvbik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmF0dHJpYnV0ZXMsXG4gICAgICBjaGlsZExpc3Q6IHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGlsZExpc3QsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGEsXG4gICAgfSk7XG5cbiAgICBzd2lwZXIub2JzZXJ2ZXIub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICB9LFxuICBpbml0KCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFTdXBwb3J0Lm9ic2VydmVyIHx8ICFzd2lwZXIucGFyYW1zLm9ic2VydmVyKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5wYXJhbXMub2JzZXJ2ZVBhcmVudHMpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudHMgPSBzd2lwZXIuJGVsLnBhcmVudHMoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzd2lwZXIub2JzZXJ2ZXIuYXR0YWNoKGNvbnRhaW5lclBhcmVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPYnNlcnZlIGNvbnRhaW5lclxuICAgIHN3aXBlci5vYnNlcnZlci5hdHRhY2goc3dpcGVyLiRlbFswXSwgeyBjaGlsZExpc3Q6IGZhbHNlIH0pO1xuXG4gICAgLy8gT2JzZXJ2ZSB3cmFwcGVyXG4gICAgc3dpcGVyLm9ic2VydmVyLmF0dGFjaChzd2lwZXIuJHdyYXBwZXJFbFswXSwgeyBhdHRyaWJ1dGVzOiBmYWxzZSB9KTtcbiAgfSxcbiAgZGVzdHJveSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIHN3aXBlci5vYnNlcnZlci5vYnNlcnZlcnMuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBzd2lwZXIub2JzZXJ2ZXIub2JzZXJ2ZXJzID0gW107XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvYnNlcnZlcicsXG4gIHBhcmFtczoge1xuICAgIG9ic2VydmVyOiBmYWxzZSxcbiAgICBvYnNlcnZlUGFyZW50czogZmFsc2UsXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIG9ic2VydmVyOiB7XG4gICAgICAgIGluaXQ6IE9ic2VydmVyLmluaXQuYmluZChzd2lwZXIpLFxuICAgICAgICBhdHRhY2g6IE9ic2VydmVyLmF0dGFjaC5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IE9ic2VydmVyLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICBvYnNlcnZlcnM6IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5vYnNlcnZlci5pbml0KCk7XG4gICAgfSxcbiAgICBkZXN0cm95KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5vYnNlcnZlci5kZXN0cm95KCk7XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgJCBmcm9tICcuLi8uLi91dGlscy9kb20nO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgVmlydHVhbCA9IHtcbiAgdXBkYXRlKGZvcmNlKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7IHNsaWRlc1BlclZpZXcsIHNsaWRlc1Blckdyb3VwLCBjZW50ZXJlZFNsaWRlcyB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICBjb25zdCB7XG4gICAgICBmcm9tOiBwcmV2aW91c0Zyb20sXG4gICAgICB0bzogcHJldmlvdXNUbyxcbiAgICAgIHNsaWRlcyxcbiAgICAgIHNsaWRlc0dyaWQ6IHByZXZpb3VzU2xpZGVzR3JpZCxcbiAgICAgIHJlbmRlclNsaWRlLFxuICAgICAgb2Zmc2V0OiBwcmV2aW91c09mZnNldCxcbiAgICB9ID0gc3dpcGVyLnZpcnR1YWw7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgY29uc3QgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcblxuICAgIGxldCBvZmZzZXRQcm9wO1xuICAgIGlmIChzd2lwZXIucnRsICYmIHN3aXBlci5pc0hvcml6b250YWwoKSkgb2Zmc2V0UHJvcCA9ICdyaWdodCc7XG4gICAgZWxzZSBvZmZzZXRQcm9wID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCc7XG5cbiAgICBsZXQgc2xpZGVzQWZ0ZXI7XG4gICAgbGV0IHNsaWRlc0JlZm9yZTtcbiAgICBpZiAoY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlc0FmdGVyID0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyBzbGlkZXNQZXJHcm91cDtcbiAgICAgIHNsaWRlc0JlZm9yZSA9IE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpICsgc2xpZGVzUGVyR3JvdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlc0FmdGVyID0gc2xpZGVzUGVyVmlldyArIChzbGlkZXNQZXJHcm91cCAtIDEpO1xuICAgICAgc2xpZGVzQmVmb3JlID0gc2xpZGVzUGVyR3JvdXA7XG4gICAgfVxuICAgIGNvbnN0IGZyb20gPSBNYXRoLm1heCgoYWN0aXZlSW5kZXggfHwgMCkgLSBzbGlkZXNCZWZvcmUsIDApO1xuICAgIGNvbnN0IHRvID0gTWF0aC5taW4oKGFjdGl2ZUluZGV4IHx8IDApICsgc2xpZGVzQWZ0ZXIsIHNsaWRlcy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBvZmZzZXQgPSAoc3dpcGVyLnNsaWRlc0dyaWRbZnJvbV0gfHwgMCkgLSAoc3dpcGVyLnNsaWRlc0dyaWRbMF0gfHwgMCk7XG5cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLnZpcnR1YWwsIHtcbiAgICAgIGZyb20sXG4gICAgICB0byxcbiAgICAgIG9mZnNldCxcbiAgICAgIHNsaWRlc0dyaWQ6IHN3aXBlci5zbGlkZXNHcmlkLFxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb25SZW5kZXJlZCgpIHtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmIChzd2lwZXIubGF6eSAmJiBzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzRnJvbSA9PT0gZnJvbSAmJiBwcmV2aW91c1RvID09PSB0byAmJiAhZm9yY2UpIHtcbiAgICAgIGlmIChzd2lwZXIuc2xpZGVzR3JpZCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkICYmIG9mZnNldCAhPT0gcHJldmlvdXNPZmZzZXQpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlcy5jc3Mob2Zmc2V0UHJvcCwgYCR7b2Zmc2V0fXB4YCk7XG4gICAgICB9XG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbCkge1xuICAgICAgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsLmNhbGwoc3dpcGVyLCB7XG4gICAgICAgIG9mZnNldCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIHNsaWRlczogKGZ1bmN0aW9uIGdldFNsaWRlcygpIHtcbiAgICAgICAgICBjb25zdCBzbGlkZXNUb1JlbmRlciA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBmcm9tOyBpIDw9IHRvOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHNsaWRlc1RvUmVuZGVyLnB1c2goc2xpZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNsaWRlc1RvUmVuZGVyO1xuICAgICAgICB9KCkpLFxuICAgICAgfSk7XG4gICAgICBvblJlbmRlcmVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHByZXBlbmRJbmRleGVzID0gW107XG4gICAgY29uc3QgYXBwZW5kSW5kZXhlcyA9IFtdO1xuICAgIGlmIChmb3JjZSkge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuZmluZChgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gcHJldmlvdXNGcm9tOyBpIDw9IHByZXZpb3VzVG87IGkgKz0gMSkge1xuICAgICAgICBpZiAoaSA8IGZyb20gfHwgaSA+IHRvKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuZmluZChgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7aX1cIl1gKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGkgPj0gZnJvbSAmJiBpIDw9IHRvKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJldmlvdXNUbyA9PT0gJ3VuZGVmaW5lZCcgfHwgZm9yY2UpIHtcbiAgICAgICAgICBhcHBlbmRJbmRleGVzLnB1c2goaSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGkgPiBwcmV2aW91c1RvKSBhcHBlbmRJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgaWYgKGkgPCBwcmV2aW91c0Zyb20pIHByZXBlbmRJbmRleGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kSW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuYXBwZW5kKHJlbmRlclNsaWRlKHNsaWRlc1tpbmRleF0sIGluZGV4KSk7XG4gICAgfSk7XG4gICAgcHJlcGVuZEluZGV4ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIpLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5wcmVwZW5kKHJlbmRlclNsaWRlKHNsaWRlc1tpbmRleF0sIGluZGV4KSk7XG4gICAgfSk7XG4gICAgc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oJy5zd2lwZXItc2xpZGUnKS5jc3Mob2Zmc2V0UHJvcCwgYCR7b2Zmc2V0fXB4YCk7XG4gICAgb25SZW5kZXJlZCgpO1xuICB9LFxuICByZW5kZXJTbGlkZShzbGlkZSwgaW5kZXgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMudmlydHVhbDtcbiAgICBpZiAocGFyYW1zLmNhY2hlICYmIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSkge1xuICAgICAgcmV0dXJuIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XTtcbiAgICB9XG4gICAgY29uc3QgJHNsaWRlRWwgPSBwYXJhbXMucmVuZGVyU2xpZGVcbiAgICAgID8gJChwYXJhbXMucmVuZGVyU2xpZGUuY2FsbChzd2lwZXIsIHNsaWRlLCBpbmRleCkpXG4gICAgICA6ICQoYDxkaXYgY2xhc3M9XCIke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31cIiBkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7aW5kZXh9XCI+JHtzbGlkZX08L2Rpdj5gKTtcbiAgICBpZiAoISRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykpICRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JywgaW5kZXgpO1xuICAgIGlmIChwYXJhbXMuY2FjaGUpIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSA9ICRzbGlkZUVsO1xuICAgIHJldHVybiAkc2xpZGVFbDtcbiAgfSxcbiAgYXBwZW5kU2xpZGUoc2xpZGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcy5wdXNoKHNsaWRlKTtcbiAgICBzd2lwZXIudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gIH0sXG4gIHByZXBlbmRTbGlkZShzbGlkZSkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnVuc2hpZnQoc2xpZGUpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgIGNvbnN0IGNhY2hlID0gc3dpcGVyLnZpcnR1YWwuY2FjaGU7XG4gICAgICBjb25zdCBuZXdDYWNoZSA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY2FjaGUpLmZvckVhY2goKGNhY2hlZEluZGV4KSA9PiB7XG4gICAgICAgIG5ld0NhY2hlW2NhY2hlZEluZGV4ICsgMV0gPSBjYWNoZVtjYWNoZWRJbmRleF07XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci52aXJ0dWFsLmNhY2hlID0gbmV3Q2FjaGU7XG4gICAgfVxuICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICBzd2lwZXIuc2xpZGVOZXh0KDApO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndmlydHVhbCcsXG4gIHBhcmFtczoge1xuICAgIHZpcnR1YWw6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgc2xpZGVzOiBbXSxcbiAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgcmVuZGVyU2xpZGU6IG51bGwsXG4gICAgICByZW5kZXJFeHRlcm5hbDogbnVsbCxcbiAgICB9LFxuICB9LFxuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICB2aXJ0dWFsOiB7XG4gICAgICAgIHVwZGF0ZTogVmlydHVhbC51cGRhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBhcHBlbmRTbGlkZTogVmlydHVhbC5hcHBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHByZXBlbmRTbGlkZTogVmlydHVhbC5wcmVwZW5kU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICByZW5kZXJTbGlkZTogVmlydHVhbC5yZW5kZXJTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNsaWRlczogc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnNsaWRlcyxcbiAgICAgICAgY2FjaGU6IHt9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBiZWZvcmVJbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfXZpcnR1YWxgKTtcbiAgICAgIGNvbnN0IG92ZXJ3cml0ZVBhcmFtcyA9IHtcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XG5cbiAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSgpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNsYXRlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSgpO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgd2luZG93LCBkb2N1bWVudCB9IGZyb20gJ3Nzci13aW5kb3cnO1xuaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IEtleWJvYXJkID0ge1xuICBoYW5kbGUoZXZlbnQpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGxldCBlID0gZXZlbnQ7XG4gICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDsgLy8ganF1ZXJ5IGZpeFxuICAgIGNvbnN0IGtjID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG4gICAgLy8gRGlyZWN0aW9ucyBsb2Nrc1xuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmICgoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSAzOSkgfHwgKHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYga2MgPT09IDQwKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgKChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM3KSB8fCAoc3dpcGVyLmlzVmVydGljYWwoKSAmJiBrYyA9PT0gMzgpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lICYmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMua2V5Ym9hcmQub25seUluVmlld3BvcnQgJiYgKGtjID09PSAzNyB8fCBrYyA9PT0gMzkgfHwga2MgPT09IDM4IHx8IGtjID09PSA0MCkpIHtcbiAgICAgIGxldCBpblZpZXcgPSBmYWxzZTtcbiAgICAgIC8vIENoZWNrIHRoYXQgc3dpcGVyIHNob3VsZCBiZSBpbnNpZGUgb2YgdmlzaWJsZSBhcmVhIG9mIHdpbmRvd1xuICAgICAgaWYgKHN3aXBlci4kZWwucGFyZW50cyhgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApLmxlbmd0aCA+IDAgJiYgc3dpcGVyLiRlbC5wYXJlbnRzKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3N9YCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgY29uc3Qgc3dpcGVyT2Zmc2V0ID0gc3dpcGVyLiRlbC5vZmZzZXQoKTtcbiAgICAgIGlmIChzd2lwZXIucnRsKSBzd2lwZXJPZmZzZXQubGVmdCAtPSBzd2lwZXIuJGVsWzBdLnNjcm9sbExlZnQ7XG4gICAgICBjb25zdCBzd2lwZXJDb29yZCA9IFtcbiAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wXSxcbiAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSxcbiAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVyLmhlaWdodF0sXG4gICAgICAgIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlci53aWR0aCwgc3dpcGVyT2Zmc2V0LnRvcCArIHN3aXBlci5oZWlnaHRdLFxuICAgICAgXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyQ29vcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSBzd2lwZXJDb29yZFtpXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBvaW50WzBdID49IDAgJiYgcG9pbnRbMF0gPD0gd2luZG93V2lkdGggJiZcbiAgICAgICAgICBwb2ludFsxXSA+PSAwICYmIHBvaW50WzFdIDw9IHdpbmRvd0hlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICBpblZpZXcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWluVmlldykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgaWYgKGtjID09PSAzNyB8fCBrYyA9PT0gMzkpIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoKGtjID09PSAzOSAmJiAhc3dpcGVyLnJ0bCkgfHwgKGtjID09PSAzNyAmJiBzd2lwZXIucnRsKSkgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgaWYgKChrYyA9PT0gMzcgJiYgIXN3aXBlci5ydGwpIHx8IChrYyA9PT0gMzkgJiYgc3dpcGVyLnJ0bCkpIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtjID09PSAzOCB8fCBrYyA9PT0gNDApIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoa2MgPT09IDQwKSBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICBpZiAoa2MgPT09IDM4KSBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdrZXlQcmVzcycsIGtjKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9LFxuICBlbmFibGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHJldHVybjtcbiAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIHN3aXBlci5rZXlib2FyZC5oYW5kbGUpO1xuICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gdHJ1ZTtcbiAgfSxcbiAgZGlzYWJsZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHJldHVybjtcbiAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBzd2lwZXIua2V5Ym9hcmQuaGFuZGxlKTtcbiAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCA9IGZhbHNlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAna2V5Ym9hcmQnLFxuICBwYXJhbXM6IHtcbiAgICBrZXlib2FyZDoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICBvbmx5SW5WaWV3cG9ydDogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBrZXlib2FyZDoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgZW5hYmxlOiBLZXlib2FyZC5lbmFibGUuYmluZChzd2lwZXIpLFxuICAgICAgICBkaXNhYmxlOiBLZXlib2FyZC5kaXNhYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgaGFuZGxlOiBLZXlib2FyZC5oYW5kbGUuYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCB7IHdpbmRvdywgZG9jdW1lbnQgfSBmcm9tICdzc3Itd2luZG93JztcbmltcG9ydCAkIGZyb20gJy4uLy4uL3V0aWxzL2RvbSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5mdW5jdGlvbiBpc0V2ZW50U3VwcG9ydGVkKCkge1xuICBjb25zdCBldmVudE5hbWUgPSAnb253aGVlbCc7XG4gIGxldCBpc1N1cHBvcnRlZCA9IGV2ZW50TmFtZSBpbiBkb2N1bWVudDtcblxuICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJ3JldHVybjsnKTtcbiAgICBpc1N1cHBvcnRlZCA9IHR5cGVvZiBlbGVtZW50W2V2ZW50TmFtZV0gPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBpZiAoIWlzU3VwcG9ydGVkICYmXG4gICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24gJiZcbiAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlICYmXG4gICAgLy8gYWx3YXlzIHJldHVybnMgdHJ1ZSBpbiBuZXdlciBicm93c2VycyBhcyBwZXIgdGhlIHN0YW5kYXJkLlxuICAgIC8vIEBzZWUgaHR0cDovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1kb21pbXBsZW1lbnRhdGlvbi1oYXNmZWF0dXJlXG4gICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSgnJywgJycpICE9PSB0cnVlXG4gICkge1xuICAgIC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIHRlc3Qgc3VwcG9ydCBmb3IgdGhlIGB3aGVlbGAgZXZlbnQgaW4gSUU5Ky5cbiAgICBpc1N1cHBvcnRlZCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJ0V2ZW50cy53aGVlbCcsICczLjAnKTtcbiAgfVxuXG4gIHJldHVybiBpc1N1cHBvcnRlZDtcbn1cbmNvbnN0IE1vdXNld2hlZWwgPSB7XG4gIGxhc3RTY3JvbGxUaW1lOiBVdGlscy5ub3coKSxcbiAgZXZlbnQ6IChmdW5jdGlvbiBnZXRFdmVudCgpIHtcbiAgICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpID4gLTEpIHJldHVybiAnRE9NTW91c2VTY3JvbGwnO1xuICAgIHJldHVybiBpc0V2ZW50U3VwcG9ydGVkKCkgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuICB9KCkpLFxuICBub3JtYWxpemUoZSkge1xuICAgIC8vIFJlYXNvbmFibGUgZGVmYXVsdHNcbiAgICBjb25zdCBQSVhFTF9TVEVQID0gMTA7XG4gICAgY29uc3QgTElORV9IRUlHSFQgPSA0MDtcbiAgICBjb25zdCBQQUdFX0hFSUdIVCA9IDgwMDtcblxuICAgIGxldCBzWCA9IDA7XG4gICAgbGV0IHNZID0gMDsgLy8gc3BpblgsIHNwaW5ZXG4gICAgbGV0IHBYID0gMDtcbiAgICBsZXQgcFkgPSAwOyAvLyBwaXhlbFgsIHBpeGVsWVxuXG4gICAgLy8gTGVnYWN5XG4gICAgaWYgKCdkZXRhaWwnIGluIGUpIHtcbiAgICAgIHNZID0gZS5kZXRhaWw7XG4gICAgfVxuICAgIGlmICgnd2hlZWxEZWx0YScgaW4gZSkge1xuICAgICAgc1kgPSAtZS53aGVlbERlbHRhIC8gMTIwO1xuICAgIH1cbiAgICBpZiAoJ3doZWVsRGVsdGFZJyBpbiBlKSB7XG4gICAgICBzWSA9IC1lLndoZWVsRGVsdGFZIC8gMTIwO1xuICAgIH1cbiAgICBpZiAoJ3doZWVsRGVsdGFYJyBpbiBlKSB7XG4gICAgICBzWCA9IC1lLndoZWVsRGVsdGFYIC8gMTIwO1xuICAgIH1cblxuICAgIC8vIHNpZGUgc2Nyb2xsaW5nIG9uIEZGIHdpdGggRE9NTW91c2VTY3JvbGxcbiAgICBpZiAoJ2F4aXMnIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgc1ggPSBzWTtcbiAgICAgIHNZID0gMDtcbiAgICB9XG5cbiAgICBwWCA9IHNYICogUElYRUxfU1RFUDtcbiAgICBwWSA9IHNZICogUElYRUxfU1RFUDtcblxuICAgIGlmICgnZGVsdGFZJyBpbiBlKSB7XG4gICAgICBwWSA9IGUuZGVsdGFZO1xuICAgIH1cbiAgICBpZiAoJ2RlbHRhWCcgaW4gZSkge1xuICAgICAgcFggPSBlLmRlbHRhWDtcbiAgICB9XG5cbiAgICBpZiAoKHBYIHx8IHBZKSAmJiBlLmRlbHRhTW9kZSkge1xuICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7IC8vIGRlbHRhIGluIExJTkUgdW5pdHNcbiAgICAgICAgcFggKj0gTElORV9IRUlHSFQ7XG4gICAgICAgIHBZICo9IExJTkVfSEVJR0hUO1xuICAgICAgfSBlbHNlIHsgLy8gZGVsdGEgaW4gUEFHRSB1bml0c1xuICAgICAgICBwWCAqPSBQQUdFX0hFSUdIVDtcbiAgICAgICAgcFkgKj0gUEFHRV9IRUlHSFQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmFsbC1iYWNrIGlmIHNwaW4gY2Fubm90IGJlIGRldGVybWluZWRcbiAgICBpZiAocFggJiYgIXNYKSB7XG4gICAgICBzWCA9IChwWCA8IDEpID8gLTEgOiAxO1xuICAgIH1cbiAgICBpZiAocFkgJiYgIXNZKSB7XG4gICAgICBzWSA9IChwWSA8IDEpID8gLTEgOiAxO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzcGluWDogc1gsXG4gICAgICBzcGluWTogc1ksXG4gICAgICBwaXhlbFg6IHBYLFxuICAgICAgcGl4ZWxZOiBwWSxcbiAgICB9O1xuICB9LFxuICBoYW5kbGUoZXZlbnQpIHtcbiAgICBsZXQgZSA9IGV2ZW50O1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsO1xuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7IC8vIGpxdWVyeSBmaXhcbiAgICBsZXQgZGVsdGEgPSAwO1xuICAgIGNvbnN0IHJ0bEZhY3RvciA9IHN3aXBlci5ydGwgPyAtMSA6IDE7XG5cbiAgICBjb25zdCBkYXRhID0gTW91c2V3aGVlbC5ub3JtYWxpemUoZSk7XG5cbiAgICBpZiAocGFyYW1zLmZvcmNlVG9BeGlzKSB7XG4gICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkpIGRlbHRhID0gZGF0YS5waXhlbFggKiBydGxGYWN0b3I7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxZKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxYKSkgZGVsdGEgPSBkYXRhLnBpeGVsWTtcbiAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbHRhID0gTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpID8gLWRhdGEucGl4ZWxYICogcnRsRmFjdG9yIDogLWRhdGEucGl4ZWxZO1xuICAgIH1cblxuICAgIGlmIChkZWx0YSA9PT0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICBpZiAocGFyYW1zLmludmVydCkgZGVsdGEgPSAtZGVsdGE7XG5cbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgIGlmIChVdGlscy5ub3coKSAtIHN3aXBlci5tb3VzZXdoZWVsLmxhc3RTY3JvbGxUaW1lID4gNjApIHtcbiAgICAgICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICAgIGlmICgoIXN3aXBlci5pc0VuZCB8fCBzd2lwZXIucGFyYW1zLmxvb3ApICYmICFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsJywgZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCghc3dpcGVyLmlzQmVnaW5uaW5nIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3Njcm9sbCcsIGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcykgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBzd2lwZXIubW91c2V3aGVlbC5sYXN0U2Nyb2xsVGltZSA9IChuZXcgd2luZG93LkRhdGUoKSkuZ2V0VGltZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGcmVlbW9kZSBvciBzY3JvbGxDb250YWluZXI6XG4gICAgICBsZXQgcG9zaXRpb24gPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCkgKyAoZGVsdGEgKiBwYXJhbXMuc2Vuc2l0aXZpdHkpO1xuICAgICAgY29uc3Qgd2FzQmVnaW5uaW5nID0gc3dpcGVyLmlzQmVnaW5uaW5nO1xuICAgICAgY29uc3Qgd2FzRW5kID0gc3dpcGVyLmlzRW5kO1xuXG4gICAgICBpZiAocG9zaXRpb24gPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgIGlmIChwb3NpdGlvbiA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuXG4gICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgIGlmICgoIXdhc0JlZ2lubmluZyAmJiBzd2lwZXIuaXNCZWdpbm5pbmcpIHx8ICghd2FzRW5kICYmIHN3aXBlci5pc0VuZCkpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5tb3VzZXdoZWVsLnRpbWVvdXQpO1xuICAgICAgICBzd2lwZXIubW91c2V3aGVlbC50aW1lb3V0ID0gVXRpbHMubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVJlc2V0KCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9XG4gICAgICAvLyBFbWl0IGV2ZW50XG4gICAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsJywgZSk7XG5cbiAgICAgIC8vIFN0b3AgYXV0b3BsYXlcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5ICYmIHN3aXBlci5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikgc3dpcGVyLnN0b3BBdXRvcGxheSgpO1xuICAgICAgLy8gUmV0dXJuIHBhZ2Ugc2Nyb2xsIG9uIGVkZ2UgcG9zaXRpb25zXG4gICAgICBpZiAocG9zaXRpb24gPT09IHN3aXBlci5taW5UcmFuc2xhdGUoKSB8fCBwb3NpdGlvbiA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgZW5hYmxlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFNb3VzZXdoZWVsLmV2ZW50KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICBsZXQgdGFyZ2V0ID0gc3dpcGVyLiRlbDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCAhPT0gJ2NvbnRhaW5lcicpIHtcbiAgICAgIHRhcmdldCA9ICQoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCk7XG4gICAgfVxuICAgIHRhcmdldC5vbihNb3VzZXdoZWVsLmV2ZW50LCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGUpO1xuICAgIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBkaXNhYmxlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFNb3VzZXdoZWVsLmV2ZW50KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHRhcmdldCA9IHN3aXBlci4kZWw7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQgIT09ICdjb250YWluZXInKSB7XG4gICAgICB0YXJnZXQgPSAkKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQpO1xuICAgIH1cbiAgICB0YXJnZXQub2ZmKE1vdXNld2hlZWwuZXZlbnQsIHN3aXBlci5tb3VzZXdoZWVsLmhhbmRsZSk7XG4gICAgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbW91c2V3aGVlbCcsXG4gIHBhcmFtczoge1xuICAgIG1vdXNld2hlZWw6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgcmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAgICAgaW52ZXJ0OiBmYWxzZSxcbiAgICAgIGZvcmNlVG9BeGlzOiBmYWxzZSxcbiAgICAgIHNlbnNpdGl2aXR5OiAxLFxuICAgICAgZXZlbnRzVGFyZ2VkOiAnY29udGFpbmVyJyxcbiAgICB9LFxuICB9LFxuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBtb3VzZXdoZWVsOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBlbmFibGU6IE1vdXNld2hlZWwuZW5hYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgZGlzYWJsZTogTW91c2V3aGVlbC5kaXNhYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgaGFuZGxlOiBNb3VzZXdoZWVsLmhhbmRsZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGxhc3RTY3JvbGxUaW1lOiBVdGlscy5ub3coKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgaW5pdCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQpIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZSgpO1xuICAgIH0sXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgc3dpcGVyLm1vdXNld2hlZWwuZGlzYWJsZSgpO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IE5hdmlnYXRpb24gPSB7XG4gIHVwZGF0ZSgpIHtcbiAgICAvLyBVcGRhdGUgTmF2aWdhdGlvbiBCdXR0b25zXG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG5cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgY29uc3QgeyAkbmV4dEVsLCAkcHJldkVsIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcblxuICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICAkcHJldkVsLmFkZENsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRwcmV2RWwucmVtb3ZlQ2xhc3MocGFyYW1zLmRpc2FibGVkQ2xhc3MpO1xuICAgICAgfVxuICAgICAgJHByZXZFbFtzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgJG5leHRFbC5hZGRDbGFzcyhwYXJhbXMuZGlzYWJsZWRDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbmV4dEVsLnJlbW92ZUNsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcbiAgICAgIH1cbiAgICAgICRuZXh0RWxbc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShwYXJhbXMubG9ja0NsYXNzKTtcbiAgICB9XG4gIH0sXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG4gICAgaWYgKCEocGFyYW1zLm5leHRFbCB8fCBwYXJhbXMucHJldkVsKSkgcmV0dXJuO1xuXG4gICAgbGV0ICRuZXh0RWw7XG4gICAgbGV0ICRwcmV2RWw7XG4gICAgaWYgKHBhcmFtcy5uZXh0RWwpIHtcbiAgICAgICRuZXh0RWwgPSAkKHBhcmFtcy5uZXh0RWwpO1xuICAgICAgaWYgKFxuICAgICAgICBzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmXG4gICAgICAgIHR5cGVvZiBwYXJhbXMubmV4dEVsID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAkbmV4dEVsLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5uZXh0RWwpLmxlbmd0aCA9PT0gMVxuICAgICAgKSB7XG4gICAgICAgICRuZXh0RWwgPSBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLm5leHRFbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJhbXMucHJldkVsKSB7XG4gICAgICAkcHJldkVsID0gJChwYXJhbXMucHJldkVsKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJlxuICAgICAgICB0eXBlb2YgcGFyYW1zLnByZXZFbCA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgJHByZXZFbC5sZW5ndGggPiAxICYmXG4gICAgICAgIHN3aXBlci4kZWwuZmluZChwYXJhbXMucHJldkVsKS5sZW5ndGggPT09IDFcbiAgICAgICkge1xuICAgICAgICAkcHJldkVsID0gc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5wcmV2RWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoID4gMCkge1xuICAgICAgJG5leHRFbC5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGggPiAwKSB7XG4gICAgICAkcHJldkVsLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIubmF2aWdhdGlvbiwge1xuICAgICAgJG5leHRFbCxcbiAgICAgIG5leHRFbDogJG5leHRFbCAmJiAkbmV4dEVsWzBdLFxuICAgICAgJHByZXZFbCxcbiAgICAgIHByZXZFbDogJHByZXZFbCAmJiAkcHJldkVsWzBdLFxuICAgIH0pO1xuICB9LFxuICBkZXN0cm95KCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3QgeyAkbmV4dEVsLCAkcHJldkVsIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCkge1xuICAgICAgJG5leHRFbC5vZmYoJ2NsaWNrJyk7XG4gICAgICAkbmV4dEVsLnJlbW92ZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzKTtcbiAgICB9XG4gICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGgpIHtcbiAgICAgICRwcmV2RWwub2ZmKCdjbGljaycpO1xuICAgICAgJHByZXZFbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZGlzYWJsZWRDbGFzcyk7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbmF2aWdhdGlvbicsXG4gIHBhcmFtczoge1xuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogbnVsbCxcbiAgICAgIHByZXZFbDogbnVsbCxcblxuICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRDbGFzczogJ3N3aXBlci1idXR0b24tZGlzYWJsZWQnLFxuICAgICAgaGlkZGVuQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWhpZGRlbicsXG4gICAgICBsb2NrQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWxvY2snLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgaW5pdDogTmF2aWdhdGlvbi5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgdXBkYXRlOiBOYXZpZ2F0aW9uLnVwZGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IE5hdmlnYXRpb24uZGVzdHJveS5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLm5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgfSxcbiAgICB0b0VkZ2UoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgfSxcbiAgICBmcm9tRWRnZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLm5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgIH0sXG4gICAgY2xpY2soZSkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHsgJG5leHRFbCwgJHByZXZFbCB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgICBpZiAoXG4gICAgICAgIHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRlT25DbGljayAmJlxuICAgICAgICAhJChlLnRhcmdldCkuaXMoJHByZXZFbCkgJiZcbiAgICAgICAgISQoZS50YXJnZXQpLmlzKCRuZXh0RWwpXG4gICAgICApIHtcbiAgICAgICAgaWYgKCRuZXh0RWwpICRuZXh0RWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgaWYgKCRwcmV2RWwpICRwcmV2RWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCAkIGZyb20gJy4uLy4uL3V0aWxzL2RvbSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5jb25zdCBQYWdpbmF0aW9uID0ge1xuICB1cGRhdGUoKSB7XG4gICAgLy8gUmVuZGVyIHx8IFVwZGF0ZSBQYWdpbmF0aW9uIGJ1bGxldHMvaXRlbXNcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHJ0bCA9IHN3aXBlci5ydGw7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmICghcGFyYW1zLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uJGVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLiRlbC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBjb25zdCBzbGlkZXNMZW5ndGggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICBjb25zdCAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XG4gICAgLy8gQ3VycmVudC9Ub3RhbFxuICAgIGxldCBjdXJyZW50O1xuICAgIGNvbnN0IHRvdGFsID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzbGlkZXNMZW5ndGggLSAoc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICBjdXJyZW50ID0gTWF0aC5jZWlsKChzd2lwZXIuYWN0aXZlSW5kZXggLSBzd2lwZXIubG9vcGVkU2xpZGVzKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXNMZW5ndGggLSAxIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSkge1xuICAgICAgICBjdXJyZW50IC09IChzbGlkZXNMZW5ndGggLSAoc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID4gdG90YWwgLSAxKSBjdXJyZW50IC09IHRvdGFsO1xuICAgICAgaWYgKGN1cnJlbnQgPCAwICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvblR5cGUgIT09ICdidWxsZXRzJykgY3VycmVudCA9IHRvdGFsICsgY3VycmVudDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3VycmVudCA9IHN3aXBlci5zbmFwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcbiAgICB9XG4gICAgLy8gVHlwZXNcbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYnVsbGV0cyA9IHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHM7XG4gICAgICBsZXQgZmlyc3RJbmRleDtcbiAgICAgIGxldCBsYXN0SW5kZXg7XG4gICAgICBsZXQgbWlkSW5kZXg7XG4gICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldFNpemUgPSBidWxsZXRzLmVxKDApW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdvdXRlcldpZHRoJyA6ICdvdXRlckhlaWdodCddKHRydWUpO1xuICAgICAgICAkZWwuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd3aWR0aCcgOiAnaGVpZ2h0JywgYCR7c3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSAqIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzICsgNCl9cHhgKTtcbiAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPiAxICYmIHN3aXBlci5wcmV2aW91c0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCA+IHN3aXBlci5wcmV2aW91c0luZGV4ICYmIHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCA8IChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMSkpIHtcbiAgICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCArPSAxO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudCA8IHN3aXBlci5wcmV2aW91c0luZGV4ICYmIHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCAtPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJzdEluZGV4ID0gY3VycmVudCAtIHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleDtcbiAgICAgICAgbGFzdEluZGV4ID0gZmlyc3RJbmRleCArIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMSk7XG4gICAgICAgIG1pZEluZGV4ID0gKGxhc3RJbmRleCArIGZpcnN0SW5kZXgpIC8gMjtcbiAgICAgIH1cbiAgICAgIGJ1bGxldHMucmVtb3ZlQ2xhc3MoYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfSAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbmV4dCAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbmV4dC1uZXh0ICR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1wcmV2ICR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1wcmV2LXByZXYgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gKTtcbiAgICAgIGlmICgkZWwubGVuZ3RoID4gMSkge1xuICAgICAgICBidWxsZXRzLmVhY2goKGluZGV4LCBidWxsZXQpID0+IHtcbiAgICAgICAgICBjb25zdCAkYnVsbGV0ID0gJChidWxsZXQpO1xuICAgICAgICAgIGNvbnN0IGJ1bGxldEluZGV4ID0gJGJ1bGxldC5pbmRleCgpO1xuICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gY3VycmVudCkge1xuICAgICAgICAgICAgJGJ1bGxldC5hZGRDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPj0gZmlyc3RJbmRleCAmJiBidWxsZXRJbmRleCA8PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgJGJ1bGxldC5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gZmlyc3RJbmRleCkge1xuICAgICAgICAgICAgICAkYnVsbGV0XG4gICAgICAgICAgICAgICAgLnByZXYoKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LXByZXZgKVxuICAgICAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1wcmV2LXByZXZgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICRidWxsZXRcbiAgICAgICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbmV4dGApXG4gICAgICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW5leHQtbmV4dGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCAkYnVsbGV0ID0gYnVsbGV0cy5lcShjdXJyZW50KTtcbiAgICAgICAgJGJ1bGxldC5hZGRDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgY29uc3QgJGZpcnN0RGlzcGxheWVkQnVsbGV0ID0gYnVsbGV0cy5lcShmaXJzdEluZGV4KTtcbiAgICAgICAgICBjb25zdCAkbGFzdERpc3BsYXllZEJ1bGxldCA9IGJ1bGxldHMuZXEobGFzdEluZGV4KTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8PSBsYXN0SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYnVsbGV0cy5lcShpKS5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGZpcnN0RGlzcGxheWVkQnVsbGV0XG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1wcmV2YClcbiAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgIC5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LXByZXYtcHJldmApO1xuICAgICAgICAgICRsYXN0RGlzcGxheWVkQnVsbGV0XG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1uZXh0YClcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW5leHQtbmV4dGApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgIGNvbnN0IGR5bmFtaWNCdWxsZXRzTGVuZ3RoID0gTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgKyA0KTtcbiAgICAgICAgY29uc3QgYnVsbGV0c09mZnNldCA9ICgoKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldFNpemUgKiBkeW5hbWljQnVsbGV0c0xlbmd0aCkgLSAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSkpIC8gMikgLSAobWlkSW5kZXggKiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRTaXplKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0UHJvcCA9IHJ0bCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgIGJ1bGxldHMuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/IG9mZnNldFByb3AgOiAndG9wJywgYCR7YnVsbGV0c09mZnNldH1weGApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICRlbC5maW5kKGAuJHtwYXJhbXMuY3VycmVudENsYXNzfWApLnRleHQoY3VycmVudCArIDEpO1xuICAgICAgJGVsLmZpbmQoYC4ke3BhcmFtcy50b3RhbENsYXNzfWApLnRleHQodG90YWwpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gKGN1cnJlbnQgKyAxKSAvIHRvdGFsO1xuICAgICAgbGV0IHNjYWxlWCA9IHNjYWxlO1xuICAgICAgbGV0IHNjYWxlWSA9IDE7XG4gICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICBzY2FsZVkgPSBzY2FsZTtcbiAgICAgICAgc2NhbGVYID0gMTtcbiAgICAgIH1cbiAgICAgICRlbC5maW5kKGAuJHtwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3N9YCkudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGVYKCR7c2NhbGVYfSkgc2NhbGVZKCR7c2NhbGVZfSlgKS50cmFuc2l0aW9uKHN3aXBlci5wYXJhbXMuc3BlZWQpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdjdXN0b20nICYmIHBhcmFtcy5yZW5kZXJDdXN0b20pIHtcbiAgICAgICRlbC5odG1sKHBhcmFtcy5yZW5kZXJDdXN0b20oc3dpcGVyLCBjdXJyZW50ICsgMSwgdG90YWwpKTtcbiAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgc3dpcGVyLCAkZWxbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuZW1pdCgncGFnaW5hdGlvblVwZGF0ZScsIHN3aXBlciwgJGVsWzBdKTtcbiAgICB9XG4gICAgJGVsW3N3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10ocGFyYW1zLmxvY2tDbGFzcyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICAvLyBSZW5kZXIgQ29udGFpbmVyXG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFwYXJhbXMuZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi4kZWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uJGVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGNvbnN0IHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuXG4gICAgY29uc3QgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsO1xuICAgIGxldCBwYWdpbmF0aW9uSFRNTCA9ICcnO1xuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnKSB7XG4gICAgICBjb25zdCBudW1iZXJPZkJ1bGxldHMgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoKHNsaWRlc0xlbmd0aCAtIChzd2lwZXIubG9vcGVkU2xpZGVzICogMikpIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkJ1bGxldHM7IGkgKz0gMSkge1xuICAgICAgICBpZiAocGFyYW1zLnJlbmRlckJ1bGxldCkge1xuICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IHBhcmFtcy5yZW5kZXJCdWxsZXQuY2FsbChzd2lwZXIsIGksIHBhcmFtcy5idWxsZXRDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gYDwke3BhcmFtcy5idWxsZXRFbGVtZW50fSBjbGFzcz1cIiR7cGFyYW1zLmJ1bGxldENsYXNzfVwiPjwvJHtwYXJhbXMuYnVsbGV0RWxlbWVudH0+YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyA9ICRlbC5maW5kKGAuJHtwYXJhbXMuYnVsbGV0Q2xhc3N9YCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgaWYgKHBhcmFtcy5yZW5kZXJGcmFjdGlvbikge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJGcmFjdGlvbi5jYWxsKHN3aXBlciwgcGFyYW1zLmN1cnJlbnRDbGFzcywgcGFyYW1zLnRvdGFsQ2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPVxuICAgICAgICBgPHNwYW4gY2xhc3M9XCIke3BhcmFtcy5jdXJyZW50Q2xhc3N9XCI+PC9zcGFuPmAgK1xuICAgICAgICAnIC8gJyArXG4gICAgICAgIGA8c3BhbiBjbGFzcz1cIiR7cGFyYW1zLnRvdGFsQ2xhc3N9XCI+PC9zcGFuPmA7XG4gICAgICB9XG4gICAgICAkZWwuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJykge1xuICAgICAgaWYgKHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhcikge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhci5jYWxsKHN3aXBlciwgcGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2luYXRpb25IVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3N9XCI+PC9zcGFuPmA7XG4gICAgICB9XG4gICAgICAkZWwuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMudHlwZSAhPT0gJ2N1c3RvbScpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgc3dpcGVyLnBhZ2luYXRpb24uJGVsWzBdKTtcbiAgICB9XG4gIH0sXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFwYXJhbXMuZWwpIHJldHVybjtcblxuICAgIGxldCAkZWwgPSAkKHBhcmFtcy5lbCk7XG4gICAgaWYgKCRlbC5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGlmIChcbiAgICAgIHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiZcbiAgICAgIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmXG4gICAgICAkZWwubGVuZ3RoID4gMSAmJlxuICAgICAgc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5lbCkubGVuZ3RoID09PSAxXG4gICAgKSB7XG4gICAgICAkZWwgPSBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLmVsKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLmNsaWNrYWJsZUNsYXNzKTtcbiAgICB9XG5cbiAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLm1vZGlmaWVyQ2xhc3MgKyBwYXJhbXMudHlwZSk7XG5cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICRlbC5hZGRDbGFzcyhgJHtwYXJhbXMubW9kaWZpZXJDbGFzc30ke3BhcmFtcy50eXBlfS1keW5hbWljYCk7XG4gICAgICBzd2lwZXIucGFnaW5hdGlvbi5keW5hbWljQnVsbGV0SW5kZXggPSAwO1xuICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPCAxKSB7XG4gICAgICAgIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAkZWwub24oJ2NsaWNrJywgYC4ke3BhcmFtcy5idWxsZXRDbGFzc31gLCBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgaW5kZXggPSAkKHRoaXMpLmluZGV4KCkgKiBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSBpbmRleCArPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhZ2luYXRpb24sIHtcbiAgICAgICRlbCxcbiAgICAgIGVsOiAkZWxbMF0sXG4gICAgfSk7XG4gIH0sXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFwYXJhbXMuZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi4kZWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uJGVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGNvbnN0ICRlbCA9IHN3aXBlci5wYWdpbmF0aW9uLiRlbDtcblxuICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMuaGlkZGVuQ2xhc3MpO1xuICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMubW9kaWZpZXJDbGFzcyArIHBhcmFtcy50eXBlKTtcbiAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cykgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5yZW1vdmVDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAkZWwub2ZmKCdjbGljaycsIGAuJHtwYXJhbXMuYnVsbGV0Q2xhc3N9YCk7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncGFnaW5hdGlvbicsXG4gIHBhcmFtczoge1xuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIGVsOiBudWxsLFxuICAgICAgYnVsbGV0RWxlbWVudDogJ3NwYW4nLFxuICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICAgIGhpZGVPbkNsaWNrOiBmYWxzZSxcbiAgICAgIHJlbmRlckJ1bGxldDogbnVsbCxcbiAgICAgIHJlbmRlclByb2dyZXNzYmFyOiBudWxsLFxuICAgICAgcmVuZGVyRnJhY3Rpb246IG51bGwsXG4gICAgICByZW5kZXJDdXN0b206IG51bGwsXG4gICAgICB0eXBlOiAnYnVsbGV0cycsIC8vICdidWxsZXRzJyBvciAncHJvZ3Jlc3NiYXInIG9yICdmcmFjdGlvbicgb3IgJ2N1c3RvbSdcbiAgICAgIGR5bmFtaWNCdWxsZXRzOiBmYWxzZSxcbiAgICAgIGR5bmFtaWNNYWluQnVsbGV0czogMSxcbiAgICAgIGJ1bGxldENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0JyxcbiAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScsXG4gICAgICBtb2RpZmllckNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tJywgLy8gTkVXXG4gICAgICBjdXJyZW50Q2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JyxcbiAgICAgIHRvdGFsQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi10b3RhbCcsXG4gICAgICBoaWRkZW5DbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWhpZGRlbicsXG4gICAgICBwcm9ncmVzc2JhckZpbGxDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLWZpbGwnLFxuICAgICAgY2xpY2thYmxlQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1jbGlja2FibGUnLCAvLyBORVdcbiAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWxvY2snLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgaW5pdDogUGFnaW5hdGlvbi5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgcmVuZGVyOiBQYWdpbmF0aW9uLnJlbmRlci5iaW5kKHN3aXBlciksXG4gICAgICAgIHVwZGF0ZTogUGFnaW5hdGlvbi51cGRhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBkZXN0cm95OiBQYWdpbmF0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXg6IDAsXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uaW5pdCgpO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGFjdGl2ZUluZGV4Q2hhbmdlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNuYXBJbmRleENoYW5nZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNsaWRlc0xlbmd0aENoYW5nZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNuYXBHcmlkTGVuZ3RoQ2hhbmdlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZGVzdHJveSgpO1xuICAgIH0sXG4gICAgY2xpY2soZSkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVsICYmXG4gICAgICAgIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5oaWRlT25DbGljayAmJlxuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID4gMCAmJlxuICAgICAgICAhJChlLnRhcmdldCkuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKVxuICAgICAgKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC50b2dnbGVDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgZG9jdW1lbnQgfSBmcm9tICdzc3Itd2luZG93JztcbmltcG9ydCAkIGZyb20gJy4uLy4uL3V0aWxzL2RvbSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5pbXBvcnQgRGV2aWNlIGZyb20gJy4uLy4uL3V0aWxzL2RldmljZSc7XG5cbmNvbnN0IFNjcm9sbGJhciA9IHtcbiAgc2V0VHJhbnNsYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgc2Nyb2xsYmFyLCBydGwsIHByb2dyZXNzIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZHJhZ1NpemUsIHRyYWNrU2l6ZSwgJGRyYWdFbCwgJGVsLFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG5cbiAgICBsZXQgbmV3U2l6ZSA9IGRyYWdTaXplO1xuICAgIGxldCBuZXdQb3MgPSAodHJhY2tTaXplIC0gZHJhZ1NpemUpICogcHJvZ3Jlc3M7XG4gICAgaWYgKHJ0bCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIG5ld1BvcyA9IC1uZXdQb3M7XG4gICAgICBpZiAobmV3UG9zID4gMCkge1xuICAgICAgICBuZXdTaXplID0gZHJhZ1NpemUgLSBuZXdQb3M7XG4gICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICB9IGVsc2UgaWYgKC1uZXdQb3MgKyBkcmFnU2l6ZSA+IHRyYWNrU2l6ZSkge1xuICAgICAgICBuZXdTaXplID0gdHJhY2tTaXplICsgbmV3UG9zO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV3UG9zIDwgMCkge1xuICAgICAgbmV3U2l6ZSA9IGRyYWdTaXplICsgbmV3UG9zO1xuICAgICAgbmV3UG9zID0gMDtcbiAgICB9IGVsc2UgaWYgKG5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XG4gICAgICBuZXdTaXplID0gdHJhY2tTaXplIC0gbmV3UG9zO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICBpZiAoU3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcbiAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7bmV3UG9zfXB4LCAwLCAwKWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZVgoJHtuZXdQb3N9cHgpYCk7XG4gICAgICB9XG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gYCR7bmV3U2l6ZX1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChTdXBwb3J0LnRyYW5zZm9ybXMzZCkge1xuICAgICAgICAkZHJhZ0VsLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoMHB4LCAke25ld1Bvc31weCwgMClgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRkcmFnRWwudHJhbnNmb3JtKGB0cmFuc2xhdGVZKCR7bmV3UG9zfXB4KWApO1xuICAgICAgfVxuICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSBgJHtuZXdTaXplfXB4YDtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc3dpcGVyLnNjcm9sbGJhci50aW1lb3V0KTtcbiAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICRlbC50cmFuc2l0aW9uKDQwMCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH0sXG4gIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBzd2lwZXIuc2Nyb2xsYmFyLiRkcmFnRWwudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gIH0sXG4gIHVwZGF0ZVNpemUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG5cbiAgICBjb25zdCB7IHNjcm9sbGJhciB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHsgJGRyYWdFbCwgJGVsIH0gPSBzY3JvbGxiYXI7XG5cbiAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gJyc7XG4gICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICBjb25zdCB0cmFja1NpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAkZWxbMF0ub2Zmc2V0V2lkdGggOiAkZWxbMF0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgY29uc3QgZGl2aWRlciA9IHN3aXBlci5zaXplIC8gc3dpcGVyLnZpcnR1YWxTaXplO1xuICAgIGNvbnN0IG1vdmVEaXZpZGVyID0gZGl2aWRlciAqICh0cmFja1NpemUgLyBzd2lwZXIuc2l6ZSk7XG4gICAgbGV0IGRyYWdTaXplO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICBkcmFnU2l6ZSA9IHRyYWNrU2l6ZSAqIGRpdmlkZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdTaXplID0gcGFyc2VJbnQoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUsIDEwKTtcbiAgICB9XG5cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gYCR7ZHJhZ1NpemV9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9IGAke2RyYWdTaXplfXB4YDtcbiAgICB9XG5cbiAgICBpZiAoZGl2aWRlciA+PSAxKSB7XG4gICAgICAkZWxbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgJGVsWzBdLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIH1cbiAgICBVdGlscy5leHRlbmQoc2Nyb2xsYmFyLCB7XG4gICAgICB0cmFja1NpemUsXG4gICAgICBkaXZpZGVyLFxuICAgICAgbW92ZURpdmlkZXIsXG4gICAgICBkcmFnU2l6ZSxcbiAgICB9KTtcbiAgICBzY3JvbGxiYXIuJGVsW3N3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKTtcbiAgfSxcbiAgc2V0RHJhZ1Bvc2l0aW9uKGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHsgc2Nyb2xsYmFyIH0gPSBzd2lwZXI7XG4gICAgY29uc3QgeyAkZWwsIGRyYWdTaXplLCB0cmFja1NpemUgfSA9IHNjcm9sbGJhcjtcblxuICAgIGxldCBwb2ludGVyUG9zaXRpb247XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgcG9pbnRlclBvc2l0aW9uID0gKChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVggfHwgZS5jbGllbnRYKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlclBvc2l0aW9uID0gKChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVkgfHwgZS5jbGllbnRZKTtcbiAgICB9XG4gICAgbGV0IHBvc2l0aW9uUmF0aW87XG4gICAgcG9zaXRpb25SYXRpbyA9ICgocG9pbnRlclBvc2l0aW9uKSAtICRlbC5vZmZzZXQoKVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJ10gLSAoZHJhZ1NpemUgLyAyKSkgLyAodHJhY2tTaXplIC0gZHJhZ1NpemUpO1xuICAgIHBvc2l0aW9uUmF0aW8gPSBNYXRoLm1heChNYXRoLm1pbihwb3NpdGlvblJhdGlvLCAxKSwgMCk7XG4gICAgaWYgKHN3aXBlci5ydGwpIHtcbiAgICAgIHBvc2l0aW9uUmF0aW8gPSAxIC0gcG9zaXRpb25SYXRpbztcbiAgICB9XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSArICgoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIHBvc2l0aW9uUmF0aW8pO1xuXG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHBvc2l0aW9uKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9LFxuICBvbkRyYWdTdGFydChlKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBjb25zdCB7IHNjcm9sbGJhciwgJHdyYXBwZXJFbCB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHsgJGVsLCAkZHJhZ0VsIH0gPSBzY3JvbGxiYXI7XG4gICAgc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQgPSB0cnVlO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDEwMCk7XG4gICAgJGRyYWdFbC50cmFuc2l0aW9uKDEwMCk7XG4gICAgc2Nyb2xsYmFyLnNldERyYWdQb3NpdGlvbihlKTtcblxuICAgIGNsZWFyVGltZW91dChzd2lwZXIuc2Nyb2xsYmFyLmRyYWdUaW1lb3V0KTtcblxuICAgICRlbC50cmFuc2l0aW9uKDApO1xuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgJGVsLmNzcygnb3BhY2l0eScsIDEpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0JywgZSk7XG4gIH0sXG4gIG9uRHJhZ01vdmUoZSkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3QgeyBzY3JvbGxiYXIsICR3cmFwcGVyRWwgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7ICRlbCwgJGRyYWdFbCB9ID0gc2Nyb2xsYmFyO1xuXG4gICAgaWYgKCFzd2lwZXIuc2Nyb2xsYmFyLmlzVG91Y2hlZCkgcmV0dXJuO1xuICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgc2Nyb2xsYmFyLnNldERyYWdQb3NpdGlvbihlKTtcbiAgICAkd3JhcHBlckVsLnRyYW5zaXRpb24oMCk7XG4gICAgJGVsLnRyYW5zaXRpb24oMCk7XG4gICAgJGRyYWdFbC50cmFuc2l0aW9uKDApO1xuICAgIHN3aXBlci5lbWl0KCdzY3JvbGxiYXJEcmFnTW92ZScsIGUpO1xuICB9LFxuICBvbkRyYWdFbmQoZSkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBjb25zdCB7IHNjcm9sbGJhciB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHsgJGVsIH0gPSBzY3JvbGxiYXI7XG5cbiAgICBpZiAoIXN3aXBlci5zY3JvbGxiYXIuaXNUb3VjaGVkKSByZXR1cm47XG4gICAgc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICBpZiAocGFyYW1zLmhpZGUpIHtcbiAgICAgIGNsZWFyVGltZW91dChzd2lwZXIuc2Nyb2xsYmFyLmRyYWdUaW1lb3V0KTtcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuZHJhZ1RpbWVvdXQgPSBVdGlscy5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICRlbC5jc3MoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgJGVsLnRyYW5zaXRpb24oNDAwKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsYmFyRHJhZ0VuZCcsIGUpO1xuICAgIGlmIChwYXJhbXMuc25hcE9uUmVsZWFzZSkge1xuICAgICAgc3dpcGVyLnNsaWRlUmVzZXQoKTtcbiAgICB9XG4gIH0sXG4gIGVuYWJsZURyYWdnYWJsZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsIHRvdWNoRXZlbnRzLCB0b3VjaEV2ZW50c0Rlc2t0b3AsIHBhcmFtcyxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0ICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgY29uc3QgdGFyZ2V0ID0gJGVsWzBdO1xuICAgIGNvbnN0IGFjdGl2ZUxpc3RlbmVyID0gU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lciA/IHsgcGFzc2l2ZTogZmFsc2UsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcbiAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgaWYgKCFTdXBwb3J0LnRvdWNoICYmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpKSB7XG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3Auc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHNEZXNrdG9wLm1vdmUsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3AuZW5kLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFN1cHBvcnQudG91Y2gpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBpZiAoKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFEZXZpY2UuaW9zICYmICFEZXZpY2UuYW5kcm9pZCkgfHwgKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFTdXBwb3J0LnRvdWNoICYmIERldmljZS5pb3MpKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkaXNhYmxlRHJhZ2dhYmxlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhciwgdG91Y2hFdmVudHMsIHRvdWNoRXZlbnRzRGVza3RvcCwgcGFyYW1zLFxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3QgJGVsID0gc2Nyb2xsYmFyLiRlbDtcbiAgICBjb25zdCB0YXJnZXQgPSAkZWxbMF07XG4gICAgY29uc3QgYWN0aXZlTGlzdGVuZXIgPSBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogZmFsc2UgfSA6IGZhbHNlO1xuICAgIGNvbnN0IHBhc3NpdmVMaXN0ZW5lciA9IFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXIgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcbiAgICBpZiAoIVN1cHBvcnQudG91Y2ggJiYgKFN1cHBvcnQucG9pbnRlckV2ZW50cyB8fCBTdXBwb3J0LnByZWZpeGVkUG9pbnRlckV2ZW50cykpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzRGVza3RvcC5zdGFydCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdTdGFydCwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3AubW92ZSwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzRGVza3RvcC5lbmQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoU3VwcG9ydC50b3VjaCkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdTdGFydCwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGlmICgocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIURldmljZS5pb3MgJiYgIURldmljZS5hbmRyb2lkKSB8fCAocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIVN1cHBvcnQudG91Y2ggJiYgRGV2aWNlLmlvcykpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgY29uc3QgeyBzY3JvbGxiYXIsICRlbDogJHN3aXBlckVsIH0gPSBzd2lwZXI7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG5cbiAgICBsZXQgJGVsID0gJChwYXJhbXMuZWwpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmICRlbC5sZW5ndGggPiAxICYmICRzd2lwZXJFbC5maW5kKHBhcmFtcy5lbCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAkZWwgPSAkc3dpcGVyRWwuZmluZChwYXJhbXMuZWwpO1xuICAgIH1cblxuICAgIGxldCAkZHJhZ0VsID0gJGVsLmZpbmQoYC4ke3N3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdDbGFzc31gKTtcbiAgICBpZiAoJGRyYWdFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICRkcmFnRWwgPSAkKGA8ZGl2IGNsYXNzPVwiJHtzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3N9XCI+PC9kaXY+YCk7XG4gICAgICAkZWwuYXBwZW5kKCRkcmFnRWwpO1xuICAgIH1cblxuICAgIFV0aWxzLmV4dGVuZChzY3JvbGxiYXIsIHtcbiAgICAgICRlbCxcbiAgICAgIGVsOiAkZWxbMF0sXG4gICAgICAkZHJhZ0VsLFxuICAgICAgZHJhZ0VsOiAkZHJhZ0VsWzBdLFxuICAgIH0pO1xuXG4gICAgaWYgKHBhcmFtcy5kcmFnZ2FibGUpIHtcbiAgICAgIHNjcm9sbGJhci5lbmFibGVEcmFnZ2FibGUoKTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBzd2lwZXIuc2Nyb2xsYmFyLmRpc2FibGVEcmFnZ2FibGUoKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3Njcm9sbGJhcicsXG4gIHBhcmFtczoge1xuICAgIHNjcm9sbGJhcjoge1xuICAgICAgZWw6IG51bGwsXG4gICAgICBkcmFnU2l6ZTogJ2F1dG8nLFxuICAgICAgaGlkZTogZmFsc2UsXG4gICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgc25hcE9uUmVsZWFzZTogdHJ1ZSxcbiAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItbG9jaycsXG4gICAgICBkcmFnQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWRyYWcnLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIHNjcm9sbGJhcjoge1xuICAgICAgICBpbml0OiBTY3JvbGxiYXIuaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IFNjcm9sbGJhci5kZXN0cm95LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgdXBkYXRlU2l6ZTogU2Nyb2xsYmFyLnVwZGF0ZVNpemUuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IFNjcm9sbGJhci5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBTY3JvbGxiYXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICAgIGVuYWJsZURyYWdnYWJsZTogU2Nyb2xsYmFyLmVuYWJsZURyYWdnYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGRpc2FibGVEcmFnZ2FibGU6IFNjcm9sbGJhci5kaXNhYmxlRHJhZ2dhYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBTY3JvbGxiYXIuc2V0RHJhZ1Bvc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25EcmFnU3RhcnQ6IFNjcm9sbGJhci5vbkRyYWdTdGFydC5iaW5kKHN3aXBlciksXG4gICAgICAgIG9uRHJhZ01vdmU6IFNjcm9sbGJhci5vbkRyYWdNb3ZlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25EcmFnRW5kOiBTY3JvbGxiYXIub25EcmFnRW5kLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgaXNUb3VjaGVkOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogbnVsbCxcbiAgICAgICAgZHJhZ1RpbWVvdXQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci5pbml0KCk7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCk7XG4gICAgfSxcbiAgICB1cGRhdGUoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgfSxcbiAgICByZXNpemUoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgfSxcbiAgICBvYnNlcnZlclVwZGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgfSxcbiAgICBkZXN0cm95KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuZGVzdHJveSgpO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IFBhcmFsbGF4ID0ge1xuICBzZXRUcmFuc2Zvcm0oZWwsIHByb2dyZXNzKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7IHJ0bCB9ID0gc3dpcGVyO1xuXG4gICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgY29uc3QgcnRsRmFjdG9yID0gcnRsID8gLTEgOiAxO1xuXG4gICAgY29uc3QgcCA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheCcpIHx8ICcwJztcbiAgICBsZXQgeCA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC14Jyk7XG4gICAgbGV0IHkgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteScpO1xuICAgIGNvbnN0IHNjYWxlID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlJyk7XG4gICAgY29uc3Qgb3BhY2l0eSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5Jyk7XG5cbiAgICBpZiAoeCB8fCB5KSB7XG4gICAgICB4ID0geCB8fCAnMCc7XG4gICAgICB5ID0geSB8fCAnMCc7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIHggPSBwO1xuICAgICAgeSA9ICcwJztcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IHA7XG4gICAgICB4ID0gJzAnO1xuICAgIH1cblxuICAgIGlmICgoeCkuaW5kZXhPZignJScpID49IDApIHtcbiAgICAgIHggPSBgJHtwYXJzZUludCh4LCAxMCkgKiBwcm9ncmVzcyAqIHJ0bEZhY3Rvcn0lYDtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGAke3ggKiBwcm9ncmVzcyAqIHJ0bEZhY3Rvcn1weGA7XG4gICAgfVxuICAgIGlmICgoeSkuaW5kZXhPZignJScpID49IDApIHtcbiAgICAgIHkgPSBgJHtwYXJzZUludCh5LCAxMCkgKiBwcm9ncmVzc30lYDtcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IGAke3kgKiBwcm9ncmVzc31weGA7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcGFjaXR5ICE9PSAndW5kZWZpbmVkJyAmJiBvcGFjaXR5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBjdXJyZW50T3BhY2l0eSA9IG9wYWNpdHkgLSAoKG9wYWNpdHkgLSAxKSAqICgxIC0gTWF0aC5hYnMocHJvZ3Jlc3MpKSk7XG4gICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IGN1cnJlbnRPcGFjaXR5O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNjYWxlID09PSAndW5kZWZpbmVkJyB8fCBzY2FsZSA9PT0gbnVsbCkge1xuICAgICAgJGVsLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoJHt4fSwgJHt5fSwgMHB4KWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXJyZW50U2NhbGUgPSBzY2FsZSAtICgoc2NhbGUgLSAxKSAqICgxIC0gTWF0aC5hYnMocHJvZ3Jlc3MpKSk7XG4gICAgICAkZWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke3h9LCAke3l9LCAwcHgpIHNjYWxlKCR7Y3VycmVudFNjYWxlfSlgKTtcbiAgICB9XG4gIH0sXG4gIHNldFRyYW5zbGF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgICRlbCwgc2xpZGVzLCBwcm9ncmVzcywgc25hcEdyaWQsXG4gICAgfSA9IHN3aXBlcjtcbiAgICAkZWwuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJylcbiAgICAgIC5lYWNoKChpbmRleCwgZWwpID0+IHtcbiAgICAgICAgc3dpcGVyLnBhcmFsbGF4LnNldFRyYW5zZm9ybShlbCwgcHJvZ3Jlc3MpO1xuICAgICAgfSk7XG4gICAgc2xpZGVzLmVhY2goKHNsaWRlSW5kZXgsIHNsaWRlRWwpID0+IHtcbiAgICAgIGxldCBzbGlkZVByb2dyZXNzID0gc2xpZGVFbC5wcm9ncmVzcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJykge1xuICAgICAgICBzbGlkZVByb2dyZXNzICs9IE1hdGguY2VpbChzbGlkZUluZGV4IC8gMikgLSAocHJvZ3Jlc3MgKiAoc25hcEdyaWQubGVuZ3RoIC0gMSkpO1xuICAgICAgfVxuICAgICAgc2xpZGVQcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHNsaWRlUHJvZ3Jlc3MsIC0xKSwgMSk7XG4gICAgICAkKHNsaWRlRWwpLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJylcbiAgICAgICAgLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2Zvcm0oZWwsIHNsaWRlUHJvZ3Jlc3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbiA9IHRoaXMucGFyYW1zLnNwZWVkKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7ICRlbCB9ID0gc3dpcGVyO1xuICAgICRlbC5maW5kKCdbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XScpXG4gICAgICAuZWFjaCgoaW5kZXgsIHBhcmFsbGF4RWwpID0+IHtcbiAgICAgICAgY29uc3QgJHBhcmFsbGF4RWwgPSAkKHBhcmFsbGF4RWwpO1xuICAgICAgICBsZXQgcGFyYWxsYXhEdXJhdGlvbiA9IHBhcnNlSW50KCRwYXJhbGxheEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LWR1cmF0aW9uJyksIDEwKSB8fCBkdXJhdGlvbjtcbiAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSBwYXJhbGxheER1cmF0aW9uID0gMDtcbiAgICAgICAgJHBhcmFsbGF4RWwudHJhbnNpdGlvbihwYXJhbGxheER1cmF0aW9uKTtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncGFyYWxsYXgnLFxuICBwYXJhbXM6IHtcbiAgICBwYXJhbGxheDoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgcGFyYWxsYXg6IHtcbiAgICAgICAgc2V0VHJhbnNmb3JtOiBQYXJhbGxheC5zZXRUcmFuc2Zvcm0uYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IFBhcmFsbGF4LnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zaXRpb246IFBhcmFsbGF4LnNldFRyYW5zaXRpb24uYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBiZWZvcmVJbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSByZXR1cm47XG4gICAgICBzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgIH0sXG4gICAgaW5pdCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXgpIHJldHVybjtcbiAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2xhdGUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXgpIHJldHVybjtcbiAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2xhdGUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXgpIHJldHVybjtcbiAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCAkIGZyb20gJy4uLy4uL3V0aWxzL2RvbSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IERldmljZSBmcm9tICcuLi8uLi91dGlscy9kZXZpY2UnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi4vLi4vdXRpbHMvc3VwcG9ydCc7XG5cbmNvbnN0IFpvb20gPSB7XG4gIC8vIENhbGMgU2NhbGUgRnJvbSBNdWx0aS10b3VjaGVzXG4gIGdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSkge1xuICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikgcmV0dXJuIDE7XG4gICAgY29uc3QgeDEgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgY29uc3QgeTEgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgY29uc3QgeDIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVg7XG4gICAgY29uc3QgeTIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKCh4MiAtIHgxKSAqKiAyKSArICgoeTIgLSB5MSkgKiogMikpO1xuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfSxcbiAgLy8gRXZlbnRzXG4gIG9uR2VzdHVyZVN0YXJ0KGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgY29uc3QgeyBnZXN0dXJlIH0gPSB6b29tO1xuICAgIHpvb20uZmFrZUdlc3R1cmVUb3VjaGVkID0gZmFsc2U7XG4gICAgem9vbS5mYWtlR2VzdHVyZU1vdmVkID0gZmFsc2U7XG4gICAgaWYgKCFTdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hzdGFydCcgfHwgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB6b29tLmZha2VHZXN0dXJlVG91Y2hlZCA9IHRydWU7XG4gICAgICBnZXN0dXJlLnNjYWxlU3RhcnQgPSBab29tLmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XG4gICAgfVxuICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCB8fCAhZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGgpIHtcbiAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuc3dpcGVyLXNsaWRlJyk7XG4gICAgICBpZiAoZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGggPT09IDApIGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCk7XG4gICAgICBnZXN0dXJlLm1heFJhdGlvID0gZ2VzdHVyZS4kaW1hZ2VXcmFwRWwuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHBhcmFtcy5tYXhSYXRpbztcbiAgICAgIGlmIChnZXN0dXJlLiRpbWFnZVdyYXBFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMCk7XG4gICAgc3dpcGVyLnpvb20uaXNTY2FsaW5nID0gdHJ1ZTtcbiAgfSxcbiAgb25HZXN0dXJlQ2hhbmdlKGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgY29uc3QgeyBnZXN0dXJlIH0gPSB6b29tO1xuICAgIGlmICghU3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNobW92ZScgfHwgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHpvb20uZmFrZUdlc3R1cmVNb3ZlZCA9IHRydWU7XG4gICAgICBnZXN0dXJlLnNjYWxlTW92ZSA9IFpvb20uZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKTtcbiAgICB9XG4gICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgaWYgKFN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgIHN3aXBlci56b29tLnNjYWxlID0gZS5zY2FsZSAqIHpvb20uY3VycmVudFNjYWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICB6b29tLnNjYWxlID0gKGdlc3R1cmUuc2NhbGVNb3ZlIC8gZ2VzdHVyZS5zY2FsZVN0YXJ0KSAqIHpvb20uY3VycmVudFNjYWxlO1xuICAgIH1cbiAgICBpZiAoem9vbS5zY2FsZSA+IGdlc3R1cmUubWF4UmF0aW8pIHtcbiAgICAgIHpvb20uc2NhbGUgPSAoZ2VzdHVyZS5tYXhSYXRpbyAtIDEpICsgKCgoem9vbS5zY2FsZSAtIGdlc3R1cmUubWF4UmF0aW8pICsgMSkgKiogMC41KTtcbiAgICB9XG4gICAgaWYgKHpvb20uc2NhbGUgPCBwYXJhbXMubWluUmF0aW8pIHtcbiAgICAgIHpvb20uc2NhbGUgPSAocGFyYW1zLm1pblJhdGlvICsgMSkgLSAoKChwYXJhbXMubWluUmF0aW8gLSB6b29tLnNjYWxlKSArIDEpICoqIDAuNSk7XG4gICAgfVxuICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJHt6b29tLnNjYWxlfSlgKTtcbiAgfSxcbiAgb25HZXN0dXJlRW5kKGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgY29uc3QgeyBnZXN0dXJlIH0gPSB6b29tO1xuICAgIGlmICghU3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgaWYgKCF6b29tLmZha2VHZXN0dXJlVG91Y2hlZCB8fCAhem9vbS5mYWtlR2VzdHVyZU1vdmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaGVuZCcgfHwgKGUudHlwZSA9PT0gJ3RvdWNoZW5kJyAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA8IDIgJiYgIURldmljZS5hbmRyb2lkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB6b29tLmZha2VHZXN0dXJlVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgem9vbS5mYWtlR2VzdHVyZU1vdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIHpvb20uc2NhbGUgPSBNYXRoLm1heChNYXRoLm1pbih6b29tLnNjYWxlLCBnZXN0dXJlLm1heFJhdGlvKSwgcGFyYW1zLm1pblJhdGlvKTtcbiAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCkudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJHt6b29tLnNjYWxlfSlgKTtcbiAgICB6b29tLmN1cnJlbnRTY2FsZSA9IHpvb20uc2NhbGU7XG4gICAgem9vbS5pc1NjYWxpbmcgPSBmYWxzZTtcbiAgICBpZiAoem9vbS5zY2FsZSA9PT0gMSkgZ2VzdHVyZS4kc2xpZGVFbCA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICBjb25zdCB7IGdlc3R1cmUsIGltYWdlIH0gPSB6b29tO1xuICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGlmIChpbWFnZS5pc1RvdWNoZWQpIHJldHVybjtcbiAgICBpZiAoRGV2aWNlLmFuZHJvaWQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpbWFnZS5pc1RvdWNoZWQgPSB0cnVlO1xuICAgIGltYWdlLnRvdWNoZXNTdGFydC54ID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgIGltYWdlLnRvdWNoZXNTdGFydC55ID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICB9LFxuICBvblRvdWNoTW92ZShlKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgY29uc3QgeyBnZXN0dXJlLCBpbWFnZSwgdmVsb2NpdHkgfSA9IHpvb207XG4gICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICBpZiAoIWltYWdlLmlzVG91Y2hlZCB8fCAhZ2VzdHVyZS4kc2xpZGVFbCkgcmV0dXJuO1xuXG4gICAgaWYgKCFpbWFnZS5pc01vdmVkKSB7XG4gICAgICBpbWFnZS53aWR0aCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICBpbWFnZS5oZWlnaHQgPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgIGltYWdlLnN0YXJ0WCA9IFV0aWxzLmdldFRyYW5zbGF0ZShnZXN0dXJlLiRpbWFnZVdyYXBFbFswXSwgJ3gnKSB8fCAwO1xuICAgICAgaW1hZ2Uuc3RhcnRZID0gVXRpbHMuZ2V0VHJhbnNsYXRlKGdlc3R1cmUuJGltYWdlV3JhcEVsWzBdLCAneScpIHx8IDA7XG4gICAgICBnZXN0dXJlLnNsaWRlV2lkdGggPSBnZXN0dXJlLiRzbGlkZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgZ2VzdHVyZS5zbGlkZUhlaWdodCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigwKTtcbiAgICAgIGlmIChzd2lwZXIucnRsKSBpbWFnZS5zdGFydFggPSAtaW1hZ2Uuc3RhcnRYO1xuICAgICAgaWYgKHN3aXBlci5ydGwpIGltYWdlLnN0YXJ0WSA9IC1pbWFnZS5zdGFydFk7XG4gICAgfVxuICAgIC8vIERlZmluZSBpZiB3ZSBuZWVkIGltYWdlIGRyYWdcbiAgICBjb25zdCBzY2FsZWRXaWR0aCA9IGltYWdlLndpZHRoICogem9vbS5zY2FsZTtcbiAgICBjb25zdCBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xuXG4gICAgaWYgKHNjYWxlZFdpZHRoIDwgZ2VzdHVyZS5zbGlkZVdpZHRoICYmIHNjYWxlZEhlaWdodCA8IGdlc3R1cmUuc2xpZGVIZWlnaHQpIHJldHVybjtcblxuICAgIGltYWdlLm1pblggPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVXaWR0aCAvIDIpIC0gKHNjYWxlZFdpZHRoIC8gMikpLCAwKTtcbiAgICBpbWFnZS5tYXhYID0gLWltYWdlLm1pblg7XG4gICAgaW1hZ2UubWluWSA9IE1hdGgubWluKCgoZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIpIC0gKHNjYWxlZEhlaWdodCAvIDIpKSwgMCk7XG4gICAgaW1hZ2UubWF4WSA9IC1pbWFnZS5taW5ZO1xuXG4gICAgaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgIGltYWdlLnRvdWNoZXNDdXJyZW50LnkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcblxuICAgIGlmICghaW1hZ2UuaXNNb3ZlZCAmJiAhem9vbS5pc1NjYWxpbmcpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmXG4gICAgICAgIChcbiAgICAgICAgICAoTWF0aC5mbG9vcihpbWFnZS5taW5YKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFgpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnggPCBpbWFnZS50b3VjaGVzU3RhcnQueCkgfHxcbiAgICAgICAgICAoTWF0aC5mbG9vcihpbWFnZS5tYXhYKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFgpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnggPiBpbWFnZS50b3VjaGVzU3RhcnQueClcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmXG4gICAgICAgIChcbiAgICAgICAgICAoTWF0aC5mbG9vcihpbWFnZS5taW5ZKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFkpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnkgPCBpbWFnZS50b3VjaGVzU3RhcnQueSkgfHxcbiAgICAgICAgICAoTWF0aC5mbG9vcihpbWFnZS5tYXhZKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFkpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnkgPiBpbWFnZS50b3VjaGVzU3RhcnQueSlcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaW1hZ2UuaXNNb3ZlZCA9IHRydWU7XG4gICAgaW1hZ2UuY3VycmVudFggPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIGltYWdlLnRvdWNoZXNTdGFydC54KSArIGltYWdlLnN0YXJ0WDtcbiAgICBpbWFnZS5jdXJyZW50WSA9IChpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gaW1hZ2UudG91Y2hlc1N0YXJ0LnkpICsgaW1hZ2Uuc3RhcnRZO1xuXG4gICAgaWYgKGltYWdlLmN1cnJlbnRYIDwgaW1hZ2UubWluWCkge1xuICAgICAgaW1hZ2UuY3VycmVudFggPSAoaW1hZ2UubWluWCArIDEpIC0gKCgoaW1hZ2UubWluWCAtIGltYWdlLmN1cnJlbnRYKSArIDEpICoqIDAuOCk7XG4gICAgfVxuICAgIGlmIChpbWFnZS5jdXJyZW50WCA+IGltYWdlLm1heFgpIHtcbiAgICAgIGltYWdlLmN1cnJlbnRYID0gKGltYWdlLm1heFggLSAxKSArICgoKGltYWdlLmN1cnJlbnRYIC0gaW1hZ2UubWF4WCkgKyAxKSAqKiAwLjgpO1xuICAgIH1cblxuICAgIGlmIChpbWFnZS5jdXJyZW50WSA8IGltYWdlLm1pblkpIHtcbiAgICAgIGltYWdlLmN1cnJlbnRZID0gKGltYWdlLm1pblkgKyAxKSAtICgoKGltYWdlLm1pblkgLSBpbWFnZS5jdXJyZW50WSkgKyAxKSAqKiAwLjgpO1xuICAgIH1cbiAgICBpZiAoaW1hZ2UuY3VycmVudFkgPiBpbWFnZS5tYXhZKSB7XG4gICAgICBpbWFnZS5jdXJyZW50WSA9IChpbWFnZS5tYXhZIC0gMSkgKyAoKChpbWFnZS5jdXJyZW50WSAtIGltYWdlLm1heFkpICsgMSkgKiogMC44KTtcbiAgICB9XG5cbiAgICAvLyBWZWxvY2l0eVxuICAgIGlmICghdmVsb2NpdHkucHJldlBvc2l0aW9uWCkgdmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lng7XG4gICAgaWYgKCF2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZID0gaW1hZ2UudG91Y2hlc0N1cnJlbnQueTtcbiAgICBpZiAoIXZlbG9jaXR5LnByZXZUaW1lKSB2ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgdmVsb2NpdHkueCA9IChpbWFnZS50b3VjaGVzQ3VycmVudC54IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWCkgLyAoRGF0ZS5ub3coKSAtIHZlbG9jaXR5LnByZXZUaW1lKSAvIDI7XG4gICAgdmVsb2NpdHkueSA9IChpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWSkgLyAoRGF0ZS5ub3coKSAtIHZlbG9jaXR5LnByZXZUaW1lKSAvIDI7XG4gICAgaWYgKE1hdGguYWJzKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSA8IDIpIHZlbG9jaXR5LnggPSAwO1xuICAgIGlmIChNYXRoLmFicyhpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWSkgPCAyKSB2ZWxvY2l0eS55ID0gMDtcbiAgICB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YID0gaW1hZ2UudG91Y2hlc0N1cnJlbnQueDtcbiAgICB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZID0gaW1hZ2UudG91Y2hlc0N1cnJlbnQueTtcbiAgICB2ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XG5cbiAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7aW1hZ2UuY3VycmVudFh9cHgsICR7aW1hZ2UuY3VycmVudFl9cHgsMClgKTtcbiAgfSxcbiAgb25Ub3VjaEVuZCgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICBjb25zdCB7IGdlc3R1cmUsIGltYWdlLCB2ZWxvY2l0eSB9ID0gem9vbTtcbiAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBpZiAoIWltYWdlLmlzVG91Y2hlZCB8fCAhaW1hZ2UuaXNNb3ZlZCkge1xuICAgICAgaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICBpbWFnZS5pc01vdmVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGltYWdlLmlzTW92ZWQgPSBmYWxzZTtcbiAgICBsZXQgbW9tZW50dW1EdXJhdGlvblggPSAzMDA7XG4gICAgbGV0IG1vbWVudHVtRHVyYXRpb25ZID0gMzAwO1xuICAgIGNvbnN0IG1vbWVudHVtRGlzdGFuY2VYID0gdmVsb2NpdHkueCAqIG1vbWVudHVtRHVyYXRpb25YO1xuICAgIGNvbnN0IG5ld1Bvc2l0aW9uWCA9IGltYWdlLmN1cnJlbnRYICsgbW9tZW50dW1EaXN0YW5jZVg7XG4gICAgY29uc3QgbW9tZW50dW1EaXN0YW5jZVkgPSB2ZWxvY2l0eS55ICogbW9tZW50dW1EdXJhdGlvblk7XG4gICAgY29uc3QgbmV3UG9zaXRpb25ZID0gaW1hZ2UuY3VycmVudFkgKyBtb21lbnR1bURpc3RhbmNlWTtcblxuICAgIC8vIEZpeCBkdXJhdGlvblxuICAgIGlmICh2ZWxvY2l0eS54ICE9PSAwKSBtb21lbnR1bUR1cmF0aW9uWCA9IE1hdGguYWJzKChuZXdQb3NpdGlvblggLSBpbWFnZS5jdXJyZW50WCkgLyB2ZWxvY2l0eS54KTtcbiAgICBpZiAodmVsb2NpdHkueSAhPT0gMCkgbW9tZW50dW1EdXJhdGlvblkgPSBNYXRoLmFicygobmV3UG9zaXRpb25ZIC0gaW1hZ2UuY3VycmVudFkpIC8gdmVsb2NpdHkueSk7XG4gICAgY29uc3QgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGgubWF4KG1vbWVudHVtRHVyYXRpb25YLCBtb21lbnR1bUR1cmF0aW9uWSk7XG5cbiAgICBpbWFnZS5jdXJyZW50WCA9IG5ld1Bvc2l0aW9uWDtcbiAgICBpbWFnZS5jdXJyZW50WSA9IG5ld1Bvc2l0aW9uWTtcblxuICAgIC8vIERlZmluZSBpZiB3ZSBuZWVkIGltYWdlIGRyYWdcbiAgICBjb25zdCBzY2FsZWRXaWR0aCA9IGltYWdlLndpZHRoICogem9vbS5zY2FsZTtcbiAgICBjb25zdCBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xuICAgIGltYWdlLm1pblggPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVXaWR0aCAvIDIpIC0gKHNjYWxlZFdpZHRoIC8gMikpLCAwKTtcbiAgICBpbWFnZS5tYXhYID0gLWltYWdlLm1pblg7XG4gICAgaW1hZ2UubWluWSA9IE1hdGgubWluKCgoZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIpIC0gKHNjYWxlZEhlaWdodCAvIDIpKSwgMCk7XG4gICAgaW1hZ2UubWF4WSA9IC1pbWFnZS5taW5ZO1xuICAgIGltYWdlLmN1cnJlbnRYID0gTWF0aC5tYXgoTWF0aC5taW4oaW1hZ2UuY3VycmVudFgsIGltYWdlLm1heFgpLCBpbWFnZS5taW5YKTtcbiAgICBpbWFnZS5jdXJyZW50WSA9IE1hdGgubWF4KE1hdGgubWluKGltYWdlLmN1cnJlbnRZLCBpbWFnZS5tYXhZKSwgaW1hZ2UubWluWSk7XG5cbiAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKG1vbWVudHVtRHVyYXRpb24pLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoJHtpbWFnZS5jdXJyZW50WH1weCwgJHtpbWFnZS5jdXJyZW50WX1weCwwKWApO1xuICB9LFxuICBvblRyYW5zaXRpb25FbmQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgY29uc3QgeyBnZXN0dXJlIH0gPSB6b29tO1xuICAgIGlmIChnZXN0dXJlLiRzbGlkZUVsICYmIHN3aXBlci5wcmV2aW91c0luZGV4ICE9PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoMSknKTtcbiAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApJyk7XG4gICAgICBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkO1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IHVuZGVmaW5lZDtcbiAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsID0gdW5kZWZpbmVkO1xuXG4gICAgICB6b29tLnNjYWxlID0gMTtcbiAgICAgIHpvb20uY3VycmVudFNjYWxlID0gMTtcbiAgICB9XG4gIH0sXG4gIC8vIFRvZ2dsZSBab29tXG4gIHRvZ2dsZShlKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG5cbiAgICBpZiAoem9vbS5zY2FsZSAmJiB6b29tLnNjYWxlICE9PSAxKSB7XG4gICAgICAvLyBab29tIE91dFxuICAgICAgem9vbS5vdXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gWm9vbSBJblxuICAgICAgem9vbS5pbihlKTtcbiAgICB9XG4gIH0sXG4gIGluKGUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuXG4gICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICBjb25zdCB7IGdlc3R1cmUsIGltYWdlIH0gPSB6b29tO1xuXG4gICAgaWYgKCFnZXN0dXJlLiRzbGlkZUVsKSB7XG4gICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLmNsaWNrZWRTbGlkZSA/ICQoc3dpcGVyLmNsaWNrZWRTbGlkZSkgOiBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCk7XG4gICAgfVxuICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgZ2VzdHVyZS4kc2xpZGVFbC5hZGRDbGFzcyhgJHtwYXJhbXMuem9vbWVkU2xpZGVDbGFzc31gKTtcblxuICAgIGxldCB0b3VjaFg7XG4gICAgbGV0IHRvdWNoWTtcbiAgICBsZXQgb2Zmc2V0WDtcbiAgICBsZXQgb2Zmc2V0WTtcbiAgICBsZXQgZGlmZlg7XG4gICAgbGV0IGRpZmZZO1xuICAgIGxldCB0cmFuc2xhdGVYO1xuICAgIGxldCB0cmFuc2xhdGVZO1xuICAgIGxldCBpbWFnZVdpZHRoO1xuICAgIGxldCBpbWFnZUhlaWdodDtcbiAgICBsZXQgc2NhbGVkV2lkdGg7XG4gICAgbGV0IHNjYWxlZEhlaWdodDtcbiAgICBsZXQgdHJhbnNsYXRlTWluWDtcbiAgICBsZXQgdHJhbnNsYXRlTWluWTtcbiAgICBsZXQgdHJhbnNsYXRlTWF4WDtcbiAgICBsZXQgdHJhbnNsYXRlTWF4WTtcbiAgICBsZXQgc2xpZGVXaWR0aDtcbiAgICBsZXQgc2xpZGVIZWlnaHQ7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlLnRvdWNoZXNTdGFydC54ID09PSAndW5kZWZpbmVkJyAmJiBlKSB7XG4gICAgICB0b3VjaFggPSBlLnR5cGUgPT09ICd0b3VjaGVuZCcgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgIHRvdWNoWSA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3VjaFggPSBpbWFnZS50b3VjaGVzU3RhcnQueDtcbiAgICAgIHRvdWNoWSA9IGltYWdlLnRvdWNoZXNTdGFydC55O1xuICAgIH1cblxuICAgIHpvb20uc2NhbGUgPSBnZXN0dXJlLiRpbWFnZVdyYXBFbC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcGFyYW1zLm1heFJhdGlvO1xuICAgIHpvb20uY3VycmVudFNjYWxlID0gZ2VzdHVyZS4kaW1hZ2VXcmFwRWwuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHBhcmFtcy5tYXhSYXRpbztcbiAgICBpZiAoZSkge1xuICAgICAgc2xpZGVXaWR0aCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICBzbGlkZUhlaWdodCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgb2Zmc2V0WCA9IGdlc3R1cmUuJHNsaWRlRWwub2Zmc2V0KCkubGVmdDtcbiAgICAgIG9mZnNldFkgPSBnZXN0dXJlLiRzbGlkZUVsLm9mZnNldCgpLnRvcDtcbiAgICAgIGRpZmZYID0gKG9mZnNldFggKyAoc2xpZGVXaWR0aCAvIDIpKSAtIHRvdWNoWDtcbiAgICAgIGRpZmZZID0gKG9mZnNldFkgKyAoc2xpZGVIZWlnaHQgLyAyKSkgLSB0b3VjaFk7XG5cbiAgICAgIGltYWdlV2lkdGggPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgaW1hZ2VIZWlnaHQgPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgIHNjYWxlZFdpZHRoID0gaW1hZ2VXaWR0aCAqIHpvb20uc2NhbGU7XG4gICAgICBzY2FsZWRIZWlnaHQgPSBpbWFnZUhlaWdodCAqIHpvb20uc2NhbGU7XG5cbiAgICAgIHRyYW5zbGF0ZU1pblggPSBNYXRoLm1pbigoKHNsaWRlV2lkdGggLyAyKSAtIChzY2FsZWRXaWR0aCAvIDIpKSwgMCk7XG4gICAgICB0cmFuc2xhdGVNaW5ZID0gTWF0aC5taW4oKChzbGlkZUhlaWdodCAvIDIpIC0gKHNjYWxlZEhlaWdodCAvIDIpKSwgMCk7XG4gICAgICB0cmFuc2xhdGVNYXhYID0gLXRyYW5zbGF0ZU1pblg7XG4gICAgICB0cmFuc2xhdGVNYXhZID0gLXRyYW5zbGF0ZU1pblk7XG5cbiAgICAgIHRyYW5zbGF0ZVggPSBkaWZmWCAqIHpvb20uc2NhbGU7XG4gICAgICB0cmFuc2xhdGVZID0gZGlmZlkgKiB6b29tLnNjYWxlO1xuXG4gICAgICBpZiAodHJhbnNsYXRlWCA8IHRyYW5zbGF0ZU1pblgpIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZU1pblg7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNsYXRlWCA+IHRyYW5zbGF0ZU1heFgpIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZU1heFg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2xhdGVZIDwgdHJhbnNsYXRlTWluWSkge1xuICAgICAgICB0cmFuc2xhdGVZID0gdHJhbnNsYXRlTWluWTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2xhdGVZID4gdHJhbnNsYXRlTWF4WSkge1xuICAgICAgICB0cmFuc2xhdGVZID0gdHJhbnNsYXRlTWF4WTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNsYXRlWCA9IDA7XG4gICAgICB0cmFuc2xhdGVZID0gMDtcbiAgICB9XG4gICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGVYfXB4LCAke3RyYW5zbGF0ZVl9cHgsMClgKTtcbiAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgke3pvb20uc2NhbGV9KWApO1xuICB9LFxuICBvdXQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcblxuICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG4gICAgY29uc3QgeyBnZXN0dXJlIH0gPSB6b29tO1xuXG4gICAgaWYgKCFnZXN0dXJlLiRzbGlkZUVsKSB7XG4gICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLmNsaWNrZWRTbGlkZSA/ICQoc3dpcGVyLmNsaWNrZWRTbGlkZSkgOiBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCk7XG4gICAgfVxuICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgem9vbS5zY2FsZSA9IDE7XG4gICAgem9vbS5jdXJyZW50U2NhbGUgPSAxO1xuICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgZ2VzdHVyZS4kc2xpZGVFbC5yZW1vdmVDbGFzcyhgJHtwYXJhbXMuem9vbWVkU2xpZGVDbGFzc31gKTtcbiAgICBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkO1xuICB9LFxuICAvLyBBdHRhY2gvRGV0YWNoIEV2ZW50c1xuICBlbmFibGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgaWYgKHpvb20uZW5hYmxlZCkgcmV0dXJuO1xuICAgIHpvb20uZW5hYmxlZCA9IHRydWU7XG5cbiAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSBzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzd2lwZXIucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcblxuICAgIC8vIFNjYWxlIGltYWdlXG4gICAgaWYgKFN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKCdnZXN0dXJlc3RhcnQnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbignZ2VzdHVyZWNoYW5nZScsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbignZ2VzdHVyZWVuZCcsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0LCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5lbmQsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gTW92ZSBpbWFnZVxuICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5tb3ZlLCBgLiR7c3dpcGVyLnBhcmFtcy56b29tLmNvbnRhaW5lckNsYXNzfWAsIHpvb20ub25Ub3VjaE1vdmUpO1xuICB9LFxuICBkaXNhYmxlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuICAgIGlmICghem9vbS5lbmFibGVkKSByZXR1cm47XG5cbiAgICBzd2lwZXIuem9vbS5lbmFibGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSBzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzd2lwZXIucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcblxuICAgIC8vIFNjYWxlIGltYWdlXG4gICAgaWYgKFN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZignZ2VzdHVyZXN0YXJ0JywgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKCdnZXN0dXJlY2hhbmdlJywgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZignZ2VzdHVyZWVuZCcsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCwgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5tb3ZlLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5lbmQsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gTW92ZSBpbWFnZVxuICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgYC4ke3N3aXBlci5wYXJhbXMuem9vbS5jb250YWluZXJDbGFzc31gLCB6b29tLm9uVG91Y2hNb3ZlKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3pvb20nLFxuICBwYXJhbXM6IHtcbiAgICB6b29tOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIG1heFJhdGlvOiAzLFxuICAgICAgbWluUmF0aW86IDEsXG4gICAgICB0b2dnbGU6IHRydWUsXG4gICAgICBjb250YWluZXJDbGFzczogJ3N3aXBlci16b29tLWNvbnRhaW5lcicsXG4gICAgICB6b29tZWRTbGlkZUNsYXNzOiAnc3dpcGVyLXNsaWRlLXpvb21lZCcsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qgem9vbSA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgc2NhbGU6IDEsXG4gICAgICBjdXJyZW50U2NhbGU6IDEsXG4gICAgICBpc1NjYWxpbmc6IGZhbHNlLFxuICAgICAgZ2VzdHVyZToge1xuICAgICAgICAkc2xpZGVFbDogdW5kZWZpbmVkLFxuICAgICAgICBzbGlkZVdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgIHNsaWRlSGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICRpbWFnZUVsOiB1bmRlZmluZWQsXG4gICAgICAgICRpbWFnZVdyYXBFbDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhSYXRpbzogMyxcbiAgICAgIH0sXG4gICAgICBpbWFnZToge1xuICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICBjdXJyZW50WDogdW5kZWZpbmVkLFxuICAgICAgICBjdXJyZW50WTogdW5kZWZpbmVkLFxuICAgICAgICBtaW5YOiB1bmRlZmluZWQsXG4gICAgICAgIG1pblk6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4WDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhZOiB1bmRlZmluZWQsXG4gICAgICAgIHdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgIGhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydFg6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRZOiB1bmRlZmluZWQsXG4gICAgICAgIHRvdWNoZXNTdGFydDoge30sXG4gICAgICAgIHRvdWNoZXNDdXJyZW50OiB7fSxcbiAgICAgIH0sXG4gICAgICB2ZWxvY2l0eToge1xuICAgICAgICB4OiB1bmRlZmluZWQsXG4gICAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJldlBvc2l0aW9uWDogdW5kZWZpbmVkLFxuICAgICAgICBwcmV2UG9zaXRpb25ZOiB1bmRlZmluZWQsXG4gICAgICAgIHByZXZUaW1lOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIH07XG4gICAgKCdvbkdlc3R1cmVTdGFydCBvbkdlc3R1cmVDaGFuZ2Ugb25HZXN0dXJlRW5kIG9uVG91Y2hTdGFydCBvblRvdWNoTW92ZSBvblRvdWNoRW5kIG9uVHJhbnNpdGlvbkVuZCB0b2dnbGUgZW5hYmxlIGRpc2FibGUgaW4gb3V0Jykuc3BsaXQoJyAnKS5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG4gICAgICB6b29tW21ldGhvZE5hbWVdID0gWm9vbVttZXRob2ROYW1lXS5iaW5kKHN3aXBlcik7XG4gICAgfSk7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgem9vbSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuem9vbS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnpvb20uZGlzYWJsZSgpO1xuICAgIH0sXG4gICAgdG91Y2hTdGFydChlKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSByZXR1cm47XG4gICAgICBzd2lwZXIuem9vbS5vblRvdWNoU3RhcnQoZSk7XG4gICAgfSxcbiAgICB0b3VjaEVuZChlKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSByZXR1cm47XG4gICAgICBzd2lwZXIuem9vbS5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgZG91YmxlVGFwKGUpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20udG9nZ2xlKSB7XG4gICAgICAgIHN3aXBlci56b29tLnRvZ2dsZShlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy56b29tLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLnpvb20ub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgJCBmcm9tICcuLi8uLi91dGlscy9kb20nO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgTGF6eSA9IHtcbiAgbG9hZEluU2xpZGUoaW5kZXgsIGxvYWRJbkR1cGxpY2F0ZSA9IHRydWUpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubGF6eTtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIuc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuXG4gICAgY29uc3QgJHNsaWRlRWwgPSBpc1ZpcnR1YWxcbiAgICAgID8gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2luZGV4fVwiXWApXG4gICAgICA6IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xuXG4gICAgbGV0ICRpbWFnZXMgPSAkc2xpZGVFbC5maW5kKGAuJHtwYXJhbXMuZWxlbWVudENsYXNzfTpub3QoLiR7cGFyYW1zLmxvYWRlZENsYXNzfSk6bm90KC4ke3BhcmFtcy5sb2FkaW5nQ2xhc3N9KWApO1xuICAgIGlmICgkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMuZWxlbWVudENsYXNzKSAmJiAhJHNsaWRlRWwuaGFzQ2xhc3MocGFyYW1zLmxvYWRlZENsYXNzKSAmJiAhJHNsaWRlRWwuaGFzQ2xhc3MocGFyYW1zLmxvYWRpbmdDbGFzcykpIHtcbiAgICAgICRpbWFnZXMgPSAkaW1hZ2VzLmFkZCgkc2xpZGVFbFswXSk7XG4gICAgfVxuICAgIGlmICgkaW1hZ2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgJGltYWdlcy5lYWNoKChpbWFnZUluZGV4LCBpbWFnZUVsKSA9PiB7XG4gICAgICBjb25zdCAkaW1hZ2VFbCA9ICQoaW1hZ2VFbCk7XG4gICAgICAkaW1hZ2VFbC5hZGRDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKTtcblxuICAgICAgY29uc3QgYmFja2dyb3VuZCA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xuICAgICAgY29uc3Qgc3JjID0gJGltYWdlRWwuYXR0cignZGF0YS1zcmMnKTtcbiAgICAgIGNvbnN0IHNyY3NldCA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICBjb25zdCBzaXplcyA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcblxuICAgICAgc3dpcGVyLmxvYWRJbWFnZSgkaW1hZ2VFbFswXSwgKHNyYyB8fCBiYWNrZ3JvdW5kKSwgc3Jjc2V0LCBzaXplcywgZmFsc2UsICgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIgPT09ICd1bmRlZmluZWQnIHx8IHN3aXBlciA9PT0gbnVsbCB8fCAhc3dpcGVyIHx8IChzd2lwZXIgJiYgIXN3aXBlci5wYXJhbXMpIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGJhY2tncm91bmQpIHtcbiAgICAgICAgICAkaW1hZ2VFbC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKFwiJHtiYWNrZ3JvdW5kfVwiKWApO1xuICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzcmNzZXQpIHtcbiAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NyY3NldCcsIHNyY3NldCk7XG4gICAgICAgICAgICAkaW1hZ2VFbC5yZW1vdmVBdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2l6ZXMpIHtcbiAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NpemVzJywgc2l6ZXMpO1xuICAgICAgICAgICAgJGltYWdlRWwucmVtb3ZlQXR0cignZGF0YS1zaXplcycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICAkaW1hZ2VFbC5hdHRyKCdzcmMnLCBzcmMpO1xuICAgICAgICAgICAgJGltYWdlRWwucmVtb3ZlQXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkaW1hZ2VFbC5hZGRDbGFzcyhwYXJhbXMubG9hZGVkQ2xhc3MpLnJlbW92ZUNsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpO1xuICAgICAgICAkc2xpZGVFbC5maW5kKGAuJHtwYXJhbXMucHJlbG9hZGVyQ2xhc3N9YCkucmVtb3ZlKCk7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgJiYgbG9hZEluRHVwbGljYXRlKSB7XG4gICAgICAgICAgY29uc3Qgc2xpZGVPcmlnaW5hbEluZGV4ID0gJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICAgICAgICBpZiAoJHNsaWRlRWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlT3JpZ2luYWxJbmRleH1cIl06bm90KC4ke3N3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pYCk7XG4gICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShvcmlnaW5hbFNsaWRlLmluZGV4KCksIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZHVwbGljYXRlZFNsaWRlID0gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlT3JpZ2luYWxJbmRleH1cIl1gKTtcbiAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGR1cGxpY2F0ZWRTbGlkZS5pbmRleCgpLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbWl0KCdsYXp5SW1hZ2VSZWFkeScsICRzbGlkZUVsWzBdLCAkaW1hZ2VFbFswXSk7XG4gICAgICB9KTtcblxuICAgICAgc3dpcGVyLmVtaXQoJ2xhenlJbWFnZUxvYWQnLCAkc2xpZGVFbFswXSwgJGltYWdlRWxbMF0pO1xuICAgIH0pO1xuICB9LFxuICBsb2FkKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgJHdyYXBwZXJFbCwgcGFyYW1zOiBzd2lwZXJQYXJhbXMsIHNsaWRlcywgYWN0aXZlSW5kZXgsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXJQYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlclBhcmFtcy5sYXp5O1xuXG4gICAgbGV0IHNsaWRlc1BlclZpZXcgPSBzd2lwZXJQYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICBzbGlkZXNQZXJWaWV3ID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbGlkZUV4aXN0KGluZGV4KSB7XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIGlmICgkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXJQYXJhbXMuc2xpZGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2luZGV4fVwiXWApLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNsaWRlc1tpbmRleF0pIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzbGlkZUluZGV4KHNsaWRlRWwpIHtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgcmV0dXJuICQoc2xpZGVFbCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKHNsaWRlRWwpLmluZGV4KCk7XG4gICAgfVxuXG4gICAgaWYgKCFzd2lwZXIubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpIHN3aXBlci5sYXp5LmluaXRpYWxJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7XG4gICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXJQYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3N9YCkuZWFjaCgoZWxJbmRleCwgc2xpZGVFbCkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IGlzVmlydHVhbCA/ICQoc2xpZGVFbCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSA6ICQoc2xpZGVFbCkuaW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLmxhenkubG9hZEluU2xpZGUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4OyBpIDwgYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHNsaWRlRXhpc3QoaSkpIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShhY3RpdmVJbmRleCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMubG9hZFByZXZOZXh0KSB7XG4gICAgICBpZiAoc2xpZGVzUGVyVmlldyA+IDEgfHwgKHBhcmFtcy5sb2FkUHJldk5leHRBbW91bnQgJiYgcGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudCA+IDEpKSB7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHBhcmFtcy5sb2FkUHJldk5leHRBbW91bnQ7XG4gICAgICAgIGNvbnN0IHNwdiA9IHNsaWRlc1BlclZpZXc7XG4gICAgICAgIGNvbnN0IG1heEluZGV4ID0gTWF0aC5taW4oYWN0aXZlSW5kZXggKyBzcHYgKyBNYXRoLm1heChhbW91bnQsIHNwdiksIHNsaWRlcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBtaW5JbmRleCA9IE1hdGgubWF4KGFjdGl2ZUluZGV4IC0gTWF0aC5tYXgoc3B2LCBhbW91bnQpLCAwKTtcbiAgICAgICAgLy8gTmV4dCBTbGlkZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4ICsgc2xpZGVzUGVyVmlldzsgaSA8IG1heEluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVFeGlzdChpKSkgc3dpcGVyLmxhenkubG9hZEluU2xpZGUoaSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJldiBTbGlkZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IG1pbkluZGV4OyBpIDwgYWN0aXZlSW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV4dFNsaWRlID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyUGFyYW1zLnNsaWRlTmV4dENsYXNzfWApO1xuICAgICAgICBpZiAobmV4dFNsaWRlLmxlbmd0aCA+IDApIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKHNsaWRlSW5kZXgobmV4dFNsaWRlKSk7XG5cbiAgICAgICAgY29uc3QgcHJldlNsaWRlID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyUGFyYW1zLnNsaWRlUHJldkNsYXNzfWApO1xuICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCA+IDApIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKHNsaWRlSW5kZXgocHJldlNsaWRlKSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbGF6eScsXG4gIHBhcmFtczoge1xuICAgIGxhenk6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbG9hZFByZXZOZXh0OiBmYWxzZSxcbiAgICAgIGxvYWRQcmV2TmV4dEFtb3VudDogMSxcbiAgICAgIGxvYWRPblRyYW5zaXRpb25TdGFydDogZmFsc2UsXG5cbiAgICAgIGVsZW1lbnRDbGFzczogJ3N3aXBlci1sYXp5JyxcbiAgICAgIGxvYWRpbmdDbGFzczogJ3N3aXBlci1sYXp5LWxvYWRpbmcnLFxuICAgICAgbG9hZGVkQ2xhc3M6ICdzd2lwZXItbGF6eS1sb2FkZWQnLFxuICAgICAgcHJlbG9hZGVyQ2xhc3M6ICdzd2lwZXItbGF6eS1wcmVsb2FkZXInLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGxhenk6IHtcbiAgICAgICAgaW5pdGlhbEltYWdlTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgbG9hZDogTGF6eS5sb2FkLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgbG9hZEluU2xpZGU6IExhenkubG9hZEluU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBiZWZvcmVJbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMpIHtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5wcmVsb2FkSW1hZ2VzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmIHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlID09PSAwKSB7XG4gICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNjcm9sbCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiAhc3dpcGVyLnBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNpemUoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNjcm9sbGJhckRyYWdNb3ZlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0cmFuc2l0aW9uU3RhcnQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0IHx8ICghc3dpcGVyLnBhcmFtcy5sYXp5LmxvYWRPblRyYW5zaXRpb25TdGFydCAmJiAhc3dpcGVyLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQgJiYgIXN3aXBlci5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQpIHtcbiAgICAgICAgc3dpcGVyLmxhenkubG9hZCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuIiwiLyogZXNsaW50IG5vLWJpdHdpc2U6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCI+PlwiXSB9XSAqL1xuaW1wb3J0IFN3aXBlciBmcm9tICcuLi9jb3JlL2NvcmUtY2xhc3MnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgQ29udHJvbGxlciA9IHtcbiAgTGluZWFyU3BsaW5lOiBmdW5jdGlvbiBMaW5lYXJTcGxpbmUoeCwgeSkge1xuICAgIGNvbnN0IGJpbmFyeVNlYXJjaCA9IChmdW5jdGlvbiBzZWFyY2goKSB7XG4gICAgICBsZXQgbWF4SW5kZXg7XG4gICAgICBsZXQgbWluSW5kZXg7XG4gICAgICBsZXQgZ3Vlc3M7XG4gICAgICByZXR1cm4gKGFycmF5LCB2YWwpID0+IHtcbiAgICAgICAgbWluSW5kZXggPSAtMTtcbiAgICAgICAgbWF4SW5kZXggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChtYXhJbmRleCAtIG1pbkluZGV4ID4gMSkge1xuICAgICAgICAgIGd1ZXNzID0gbWF4SW5kZXggKyBtaW5JbmRleCA+PiAxO1xuICAgICAgICAgIGlmIChhcnJheVtndWVzc10gPD0gdmFsKSB7XG4gICAgICAgICAgICBtaW5JbmRleCA9IGd1ZXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IGd1ZXNzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4SW5kZXg7XG4gICAgICB9O1xuICAgIH0oKSk7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFzdEluZGV4ID0geC5sZW5ndGggLSAxO1xuICAgIC8vIEdpdmVuIGFuIHggdmFsdWUgKHgyKSwgcmV0dXJuIHRoZSBleHBlY3RlZCB5MiB2YWx1ZTpcbiAgICAvLyAoeDEseTEpIGlzIHRoZSBrbm93biBwb2ludCBiZWZvcmUgZ2l2ZW4gdmFsdWUsXG4gICAgLy8gKHgzLHkzKSBpcyB0aGUga25vd24gcG9pbnQgYWZ0ZXIgZ2l2ZW4gdmFsdWUuXG4gICAgbGV0IGkxO1xuICAgIGxldCBpMztcblxuICAgIHRoaXMuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiBpbnRlcnBvbGF0ZSh4Mikge1xuICAgICAgaWYgKCF4MikgcmV0dXJuIDA7XG5cbiAgICAgIC8vIEdldCB0aGUgaW5kZXhlcyBvZiB4MSBhbmQgeDMgKHRoZSBhcnJheSBpbmRleGVzIGJlZm9yZSBhbmQgYWZ0ZXIgZ2l2ZW4geDIpOlxuICAgICAgaTMgPSBiaW5hcnlTZWFyY2godGhpcy54LCB4Mik7XG4gICAgICBpMSA9IGkzIC0gMTtcblxuICAgICAgLy8gV2UgaGF2ZSBvdXIgaW5kZXhlcyBpMSAmIGkzLCBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFscmVhZHk6XG4gICAgICAvLyB5MiA6PSAoKHgy4oiSeDEpIMOXICh5M+KIknkxKSkgw7cgKHgz4oiSeDEpICsgeTFcbiAgICAgIHJldHVybiAoKCh4MiAtIHRoaXMueFtpMV0pICogKHRoaXMueVtpM10gLSB0aGlzLnlbaTFdKSkgLyAodGhpcy54W2kzXSAtIHRoaXMueFtpMV0pKSArIHRoaXMueVtpMV07XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8geHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xuICBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uKGMpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lKSB7XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5zcGxpbmUgPSBzd2lwZXIucGFyYW1zLmxvb3AgP1xuICAgICAgICBuZXcgQ29udHJvbGxlci5MaW5lYXJTcGxpbmUoc3dpcGVyLnNsaWRlc0dyaWQsIGMuc2xpZGVzR3JpZCkgOlxuICAgICAgICBuZXcgQ29udHJvbGxlci5MaW5lYXJTcGxpbmUoc3dpcGVyLnNuYXBHcmlkLCBjLnNuYXBHcmlkKTtcbiAgICB9XG4gIH0sXG4gIHNldFRyYW5zbGF0ZShzZXRUcmFuc2xhdGUsIGJ5Q29udHJvbGxlcikge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3QgY29udHJvbGxlZCA9IHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgbGV0IG11bHRpcGxpZXI7XG4gICAgbGV0IGNvbnRyb2xsZWRUcmFuc2xhdGU7XG4gICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjKSB7XG4gICAgICAvLyB0aGlzIHdpbGwgY3JlYXRlIGFuIEludGVycG9sYXRlIGZ1bmN0aW9uIGJhc2VkIG9uIHRoZSBzbmFwR3JpZHNcbiAgICAgIC8vIHggaXMgdGhlIEdyaWQgb2YgdGhlIHNjcm9sbGVkIHNjcm9sbGVyIGFuZCB5IHdpbGwgYmUgdGhlIGNvbnRyb2xsZWQgc2Nyb2xsZXJcbiAgICAgIC8vIGl0IG1ha2VzIHNlbnNlIHRvIGNyZWF0ZSB0aGlzIG9ubHkgb25jZSBhbmQgcmVjYWxsIGl0IGZvciB0aGUgaW50ZXJwb2xhdGlvblxuICAgICAgLy8gdGhlIGZ1bmN0aW9uIGRvZXMgYSBsb3Qgb2YgdmFsdWUgY2FjaGluZyBmb3IgcGVyZm9ybWFuY2VcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IGMucnRsICYmIGMucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY29udHJvbGxlci5ieSA9PT0gJ3NsaWRlJykge1xuICAgICAgICBzd2lwZXIuY29udHJvbGxlci5nZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uKGMpO1xuICAgICAgICAvLyBpIGFtIG5vdCBzdXJlIHdoeSB0aGUgdmFsdWVzIGhhdmUgdG8gYmUgbXVsdGlwbGljYXRlZCB0aGlzIHdheSwgdHJpZWQgdG8gaW52ZXJ0IHRoZSBzbmFwR3JpZFxuICAgICAgICAvLyBidXQgaXQgZGlkIG5vdCB3b3JrIG91dFxuICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gLXN3aXBlci5jb250cm9sbGVyLnNwbGluZS5pbnRlcnBvbGF0ZSgtdHJhbnNsYXRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjb250cm9sbGVkVHJhbnNsYXRlIHx8IHN3aXBlci5wYXJhbXMuY29udHJvbGxlci5ieSA9PT0gJ2NvbnRhaW5lcicpIHtcbiAgICAgICAgbXVsdGlwbGllciA9IChjLm1heFRyYW5zbGF0ZSgpIC0gYy5taW5UcmFuc2xhdGUoKSkgLyAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9ICgodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIG11bHRpcGxpZXIpICsgYy5taW5UcmFuc2xhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY29udHJvbGxlci5pbnZlcnNlKSB7XG4gICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSBjLm1heFRyYW5zbGF0ZSgpIC0gY29udHJvbGxlZFRyYW5zbGF0ZTtcbiAgICAgIH1cbiAgICAgIGMudXBkYXRlUHJvZ3Jlc3MoY29udHJvbGxlZFRyYW5zbGF0ZSk7XG4gICAgICBjLnNldFRyYW5zbGF0ZShjb250cm9sbGVkVHJhbnNsYXRlLCBzd2lwZXIpO1xuICAgICAgYy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgYy51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xsZWQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjb250cm9sbGVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZCk7XG4gICAgfVxuICB9LFxuICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IGNvbnRyb2xsZWQgPSBzd2lwZXIuY29udHJvbGxlci5jb250cm9sO1xuICAgIGxldCBpO1xuICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2l0aW9uKGMpIHtcbiAgICAgIGMuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgc3dpcGVyKTtcbiAgICAgIGlmIChkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICBjLnRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICBjLiR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFjb250cm9sbGVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKGMucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICBjLmxvb3BGaXgoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYy50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb250cm9sbGVkKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbnRyb2xsZWQgaW5zdGFuY2VvZiBTd2lwZXIgJiYgYnlDb250cm9sbGVyICE9PSBjb250cm9sbGVkKSB7XG4gICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkKTtcbiAgICB9XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnY29udHJvbGxlcicsXG4gIHBhcmFtczoge1xuICAgIGNvbnRyb2xsZXI6IHtcbiAgICAgIGNvbnRyb2w6IHVuZGVmaW5lZCxcbiAgICAgIGludmVyc2U6IGZhbHNlLFxuICAgICAgYnk6ICdzbGlkZScsIC8vIG9yICdjb250YWluZXInXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgY29udHJvbGxlcjoge1xuICAgICAgICBjb250cm9sOiBzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuY29udHJvbCxcbiAgICAgICAgZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbjogQ29udHJvbGxlci5nZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBDb250cm9sbGVyLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zaXRpb246IENvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHJldHVybjtcbiAgICAgIGlmIChzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzaXplKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgcmV0dXJuO1xuICAgICAgaWYgKHN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zcGxpbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRlbGV0ZSBzd2lwZXIuY29udHJvbGxlci5zcGxpbmU7XG4gICAgICB9XG4gICAgfSxcbiAgICBvYnNlcnZlclVwZGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHJldHVybjtcbiAgICAgIGlmIChzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSByZXR1cm47XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSByZXR1cm47XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IGExMXkgPSB7XG4gIG1ha2VFbEZvY3VzYWJsZSgkZWwpIHtcbiAgICAkZWwuYXR0cigndGFiSW5kZXgnLCAnMCcpO1xuICAgIHJldHVybiAkZWw7XG4gIH0sXG4gIGFkZEVsUm9sZSgkZWwsIHJvbGUpIHtcbiAgICAkZWwuYXR0cigncm9sZScsIHJvbGUpO1xuICAgIHJldHVybiAkZWw7XG4gIH0sXG4gIGFkZEVsTGFiZWwoJGVsLCBsYWJlbCkge1xuICAgICRlbC5hdHRyKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuICAgIHJldHVybiAkZWw7XG4gIH0sXG4gIGRpc2FibGVFbCgkZWwpIHtcbiAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuICAgIHJldHVybiAkZWw7XG4gIH0sXG4gIGVuYWJsZUVsKCRlbCkge1xuICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgZmFsc2UpO1xuICAgIHJldHVybiAkZWw7XG4gIH0sXG4gIG9uRW50ZXJLZXkoZSkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5hMTF5O1xuICAgIGlmIChlLmtleUNvZGUgIT09IDEzKSByZXR1cm47XG4gICAgY29uc3QgJHRhcmdldEVsID0gJChlLnRhcmdldCk7XG4gICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwgJiYgJHRhcmdldEVsLmlzKHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwpKSB7XG4gICAgICBpZiAoIShzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCkpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLmxhc3RTbGlkZU1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLmExMXkubm90aWZ5KHBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwgJiYgJHRhcmdldEVsLmlzKHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwpKSB7XG4gICAgICBpZiAoIShzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCkpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLmZpcnN0U2xpZGVNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5hMTF5Lm5vdGlmeShwYXJhbXMucHJldlNsaWRlTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiAkdGFyZ2V0RWwuaXMoYC4ke3N3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzc31gKSkge1xuICAgICAgJHRhcmdldEVsWzBdLmNsaWNrKCk7XG4gICAgfVxuICB9LFxuICBub3RpZnkobWVzc2FnZSkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uID0gc3dpcGVyLmExMXkubGl2ZVJlZ2lvbjtcbiAgICBpZiAobm90aWZpY2F0aW9uLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIG5vdGlmaWNhdGlvbi5odG1sKCcnKTtcbiAgICBub3RpZmljYXRpb24uaHRtbChtZXNzYWdlKTtcbiAgfSxcbiAgdXBkYXRlTmF2aWdhdGlvbigpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuXG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgJG5leHRFbCwgJHByZXZFbCB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG5cbiAgICBpZiAoJHByZXZFbCAmJiAkcHJldkVsLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgc3dpcGVyLmExMXkuZGlzYWJsZUVsKCRwcmV2RWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLmExMXkuZW5hYmxlRWwoJHByZXZFbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgICBzd2lwZXIuYTExeS5kaXNhYmxlRWwoJG5leHRFbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuYTExeS5lbmFibGVFbCgkbmV4dEVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHVwZGF0ZVBhZ2luYXRpb24oKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmExMXk7XG4gICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCkge1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5lYWNoKChidWxsZXRJbmRleCwgYnVsbGV0RWwpID0+IHtcbiAgICAgICAgY29uc3QgJGJ1bGxldEVsID0gJChidWxsZXRFbCk7XG4gICAgICAgIHN3aXBlci5hMTF5Lm1ha2VFbEZvY3VzYWJsZSgkYnVsbGV0RWwpO1xuICAgICAgICBzd2lwZXIuYTExeS5hZGRFbFJvbGUoJGJ1bGxldEVsLCAnYnV0dG9uJyk7XG4gICAgICAgIHN3aXBlci5hMTF5LmFkZEVsTGFiZWwoJGJ1bGxldEVsLCBwYXJhbXMucGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2UucmVwbGFjZSgve3tpbmRleH19LywgJGJ1bGxldEVsLmluZGV4KCkgKyAxKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcblxuICAgIHN3aXBlci4kZWwuYXBwZW5kKHN3aXBlci5hMTF5LmxpdmVSZWdpb24pO1xuXG4gICAgLy8gTmF2aWdhdGlvblxuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcbiAgICBsZXQgJG5leHRFbDtcbiAgICBsZXQgJHByZXZFbDtcbiAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkge1xuICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XG4gICAgfVxuICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSB7XG4gICAgICAkcHJldkVsID0gc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbDtcbiAgICB9XG4gICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgIHN3aXBlci5hMTF5Lm1ha2VFbEZvY3VzYWJsZSgkbmV4dEVsKTtcbiAgICAgIHN3aXBlci5hMTF5LmFkZEVsUm9sZSgkbmV4dEVsLCAnYnV0dG9uJyk7XG4gICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRuZXh0RWwsIHBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICRuZXh0RWwub24oJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG4gICAgaWYgKCRwcmV2RWwpIHtcbiAgICAgIHN3aXBlci5hMTF5Lm1ha2VFbEZvY3VzYWJsZSgkcHJldkVsKTtcbiAgICAgIHN3aXBlci5hMTF5LmFkZEVsUm9sZSgkcHJldkVsLCAnYnV0dG9uJyk7XG4gICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRwcmV2RWwsIHBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcbiAgICAgICRwcmV2RWwub24oJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG5cbiAgICAvLyBQYWdpbmF0aW9uXG4gICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCkge1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uJGVsLm9uKCdrZXlkb3duJywgYC4ke3N3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzc31gLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLmExMXkubGl2ZVJlZ2lvbiAmJiBzd2lwZXIuYTExeS5saXZlUmVnaW9uLmxlbmd0aCA+IDApIHN3aXBlci5hMTF5LmxpdmVSZWdpb24ucmVtb3ZlKCk7XG5cbiAgICBsZXQgJG5leHRFbDtcbiAgICBsZXQgJHByZXZFbDtcbiAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkge1xuICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XG4gICAgfVxuICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSB7XG4gICAgICAkcHJldkVsID0gc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbDtcbiAgICB9XG4gICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgICRuZXh0RWwub2ZmKCdrZXlkb3duJywgc3dpcGVyLmExMXkub25FbnRlcktleSk7XG4gICAgfVxuICAgIGlmICgkcHJldkVsKSB7XG4gICAgICAkcHJldkVsLm9mZigna2V5ZG93bicsIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgIH1cblxuICAgIC8vIFBhZ2luYXRpb25cbiAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoKSB7XG4gICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwub2ZmKCdrZXlkb3duJywgYC4ke3N3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzc31gLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYTExeScsXG4gIHBhcmFtczoge1xuICAgIGExMXk6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdzd2lwZXItbm90aWZpY2F0aW9uJyxcbiAgICAgIHByZXZTbGlkZU1lc3NhZ2U6ICdQcmV2aW91cyBzbGlkZScsXG4gICAgICBuZXh0U2xpZGVNZXNzYWdlOiAnTmV4dCBzbGlkZScsXG4gICAgICBmaXJzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGZpcnN0IHNsaWRlJyxcbiAgICAgIGxhc3RTbGlkZU1lc3NhZ2U6ICdUaGlzIGlzIHRoZSBsYXN0IHNsaWRlJyxcbiAgICAgIHBhZ2luYXRpb25CdWxsZXRNZXNzYWdlOiAnR28gdG8gc2xpZGUge3tpbmRleH19JyxcbiAgICB9LFxuICB9LFxuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBhMTF5OiB7XG4gICAgICAgIGxpdmVSZWdpb246ICQoYDxzcGFuIGNsYXNzPVwiJHtzd2lwZXIucGFyYW1zLmExMXkubm90aWZpY2F0aW9uQ2xhc3N9XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCI+PC9zcGFuPmApLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhhMTF5KS5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG4gICAgICBzd2lwZXIuYTExeVttZXRob2ROYW1lXSA9IGExMXlbbWV0aG9kTmFtZV0uYmluZChzd2lwZXIpO1xuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgc3dpcGVyLmExMXkuaW5pdCgpO1xuICAgICAgc3dpcGVyLmExMXkudXBkYXRlTmF2aWdhdGlvbigpO1xuICAgIH0sXG4gICAgdG9FZGdlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgIHN3aXBlci5hMTF5LnVwZGF0ZU5hdmlnYXRpb24oKTtcbiAgICB9LFxuICAgIGZyb21FZGdlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgIHN3aXBlci5hMTF5LnVwZGF0ZU5hdmlnYXRpb24oKTtcbiAgICB9LFxuICAgIHBhZ2luYXRpb25VcGRhdGUoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgc3dpcGVyLmExMXkudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgIH0sXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSByZXR1cm47XG4gICAgICBzd2lwZXIuYTExeS5kZXN0cm95KCk7XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyB3aW5kb3cgfSBmcm9tICdzc3Itd2luZG93JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IEhpc3RvcnkgPSB7XG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuaGlzdG9yeSkgcmV0dXJuO1xuICAgIGlmICghd2luZG93Lmhpc3RvcnkgfHwgIXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhpc3RvcnkgPSBzd2lwZXIuaGlzdG9yeTtcbiAgICBoaXN0b3J5LmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBoaXN0b3J5LnBhdGhzID0gSGlzdG9yeS5nZXRQYXRoVmFsdWVzKCk7XG4gICAgaWYgKCFoaXN0b3J5LnBhdGhzLmtleSAmJiAhaGlzdG9yeS5wYXRocy52YWx1ZSkgcmV0dXJuO1xuICAgIGhpc3Rvcnkuc2Nyb2xsVG9TbGlkZSgwLCBoaXN0b3J5LnBhdGhzLnZhbHVlLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBzd2lwZXIuaGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUpO1xuICAgIH1cbiAgfSxcbiAgZGVzdHJveSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc3dpcGVyLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICB9XG4gIH0sXG4gIHNldEhpc3RvcnlQb3BTdGF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIHN3aXBlci5oaXN0b3J5LnBhdGhzID0gSGlzdG9yeS5nZXRQYXRoVmFsdWVzKCk7XG4gICAgc3dpcGVyLmhpc3Rvcnkuc2Nyb2xsVG9TbGlkZShzd2lwZXIucGFyYW1zLnNwZWVkLCBzd2lwZXIuaGlzdG9yeS5wYXRocy52YWx1ZSwgZmFsc2UpO1xuICB9LFxuICBnZXRQYXRoVmFsdWVzKCkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKS5zcGxpdCgnLycpLmZpbHRlcihwYXJ0ID0+IHBhcnQgIT09ICcnKTtcbiAgICBjb25zdCB0b3RhbCA9IHBhdGhBcnJheS5sZW5ndGg7XG4gICAgY29uc3Qga2V5ID0gcGF0aEFycmF5W3RvdGFsIC0gMl07XG4gICAgY29uc3QgdmFsdWUgPSBwYXRoQXJyYXlbdG90YWwgLSAxXTtcbiAgICByZXR1cm4geyBrZXksIHZhbHVlIH07XG4gIH0sXG4gIHNldEhpc3Rvcnkoa2V5LCBpbmRleCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIuaGlzdG9yeS5pbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHJldHVybjtcbiAgICBjb25zdCBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xuICAgIGxldCB2YWx1ZSA9IEhpc3Rvcnkuc2x1Z2lmeShzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKSk7XG4gICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgdmFsdWUgPSBgJHtrZXl9LyR7dmFsdWV9YDtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gd2luZG93Lmhpc3Rvcnkuc3RhdGU7XG4gICAgaWYgKGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyB2YWx1ZSB9LCBudWxsLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IHZhbHVlIH0sIG51bGwsIHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIHNsdWdpZnkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKVxuICAgICAgLnJlcGxhY2UoL1teXFx3LV0rL2csICcnKVxuICAgICAgLnJlcGxhY2UoLy0tKy9nLCAnLScpXG4gICAgICAucmVwbGFjZSgvXi0rLywgJycpXG4gICAgICAucmVwbGFjZSgvLSskLywgJycpO1xuICB9LFxuICBzY3JvbGxUb1NsaWRlKHNwZWVkLCB2YWx1ZSwgcnVuQ2FsbGJhY2tzKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgY29uc3Qgc2xpZGVIaXN0b3J5ID0gSGlzdG9yeS5zbHVnaWZ5KHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpKTtcbiAgICAgICAgaWYgKHNsaWRlSGlzdG9yeSA9PT0gdmFsdWUgJiYgIXNsaWRlLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNsaWRlLmluZGV4KCk7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKDAsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2hpc3RvcnknLFxuICBwYXJhbXM6IHtcbiAgICBoaXN0b3J5OiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogZmFsc2UsXG4gICAgICBrZXk6ICdzbGlkZXMnLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHtcbiAgICAgICAgaW5pdDogSGlzdG9yeS5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0SGlzdG9yeTogSGlzdG9yeS5zZXRIaXN0b3J5LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0SGlzdG9yeVBvcFN0YXRlOiBIaXN0b3J5LnNldEhpc3RvcnlQb3BTdGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNjcm9sbFRvU2xpZGU6IEhpc3Rvcnkuc2Nyb2xsVG9TbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IEhpc3RvcnkuZGVzdHJveS5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5oaXN0b3J5LmluaXQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5oaXN0b3J5LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5oaXN0b3J5LmluaXRpYWxpemVkKSB7XG4gICAgICAgIHN3aXBlci5oaXN0b3J5LnNldEhpc3Rvcnkoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmtleSwgc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCB7IHdpbmRvdywgZG9jdW1lbnQgfSBmcm9tICdzc3Itd2luZG93JztcbmltcG9ydCAkIGZyb20gJy4uLy4uL3V0aWxzL2RvbSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5jb25zdCBIYXNoTmF2aWdhdGlvbiA9IHtcbiAgb25IYXNoQ2FuZ2UoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBuZXdIYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICAgIGNvbnN0IGFjdGl2ZVNsaWRlSGFzaCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKTtcbiAgICBpZiAobmV3SGFzaCAhPT0gYWN0aXZlU2xpZGVIYXNoKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLWhhc2g9XCIke25ld0hhc2h9XCJdYCkuaW5kZXgoKSk7XG4gICAgfVxuICB9LFxuICBzZXRIYXNoKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQgfHwgIXN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCkgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLnJlcGxhY2VTdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCAoYCMke3N3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKX1gIHx8ICcnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgY29uc3QgaGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9IGhhc2ggfHwgJyc7XG4gICAgfVxuICB9LFxuICBpbml0KCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQgfHwgKHN3aXBlci5wYXJhbXMuaGlzdG9yeSAmJiBzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCkpIHJldHVybjtcbiAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgaWYgKGhhc2gpIHtcbiAgICAgIGNvbnN0IHNwZWVkID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgY29uc3Qgc2xpZGVIYXNoID0gc2xpZGUuYXR0cignZGF0YS1oYXNoJykgfHwgc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5Jyk7XG4gICAgICAgIGlmIChzbGlkZUhhc2ggPT09IGhhc2ggJiYgIXNsaWRlLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNsaWRlLmluZGV4KCk7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSkge1xuICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlKTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi53YXRjaFN0YXRlKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdoYXNoY2hhbmdlJywgc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlKTtcbiAgICB9XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGFzaC1uYXZpZ2F0aW9uJyxcbiAgcGFyYW1zOiB7XG4gICAgaGFzaE5hdmlnYXRpb246IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgcmVwbGFjZVN0YXRlOiBmYWxzZSxcbiAgICAgIHdhdGNoU3RhdGU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGhhc2hOYXZpZ2F0aW9uOiB7XG4gICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgaW5pdDogSGFzaE5hdmlnYXRpb24uaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IEhhc2hOYXZpZ2F0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRIYXNoOiBIYXNoTmF2aWdhdGlvbi5zZXRIYXNoLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25IYXNoQ2FuZ2U6IEhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgaW5pdCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCkge1xuICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uc2V0SGFzaCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgQXV0b3BsYXkgPSB7XG4gIHJ1bigpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0ICRhY3RpdmVTbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgIGxldCBkZWxheSA9IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgaWYgKCRhY3RpdmVTbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JykpIHtcbiAgICAgIGRlbGF5ID0gJGFjdGl2ZVNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItYXV0b3BsYXknKSB8fCBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgIH1cbiAgICBzd2lwZXIuYXV0b3BsYXkudGltZW91dCA9IFV0aWxzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnJldmVyc2VEaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlUHJldihzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlUHJldihzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oMCwgc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgIH1cbiAgICB9LCBkZWxheSk7XG4gIH0sXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiBzd2lwZXIuYXV0b3BsYXkudGltZW91dCAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybiBmYWxzZTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IHRydWU7XG4gICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5U3RhcnQnKTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucnVuKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHN0b3AoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiBzd2lwZXIuYXV0b3BsYXkudGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChzd2lwZXIuYXV0b3BsYXkudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5hdXRvcGxheS50aW1lb3V0KTtcbiAgICAgIHN3aXBlci5hdXRvcGxheS50aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IGZhbHNlO1xuICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheVN0b3AnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgcGF1c2Uoc3BlZWQpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIuYXV0b3BsYXkudGltZW91dCkgY2xlYXJUaW1lb3V0KHN3aXBlci5hdXRvcGxheS50aW1lb3V0KTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID0gdHJ1ZTtcbiAgICBpZiAoc3BlZWQgPT09IDAgfHwgIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkud2FpdEZvclRyYW5zaXRpb24pIHtcbiAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2F1dG9wbGF5JyxcbiAgcGFyYW1zOiB7XG4gICAgYXV0b3BsYXk6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgZGVsYXk6IDMwMDAsXG4gICAgICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZSxcbiAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiB0cnVlLFxuICAgICAgc3RvcE9uTGFzdFNsaWRlOiBmYWxzZSxcbiAgICAgIHJldmVyc2VEaXJlY3Rpb246IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGF1dG9wbGF5OiB7XG4gICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgICBydW46IEF1dG9wbGF5LnJ1bi5iaW5kKHN3aXBlciksXG4gICAgICAgIHN0YXJ0OiBBdXRvcGxheS5zdGFydC5iaW5kKHN3aXBlciksXG4gICAgICAgIHN0b3A6IEF1dG9wbGF5LnN0b3AuYmluZChzd2lwZXIpLFxuICAgICAgICBwYXVzZTogQXV0b3BsYXkucGF1c2UuYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBiZWZvcmVUcmFuc2l0aW9uU3RhcnQoc3BlZWQsIGludGVybmFsKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgIGlmIChpbnRlcm5hbCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZShzcGVlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2xpZGVyRmlyc3RNb3ZlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5jb25zdCBGYWRlID0ge1xuICBzZXRUcmFuc2xhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7IHNsaWRlcyB9ID0gc3dpcGVyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCAkc2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XG4gICAgICBjb25zdCBvZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgIGxldCB0eCA9IC1vZmZzZXQ7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkgdHggLT0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgIGxldCB0eSA9IDA7XG4gICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICB0eSA9IHR4O1xuICAgICAgICB0eCA9IDA7XG4gICAgICB9XG4gICAgICBjb25zdCBzbGlkZU9wYWNpdHkgPSBzd2lwZXIucGFyYW1zLmZhZGVFZmZlY3QuY3Jvc3NGYWRlID9cbiAgICAgICAgTWF0aC5tYXgoMSAtIE1hdGguYWJzKCRzbGlkZUVsWzBdLnByb2dyZXNzKSwgMCkgOlxuICAgICAgICAxICsgTWF0aC5taW4oTWF0aC5tYXgoJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICAkc2xpZGVFbFxuICAgICAgICAuY3NzKHtcbiAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHksXG4gICAgICAgIH0pXG4gICAgICAgIC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7dHh9cHgsICR7dHl9cHgsIDBweClgKTtcbiAgICB9XG4gIH0sXG4gIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHsgc2xpZGVzLCAkd3JhcHBlckVsIH0gPSBzd2lwZXI7XG4gICAgc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgJiYgZHVyYXRpb24gIT09IDApIHtcbiAgICAgIGxldCBldmVudFRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgc2xpZGVzLnRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHJldHVybjtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJ107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpZ2dlckV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICR3cmFwcGVyRWwudHJpZ2dlcih0cmlnZ2VyRXZlbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZWZmZWN0LWZhZGUnLFxuICBwYXJhbXM6IHtcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGZhZGVFZmZlY3Q6IHtcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBGYWRlLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zaXRpb246IEZhZGUuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGJlZm9yZUluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmFkZScpIHJldHVybjtcbiAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWZhZGVgKTtcbiAgICAgIGNvbnN0IG92ZXJ3cml0ZVBhcmFtcyA9IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmYWRlJykgcmV0dXJuO1xuICAgICAgc3dpcGVyLmZhZGVFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmFkZScpIHJldHVybjtcbiAgICAgIHN3aXBlci5mYWRlRWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5pbXBvcnQgQnJvd3NlciBmcm9tICcuLi8uLi91dGlscy9icm93c2VyJztcblxuY29uc3QgQ3ViZSA9IHtcbiAgc2V0VHJhbnNsYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgJGVsLCAkd3JhcHBlckVsLCBzbGlkZXMsIHdpZHRoOiBzd2lwZXJXaWR0aCwgaGVpZ2h0OiBzd2lwZXJIZWlnaHQsIHJ0bCwgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdDtcbiAgICBjb25zdCBpc0hvcml6b250YWwgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gICAgbGV0IHdyYXBwZXJSb3RhdGUgPSAwO1xuICAgIGxldCAkY3ViZVNoYWRvd0VsO1xuICAgIGlmIChwYXJhbXMuc2hhZG93KSB7XG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICRjdWJlU2hhZG93RWwgPSAkd3JhcHBlckVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcbiAgICAgICAgaWYgKCRjdWJlU2hhZG93RWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAkd3JhcHBlckVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcbiAgICAgICAgfVxuICAgICAgICAkY3ViZVNoYWRvd0VsLmNzcyh7IGhlaWdodDogYCR7c3dpcGVyV2lkdGh9cHhgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICRlbC5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93Jyk7XG4gICAgICAgIGlmICgkY3ViZVNoYWRvd0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWN1YmUtc2hhZG93XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgJGVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgJHNsaWRlRWwgPSBzbGlkZXMuZXEoaSk7XG4gICAgICBsZXQgc2xpZGVJbmRleCA9IGk7XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIHNsaWRlSW5kZXggPSBwYXJzZUludCgkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgICB9XG4gICAgICBsZXQgc2xpZGVBbmdsZSA9IHNsaWRlSW5kZXggKiA5MDtcbiAgICAgIGxldCByb3VuZCA9IE1hdGguZmxvb3Ioc2xpZGVBbmdsZSAvIDM2MCk7XG4gICAgICBpZiAocnRsKSB7XG4gICAgICAgIHNsaWRlQW5nbGUgPSAtc2xpZGVBbmdsZTtcbiAgICAgICAgcm91bmQgPSBNYXRoLmZsb29yKC1zbGlkZUFuZ2xlIC8gMzYwKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICBsZXQgdHggPSAwO1xuICAgICAgbGV0IHR5ID0gMDtcbiAgICAgIGxldCB0eiA9IDA7XG4gICAgICBpZiAoc2xpZGVJbmRleCAlIDQgPT09IDApIHtcbiAgICAgICAgdHggPSAtcm91bmQgKiA0ICogc3dpcGVyU2l6ZTtcbiAgICAgICAgdHogPSAwO1xuICAgICAgfSBlbHNlIGlmICgoc2xpZGVJbmRleCAtIDEpICUgNCA9PT0gMCkge1xuICAgICAgICB0eCA9IDA7XG4gICAgICAgIHR6ID0gLXJvdW5kICogNCAqIHN3aXBlclNpemU7XG4gICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMikgJSA0ID09PSAwKSB7XG4gICAgICAgIHR4ID0gc3dpcGVyU2l6ZSArIChyb3VuZCAqIDQgKiBzd2lwZXJTaXplKTtcbiAgICAgICAgdHogPSBzd2lwZXJTaXplO1xuICAgICAgfSBlbHNlIGlmICgoc2xpZGVJbmRleCAtIDMpICUgNCA9PT0gMCkge1xuICAgICAgICB0eCA9IC1zd2lwZXJTaXplO1xuICAgICAgICB0eiA9ICgzICogc3dpcGVyU2l6ZSkgKyAoc3dpcGVyU2l6ZSAqIDQgKiByb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAocnRsKSB7XG4gICAgICAgIHR4ID0gLXR4O1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzSG9yaXpvbnRhbCkge1xuICAgICAgICB0eSA9IHR4O1xuICAgICAgICB0eCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGByb3RhdGVYKCR7aXNIb3Jpem9udGFsID8gMCA6IC1zbGlkZUFuZ2xlfWRlZykgcm90YXRlWSgke2lzSG9yaXpvbnRhbCA/IHNsaWRlQW5nbGUgOiAwfWRlZykgdHJhbnNsYXRlM2QoJHt0eH1weCwgJHt0eX1weCwgJHt0en1weClgO1xuICAgICAgaWYgKHByb2dyZXNzIDw9IDEgJiYgcHJvZ3Jlc3MgPiAtMSkge1xuICAgICAgICB3cmFwcGVyUm90YXRlID0gKHNsaWRlSW5kZXggKiA5MCkgKyAocHJvZ3Jlc3MgKiA5MCk7XG4gICAgICAgIGlmIChydGwpIHdyYXBwZXJSb3RhdGUgPSAoLXNsaWRlSW5kZXggKiA5MCkgLSAocHJvZ3Jlc3MgKiA5MCk7XG4gICAgICB9XG4gICAgICAkc2xpZGVFbC50cmFuc2Zvcm0odHJhbnNmb3JtKTtcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgIGxldCBzaGFkb3dCZWZvcmUgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgbGV0IHNoYWRvd0FmdGVyID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNoYWRvd0JlZm9yZSA9ICQoYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LSR7aXNIb3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCd9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0JlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNoYWRvd0FmdGVyID0gJChgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJHtpc0hvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbSd9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCkgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApO1xuICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgfVxuICAgIH1cbiAgICAkd3JhcHBlckVsLmNzcyh7XG4gICAgICAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luJzogYDUwJSA1MCUgLSR7c3dpcGVyU2l6ZSAvIDJ9cHhgLFxuICAgICAgJy1tb3otdHJhbnNmb3JtLW9yaWdpbic6IGA1MCUgNTAlIC0ke3N3aXBlclNpemUgLyAyfXB4YCxcbiAgICAgICctbXMtdHJhbnNmb3JtLW9yaWdpbic6IGA1MCUgNTAlIC0ke3N3aXBlclNpemUgLyAyfXB4YCxcbiAgICAgICd0cmFuc2Zvcm0tb3JpZ2luJzogYDUwJSA1MCUgLSR7c3dpcGVyU2l6ZSAvIDJ9cHhgLFxuICAgIH0pO1xuXG4gICAgaWYgKHBhcmFtcy5zaGFkb3cpIHtcbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgJGN1YmVTaGFkb3dFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDBweCwgJHsoc3dpcGVyV2lkdGggLyAyKSArIHBhcmFtcy5zaGFkb3dPZmZzZXR9cHgsICR7LXN3aXBlcldpZHRoIC8gMn1weCkgcm90YXRlWCg5MGRlZykgcm90YXRlWigwZGVnKSBzY2FsZSgke3BhcmFtcy5zaGFkb3dTY2FsZX0pYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzaGFkb3dBbmdsZSA9IE1hdGguYWJzKHdyYXBwZXJSb3RhdGUpIC0gKE1hdGguZmxvb3IoTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLyA5MCkgKiA5MCk7XG4gICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxLjUgLSAoXG4gICAgICAgICAgKE1hdGguc2luKChzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJKSAvIDM2MCkgLyAyKSArXG4gICAgICAgICAgKE1hdGguY29zKChzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJKSAvIDM2MCkgLyAyKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzY2FsZTEgPSBwYXJhbXMuc2hhZG93U2NhbGU7XG4gICAgICAgIGNvbnN0IHNjYWxlMiA9IHBhcmFtcy5zaGFkb3dTY2FsZSAvIG11bHRpcGxpZXI7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHBhcmFtcy5zaGFkb3dPZmZzZXQ7XG4gICAgICAgICRjdWJlU2hhZG93RWwudHJhbnNmb3JtKGBzY2FsZTNkKCR7c2NhbGUxfSwgMSwgJHtzY2FsZTJ9KSB0cmFuc2xhdGUzZCgwcHgsICR7KHN3aXBlckhlaWdodCAvIDIpICsgb2Zmc2V0fXB4LCAkey1zd2lwZXJIZWlnaHQgLyAyIC8gc2NhbGUyfXB4KSByb3RhdGVYKC05MGRlZylgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgekZhY3RvciA9IChCcm93c2VyLmlzU2FmYXJpIHx8IEJyb3dzZXIuaXNVaVdlYlZpZXcpID8gKC1zd2lwZXJTaXplIC8gMikgOiAwO1xuICAgICR3cmFwcGVyRWxcbiAgICAgIC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDBweCwwLCR7ekZhY3Rvcn1weCkgcm90YXRlWCgke3N3aXBlci5pc0hvcml6b250YWwoKSA/IDAgOiB3cmFwcGVyUm90YXRlfWRlZykgcm90YXRlWSgke3N3aXBlci5pc0hvcml6b250YWwoKSA/IC13cmFwcGVyUm90YXRlIDogMH1kZWcpYCk7XG4gIH0sXG4gIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHsgJGVsLCBzbGlkZXMgfSA9IHN3aXBlcjtcbiAgICBzbGlkZXNcbiAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKVxuICAgICAgLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpXG4gICAgICAudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdC5zaGFkb3cgJiYgIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgJGVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdlZmZlY3QtY3ViZScsXG4gIHBhcmFtczoge1xuICAgIGN1YmVFZmZlY3Q6IHtcbiAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgIHNoYWRvdzogdHJ1ZSxcbiAgICAgIHNoYWRvd09mZnNldDogMjAsXG4gICAgICBzaGFkb3dTY2FsZTogMC45NCxcbiAgICB9LFxuICB9LFxuICBjcmVhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBjdWJlRWZmZWN0OiB7XG4gICAgICAgIHNldFRyYW5zbGF0ZTogQ3ViZS5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBDdWJlLnNldFRyYW5zaXRpb24uYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBiZWZvcmVJbml0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2N1YmUnKSByZXR1cm47XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31jdWJlYCk7XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30zZGApO1xuICAgICAgY29uc3Qgb3ZlcndyaXRlUGFyYW1zID0ge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICBzbGlkZXNQZXJDb2x1bW46IDEsXG4gICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICByZXNpc3RhbmNlUmF0aW86IDAsXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjdWJlJykgcmV0dXJuO1xuICAgICAgc3dpcGVyLmN1YmVFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY3ViZScpIHJldHVybjtcbiAgICAgIHN3aXBlci5jdWJlRWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IEZsaXAgPSB7XG4gIHNldFRyYW5zbGF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHsgc2xpZGVzIH0gPSBzd2lwZXI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0ICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgbGV0IHByb2dyZXNzID0gJHNsaWRlRWxbMF0ucHJvZ3Jlc3M7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0LmxpbWl0Um90YXRpb24pIHtcbiAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigkc2xpZGVFbFswXS5wcm9ncmVzcywgMSksIC0xKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgY29uc3Qgcm90YXRlID0gLTE4MCAqIHByb2dyZXNzO1xuICAgICAgbGV0IHJvdGF0ZVkgPSByb3RhdGU7XG4gICAgICBsZXQgcm90YXRlWCA9IDA7XG4gICAgICBsZXQgdHggPSAtb2Zmc2V0O1xuICAgICAgbGV0IHR5ID0gMDtcbiAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIHR5ID0gdHg7XG4gICAgICAgIHR4ID0gMDtcbiAgICAgICAgcm90YXRlWCA9IC1yb3RhdGVZO1xuICAgICAgICByb3RhdGVZID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnJ0bCkge1xuICAgICAgICByb3RhdGVZID0gLXJvdGF0ZVk7XG4gICAgICB9XG5cbiAgICAgICRzbGlkZUVsWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHByb2dyZXNzKSkgKyBzbGlkZXMubGVuZ3RoO1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0LnNsaWRlU2hhZG93cykge1xuICAgICAgICAvLyBTZXQgc2hhZG93c1xuICAgICAgICBsZXQgc2hhZG93QmVmb3JlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgIGxldCBzaGFkb3dBZnRlciA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKGA8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0ke3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnfVwiPjwvZGl2PmApO1xuICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dBZnRlciA9ICQoYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LSR7c3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nfVwiPjwvZGl2PmApO1xuICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dBZnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTtcbiAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgc2hhZG93QWZ0ZXJbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KHByb2dyZXNzLCAwKTtcbiAgICAgIH1cbiAgICAgICRzbGlkZUVsXG4gICAgICAgIC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7dHh9cHgsICR7dHl9cHgsIDBweCkgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKSByb3RhdGVZKCR7cm90YXRlWX1kZWcpYCk7XG4gICAgfVxuICB9LFxuICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7IHNsaWRlcywgYWN0aXZlSW5kZXgsICR3cmFwcGVyRWwgfSA9IHN3aXBlcjtcbiAgICBzbGlkZXNcbiAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKVxuICAgICAgLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpXG4gICAgICAudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSAmJiBkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgbGV0IGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHNsaWRlcy5lcShhY3RpdmVJbmRleCkudHJhbnNpdGlvbkVuZChmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQoKSB7XG4gICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIC8vIGlmICghJCh0aGlzKS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpKSByZXR1cm47XG4gICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gWyd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ3RyYW5zaXRpb25lbmQnXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlnZ2VyRXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgJHdyYXBwZXJFbC50cmlnZ2VyKHRyaWdnZXJFdmVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdlZmZlY3QtZmxpcCcsXG4gIHBhcmFtczoge1xuICAgIGZsaXBFZmZlY3Q6IHtcbiAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgIGxpbWl0Um90YXRpb246IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgZmxpcEVmZmVjdDoge1xuICAgICAgICBzZXRUcmFuc2xhdGU6IEZsaXAuc2V0VHJhbnNsYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbjogRmxpcC5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgYmVmb3JlSW5pdCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmbGlwJykgcmV0dXJuO1xuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9ZmxpcGApO1xuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9M2RgKTtcbiAgICAgIGNvbnN0IG92ZXJ3cml0ZVBhcmFtcyA9IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmbGlwJykgcmV0dXJuO1xuICAgICAgc3dpcGVyLmZsaXBFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmxpcCcpIHJldHVybjtcbiAgICAgIHN3aXBlci5mbGlwRWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi4vLi4vdXRpbHMvZG9tJztcbmltcG9ydCBTdXBwb3J0IGZyb20gJy4uLy4uL3V0aWxzL3N1cHBvcnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgQ292ZXJmbG93ID0ge1xuICBzZXRUcmFuc2xhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICB3aWR0aDogc3dpcGVyV2lkdGgsIGhlaWdodDogc3dpcGVySGVpZ2h0LCBzbGlkZXMsICR3cmFwcGVyRWwsIHNsaWRlc1NpemVzR3JpZCxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuY292ZXJmbG93RWZmZWN0O1xuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgIGNvbnN0IGNlbnRlciA9IGlzSG9yaXpvbnRhbCA/IC10cmFuc2Zvcm0gKyAoc3dpcGVyV2lkdGggLyAyKSA6IC10cmFuc2Zvcm0gKyAoc3dpcGVySGVpZ2h0IC8gMik7XG4gICAgY29uc3Qgcm90YXRlID0gaXNIb3Jpem9udGFsID8gcGFyYW1zLnJvdGF0ZSA6IC1wYXJhbXMucm90YXRlO1xuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHBhcmFtcy5kZXB0aDtcbiAgICAvLyBFYWNoIHNsaWRlIG9mZnNldCBmcm9tIGNlbnRlclxuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0ICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgY29uc3Qgc2xpZGVTaXplID0gc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgICAgY29uc3Qgc2xpZGVPZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgIGNvbnN0IG9mZnNldE11bHRpcGxpZXIgPSAoKGNlbnRlciAtIHNsaWRlT2Zmc2V0IC0gKHNsaWRlU2l6ZSAvIDIpKSAvIHNsaWRlU2l6ZSkgKiBwYXJhbXMubW9kaWZpZXI7XG5cbiAgICAgIGxldCByb3RhdGVZID0gaXNIb3Jpem9udGFsID8gcm90YXRlICogb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICBsZXQgcm90YXRlWCA9IGlzSG9yaXpvbnRhbCA/IDAgOiByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyO1xuICAgICAgLy8gdmFyIHJvdGF0ZVogPSAwXG4gICAgICBsZXQgdHJhbnNsYXRlWiA9IC10cmFuc2xhdGUgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTtcblxuICAgICAgbGV0IHRyYW5zbGF0ZVkgPSBpc0hvcml6b250YWwgPyAwIDogcGFyYW1zLnN0cmV0Y2ggKiAob2Zmc2V0TXVsdGlwbGllcik7XG4gICAgICBsZXQgdHJhbnNsYXRlWCA9IGlzSG9yaXpvbnRhbCA/IHBhcmFtcy5zdHJldGNoICogKG9mZnNldE11bHRpcGxpZXIpIDogMDtcblxuICAgICAgLy8gRml4IGZvciB1bHRyYSBzbWFsbCB2YWx1ZXNcbiAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVYKSA8IDAuMDAxKSB0cmFuc2xhdGVYID0gMDtcbiAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVZKSA8IDAuMDAxKSB0cmFuc2xhdGVZID0gMDtcbiAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVaKSA8IDAuMDAxKSB0cmFuc2xhdGVaID0gMDtcbiAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVZKSA8IDAuMDAxKSByb3RhdGVZID0gMDtcbiAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVYKSA8IDAuMDAxKSByb3RhdGVYID0gMDtcblxuICAgICAgY29uc3Qgc2xpZGVUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGVYfXB4LCR7dHJhbnNsYXRlWX1weCwke3RyYW5zbGF0ZVp9cHgpICByb3RhdGVYKCR7cm90YXRlWH1kZWcpIHJvdGF0ZVkoJHtyb3RhdGVZfWRlZylgO1xuXG4gICAgICAkc2xpZGVFbC50cmFuc2Zvcm0oc2xpZGVUcmFuc2Zvcm0pO1xuICAgICAgJHNsaWRlRWxbMF0uc3R5bGUuekluZGV4ID0gLU1hdGguYWJzKE1hdGgucm91bmQob2Zmc2V0TXVsdGlwbGllcikpICsgMTtcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgIGxldCAkc2hhZG93QmVmb3JlRWwgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgbGV0ICRzaGFkb3dBZnRlckVsID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuICAgICAgICBpZiAoJHNoYWRvd0JlZm9yZUVsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRzaGFkb3dCZWZvcmVFbCA9ICQoYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LSR7aXNIb3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCd9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKCRzaGFkb3dCZWZvcmVFbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRzaGFkb3dBZnRlckVsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRzaGFkb3dBZnRlckVsID0gJChgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJHtpc0hvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbSd9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKCRzaGFkb3dBZnRlckVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHNoYWRvd0JlZm9yZUVsLmxlbmd0aCkgJHNoYWRvd0JlZm9yZUVsWzBdLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXRNdWx0aXBsaWVyID4gMCA/IG9mZnNldE11bHRpcGxpZXIgOiAwO1xuICAgICAgICBpZiAoJHNoYWRvd0FmdGVyRWwubGVuZ3RoKSAkc2hhZG93QWZ0ZXJFbFswXS5zdHlsZS5vcGFjaXR5ID0gKC1vZmZzZXRNdWx0aXBsaWVyKSA+IDAgPyAtb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvcnJlY3QgcGVyc3BlY3RpdmUgZm9yIElFMTBcbiAgICBpZiAoU3VwcG9ydC5wb2ludGVyRXZlbnRzIHx8IFN1cHBvcnQucHJlZml4ZWRQb2ludGVyRXZlbnRzKSB7XG4gICAgICBjb25zdCB3cyA9ICR3cmFwcGVyRWxbMF0uc3R5bGU7XG4gICAgICB3cy5wZXJzcGVjdGl2ZU9yaWdpbiA9IGAke2NlbnRlcn1weCA1MCVgO1xuICAgIH1cbiAgfSxcbiAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgc3dpcGVyLnNsaWRlc1xuICAgICAgLnRyYW5zaXRpb24oZHVyYXRpb24pXG4gICAgICAuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JylcbiAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2VmZmVjdC1jb3ZlcmZsb3cnLFxuICBwYXJhbXM6IHtcbiAgICBjb3ZlcmZsb3dFZmZlY3Q6IHtcbiAgICAgIHJvdGF0ZTogNTAsXG4gICAgICBzdHJldGNoOiAwLFxuICAgICAgZGVwdGg6IDEwMCxcbiAgICAgIG1vZGlmaWVyOiAxLFxuICAgICAgc2xpZGVTaGFkb3dzOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGNvdmVyZmxvd0VmZmVjdDoge1xuICAgICAgICBzZXRUcmFuc2xhdGU6IENvdmVyZmxvdy5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBDb3ZlcmZsb3cuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGJlZm9yZUluaXQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY292ZXJmbG93JykgcmV0dXJuO1xuXG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31jb3ZlcmZsb3dgKTtcbiAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfTNkYCk7XG5cbiAgICAgIHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgfSxcbiAgICBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY292ZXJmbG93JykgcmV0dXJuO1xuICAgICAgc3dpcGVyLmNvdmVyZmxvd0VmZmVjdC5zZXRUcmFuc2xhdGUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjb3ZlcmZsb3cnKSByZXR1cm47XG4gICAgICBzd2lwZXIuY292ZXJmbG93RWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiLy8gU3dpcGVyIENsYXNzXG5pbXBvcnQgU3dpcGVyIGZyb20gJy4vY29tcG9uZW50cy9jb3JlL2NvcmUtY2xhc3MnO1xuXG4vLyBDb3JlIE1vZHVsZXNcbmltcG9ydCBEZXZpY2UgZnJvbSAnLi9tb2R1bGVzL2RldmljZS9kZXZpY2UnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi9tb2R1bGVzL3N1cHBvcnQvc3VwcG9ydCc7XG5pbXBvcnQgQnJvd3NlciBmcm9tICcuL21vZHVsZXMvYnJvd3Nlci9icm93c2VyJztcbmltcG9ydCBSZXNpemUgZnJvbSAnLi9tb2R1bGVzL3Jlc2l6ZS9yZXNpemUnO1xuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vbW9kdWxlcy9vYnNlcnZlci9vYnNlcnZlcic7XG5cbi8vSU1QT1JUX0NPTVBPTkVOVFNcblxuY29uc3QgY29tcG9uZW50cyA9IFtcbiAgRGV2aWNlLFxuICBTdXBwb3J0LFxuICBCcm93c2VyLFxuICBSZXNpemUsXG4gIE9ic2VydmVyLFxuICAvL0lOU1RBTExfQ09NUE9ORU5UU1xuXTtcblxuaWYgKHR5cGVvZiBTd2lwZXIudXNlID09PSAndW5kZWZpbmVkJykge1xuICBTd2lwZXIudXNlID0gU3dpcGVyLkNsYXNzLnVzZTtcbiAgU3dpcGVyLmluc3RhbGxNb2R1bGUgPSBTd2lwZXIuQ2xhc3MuaW5zdGFsbE1vZHVsZTtcbn1cblxuU3dpcGVyLnVzZShjb21wb25lbnRzKTtcblxuLy9FWFBPUlRcbiJdLCJuYW1lcyI6WyJsZXQiLCIkIiwiY29uc3QiLCJkb2N1bWVudCIsIndpbmRvdyIsInRoaXMiLCJhcmd1bWVudHMiLCJrIiwiaSIsInRyYW5zaXRpb25FbmQiLCJzbGlkZUNoYW5nZWQiLCJ0cmFuc2l0aW9uIiwiY2hlY2tPdmVyZmxvdyIsIlN3aXBlciIsInN1cGVyIiwiU3dpcGVyQ2xhc3MiLCJzZXRUcmFuc2xhdGUiLCJEZXZpY2UiLCJTdXBwb3J0IiwiQnJvd3NlciIsIk9ic2VydmVy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O0tBQ2xGO0lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUU7TUFDL0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUssS0FBRyxDQUFDLENBQUM7S0FDbEY7OztJQUdELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxJQUFFLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUM7SUFDN0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLElBQUUsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBQztJQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBRSxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQztJQUN2RCxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQztJQUNsRixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNB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