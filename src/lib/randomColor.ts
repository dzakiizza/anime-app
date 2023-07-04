const randomColor = () => {
  const hexString = "0123456789abcdef";
  let hexCode = "#";
  [...Array(6)].forEach(() => {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  });
  return hexCode;
};

export default randomColor;
