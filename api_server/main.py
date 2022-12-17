from flask import Flask, send_file
from flask_cors import CORS
import threading
from serial_test import read_distance_cm
from take_picture import take_picture
from logging import NullHandler


dist_cm = None  # float | None
streamstop = False
tm = NullHandler


def update_dist_cm():
    global dist_cm
    d = read_distance_cm()
    print(f"d: {d}")
    if d is None:
        return
    dist_cm = d


def tm_callback():
    global tm
    update_dist_cm()
    take_picture("images/image.png")
    tm.cancel()
    del tm
    tm = NullHandler

    if streamstop is False:
        tm = threading.Timer(1, tm_callback)
        tm.start()


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def hello_world():
    return {"distance": dist_cm}


@app.route("/images/<image_file>")
def serve_image(image_file):
    return send_file(f"images/{image_file}")


if __name__ == "__main__":
    tm = threading.Timer(1, tm_callback)
    tm.start()
    app.run(host="0.0.0.0", port=3500, debug=True)
