import moment from "moment";

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const ticksToHours = (ticks) => {
  var hours = Math.round((ticks / (60 * 60 * 10000000)) % 24);
  var mins = Math.round((ticks / (60 * 10000000)) % 60);

  return `0${hours - 1}:${mins}`;
};
