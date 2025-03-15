/**
 * Function to encode a Base64 image string into Base91 for shorter representation
 * @param {string} base64ImageString - Input Base64 image string
 * @returns {string} - Shorter Base91 encoded string
 */

function shortenBase64Image(base64ImageString) {
    const base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = BigInt('0x' + Buffer.from(base64ImageString, 'base64').toString('hex'));
    let encoded = '';
    while (num > 0) {
        encoded = base62Chars[num % 62n] + encoded;
        num /= 62n;
    }
    console.log(encoded)
    return encoded;
}

module.exports = {
    shortenBase64Image
};