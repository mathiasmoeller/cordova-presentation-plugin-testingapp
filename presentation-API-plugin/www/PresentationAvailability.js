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



