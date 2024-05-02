export const formatTime = (time) => {
  const split = time.split(':');
  return split[0] === '24'
    ? `12:${split[1]} am`
    : split[0] > 12
    ? `${split[0] - 12}:${split[1]} pm`
    : `${time} am`;
};

export const getImageUrl = (imageName) => {
  return `http://localhost:5000/public/images/${imageName}`;
};
