
const ImageEditor = require('react-native-image-editor');
const RNFS = require('react-native-fs');

/**
 * Compress a base64 image by resizing it
 * @param {String} base64Str - The base64 string (must include MIME type)
 * @param {Number} MAX_WIDTH - Maximum width of the image
 * @param {Number} MAX_HEIGHT - Maximum height of the image
 * @param {Number} QUALITY - Compression quality (0.1 to 1)
 * @returns {Promise<String>} - Resized base64 string
 */
async function compressBase64Image(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450, QUALITY = 0.7) {
    try {
        // Convert base64 to temporary file
        const tempFilePath = `${RNFS.CachesDirectoryPath}/temp_image.jpg`;
        await RNFS.writeFile(tempFilePath, base64Str.split(',')[1], 'base64');

        // Get image dimensions
        const { width, height } = await new Promise((resolve, reject) => {
            Image.getSize(`file://${tempFilePath}`, (w, h) => resolve({ width: w, height: h }), reject);
        });

        // Calculate new dimensions while maintaining aspect ratio
        let newWidth = width;
        let newHeight = height;

        if (width > height && width > MAX_WIDTH) {
            newHeight = (MAX_WIDTH / width) * height;
            newWidth = MAX_WIDTH;
        } else if (height > MAX_HEIGHT) {
            newWidth = (MAX_HEIGHT / height) * width;
            newHeight = MAX_HEIGHT;
        }

        // Resize image
        const resizedUri = await ImageEditor.cropImage(`file://${tempFilePath}`, {
            offset: { x: 0, y: 0 },
            size: { width, height },
            displaySize: { width: newWidth, height: newHeight },
            resizeMode: 'contain',
        });

        // Convert resized image back to base64
        const resizedBase64 = await RNFS.readFile(resizedUri.replace('file://', ''), 'base64');

        // Return compressed base64 string with proper MIME type
        return `data:image/jpeg;base64,${resizedBase64}`;
    } catch (error) {
        console.error('Error compressing base64 image:', error);
        return base64Str; // Return original image if an error occurs
    }
}

module.exports = compressBase64Image;
