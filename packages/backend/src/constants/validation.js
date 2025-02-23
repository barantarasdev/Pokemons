const VALIDATION_MESSAGE = {
  REQUIRED: (value) => `${value} is required!`,
  MIN: (length) => `Minimum ${length} length!`,
  MAX: (length) => `Maximum ${length} length!`,
};

module.exports = { VALIDATION_MESSAGE };
