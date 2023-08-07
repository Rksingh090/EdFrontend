/**
 *
 * @param {number} number - The length of the random string.
 * @returns {string} - The random string of the specified length.
 *
 * @example
 * // Example usage
 * const code = generateCodes(10);
 * console.log(code);
 *
 * Output: "X7BNK3R9LZ"
*/

export const generateCodes = (number) => {
    let generated = "";
    for (var i = 0; i < number; i++) {
        generated += generateCode(generated);
          
    }
    return generated.toUpperCase();
}

const generateCode = () => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    return possible.charAt(Math.floor(Math.random() * possible.length));
}