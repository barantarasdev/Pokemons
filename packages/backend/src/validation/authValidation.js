const yup = require('yup');
const { VALIDATION_MESSAGE } = require('../constants/validation');

const authSchema = yup.object({
  nonce: yup
    .string()
    .required(VALIDATION_MESSAGE.REQUIRED('Nonce'))
    .min(3, VALIDATION_MESSAGE.MIN(3)),
  address: yup
    .string()
    .required(VALIDATION_MESSAGE.REQUIRED('Address'))
    .min(3, VALIDATION_MESSAGE.MIN(3)),
  signature: yup
    .string()
    .required(VALIDATION_MESSAGE.REQUIRED('Signature'))
    .min(3, VALIDATION_MESSAGE.MIN(3)),
});

module.exports = { authSchema };
