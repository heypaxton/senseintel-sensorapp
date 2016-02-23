from sense_hat import SenseHat  
import time  
import sys  
from ISStreamer.Streamer import Streamer  
  
# --------- User Settings ---------
SensorName = "Sensor2"
BUCKET_NAME = ":crown: " + SensorName + " Data"
BUCKET_KEY = "sensehat"
ACCESS_KEY = "LuErsCFNDWS9rhdC3RkR4ZyatPbfR9KE"
SENSOR_LOCATION_NAME = "Base"
MINUTES_BETWEEN_SENSEHAT_READS = 0.1
# ---------------------------------

streamer = Streamer(bucket_name=BUCKET_NAME, bucket_key=BUCKET_KEY, access_key=ACCESS_KEY)
  
sense = SenseHat()  
  
while True:
    # Read the sensors
    temp_c = sense.get_temperature()
    humidity = sense.get_humidity() 
    pressure_mb = sense.get_pressure()
    #tempPressure = sense.get_temperature_from_pressure()
    orient = sense.orientation
    orientRaw = sense.orientation_radians
    compass = sense.compass
    compassRaw = sense.compass_raw
    gyro = sense.gyro
    gyroRaw = sense.gyro_raw
    accel = sense.accel
    accelRaw = sense.accel_raw

    # Format the data
    temp_f = temp_c * 9.0 / 5.0 + 32.0
    temp_f = float("{0:.3f}".format(temp_f))
    humidity = float("{0:.3f}".format(humidity))
    pressure_mb = float("{0:.3f}".format(pressure_mb))
    orient['pitch'] = float("{0:.3f}".format(orient['pitch']))
    orient['roll'] = float("{0:.3f}".format(orient['roll']))
    orient['yaw'] = float("{0:.3f}".format(orient['yaw']))
    orientRaw['pitch'] = float("{0:.3f}".format(orientRaw['pitch']))
    orientRaw['roll'] = float("{0:.3f}".format(orientRaw['roll']))
    orientRaw['yaw'] = float("{0:.3f}".format(orientRaw['yaw']))
    compass = float("{0:.3f}".format(compass))
    compassRaw['x'] = float("{0:.3f}".format(compassRaw['x']))
    compassRaw['y'] = float("{0:.3f}".format(compassRaw['y']))
    compassRaw['z'] = float("{0:.3f}".format(compassRaw['z']))
    gyro['pitch'] = float("{0:.3f}".format(gyro['pitch']))
    gyro['roll'] = float("{0:.3f}".format(gyro['roll']))
    gyro['yaw'] = float("{0:.3f}".format(gyro['yaw']))
    gyroRaw['x'] = float("{0:.3f}".format(gyroRaw['x']))
    gyroRaw['y'] = float("{0:.3f}".format(gyroRaw['y']))
    gyroRaw['z'] = float("{0:.3f}".format(gyroRaw['z']))
    accel['pitch'] = float("{0:.3f}".format(accel['pitch']))
    accel['roll'] = float("{0:.3f}".format(accel['roll']))
    accel['yaw'] = float("{0:.3f}".format(accel['yaw']))
    accelRaw['x'] = float("{0:.3f}".format(accelRaw['x']))
    accelRaw['y'] = float("{0:.3f}".format(accelRaw['y']))
    accelRaw['z'] = float("{0:.3f}".format(accelRaw['z']))

    # Print and stream 
    print SENSOR_LOCATION_NAME + " Temperature(F): " + str(temp_f)
    print SENSOR_LOCATION_NAME + " Humidity(%): " + str(humidity)
    print SENSOR_LOCATION_NAME + " Pressure(mb): " + str(pressure_mb)
    print SENSOR_LOCATION_NAME + " Orientation-Pitch(degrees): " + str(orient['pitch'])
    print SENSOR_LOCATION_NAME + " Orientation-Roll(degrees): " + str(orient['roll'])
    print SENSOR_LOCATION_NAME + " Orientation-Yaw(degrees): " + str(orient['yaw'])
    print SENSOR_LOCATION_NAME + " Orientation-Pitch(radians): " + str(orientRaw['pitch'])
    print SENSOR_LOCATION_NAME + " Orientation-Roll(radians): " + str(orientRaw['roll'])
    print SENSOR_LOCATION_NAME + " Orientation-Yaw(radians): " + str(orientRaw['yaw'])
    print SENSOR_LOCATION_NAME + " Compass-X(degrees[from N]): " + str(compass)
    print SENSOR_LOCATION_NAME + " Compass-Y(microTeslas): " + str(compassRaw['x'])
    print SENSOR_LOCATION_NAME + " Compass-Z(microTeslas): " + str(compassRaw['y'])
    print SENSOR_LOCATION_NAME + " Compass(microTeslas): " + str(compassRaw['z'])
    print SENSOR_LOCATION_NAME + " Gyroscope-Pitch(degrees): " + str(gyro['pitch'])
    print SENSOR_LOCATION_NAME + " Gyroscope-Roll(degrees): " + str(gyro['roll'])
    print SENSOR_LOCATION_NAME + " Gyroscope-Yaw(degrees): " + str(gyro['yaw'])
    print SENSOR_LOCATION_NAME + " Gyroscope-X(radians/s): " + str(gyroRaw['x'])
    print SENSOR_LOCATION_NAME + " Gyroscope-Y(radians/s): " + str(gyroRaw['y'])
    print SENSOR_LOCATION_NAME + " Gyroscope-Z(radians/s): " + str(gyroRaw['z'])
    print SENSOR_LOCATION_NAME + " Accelerometer-Pitch(degrees): " + str(accel['pitch'])
    print SENSOR_LOCATION_NAME + " Accelerometer-Roll(degrees): " + str(accel['roll'])
    print SENSOR_LOCATION_NAME + " Accelerometer-Yaw(degrees): " + str(accel['yaw'])
    print SENSOR_LOCATION_NAME + " Accelerometer-X(Gs): " + str(accelRaw['x'])
    print SENSOR_LOCATION_NAME + " Accelerometer-Y(Gs): " + str(accelRaw['y'])
    print SENSOR_LOCATION_NAME + " Accelerometer-Z(Gs): " + str(accelRaw['z'])
    
    streamer.log(":sunny: " + SENSOR_LOCATION_NAME + " Temperature(F)", temp_f)
    streamer.log(":sweat_drops: " + SENSOR_LOCATION_NAME + " Humidity(%)", humidity)
    streamer.log(":cloud: " + SENSOR_LOCATION_NAME + " Pressure(IN)", pressure_mb)
    streamer.log(SENSOR_LOCATION_NAME + " Orientation-Pitch(degrees)", orient['pitch'])
    streamer.log(SENSOR_LOCATION_NAME + " Orientation-Roll(degrees)", orient['roll'])
    streamer.log(SENSOR_LOCATION_NAME + " Orientation-Yaw(degrees)", orient['yaw'])
    streamer.log(SENSOR_LOCATION_NAME + " Orientation-Pitch(radians)", orientRaw['pitch'])
    streamer.log(SENSOR_LOCATION_NAME + " Orientation-Roll(radians)", orientRaw['roll'])
    streamer.log(SENSOR_LOCATION_NAME + " Orientation-Yaw(radians)", orientRaw['yaw'])
    streamer.log(SENSOR_LOCATION_NAME + " Compass(degrees[from N])", compass)
    streamer.log(SENSOR_LOCATION_NAME + " Compass-X(microTeslas)", compassRaw['x'])
    streamer.log(SENSOR_LOCATION_NAME + " Compass-Y(microTeslas)", compassRaw['y'])
    streamer.log(SENSOR_LOCATION_NAME + " Compass-Z(microTeslas)", compassRaw['z'])
    streamer.log(SENSOR_LOCATION_NAME + " Gyroscope-Pitch(degrees)", gyro['pitch'])
    streamer.log(SENSOR_LOCATION_NAME + " Gyroscope-Roll(degrees)", gyro['roll'])
    streamer.log(SENSOR_LOCATION_NAME + " Gyroscope-Yaw(degrees)", gyro['yaw'])
    streamer.log(SENSOR_LOCATION_NAME + " Gyroscope-X(radians/s)", gyroRaw['x'])
    streamer.log(SENSOR_LOCATION_NAME + " Gyroscope-Y(radians/s)", gyroRaw['y'])
    streamer.log(SENSOR_LOCATION_NAME + " Gyroscope-Z(radians/s)", gyroRaw['z'])
    streamer.log(SENSOR_LOCATION_NAME + " Accelerometer-Pitch(degrees)", accel['pitch'])
    streamer.log(SENSOR_LOCATION_NAME + " Accelerometer-Roll(degrees)", accel['roll'])
    streamer.log(SENSOR_LOCATION_NAME + " Accelerometer-Yaw(degrees)", accel['yaw'])
    streamer.log(SENSOR_LOCATION_NAME + " Accelerometer-X(Gs)", accelRaw['x'])
    streamer.log(SENSOR_LOCATION_NAME + " Accelerometer-Y(Gs)", accelRaw['y'])
    streamer.log(SENSOR_LOCATION_NAME + " Accelerometer-Z(Gs)", accelRaw['z'])

    streamer.flush()
    time.sleep(60*MINUTES_BETWEEN_SENSEHAT_READS)