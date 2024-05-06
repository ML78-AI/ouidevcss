from PIL import Image
import numpy as np

image_path = "../assets/images/napoleon.jpg"
image = np.array(Image.open(image_path))
start = """
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                #napoleon {
                    position: absolute;
                    top: 20%;
                    left: 20%;

"""
end = """
            }
		</style>
	</head>
	<body>
		<div id="napoleon"></div>
	</body>
</html>

"""
box_shadow = "box-shadow:"

def rgb_to_hex(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)


for idx_y, y in enumerate(image):
    for idx_x, x in enumerate(y):
        if (idx_y, idx_x) == (image.shape[0]-1, image.shape[1]-1):
            pixel = f"{idx_x}px {idx_y}px 0px 1px {rgb_to_hex(x[0], x[1], x[2])}"
        else:
            pixel = f"{idx_x}px {idx_y}px 0px 1px {rgb_to_hex(x[0], x[1], x[2])},\n"
        box_shadow += pixel
    box_shadow += "\n"

with open("./napoleon.html", "w") as f:
    f.write(f"{start}{box_shadow[:-1]};{end}")