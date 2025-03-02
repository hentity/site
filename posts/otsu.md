---
title: "Otsu's binarisation algorithm: How I digitise sketches for the web"
category: "Tech"
date: "2024-12-14"
coverImage: "/img/otsu/otsu1.png"
description: "Ever wanted to turn your hand-drawn sketches into crisp, web-ready images without losing their charm? I built a simple Python tool to do just that, using Otsu’s binarisation algorithm to clean up and digitise my terrible drawings. In this post, I'll walk you through how it works — and how you can use it too :)"
isNew: "False"
---

Ever wanted to turn your hand-drawn sketches into crisp, web-ready images without losing their charm? I built a simple Python tool to do just that, using Otsu’s binarisation algorithm to clean up and digitise my sketches. In this post, I'll explain how Otsu's algorithm works and how I implemented it in a Python tool.

### What is Otsu's Binarisation?

Otsu's binarisation is an automatic thresholding method developed by Nobuyuki Otsu. It finds an optimal threshold value to separate an image into foreground (ink) and background (paper) by minimising the variance within each class of pixels. Unlike manually choosing a threshold, Otsu's method ensures the best possible contrast between dark and light regions.

### The math

The idea behind Otsu's algorithm is to treat an image as a histogram of grayscale pixel values (0 for black, 255 for white). The goal is to find a threshold $T$ that divides the pixels into two groups and maximises the variance between groups.

1. Count how many times each grayscale value appears in the image and create a histogram.
2. For each possible threshold, split the pixels into two groups: Foreground ($>T$) and background ($<T$)
3. Calculate the variance between each group:
   - Compute weights $\omega_f$ and $\omega_b$ (proportion of pixels in the foreground and background respectively)
   - Find the mean intensity $\mu_f$ and $\mu_b$ for each group
   - Calculate the inter-class variance $\sigma$ using $\sigma^2=\omega_f\omega_b(\mu_f-\mu_b)^2$
4. Choose the threshold that maximises this variance.

### Python implementation

Now, let's look at how I implemented this in Python.

**1. Load and Preprocess the Image**

Since I sometimes work with HEIC images (from iPhones), my tool first converts them into a format that OpenCV can handle:

```python
from PIL import Image, UnidentifiedImageError
import pillow_heif
import numpy as np

def load_image(input_path):
    """
    Loads an image, converting HEIC to grayscale if needed.
    """

    try:
        if input_path.lower().endswith(".heic"):
            heif_image = pillow_heif.open_heif(input_path)
            image = Image.frombytes(heif_image.mode, heif_image.size, heif_image.data)
            image = image.convert("L")
    else:
        image = Image.open(input_path).convert("L")

    return np.array(image)
    except UnidentifiedImageError:
        raise ValueError(
            f"""
            Error: Unable to load image '{input_path}'.
            Unsupported format or corrupted file.
            """
        )
```

This function reads an image, converts it to grayscale, and returns it as a NumPy array.

**2. Compute the Otsu Threshold**

The following function calculates the Otsu threshold:

```python
import numpy as np

def calculate_otsu_threshold(image):
    """
    Computes the Otsu threshold for an image.

    1. Compute the histogram of pixel intensities.
    2. Iterate over all possible thresholds to find the one
       that minimizes intra-class variance.
    3. Return the optimal threshold value.
    """
    hist, bins = np.histogram(image.ravel(), bins=256, range=(0, 256))

    total_pixels = image.size  # total number of pixels in the image
    sum_all = np.dot(np.arange(256), hist)  # sum of all pixel intensities

    best_threshold = 0
    max_between_class_variance = 0
    weight_background = 0
    sum_background = 0

    # for each possible threshold
    for t in range(256):
        # find variance between threshold-seperated classes
        weight_background += hist[t]
        if weight_background == 0:
            continue

        weight_foreground = total_pixels - weight_background
        if weight_foreground == 0:
            break

        sum_background += t * hist[t]
        mean_background = sum_background / weight_background
        mean_foreground = (sum_all - sum_background) / weight_foreground

        between_class_variance = (
            weight_background
            * weight_foreground
            * (mean_background - mean_foreground) ** 2
        )

        # keep track of optimal treshold
        if between_class_variance > max_between_class_variance:
            max_between_class_variance = between_class_variance
            best_threshold = t

    return best_threshold

```

**3. Apply threshold and save as transparent PNG**

Once we have the threshold, we apply it to create a binary (black and white) image:

```python
def process_image(input_path, output_path):
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Error: Input file '{input_path}' not found.")

    # load image
    image = load_image(input_path)

    # gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(image, (5, 5), 0)

    # compute otsu's threshold manually
    otsu_threshold = calculate_otsu_threshold(blurred)

    # apply thresholding
    binary = np.where(blurred >= otsu_threshold, 255, 0).astype(np.uint8)

    # invert colors so ink is black and paper is white
    binary = cv2.bitwise_not(binary)

    # convert to rgba
    h, w = binary.shape
    result = np.zeros((h, w, 4), dtype=np.uint8)
    result[:, :, 0:3] = 0
    result[:, :, 3] = binary

    # save as transparent PNG
    try:
        final_image = Image.fromarray(result)
        final_image.save(output_path, format="PNG")
        print(f"Processed image saved to {output_path}")
    except Exception as e:
        raise ValueError(f"Error: Unable to save image '{output_path}'. {e}")

```

This function applies a Gaussian blur (to reduce noise), thresholds the image, inverts colors, and saves it as a transparent PNG.

**Why This Works Well for Sketches**

Otsu's method is ideal for sketches because it adapts to each image dynamically. Unlike a fixed threshold, it finds the best cutoff point for each drawing, ensuring a clean, high-contrast result regardless of variations in lighting, ink or paper colour. The transparent PNG output makes it easy to use these sketches on websites without worrying about backgrounds clashing with the page.

If you’re interested in trying it yourself, you can find the code and installation instructions [on github](https://github.com/hentity/pen2png).
