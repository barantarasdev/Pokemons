const validation =
  (schema) =>
  async ({ body }, res, next) => {
    try {
      // abortEarly -> Get all errors
      await schema.validate(body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).send({ error: error.errors });
    }
  };

module.exports = { validation };
