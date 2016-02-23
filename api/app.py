#!flask/bin/python
from flask import Flask, jsonify, make_response
from collections import defaultdict
from sense_hat import SenseHat
#from flask.ext.cors import CORS
import time
#from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
#CORS(app)

sense = SenseHat()

def add(x,y): return x+y

def getSingleSensorReading(sensorList):
    #sensorReadings 
    sensorList['humidity'].append(sense.humidity)
    sensorList['temp'].append(sense.temp)
    sensorList['pressure'].append(sense.pressure)
    sensorList['orient'].append(sense.orientation)
    sensorList['orientRaw'].append(sense.orientation_radians)
    sensorList['compass'].append(sense.compass)
    sensorList['compassRaw'].append(sense.compass_raw)
    sensorList['gyro'].append(sense.gyro)
    sensorList['gyroRaw'].append(sense.gyro_raw)
    sensorList['accel'].append(sense.accel)
    sensorList['accelRaw'].append(sense.accel_raw)
    return sensorList

#sched = Scheduler()
#sched.start()

#def some_job():
    #print "Every 10 seconds"

#sched.add_interval_job(some_job, seconds = 1)

#sched.shutdown()
@app.route('/')
def index():
    return "Hello World"

@app.route('/api/v1.0/sensor', methods=['GET'])
def get_sensorReadings():
    sensor = [
        {
            'humidity': sense.humidity,
            'temp': sense.temp,
            'pressure': sense.pressure,
            'orient': sense.orientation,
            'orientRaw': sense.orientation_radians,
            'compass': sense.compass,
            'compassRaw': sense.compass_raw,
            'gyro': sense.gyro,
            'gyroRaw': sense.gyro_raw,
            'accel': sense.accel,
            'accelRaw': sense.accel_raw
        }
    ]
    return jsonify({'sensor': sensor})


@app.route('/api/v1.1/sensor/<times>', methods=['GET'])
def get_sensorReadingsAvg(times):
    humidity = []
    temp = []
    pressure = []
    orient = []
    orientRaw = []
    compass = []
    compassRaw = []
    gyro = []
    gyroRaw = []
    accel = []
    accelRaw = []
    sensorList = defaultdict(list)
    sensorList["humidity"] = humidity
    sensorList["temp"] = temp
    sensorList["pressure"] = pressure
    sensorList["orient"] = orient
    sensorList["orientRaw"] = orientRaw
    sensorList["compass"] = compass
    sensorList["compassRaw"] = compassRaw
    sensorList["gyro"] = gyro
    sensorList["gyroRaw"] = gyroRaw
    sensorList["accel"] = accel
    sensorList["accelRaw"] = accelRaw
    finalSensorData = {}
    for _ in xrange(int(times)):
        sensorList = getSingleSensorReading(sensorList)
        time.sleep(1)
    #sum(int(i) for i in data) 
    finalSensorData['humidity'] = sum(sensorList['humidity'])/len(sensorList['humidity'])
    finalSensorData['temp'] = sum(sensorList['temp'])/len(sensorList['temp'])
    finalSensorData['pressure'] = sum(sensorList['pressure'])/len(sensorList['pressure'])
    #finalSensorData['orient'] = sum(sensorList['orient'])/len(sensorList['orient'])
    #finalSensorData['orientRaw'] = sum(sensorList['orientRaw'])/len(sensorList['orientRaw'])
    #finalSensorData['compass'] = sum(sensorList['compass'])/len(sensorList['compass'])
    #finalSensorData['compassRaw'] = sum(sensorList['compassRaw'])/len(sensorList['compassRaw'])
    #finalSensorData['gyro'] = sum(sensorList['gyro'])/len(sensorList['gyro'])
    #finalSensorData['gyroRaw'] = sum(sensorList['gyroRaw'])/len(sensorList['gyroRaw'])
    #finalSensorData['accel'] = sum(sensorList['accel'])/len(sensorList['accel'])
    #finalSensorData['accelRaw'] = sum(sensorList['accelRaw'])/len(sensorList['accelRaw'])
    returnData = {'avgs': jsonify(finalSensorData), 'raw': jsonify(sensorList)}
    print sensorList
    return sensorList


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not data found on sensor'}), 404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
