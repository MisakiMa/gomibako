import cv2

cam = cv2.VideoCapture(4)


def take_picture(path_name="image.png"):
    result, image = cam.read()
    if result:
        cv2.imwrite(path_name, image)
