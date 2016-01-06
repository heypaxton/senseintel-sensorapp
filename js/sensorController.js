(function(jQuery, Firebase, Path) {
    "use strict";
 //Overall funtions

    // the main firebase reference
    var rootRef = new Firebase('https://brilliant-heat-8637.firebaseio.com');
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Data gathering, analysis, saving, and display functions
    function sensorChoice2DB(data,sensor,time) {
        var sensorName = "sensor" + sensor;
        rootRef.child("RPi" + sensor).push({
            'humidity': sensorName.humidity,
            'temp': sensorName.temp,
            'tempHumidity': sensorName.tempHumidity,
            'tempPressure': sensorName.tempPressure,
            'pressure': sensorName.pressure,
            'orient': sensorName.orient,
            'orientRaw': sensorName.orientRaw,
            'compass': sensorName.compass,
            'compassRaw': sensorName.compassRaw,
            'gyro': sensorName.gyro,
            'gyroRaw': sensorName.gyroRaw,
            'accel': sensorName.accel,
            'accelRaw': sensorName.accelRaw
        }, function onComplete() {
            console.log("added new data refresh info");
            rootRef.child("Call").push({
                time: time,
                sensor: sensor,
                data: dataKey
            }, function onComplete() {
                console.log("added new data refresh call");
            });
        });
        $('#humidity'+sensor+' span').text(sensorName.humidity);
        $('#temp'+sensor+' span').text(sensorName.temp);
        $('#tempHumidity'+sensor+' span').text(sensorName.tempHumidity);
        $('#tempPressure'+sensor+' span').text(sensorName.tempPressure);
        $('#orientRadians'+sensor+' .pitch span').text(sensorName.orient.pitch);
        $('#orientRadians'+sensor+' .roll span').text(sensorName.orient.roll);
        $('#orientRadians'+sensor+' .yaw span').text(sensorName.orient.yaw);
        $('#orientDegrees'+sensor+' .pitch span').text(sensorName.orient.pitch);
        $('#orientDegrees'+sensor+' .roll span').text(sensorName.orient.roll);
        $('#orientDegrees'+sensor+' .yaw span').text(sensorName.orient.yaw);
        $('#compass'+sensor+' span').text(sensorName.compass);
        $('#compassRaw'+sensor+' xAxis span').text(sensorName.compassRaw.x);
        $('#compassRaw'+sensor+' yAxis span').text(sensorName.compassRaw.y);
        $('#compassRaw'+sensor+' zAxis span').text(sensorName.compassRaw.z);
        $('#gyro'+sensor+' .pitch span').text(sensorName.gyro.pitch);
        $('#gyro'+sensor+' .roll span').text(sensorName.gyro.roll);
        $('#gyro'+sensor+' .yaw span').text(sensorName.gyro.yaw);
        $('#gyroRaw'+sensor+' xAxis span').text(sensorName.gyroRaw.x);
        $('#gyroRaw'+sensor+' yAxis span').text(sensorName.gyroRaw.y);
        $('#gyroRaw'+sensor+' zAxis span').text(sensorName.gyroRaw.z);
        $('#accel'+sensor+' .pitch span').text(sensorName.accel.pitch);
        $('#accel'+sensor+' .roll span').text(sensorName.accel.roll);
        $('#accel'+sensor+' .yaw span').text(sensorName.accel.yaw);
        $('#accelRaw'+sensor+' xAxis span').text(sensorName.accelRaw.x);
        $('#accelRaw'+sensor+' yAxis span').text(sensorName.accelRaw.y);
        $('#accelRaw'+sensor+' zAxis span').text(sensorName.accelRaw.z);
    }
    
    /*function analyzeData(data) {
        
    } */
    
    function saveData(data,sensor) {
        var time = Firebase.ServerValue.TIMESTAMP;
        if (sensor == 3) {
            sensorChoice2DB(data,1,time)
            sensorChoice2DB(data,2,time)
        } else if (sensor == 1) {
            sensorChoice2DB(data,sensor,time)
        } else if (sensor == 2) {
            sensorChoice2DB(data,sensor,time)
        }
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Controller functions
    $('#sensorButton1').on('click', function() {
        $.get("http://192.168.10.105:5000/api/v1.0/sensor", function(data, status){
            console.log(data);
            var sensor = 1;
            //analyzeData(data)
            saveDisplayData(data,sensor)
        });
    });
    
    $('#sensorButton2').on('click', function() {
        $.get("http://192.168.10.107:5000/api/v1.0/sensor", function(data, status){
            console.log(data);
            var sensor = 1;
            //analyzeData(data)
            saveDisplayData(data,sensor)
        });
    });
    
    $('#bothButton').on('click', function() {
        $.get("http://192.168.10.105:5000/api/v1.0/sensor", function(data1, status1){
            console.log("Data1: " + data1 + "\nStatus1: " + status1);
            $.get("http://192.168.10.107:5000/api/v1.0/sensor", function(data2, status2){
                console.log(data);
                var sensor = 1;
                //analyzeData(data)
                saveDisplayData(data,sensor)
            });
        });
    });
    
    
    
}(window.jQuery, window.Firebase, window.Path))