export const formatTime = (time) => {
  const split = time.split(':');
  return split[0] === '24'
    ? `12:${split[1]} am`
    : split[0] > 12
    ? `${split[0] - 12}:${split[1]} pm`
    : `${time} am`;
};

export const getImageUrl = (imageName) => {
  return `http://192.168.1.26:5000/public/images/${imageName}`;
};

export const getOrderStatus = (status) => {
  let orderStatus;
  switch (status) {
    case 1:
      orderStatus = 'Confirmed';
      break;
    case 2:
      orderStatus = 'Accepted';
      break;
    case 3:
      orderStatus = 'Picked Up';
      break;
    case 4:
      orderStatus = 'Delivered';
      break;
    case 5:
      orderStatus = 'Cancelled';
      break;
    default:
      orderStatus = 'Pending';
  }
  return orderStatus;
};
