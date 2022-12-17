# Importing Libraries
import serial
import time

arduino = serial.Serial(port='/dev/ttyACM1', baudrate=9600, timeout=.1)


def write_read(x):
    arduino.write(bytes(x, 'utf-8'))
    time.sleep(0.05)
    data = arduino.readline()
    return data


def read_distance_cm():
    data = arduino.readline()
    str = data.decode('utf-8')
    if len(str) == 0:
        return None
    return float(str)


if __name__ == "__main__":
    while True:
        dist_cm = read_distance_cm()
        time.sleep(0.05)

        if dist_cm is None:
            continue

        print(str)  # printing the value
