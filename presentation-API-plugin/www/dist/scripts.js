function PresentationAvailability(connection) {
  var onAvailableChange = null;
  var availabilityValue;

  // get availability
  var callback = function(result) {
    availabilityValue = result.available;
    console.log('initial get of availabliity:', result, availabilityValue);
  };
  exec(callback, function() {
  }, 'Presentation', 'getAvailability', []);

  ////////////////////////////////////////////////////////////////////////////////////

  Object.defineProperty(this, 'onchange', {
    get: function() {
      return onAvailableChange;
    },
    set: function(eventCallback) {
      if (typeof eventCallback === 'function' || eventCallback === null || eventCallback === undefined) {
        onAvailableChange = eventCallback;
        if (onAvailableChange) {
          var callback = function(result) {
            console.log('availablityChange:', result);
            availabilityValue = result.available;
            result.connection = connection;
            if (typeof onAvailableChange === 'function') {
              var event = new PresentationConnectionAvailableEvent('connectionavailable', result);
              onAvailableChange(event);
            }
          };
          exec(callback, function() {
          }, 'Presentation', 'addWatchAvailableChange', []);
        }
        else {
          //stop the service serving screen states
          exec(function() {
          }, function() {
          }, 'Presentation', 'clearWatchAvailableChange', []);
        }
      }
    }
  });

  Object.defineProperty(this, 'value', {
    get: function() {
      return availabilityValue;
    },
    set: function(value) {
      availabilityValue = value;
    }
  });
}




var CONNECTING = 'connecting';
var CONNECTED = 'connected';
var CLOSED = 'closed';
var TERMINATED = 'terminated';

function PresentationConnection(url) {
  var id;
  var state = CLOSED;
  var url = url;

  var onconnect = function () {};
  var onclose = function () {};
  var onterminate = function () {};
  var onmessage = function () {};

  Object.defineProperty(this, 'id', {
    get: function() {
      return id;
    },
    set: function(newId) {
      id = newId;
    }
  });

  Object.defineProperty(this, 'url', {
    get: function() {
      return url;
    },
    set: function(newUrl) {
      url = newUrl;
    }
  });

  Object.defineProperty(this, 'state', {
    get: function() {
      return state;
    },
    set: function(newState) {
      state = newState;
    }
  });

  Object.defineProperty(this, 'close', {
    get: function() {
      return closeConnection(this);
    }
  });

  Object.defineProperty(this, 'terminate', {
    get: function() {
      return terminateConnection(this);
    }
  });

  Object.defineProperty(this, 'send', {
    get: function() {
      return sendMessage(this);
    }
  });

  Object.defineProperty(this, 'onmessage', {
    get: function() {
      return onmessage;
    },
    set: function(value) {
      if (typeof value === 'function' || value === null) {
        onmessage = value;
      }
    }
  });

  Object.defineProperty(this, 'onconnect', {
    get: function() {
      return onconnect;
    },
    set: function(value) {
      if (typeof value === 'function' || value === null) {
        onconnect = value;
      }
    }
  });

  Object.defineProperty(this, 'onclose', {
    get: function() {
      return onclose;
    },
    set: function(value) {
      if (typeof value === 'function' || value === null) {
        onclose = value;
      }
    }
  });

  Object.defineProperty(this, 'onterminate', {
    get: function() {
      return onterminate;
    },
    set: function(value) {
      if (typeof value === 'function' || value === null) {
        onterminate = value;
      }
    }
  });

  var sendMessage = function(connection) {
    return function(message) {
      var encodedMessage = encodeURIComponent(JSON.stringify(message));
      exec(/*successCallback*/Function, /*errorCallback*/Function, 'Presentation', 'presentationSessionPostMessage', [connection.id, encodedMessage]);
    };
  };

  var closeConnection = function(connection, message) {
    return function() {
      console.log('closing', connection);
      exec(/*successCallback*/Function, /*errorCallback*/Function, 'Presentation', 'presentationSessionClose', [connection.id, CLOSED, message]);
    };
  };

  var terminateConnection = function(connection) {
    return function() {
      exec(/*successCallback*/Function, /*errorCallback*/Function, 'Presentation', 'presentationSessionTerminate', [connection.id]);
    };
  };
}

// interface PresentationConnectionAvailableEvent ////////////////////////////

function PresentationConnectionAvailableEvent(type, eventInitDict) {
  this.type = type;
  var connection = eventInitDict.connection;
  var value = eventInitDict.available;
  Object.defineProperty(this, 'connection', {
    get: function() {
      return connection;
    }
  });
  Object.defineProperty(this, 'value', {
    get: function() {
      return value;
    }
  });
}

PresentationConnectionAvailableEvent.prototype = Event.prototype;

// interface PresentationConnectionCloseEvent ////////////////////////////

function PresentationConnectionCloseEvent(type, eventInitDict) {
  this.type = type;
  var message = eventInitDict.message;
  Object.defineProperty(this, 'message', {
    get: function() {
      return message;
    }
  });
}

PresentationConnectionCloseEvent.prototype = Event.prototype;
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

function PresentationRequest(url) {
  var requestedUrl;
  var connection;
  var buildConnectionPromise;
  var presentationAvailability;
  var onAvailableChange;

  if (!url || url === '') {
    throw new Error('URL must not be empty');
  }

  if (typeof url === 'object' && url.length > 0) {
    url = url[0];
  }

  try {
    requestedUrl = makeAbs(url);
  } catch (e) {
    throw new SyntaxError('URL is malformed');
  }

  connection = new PresentationConnection(requestedUrl);
  buildConnectionPromise = new Promise(function(resolve, reject) {
    exec(function(result) {
      connection.id = result.id;
      resolve(connection);
    }, function(error) {
      reject();
      throw new Error('Failed to build PresentationRequest', error)
    }, 'Presentation', 'requestSession', [requestedUrl]);
  });

  ///////////////////////////////////////////////////////////////////////////////

  function startPresentation() {
    return new Promise(function(resolve, reject) {
      exec(function(result) {
        setupConnection(result);
        resolve(connection);
      }, function(error) {
        console.log(error);
        reject(error);
      }, 'Presentation', 'startSession', [connection.id]);
    });
  }

  function reconnectPresentation(id) {
    var connectionId = id || connection.id;
    return new Promise(function(resolve, reject) {
      exec(function(result) {
        setupConnection(result);
        resolve(connection);
      }, function(error) {
        console.log(error);
        reject(error);
      }, 'Presentation', 'reconnectSession', [connectionId]);
    });
  }

  function setupConnection(result) {
    connection.id = result.id;
    switch (result.eventType) {
      case 'onstatechange':
        handleStateChangeEvent(connection, result);
        break;
      case 'onmessage':
        if (typeof connection.onmessage === 'function') {
          var data = decodeURIComponent(result.value);
          var message;
          try {
            message = JSON.parse(data);
          } catch (e) {
            message = data;
          }
          connection.onmessage(message);
        }
        break;
      default:
        break;
    }
  }

  function handleStateChangeEvent(connection, result) {
    connection.state = result.value;
    console.log('onstatechange', result);
    switch (result.value) {
      case 'connected':
        connection.onconnect(connection);
        break;
      case 'connecting':
        break;
      case 'closed':
        var event = new PresentationConnectionCloseEvent('close', {message: result.message});
        connection.onclose(event);
        break;
      case 'terminated':
        connection.onterminate(connection);
        connection = undefined;
        break;
      default:
        console.log('unknown connection state: ', result.value);
        break;
    }
  }

  function getPresentationAvailability() {
    presentationAvailability = new PresentationAvailability(connection);

    return new Promise(function(resolve, reject) {
      buildConnectionPromise.then(function() {
        resolve(presentationAvailability);
      }, function(error) {
        reject(error);
      });
    });
  }

  Object.defineProperty(this, 'start', {
    get: function() {
      return startPresentation;
    }
  });

  Object.defineProperty(this, 'reconnect', {
    get: function() {
      return reconnectPresentation;
    }
  });

  Object.defineProperty(this, 'getAvailability', {
    get: function() {
      return getPresentationAvailability;
    }
  });

  Object.defineProperty(this, 'onconnectionavailable', {
    get: function() {
      return onAvailableChange;
    },
    set: function(eventCallback) {
      if (typeof eventCallback === 'function' || eventCallback === null || eventCallback === undefined) {
        onAvailableChange = eventCallback;
        if (onAvailableChange) {
          var callback = function(result) {
            result.connection = connection;
            if (typeof onAvailableChange === 'function') {
              var evt = new PresentationConnectionAvailableEvent('connectionavailable', result);
              onAvailableChange(evt);
            }
          };
          exec(callback, function() {
          }, 'Presentation', 'addWatchAvailableChange', []);
        }
        else {
          //stop the service serving screen states
          exec(function() {
          }, function() {
          }, 'Presentation', 'clearWatchAvailableChange', []);
        }
      }
    }
  });
}

module.exports = PresentationRequest;
