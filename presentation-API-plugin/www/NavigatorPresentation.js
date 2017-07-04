var execRaw = require('cordova/exec'),
  cordova = require('cordova');

var makeAbs = function(url) {
  var absUrl = null;
  try {
    absUrl = new URL(url, location.href).href;
  } catch (error) {
    return error;
  }
  if (!absUrl) {
    var a = document.createElement('a');
    a.href = url;
    absUrl = a.href;
  }
  if (!absUrl) {
    absUrl = url;
  }
  return absUrl;
};

var exec = function() {
  var args = arguments;
  setTimeout(function() {
    execRaw.apply(undefined, args);
  }, 0);
};

function NavigatorPresentation() {
  var defaultRequest;
  var defaultDisplay = makeAbs('presentation/display.html');

  var c = document.getElementsByTagName('script');
  for (var i = 0; i < c.length; i++) {
    if (c[i] && c[i].src && c[i].src.indexOf('/cordova.js') != -1) {
      defaultDisplay = c[i].src.replace('/cordova.js', '/presentation/display.html');
    }
  }
  exec(/*successCallback*/Function, /*errorCallback*/Function, 'Presentation', 'setDefaultDisplay', [defaultDisplay]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  Object.defineProperty(this, 'defaultRequest', {
    get: function() {
      return defaultRequest;
    },
    set: function(value) {
      if (typeof value === 'object' || value === null) {
        defaultRequest = value;
      }
    }
  });
}

module.exports = new NavigatorPresentation();