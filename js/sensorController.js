(function(jQuery, Firebase, Path) {
    "use strict";
 //Overall funtions

    // the main firebase reference
    var rootRef = new Firebase('https://pitchlove.firebaseio.com');
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Data gathering, analysis, saving, and display functions
    
    
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Front end functions
    $('#sensorButton1').on('click', function() {
        $.get("api/v1.0/sensor/1", function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
            
        });
    });
    
    $('#sensorButton2').on('click', function() {
        $.get("api/v1.0/sensor/2", function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
            
        });
    });
    
    $('#bothButton').on('click', function() {
        $.get("api/v1.0/sensor/3", function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
            
        });
    });
    
    
    
}(window.jQuery, window.Firebase, window.Path))