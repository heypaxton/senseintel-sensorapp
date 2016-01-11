(function(jQuery, Firebase, Path) {
    "use strict";
 //Overall funtions

    // the main firebase reference
    var rootRef = new Firebase('https://brilliant-heat-8637.firebaseio.com');
    
/////////////////////////////////////////////////////////////////////////////////////////////////
//General functions
    (function($) {
        $.fn.flash_message = function(options) {

          options = $.extend({
            text: 'Done',
            time: 1000,
            how: 'before',
            class_name: ''
          }, options);

          return $(this).each(function() {
            if( $(this).parent().find('.flash_message').get(0) )
              return;

            var message = $('<span />', {
              'class': 'flash_message ' + options.class_name,
              text: options.text
            }).hide().fadeIn('fast');

            $(this)[options.how](message);

            message.delay(options.time).fadeOut('normal', function() {
              $(this).remove();
            });

          });
        };
    })(jQuery);
    
    function noData() {
        
    }

//Data gathering, analysis, saving, and display functions
    
    /*function analyzeData(data) {
        
    } */
    
    function displayData(sensor,data) {
        $('#humidity'+sensor+' span').text(data.humidity);
        $('#temp'+sensor+' span').text(data.temp);
        $('#tempHumid'+sensor+' span').text(data.tempHumidity);
        $('#tempPressure'+sensor+' span').text(data.tempPressure);
        $('#pressure'+sensor+' span').text(data.pressure);
        $('#orientRadians'+sensor+' .pitch span').text(data.orient.pitch);
        $('#orientRadians'+sensor+' .roll span').text(data.orient.roll);
        $('#orientRadians'+sensor+' .yaw span').text(data.orient.yaw);
        $('#orientDegrees'+sensor+' .pitch span').text(data.orient.pitch);
        $('#orientDegrees'+sensor+' .roll span').text(data.orient.roll);
        $('#orientDegrees'+sensor+' .yaw span').text(data.orient.yaw);
        $('#compass'+sensor+' span').text(data.compass);
        $('#compassRaw'+sensor+' .xAxis span').text(data.compassRaw.x);
        $('#compassRaw'+sensor+' .yAxis span').text(data.compassRaw.y);
        $('#compassRaw'+sensor+' .zAxis span').text(data.compassRaw.z);
        $('#gyro'+sensor+' .pitch span').text(data.gyro.pitch);
        $('#gyro'+sensor+' .roll span').text(data.gyro.roll);
        $('#gyro'+sensor+' .yaw span').text(data.gyro.yaw);
        $('#gyroRaw'+sensor+' .xAxis span').text(data.gyroRaw.x);
        $('#gyroRaw'+sensor+' .yAxis span').text(data.gyroRaw.y);
        $('#gyroRaw'+sensor+' .zAxis span').text(data.gyroRaw.z);
        $('#accel'+sensor+' .pitch span').text(data.accel.pitch);
        $('#accel'+sensor+' .roll span').text(data.accel.roll);
        $('#accel'+sensor+' .yaw span').text(data.accel.yaw);
        $('#accelRaw'+sensor+' .xAxis span').text(data.accelRaw.x);
        $('#accelRaw'+sensor+' .yAxis span').text(data.accelRaw.y);
        $('#accelRaw'+sensor+' .zAxis span').text(data.accelRaw.z);
    }
    
    function getDifference() {
        //difference of last 2 sensor #1 readings
        rootRef.child("RPi1").orderByKey().once('value', function(snap) {
            var fullData1 = snap.val();
            console.log(fullData1);
            var fullDataArray1 = [];
            for (var key in fullData1) {
                fullDataArray1.push(fullData1[key]);
            }
            var dataLength1 = fullDataArray1.length;
            var data1a = fullDataArray1[dataLength1-1];
            var data2a = fullDataArray1[dataLength1-2];
            var dataA = data1a - data2a;
            var sensor = 3;
            console.log(data1a);
            console.log(data2a);
            console.log(dataA);
            if (data1a && data2a) {
                $('#sensor1Changes').show();
                displayData(sensor,dataA)
            }
            //difference of last 2 sensor #2 readings
             rootRef.child("RPi2").orderByKey().once('value', function(snap) {
                var fullData2 = snap.val();
                console.log(fullData2);
                var fullDataArray2 = [];
                for (var key in fullData2) {
                    fullDataArray2.push(fullData2[key]);
                }
                var dataLength2 = fullDataArray2.length;
                var data1b = fullDataArray2[dataLength2-1];
                var data2b = fullDataArray2[dataLength2-2];
                var dataB = data1b - data2b;
                var sensor = 4;
                console.log(data1b);
                console.log(data2b);
                console.log(dataB);
                if (data1b && data2b) {
                    $('#sensor2Changes').show();
                    displayData(sensor,dataB)
                }
                var dataDiff = data1b - data1a;
                console.log(dataDiff);
                sensor = 5;
                if (data1a && data1b) {
                    $('#betweenSensorDifference').show();
                    displayData(sensor,dataDiff)
                }
            });
        });
        
       /* */
    }
    
    function saveSensorCall(callRef,sensor,sensorRefKey,both,time) {
        var sensorInfo = {};
        sensorInfo[sensor] = sensorRefKey;
        console.log(sensorInfo);
        if (both) {
            callRef.child("sensor").once('value', function(snap) {
                var firstSensor = snap.val();
                if (firstSensor) {
                    $('#bothSensors').val(firstSensor);
                    console.log(firstSensor);
                    sensorInfo = $('#bothSensors').val();
                    if (sensor == 1) {
                        sensorInfo[sensor] = sensorRefKey;
                    } else if (sensor == 2) {
                        sensorInfo[sensor] = sensorRefKey;
                    }
                    console.log(sensorInfo);
                }
            });
        }
        callRef.set({
            time: time,
            sensor: sensorInfo,
        }, function onComplete() {
            console.log("added new data refresh call");
            var callRefKey = callRef.key();
            rootRef.child("Call").child(callRefKey).child("time").once('value', function(snap) {
                var dbTime = snap.val();
                var realTime = new Date(dbTime);
                $('#time'+sensor+' span').text(realTime);
            });
        });
    }
    
    function saveData(sensor,data,both) {
        var time = Firebase.ServerValue.TIMESTAMP;
        var sensorRef = new Firebase('https://brilliant-heat-8637.firebaseio.com/RPi' + sensor);
        console.log(data);
        var newSensorRef = sensorRef.push()
        newSensorRef.set({
            'humidity': data.sensor[0].humidity,
            'temp': data.sensor[0].temp,
            'tempHumidity': data.sensor[0].tempHumidity,
            'tempPressure': data.sensor[0].tempPressure,
            'pressure': data.sensor[0].pressure,
            'orient': data.sensor[0].orient,
            'orientRaw': data.sensor[0].orientRaw,
            'compass': data.sensor[0].compass,
            'compassRaw': data.sensor[0].compassRaw,
            'gyro': data.sensor[0].gyro,
            'gyroRaw': data.sensor[0].gyroRaw,
            'accel': data.sensor[0].accel,
            'accelRaw': data.sensor[0].accelRaw
        }, function onComplete() {
            console.log("added new data refresh info");
            var sensorRefKey = newSensorRef.key();
            var callRef = rootRef.child("Call").push()
            saveSensorCall(callRef,sensor,sensorRefKey,both,time)
            data.humidity = data.sensor[0].humidity;
            data.temp = data.sensor[0].temp;
            data.tempHumidity = data.sensor[0].tempHumidity;
            data.tempPressure = data.sensor[0].tempPressure;
            data.pressure = data.sensor[0].pressure;
            data.orient = data.sensor[0].orient;
            data.orientRaw = data.sensor[0].orientRaw;
            data.compass = data.sensor[0].compass;
            data.compassRaw = data.sensor[0].compassRaw;
            data.gyro = data.sensor[0].gyro;
            data.gyroRaw = data.sensor[0].gyroRaw;
            data.accel = data.sensor[0].accel;
            data.accelRaw = data.sensor[0].accelRaw;
            displayData(sensor,data) 
        });
    }
    
    function saveDisplayDataChoice(data,sensor,both) {
        if (!both) {
            console.log(data);
            saveData(sensor,data,both) 
        } else {
            console.log(data);
            saveData(sensor,data,both) 
            getDifference()
        }
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//Controller functions
    var address1, address2;
    $('#addressButton').on('click', function() {
        address1 = $('#address1').val();
        address2 = $('#address2').val();
        $('.sensorButtons').show();
        $('#status-area0').flash_message({
            text: 'Updated Addresses!',
            how: 'append'
        });
    });
    $('#sensorButton1').on('click', function() {
        var sensor = 1;
        var both = false;
        var url = "http://192.168." + address1 + ":5000/api/v1.0/sensor";
        console.log(url);
        $.ajax({
            dataType: "JSON",
            url: url,
            success: function(data) {
                console.log(url);
                //analyzeData(data)
                saveDisplayDataChoice(data,sensor,both)
                $('#status-area1').flash_message({
                    text: 'Updated Sensor #1!',
                    how: 'append'
                });
          },
            error: function(e) {
                console.log(e.message);
            }
        });
    });

    $('#sensorButton2').on('click', function() {
        var sensor = 2;
        var both = false;
        var url = "http://192.168." + address2 + ":5000/api/v1.0/sensor";
        $.ajax({
            dataType: "JSON",
            url: url,
            success: function(data) {
                console.log(url);
                //analyzeData(data)
                saveDisplayDataChoice(data,sensor,both)
                $('#status-area2').flash_message({
                    text: 'Updated Sensor #2!',
                    how: 'append'
                });
          },
            error: function(e) {
                console.log(e.message);
            }
        });
    });

    $('#bothButton').on('click', function() {
        var sensor1 = 1;
        var both = false;
        var url = "http://192.168." + address1 + ":5000/api/v1.0/sensor";
        var url2 = "http://192.168." + address2 + ":5000/api/v1.0/sensor";
            $.ajax({
                dataType: "JSON",
                url: url,
                success: function(data1) {
                console.log(url);
                //analyzeData(data)
                saveDisplayDataChoice(data1,sensor1,both)
                both = true;
                var sensor2 = 2;
                $.ajax({
                    dataType: "JSON",
                    url: url2,
                    success: function(data2) {
                    console.log(url);
                    //analyzeData(data)
                    saveDisplayDataChoice(data2,sensor2,both)
                    $('#status-area3').flash_message({
                        text: 'Updated All Data!',
                        how: 'append'
                    });
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