const lineColor = '#000c2412';
module.exports = {
  textColors: {
    black: '#151515',
    white: '#FFF',
    gray: '#808390',
    lightGray: '#B1B1B1',
  },
  backgroundColors: {
    gray: '#808390',
    white: '#FFF',
    lightGray: '#F7F6F7'
  },
  lineColor,
  borderColor: '#EEEEEE',
  shadowColor: '#E2E2E2',
  topLine: `border-top: 1px solid ${lineColor};`,
  bottomLine: `border-bottom: 1px solid ${lineColor};`,
  hoverAnimation: 'transition: background-color 200ms ease-in-out 0s,border-color 200ms ease-in-out 0s;',
};