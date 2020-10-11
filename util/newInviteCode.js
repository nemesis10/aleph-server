module.exports = () =>
  parseInt(
    new Date().getTime() + "" + (Math.floor(Math.random() * 10e4) % 10e2)
  ).toString(36);
