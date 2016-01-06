#!flask/bin/python
from flask import Flask, jsonify, make_response
#from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

sensor1 = [
    {
        'humidity': 75,
        'temp': 30,
        'tempHumidity': 32,
        'tempPressure': 27,
        'pressure': 460,
        'orient': [54, 34, 86],
        'orientRaw': [1.6, .7, 2.4],
        'compass': 56,
        'compassRaw': [1.6, .7, 2.4],
        'gyro': [54, 34, 86],
        'gyroRaw': [1.6, .7, 2.4],
        'accel': [54, 34, 86],
        'accelRaw': [.33, 2.5, 5.7]
    }
]
sensor2 = [
    {
        'humidity': 35,
        'temp': 10,
        'tempHumidity': 12,
        'tempPressure': 7,
        'pressure': 760,
        'orient': [34, 64, 76],
        'orientRaw': [3.6, .2, 1.4],
        'compass': 16,
        'compassRaw': [3.6, .8, 1.4],
        'gyro': [24, 14, 66],
        'gyroRaw': [.6, 1.7, 4.4],
        'accel': [74, 54, 26],
        'accelRaw': [2.33, 1.5, 4.7]
    }
]

#sched = Scheduler()
#sched.start()

#def some_job():
    #print "Every 10 seconds"

#sched.add_interval_job(some_job, seconds = 1)

#sched.shutdown()
@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/v1.0/sensor/1', methods=['GET'])
def get_sensor1Readings():
    #for x in xrange(10):
      #sensorReadings  
    return jsonify({'sensor': sensor1})

@app.route('/api/v1.0/sensor/2', methods=['GET'])
def get_sensor2Readings():
    return jsonify({'sensor': sensor2})

@app.route('/api/v1.0/sensor/3', methods=['GET'])
def get_bothSensorReadings():
    return jsonify({'sensor1': sensor1, 
                    'sensor2': sensor2})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)