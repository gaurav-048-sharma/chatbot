import cv2

image = cv2.imread(r"C:\Users\rohan\OneDrive\Desktop\working folder\CollegeFile\pexels-souvenirpixels-414612.jpg")
if image is None:
    print("Image not found or path is incorrect.")
    exit()
else:
    desired_width = 800
    height, width = image.shape[:2]
    if width != desired_width:
        aspect_ratio = height / width
        new_height = int(desired_width * aspect_ratio)
        image = cv2.resize(image, (desired_width, new_height))
        cv2.imshow("Resized Image", image)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    edges = cv2.Canny(gray, 100, 200)
    cv2.imshow("Edges", edges)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    print("Image loaded successfully.")