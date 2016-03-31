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
    
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

//Data gathering, analysis, saving, and display functions
    
    /*function analyzeData(data) {
        
    } */

    function showAngle() {
        console.log("This works");
    }
    
    function displayData(sensor,data) {
        console.log(data);
        if (data == 0) {
            $('#sensorList'+sensor).html("<li>No difference</li>");
        } else {
            $('#gpsError').show();
            $('#humidity'+sensor+' span').text(data.humidity);
            $('#temp'+sensor+' span').text(data.temp);
            $('#pressure'+sensor+' span').text(data.pressure);
            $('#orientRadians'+sensor+' .pitch span').text(data.orient.pitch);
            $('#orientRadians'+sensor+' .roll span').text(data.orient.roll);
            $('#orientRadians'+sensor+' .yaw span').text(data.orient.yaw);
            $('#orientDegrees'+sensor+' .pitch span').text(data.orientRaw.pitch);
            $('#orientDegrees'+sensor+' .roll span').text(data.orientRaw.roll);
            $('#orientDegrees'+sensor+' .yaw span').text(data.orientRaw.yaw);
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
    }
    
    function getDifference1() {
        //difference of last 2 sensor #1 readings
        rootRef.child("RPi1").orderByKey().once('value', function(snap) {
            var fullData1 = snap.val();
            console.log(fullData1);
            var fullDataArray1 = [];
            var idArray1 = [];
            for (var key in fullData1) {
                fullDataArray1.push(fullData1[key]);
                idArray1.push(key);
            }
            var dataLength1 = fullDataArray1.length;
            var data1a = fullDataArray1[dataLength1-1];
            var data2a = fullDataArray1[dataLength1-2];
            var dataA = {};
            dataA.humidity = data1a.humidity - data2a.humidity;
            dataA.temp = data1a.temp - data2a.temp;
            dataA.pressure = data1a.pressure - data2a.pressure;
            dataA.orient = {
                pitch: data1a.orient.pitch - data2a.orient.pitch,
                roll: data1a.orient.roll - data2a.orient.roll,
                yaw: data1a.orient.yaw - data2a.orient.yaw
            };
            dataA.orientRaw = {
                pitch: data1a.orientRaw.pitch - data2a.orientRaw.pitch,
                roll: data1a.orientRaw.roll - data2a.orientRaw.roll,
                yaw: data1a.orientRaw.yaw - data2a.orientRaw.yaw
            };
            dataA.compass = data1a.compass - data2a.compass;
            dataA.compassRaw = {
                x: data1a.compassRaw.x - data2a.compassRaw.x,
                y: data1a.compassRaw.y - data2a.compassRaw.y,
                z: data1a.compassRaw.z - data2a.compassRaw.z
            };
            dataA.gyro = {
                pitch: data1a.gyro.pitch - data2a.gyro.pitch,
                roll: data1a.gyro.roll - data2a.gyro.roll,
                yaw: data1a.gyro.yaw - data2a.gyro.yaw
            };
            dataA.gyroRaw = {
                x: data1a.gyroRaw.x - data2a.gyroRaw.x,
                y: data1a.gyroRaw.y - data2a.gyroRaw.y,
                z: data1a.gyroRaw.z - data2a.gyroRaw.z
            };
            dataA.accel = {
                pitch: data1a.accel.pitch - data2a.accel.pitch,
                roll: data1a.accel.roll - data2a.accel.roll,
                yaw: data1a.accel.yaw - data2a.accel.yaw
            };
            dataA.accelRaw = {
                x: data1a.accelRaw.x - data2a.accelRaw.x,
                y: data1a.accelRaw.y - data2a.accelRaw.y,
                z: data1a.accelRaw.z - data2a.accelRaw.z
            };
            //var dataA = data1a - data2a;
            var sensor = 3;
            console.log(!isEmpty(data1a) && !isEmpty(data2a));
            console.log(dataA);
            if (!isEmpty(data1a) && !isEmpty(data2a)) {
                $('#sensor1Changes').show();
                if (!dataA) {
                    dataA = 0;
                }
                displayData(sensor,dataA);
            }
            return data1a
        });
    }

    function getDifference2() {
        //difference of last 2 sensor #2 readings
        rootRef.child("RPi2").orderByKey().once('value', function(snap) {
            if (sensor === 2) {
                var fullData2 = snap.val();
                console.log(fullData2);
                var fullDataArray2 = [];
                var idArray2 = [];
                for (var key in fullData2) {
                    fullDataArray2.push(fullData2[key]);
                    idArray2.push(key);
                }
                var dataLength2 = fullDataArray2.length;
                var data1b = fullDataArray2[dataLength2-1];
                var data2b = fullDataArray2[dataLength2-2];
                var dataB = {};
                dataB.humidity = data1b.humidity - data2b.humidity;
                dataB.temp = data1b.temp - data2b.temp;
                dataB.pressure = data1b.pressure - data2b.pressure;
                dataB.orient = {
                    pitch: data1b.orient.pitch - data2b.orient.pitch,
                    roll: data1b.orient.roll - data2b.orient.roll,
                    yaw: data1b.orient.yaw - data2b.orient.yaw
                };
                dataB.orientRaw = {
                    pitch: data1b.orientRaw.pitch - data2b.orientRaw.pitch,
                    roll: data1b.orientRaw.roll - data2b.orientRaw.roll,
                    yaw: data1b.orientRaw.yaw - data2b.orientRaw.yaw
                };
                dataB.compass = data1b.compass - data2b.compass;
                dataB.compassRaw = {
                    x: data1b.compassRaw.x - data2b.compassRaw.x,
                    y: data1b.compassRaw.y - data2b.compassRaw.y,
                    z: data1b.compassRaw.z - data2b.compassRaw.z
                };
                dataB.gyro = {
                    pitch: data1b.gyro.pitch - data2b.gyro.pitch,
                    roll: data1b.gyro.roll - data2b.gyro.roll,
                    yaw: data1b.gyro.yaw - data2b.gyro.yaw
                };
                dataB.gyroRaw = {
                    x: data1b.gyroRaw.x - data2b.gyroRaw.x,
                    y: data1b.gyroRaw.y - data2b.gyroRaw.y,
                    z: data1b.gyroRaw.z - data2b.gyroRaw.z
                };
                dataB.accel = {
                    pitch: data1b.accel.pitch - data2b.accel.pitch,
                    roll: data1b.accel.roll - data2b.accel.roll,
                    yaw: data1b.accel.yaw - data2b.accel.yaw
                };
                dataB.accelRaw = {
                    x: data1b.accelRaw.x - data2b.accelRaw.x,
                    y: data1b.accelRaw.y - data2b.accelRaw.y,
                    z: data1b.accelRaw.z - data2b.accelRaw.z
                };
                //var dataB = data1b - data2b;
                var sensor = 4;
                console.log(!isEmpty(data1b) && !isEmpty(data2b));
                console.log(dataB);
                if (!isEmpty(data1b) && !isEmpty(data2b)) {
                    $('#sensor2Changes').show();
                    if (!dataB) {
                        dataB = 0;
                    }
                    displayData(sensor,dataB);
                }
            }
            return data2a
        });
    }
                
    function getDifferenceBoth() {
        var data1a = getDifference1();
        var data1b = getDifference2();
        var dataDiff = {};
        dataDiff.humidity = data1b.humidity - data1a.humidity;
        dataDiff.temp = data1b.temp - data1a.temp;
        dataDiff.pressure = data1b.pressure - data1a.pressure;
        dataDiff.orient = {
            pitch: data1b.orient.pitch - data1a.orient.pitch,
            roll: data1b.orient.roll - data1a.orient.roll,
            yaw: data1b.orient.yaw - data1a.orient.yaw
        };
        dataDiff.orientRaw = {
            pitch: data1b.orientRaw.pitch - data1a.orientRaw.pitch,
            roll: data1b.orientRaw.roll - data1a.orientRaw.roll,
            yaw: data1b.orientRaw.yaw - data1a.orientRaw.yaw
        };
        dataDiff.compass = data1b.compass - data1a.compass;
        dataDiff.compassRaw = {
            x: data1b.compassRaw.x - data1a.compassRaw.x,
            y: data1b.compassRaw.y - data1a.compassRaw.y,
            z: data1b.compassRaw.z - data1a.compassRaw.z
        };
        dataDiff.gyro = {
            pitch: data1b.gyro.pitch - data1a.gyro.pitch,
            roll: data1b.gyro.roll - data1a.gyro.roll,
            yaw: data1b.gyro.yaw - data1a.gyro.yaw
        };
        dataDiff.gyroRaw = {
            x: data1b.gyroRaw.x - data1a.gyroRaw.x,
            y: data1b.gyroRaw.y - data1a.gyroRaw.y,
            z: data1b.gyroRaw.z - data1a.gyroRaw.z
        };
        dataDiff.accel = {
            pitch: data1b.accel.pitch - data1a.accel.pitch,
            roll: data1b.accel.roll - data1a.accel.roll,
            yaw: data1b.accel.yaw - data1a.accel.yaw
        };
        dataDiff.accelRaw = {
            x: data1b.accelRaw.x - data1a.accelRaw.x,
            y: data1b.accelRaw.y - data1a.accelRaw.y,
            z: data1b.accelRaw.z - data1a.accelRaw.z
        };
        //var dataDiff = data1b - data1a;
        console.log(!isEmpty(data1a) && !isEmpty(data1b));
        sensor = 5;
        if (!isEmpty(data1a) && !isEmpty(data1b)) {
            $('#betweenSensorDifference').show();
            if (!dataDiff) {
                dataDiff = 0;
            }
            displayData(sensor,dataDiff)
            var key1 = idArray1[dataLength1-1];
            var key2 = idArray2[dataLength2-1];
            rootRef.child("Difference").push({
                sensor1: key1,
                sensor2: key2,
                difference: dataDiff
            }, function onComplete() {
                console.log("added difference");
            });
        }
    }
    
    function saveSensorCall(callRef,sensor,sensorRefKey,both,time) {
        var sensorInfo = {};
        sensorInfo["sensor"+sensor] = sensorRefKey;
        console.log(sensorInfo);
        if (both) {
            rootRef.child("Call").orderByKey().once('value', function(snapshot) {
                var calls = snapshot.val();
                var idArray = [];
                for (var key in calls) {
                    idArray.push(key);
                }
                var callKey = idArray[idArray.length - 1];
                rootRef.child("Call").child(callKey).once('value', function(snap) {
                    var fullFirstSensor = snap.val();
                    console.log(fullFirstSensor);
                    var firstSensor = fullFirstSensor.sensor;
                    var dbTime = fullFirstSensor.time;
                    var realTime = new Date(dbTime);
                    console.log(realTime);
                    $('#time'+sensor+' span').text(realTime);
                    //$('#bothSensors').val(firstSensor);
                    console.log(sensor);
                    sensorInfo = firstSensor;
                    //$('#bothSensors').val();
                    if (sensor == 1) {
                        sensorInfo["sensor"+sensor] = sensorRefKey;
                    } else if (sensor == 2) {
                        sensorInfo["sensor"+sensor] = sensorRefKey;
                    }
                    console.log(sensorInfo);
                    callRef.set({
                        time: time,
                        sensor: sensorInfo,
                    }, function onComplete() {
                        console.log("updated new data refresh call for both");
                    });
                });
            });
        } else {
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
    }
    
    function saveData(sensor,data,both) {
        var time = Firebase.ServerValue.TIMESTAMP;
        var sensorRef = new Firebase('https://brilliant-heat-8637.firebaseio.com/RPi' + sensor);
        console.log(data);
        var newSensorRef = sensorRef.push()
        newSensorRef.set({
            'humidity': data.sensor[0].humidity,
            'temp': data.sensor[0].temp,
            'pressure': data.sensor[0].pressure,
            'orient': data.sensor[0].orient,
            'orientRaw': data.sensor[0].orientRaw,
            'compass': data.sensor[0].compass,
            'compassRaw': data.sensor[0].compassRaw,
            'gyro': data.sensor[0].gyro,
            'gyroRaw': data.sensor[0].gyroRaw,
            'accel': data.sensor[0].accel,
            'accelRaw': data.sensor[0].accelRaw
            //'latitude': data.sensor[0].latitude,
            //'longitude': data.sensor[0].longitude,
            //'altitude': data.sensor[0].altitude
        }, function onComplete() {
            console.log("added new data refresh info");
            var sensorRefKey = newSensorRef.key();
            var callRef = rootRef.child("Call").push()
            saveSensorCall(callRef,sensor,sensorRefKey,both,time)
            data.humidity = data.sensor[0].humidity;
            data.temp = data.sensor[0].temp;
            data.pressure = data.sensor[0].pressure;
            data.orient = data.sensor[0].orient;
            data.orientRaw = data.sensor[0].orientRaw;
            data.compass = data.sensor[0].compass;
            data.compassRaw = data.sensor[0].compassRaw;
            data.gyro = data.sensor[0].gyro;
            data.gyroRaw = data.sensor[0].gyroRaw;
            data.accel = data.sensor[0].accel;
            data.accelRaw = data.sensor[0].accelRaw;
            //data.latitude = data.sensor[0].latitude;
            //data.longitude = data.sensor[0].longitude;
            //data.altitude = data.sensor[0].altitude;
            displayData(sensor,data) 
        });
    }
    
    function saveDisplayDataChoice(data,sensor,both) {
        if (!both) {
            if (!(data.latitude && data.longitude && data.altitude)) {
                console.log(data);
                $('#sensorList6').html("<li>No GPS Data</li>");
                $('#gpsError').show();
                saveData(sensor,data,both);
                if (sensor == 1) {
                    getDifference1();
                } else if (sensor == 2) {
                    getDifference2();
                } 
            } else {
                console.log(data);
                saveData(sensor,data,both);
                if (sensor == 1) {
                    getDifference1();
                } else if (sensor == 2) {
                    getDifference2();
                } 
            }
        } else {
            if (!(data.latitude && data.longitude && data.altitude)) {
                console.log(data);
                $('#sensorList6').html("<li>No GPS Data</li>");
                $('#gpsError').show();
                saveData(sensor,data,both);
                getDifferenceBoth();
                showAngle();
            } else {
                console.log(data);
                saveData(sensor,data,both);
                getDifferenceBoth();
                showAngle();
            }
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
                saveDisplayDataChoice(data,sensor,both);
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
                saveDisplayDataChoice(data,sensor,both);
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
        showAngle();
            $.ajax({
                dataType: "JSON",
                url: url,
                success: function(data1) {
                    console.log(url);
                    //analyzeData(data)
                    saveDisplayDataChoice(data1,sensor1,both);
                    both = true;
                    var sensor2 = 2;
                    $.ajax({
                        dataType: "JSON",
                        url: url2,
                        success: function(data2) {
                        console.log(url);
                        //analyzeData(data)
                        saveDisplayDataChoice(data2,sensor2,both);
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