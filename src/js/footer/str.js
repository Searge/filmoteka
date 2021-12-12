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
