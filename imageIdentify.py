import cv2

image = cv2.imread(r"C:\Users\rohan\OneDrive\Desktop\working folder\CollegeFile\pexels-souvenirpixels-414612.jpg")
if image is None:
    print("Image not found or path is incorrect.")
    exit()
else:
    #cv2.imshow("Image", image)
    # Resize image to a proper width while maintaining aspect ratio
    desired_width = 800
    height, width = image.shape[:2]
    if width != desired_width:
        aspect_ratio = height / width
        new_height = int(desired_width * aspect_ratio)
        image = cv2.resize(image, (desired_width, new_height))
        cv2.imshow("Resized Image", image)
        # Load pre-trained MobileNet SSD model and class labels
        net = cv2.dnn.readNetFromCaffe(
            cv2.data.haarcascades + "../dnn/MobileNetSSD_deploy.prototxt",
            cv2.data.haarcascades + "../dnn/MobileNetSSD_deploy.caffemodel"
        )
        CLASSES = [
            "background", "aeroplane", "bicycle", "bird", "boat",
            "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
            "dog", "horse", "motorbike", "person", "pottedplant",
            "sheep", "sofa", "train", "tvmonitor"
        ]

        # Prepare the image for object detection
        (h, w) = image.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 0.007843, (300, 300), 127.5)
        net.setInput(blob)
        detections = net.forward()

        # Draw bounding boxes and labels
        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > 0.2:
                idx = int(detections[0, 0, i, 1])
                label = CLASSES[idx]
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
                cv2.rectangle(image, (startX, startY), (endX, endY), (0, 255, 0), 2)
                y = startY - 15 if startY - 15 > 15 else startY + 15
                cv2.putText(image, f"{label}: {confidence:.2f}", (startX, y),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        cv2.imshow("Detected Objects", image)
    else:
        cv2.imshow("Resized Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    print("Image loaded successfully.")

