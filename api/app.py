#!flask/bin/python
from flask import Flask, jsonify, make_response
from sense_hat import SenseHat
from flask.ext.cors import CORS
#from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
CORS(app)

sense = SenseHat()

sensor1 = [
    {
        'humidity': sense.humidity,
        'temp': sense.temp,
        'tempHumidity': sense.get_temperature_from_humidity(),
        'tempPressure': sense.get_temperature_from_pressure(),
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

#sched = Scheduler()
#sched.start()

#def some_job():
    #print "Every 10 seconds"

#sched.add_interval_job(some_job, seconds = 1)

#sched.shutdown()
@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/v1.0/sensor', methods=['GET'])
def get_sensorReadings():
    #for x in xrange(10):
      #sensorReadings  
    return jsonify({'sensor1': sensor1})


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found on sensor #1'}), 404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)