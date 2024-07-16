export 
const randomNumber = (max, min) => {
  if (min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return Math.floor(Math.random() * max);
};

