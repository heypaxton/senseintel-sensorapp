(function(jQuery, Firebase, Path) {
    "use strict";
 //Overall funtions

    // the main firebase reference
    var rootRef = new Firebase('https://brilliant-heat-8637.firebaseio.com');
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Data gathering, analysis, saving, and display functions
    
    /*function analyzeData(data) {
        
    } */
    
    function saveDisplayData(data,sensor) {
        var time = Firebase.ServerValue.TIMESTAMP;
        var sensorName = "sensor" + sensor;
        var sensorRef = new Firebase('https://brilliant-heat-8637.firebaseio.com/RPi' + sensor);
        var newSensorRef = sensorRef.push()
        newSensorRef.set({
            'humidity': data[sensorName][0].humidity,
            'temp': data[sensorName][0].temp,
            'tempHumidity': data[sensorName][0].tempHumidity,
            'tempPressure': data[sensorName][0].tempPressure,
            'pressure': data[sensorName][0].pressure,
            'orient': data[sensorName][0].orient,
            'orientRaw': data[sensorName][0].orientRaw,
            'compass': data[sensorName][0].compass,
            'compassRaw': data[sensorName][0].compassRaw,
            'gyro': data[sensorName][0].gyro,
            'gyroRaw': data[sensorName][0].gyroRaw,
            'accel': data[sensorName][0].accel,
            'accelRaw': data[sensorName][0].accelRaw
        }, function onComplete() {
            console.log("added new data refresh info");
            var sensorRefKey = newSensorRef.key();
            var callRef = rootRef.child("Call").push()
            callRef.set({
                time: time,
                sensor: sensor,
                data: sensorRefKey
            }, function onComplete() {
                console.log("added new data refresh call");
                var callRefKey = callRef.key();
                rootRef.child("Call").child(callRefKey).child("time").once('value', function(snap) {
                    var dbTime = snap.val();
                    var realTime = new Date(dbTime);
                    $('#time'+sensor+' span').text(realTime);
                });
            });
        });
        $('#humidity'+sensor+' span').text(data[sensorName][0].humidity);
        $('#temp'+sensor+' span').text(data[sensorName][0].temp);
        $('#tempHumid'+sensor+' span').text(data[sensorName][0].tempHumidity);
        $('#tempPressure'+sensor+' span').text(data[sensorName][0].tempPressure);
        $('#pressure'+sensor+' span').text(data[sensorName][0].pressure);
        $('#orientRadians'+sensor+' .pitch span').text(data[sensorName][0].orient.pitch);
        $('#orientRadians'+sensor+' .roll span').text(data[sensorName][0].orient.roll);
        $('#orientRadians'+sensor+' .yaw span').text(data[sensorName][0].orient.yaw);
        $('#orientDegrees'+sensor+' .pitch span').text(data[sensorName][0].orient.pitch);
        $('#orientDegrees'+sensor+' .roll span').text(data[sensorName][0].orient.roll);
        $('#orientDegrees'+sensor+' .yaw span').text(data[sensorName][0].orient.yaw);
        $('#compass'+sensor+' span').text(data[sensorName][0].compass);
        $('#compassRaw'+sensor+' .xAxis span').text(data[sensorName][0].compassRaw.x);
        $('#compassRaw'+sensor+' .yAxis span').text(data[sensorName][0].compassRaw.y);
        $('#compassRaw'+sensor+' .zAxis span').text(data[sensorName][0].compassRaw.z);
        $('#gyro'+sensor+' .pitch span').text(data[sensorName][0].gyro.pitch);
        $('#gyro'+sensor+' .roll span').text(data[sensorName][0].gyro.roll);
        $('#gyro'+sensor+' .yaw span').text(data[sensorName][0].gyro.yaw);
        $('#gyroRaw'+sensor+' .xAxis span').text(data[sensorName][0].gyroRaw.x);
        $('#gyroRaw'+sensor+' .yAxis span').text(data[sensorName][0].gyroRaw.y);
        $('#gyroRaw'+sensor+' .zAxis span').text(data[sensorName][0].gyroRaw.z);
        $('#accel'+sensor+' .pitch span').text(data[sensorName][0].accel.pitch);
        $('#accel'+sensor+' .roll span').text(data[sensorName][0].accel.roll);
        $('#accel'+sensor+' .yaw span').text(data[sensorName][0].accel.yaw);
        $('#accelRaw'+sensor+' .xAxis span').text(data[sensorName][0].accelRaw.x);
        $('#accelRaw'+sensor+' .yAxis span').text(data[sensorName][0].accelRaw.y);
        $('#accelRaw'+sensor+' .zAxis span').text(data[sensorName][0].accelRaw.z);
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Controller functions
    $('#sensorButton1').on('click', function() {
        var sensor = 1;
        $.ajax({
            dataType: "JSON",
            url: "http://192.168.10.105:5000/api/v1.0/sensor",
            success: function(data) {
            console.log(data);
            //analyzeData(data)
            saveDisplayData(data,sensor)
          },
            error: function(e) {
                console.log(e.message);
            }
        });
    });
    
    $('#sensorButton2').on('click', function() {
        var sensor = 2;
        $.ajax({
            dataType: "JSON",
            url: "http://192.168.10.107:5000/api/v1.0/sensor",
            success: function(data) {
            console.log(data);
            //analyzeData(data)
            saveDisplayData(data,sensor)
          },
            error: function(e) {
                console.log(e.message);
            }
        });
    });
    
    $('#bothButton').on('click', function() {
        var sensor1 = 1;
            $.ajax({
                dataType: "JSON",
                url: "http://192.168.10.105:5000/api/v1.0/sensor",
                success: function(data1) {
                console.log(data1);
                //analyzeData(data)
                saveDisplayData(data1,sensor1)
                var sensor2 = 2;
                $.ajax({
                    dataType: "JSON",
                    url: "http://192.168.10.107:5000/api/v1.0/sensor",
                    success: function(data2) {
                    console.log(data2);
                    //analyzeData(data)
                    saveDisplayData(data2,sensor2)
                  },
                    error: function(e) {
                        console.log(e.message);
                    }
                });
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    });
    
    
    
}(window.jQuery, window.Firebase, window.Path))