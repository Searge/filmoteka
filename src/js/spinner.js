import 'spin.js/spin.css';

var opts = {
  lines: 13, // The number of lines to draw
  length: 3, // The length of each line
  width: 13, // The line thickness
  radius: 30, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 2, // Corner roundness (0..1)
  speed: 1.5, // Rounds per second
  rotate: 2, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#FF6B01', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50vh', // Top position relative to parent
  left: '50vw', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

// const body = document.getElementById('spinner');
// const spinner = new Spinner(opts);

// const startSpin = () => {
//   spinner.spin(body);
// };
// const stopSpin = () => {
//   spinner.stop();
// };

// export { startSpin, stopSpin };

export default opts;
