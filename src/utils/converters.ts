import { log } from './logsUtils';

const rgbToHex = (rgbString = '') => {
  const rgbArray = rgbString
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map(n => parseInt(n, 10));

  return `#${rgbArray
    .map(x => {
      const hex = x.toString(16).toUpperCase();
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;
};

const rgbaToHex = (rgbaString = '') => {
  const rgbaArray = rgbaString
    .replace('rgba(', '')
    .replace(')', '')
    .split(',')
    .map((n, i) => (i !== 3 ? parseInt(n, 10) : parseFloat(n)));
  return `${rgbToHex(`rgb(${rgbaArray.slice(0, 3).join(',')})`)}  ${(rgbaArray[3] * 100).toFixed(2)}`;
};

const formatSecToYodaTime = (seconds = 1) => {
  const isoString = new Date(seconds * 1000).toISOString();
  if (seconds >= 3600) {
    return isoString.substr(11, 8);
  }
  return isoString.substr(14, 5);
};

const convertGainFormat = (lg: number) => {
  const stringGain = `${Math.abs(lg) * 100}`.split('.');
  let res;
  if (stringGain[1]) {
    res = (Math.abs(lg) * 100).toFixed(2);
  } else {
    res = Math.abs(lg) * 100;
  }
  return `${lg > 0 ? '+' : '-'}${res}%`;
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const getAspectRatio = (width: number, height: number) => {
  const ratio = gcd(width, height);
  log('~ getAspectRatio ~ ', `${width / ratio}/${height / ratio}`);
  return width / ratio / (height / ratio);
};

export {
  rgbToHex,
  rgbaToHex,
  formatSecToYodaTime,
  convertGainFormat,
  gcd,
  getAspectRatio,
};
