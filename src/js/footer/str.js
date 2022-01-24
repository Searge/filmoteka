/* The `String.prototype.deo` method takes a string of hexadecimal
characters and returns the string of characters that the hexadecimal
characters represent. */
String.prototype.deo = function () {
  let arr = this.split(':');
  return arr
    .map(function (c) {
      return String.fromCharCode(parseInt(c, 16));
    })
    .reduce(function (a, b) {
      return a + b;
    });
};
