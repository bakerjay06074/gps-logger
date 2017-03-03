var isStopButtonPushed = false;
var watchID;
var timerID;
var isAppend = true;
var csv_line;


function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", onDeviceReady, false);
    //setInterval(function(){ alert("Hello, Jay"); }, 3000);
}


function onDeviceReady() {
    window.alert("In onDeviceReady");
    openFileSystem();
    document.getElementById("tbLongitude").value = 100
} 


function start_recording() {
    window.alert("recording button pushed");
   
    
    watchID = navigator.geolocation.watchPosition(geolocationSuccess,
                                                 geolocationError,
                                                  {maximumAge: 60000,
                                                   timeout: 30000,
                                                   enableHighAccruacy:true});
    window.alert("launched watchPosition");
    
     //timerID = setInterval(function(){jayGetPosition()}, 30000);
}

// onSuccess Callback 
// This method accepts a Position object, which contains the 
// current GPS coordinates 
// 
var geolocationSuccess = function(position) {
    /*
    window.alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    */
     document.getElementById("tbLongitude").value = position.coords.longitude;
     document.getElementById("tbLatitude").value = position.coords.latitude;
     document.getElementById("tbTime").value = position.timestamp;
    
    
    csv_line = position.coords.longitude.toString() + "," + 
        position.coords.latitude.toString() + "," +
        position.timestamp.toString() + "," +
        position.coords.altitude.toString() + "," +
        position.coords.accuracy.toString() + "\n";
    navigator.vibrate(1000);
    //dataObj = new Blob([position.coords.timestamp], { type: 'text/plain'});
    writeFile(fileEntry_jay, csv_line, isAppend)
    //window.alert('got a new position');
};
 
// onError Callback receives a PositionError object 
// 
function geolocationError(error) {
    window.alert('code: ' + error.code); 
}


/*
function stop_recording() {
    isStopButtonPushed = true;
    navigator.geolocation.clearWatch(watchID);
}
*/  

