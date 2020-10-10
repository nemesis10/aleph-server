const { default: validator } = require("validator");

exports.invalidString = (value, minLength) => {
  return (
    validator.isEmpty(value) ||
    (minLength && !validator.isLength(postInput.title, { min: minLength }))
  );
};
