(function(delegate) {

  var NavigatorPresentation = function() {
    console.log('receiver: NavigatorPresentation receiverside', delegate);
    var presentationReceiver = new PresentationReceiver();

    Object.defineProperty(this, 'receiver', {
      get: function() {
        return presentationReceiver;
      }
    });
  };

  // make presentation available on navigator ////////////////////////////
  var presentation = new NavigatorPresentation();
  Object.defineProperty(window.navigator, 'presentation', {
    get: function() {
      return presentation;
    }
  });

  var connections = [];
  var presentationConnectionList = new PresentationConnectionList(connections);
  var connectionListPromise = new Promise(function(resolve) {
    delegate.onpresent = function(connection) {
      var presentationConnection = new PresentationConnection(connection);
      console.log('receiver: new connection', presentationConnection);
      connections.push(presentationConnection);
      resolve(presentationConnectionList);
      if (presentationConnectionList.onconnectionavailable) {
        presentationConnectionList.onconnectionavailable(presentationConnection);
      }
    };
  });


///////////////////////////////////////////////////////////////////////////////


  function PresentationReceiver() {
    Object.defineProperty(this, 'connectionList', {
      get: function() {
        return connectionListPromise;
      }
    });
  }

  function PresentationConnectionList(connections) {
    var onconnectionavailable = null;
    var connections = connections;

    Object.defineProperty(this, 'connections', {
      get: function() {
        return connections;
      }
    });

    Object.defineProperty(this, 'onconnectionavailable', {
      get: function() {
        return onconnectionavailable;
      },
      set: function(value) {
        if (typeof value === 'function' || value === null) {
          onconnectionavailable = value;
        }
      }
    });
  }

  function PresentationConnection(receivedConnection) {
    Object.defineProperty(this, 'state', {
      get: function() {
        return (receivedConnection && receivedConnection.state) || null;
      }
    });
    Object.defineProperty(this, 'id', {
      get: function() {
        return (receivedConnection && receivedConnection.id) || null;
      }
    });
    Object.defineProperty(this, 'url', {
      get: function() {
        return (receivedConnection && receivedConnection.url) || null;
      }
    });
    Object.defineProperty(this, 'onmessage', {
      get: function() {
        return receivedConnection.onmessage;
      },
      set: function(value) {
        if (typeof value === 'function' || value === null) {
          receivedConnection.onmessage = value;
        }
      }
    });
    Object.defineProperty(this, 'onconnect', {
      get: function() {
        return receivedConnection.onconnect;
      },
      set: function(value) {
        if (typeof value === 'function' || value === null) {
          receivedConnection.onconnect = value;
        }
      }
    });
    Object.defineProperty(this, 'onclose', {
      get: function() {
        return receivedConnection.onclose;
      },
      set: function(value) {
        if (typeof value === 'function' || value === null) {
          receivedConnection.onclose = value;
        }
      }
    });
    Object.defineProperty(this, 'onterminate', {
      get: function() {
        return receivedConnection.onterminate;
      },
      set: function(value) {
        if (typeof value === 'function' || value === null) {
          receivedConnection.onterminate = value;
        }
      }
    });
    Object.defineProperty(this, 'send', {
      get: function() {
        return function(msg) {
          return receivedConnection.send(msg);
        };
      }
    });
    Object.defineProperty(this, 'close', {
      get: function() {
        return function() {
          return receivedConnection.close();
        };
      }
    });
    Object.defineProperty(this, 'terminate', {
      get: function() {
        return function() {
          return receivedConnection.terminate();
        };
      }
    });
  }
})

///////////////////////////////////////////////////////////////////////////////

((function(jsInterface) {
  var connections = {};
  /*
   * This function acts as delegate of all Presentation API calls to Android using the NavigatorPresentationJavascriptInterface Object
   */
  var NavigatorPresentationDelegate = function() {
    var onpresent = null;
    Object.defineProperty(this, 'onpresent', {
      get: function() {
        return onpresent;
      },
      set: function(value) {
        if (typeof value === 'function' || typeof value === 'undefined' || value === null) {
          onpresent = value;
          if (onpresent) {
            jsInterface.setOnPresent();
          }
        }
      }
    });
  };

  jsInterface.onsession = function(connection) {
    console.log('receiver: onsession', connection);
    connections[connection.id] = connections[connection.id] || connection;
    var onmessage = function() {
    };
    var onconnect = function() {
    };
    var onclose = function() {
    };
    var onterminate = function() {
    };
    Object.defineProperty(connection, 'onmessage', {
      get: function() {
        return onmessage;
      },
      set: function(value) {
        if (typeof value === 'function' || typeof value === 'undefined' || value === null) {
          onmessage = value;
        }
      }
    });
    Object.defineProperty(connection, 'onconnect', {
      get: function() {
        return onconnect;
      },
      set: function(value) {
        if (typeof value === 'function' || typeof value === 'undefined' || value === null) {
          onconnect = value;
        }
      }
    });
    Object.defineProperty(connection, 'onclose', {
      get: function() {
        return onclose;
      },
      set: function(value) {
        if (typeof value === 'function' || typeof value === 'undefined' || value === null) {
          onclose = value;
        }
      }
    });
    Object.defineProperty(connection, 'onterminate', {
      get: function() {
        return onterminate;
      },
      set: function(value) {
        if (typeof value === 'function' || typeof value === 'undefined' || value === null) {
          onterminate = value;
        }
      }
    });
    Object.defineProperty(connection, 'send', {
      get: function() {
        return function(msg) {
          var encodedMessage = encodeURIComponent(JSON.stringify(msg));
          return jsInterface.postMessage(connection.id, encodedMessage);
        };
      }
    });
    Object.defineProperty(connection, 'close', {
      get: function() {
        return function() {
          return jsInterface.close(connection.id);
        };
      }
    });
    Object.defineProperty(connection, 'terminate', {
      get: function() {
        return function() {
          return jsInterface.terminate(connection.id);
        };
      }
    });
    delegate.onpresent && delegate.onpresent(connection);
  };

  jsInterface.onmessage = function(sessId, msg) {
    console.log('receiver: onmessage ' + msg);
    var connection = connections[sessId];
    var data = decodeURIComponent(msg);
    var message;
    try {
      message = JSON.parse(data);
    } catch (e) {
      message = data;
    }

    if (connection && connection.onmessage) {
      connection.onmessage.call(null, message);
    }
  };
  jsInterface.onstatechange = function(sessId, newState) {
    console.log('receiver: onstatechange ' + newState);
    var connection = connections[sessId];
    if (connection) {
      handleStateChangeEvent(connection, newState);
    }
  };

  function handleStateChangeEvent(connection, state) {
    connection.state = state;
    switch (state) {
      case 'connected':
        connection.onconnect(connection);
        break;
      case 'connecting':
        break;
      case 'closed':
        connection.onclose(connection);
        break;
      case 'terminated':
        connection.onterminate(connection);
        connection = undefined;
        break;
      default:
        console.log('unknown connection state: ', state);
        break;
    }
  }

  var delegate = new NavigatorPresentationDelegate();
  return delegate;
})(NavigatorPresentationJavascriptInterface));