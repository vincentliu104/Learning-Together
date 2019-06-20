const Joi = require('@hapi/joi');

const array = Joi.array().items(Joi.string().valid('a', 'b'));
const reslut = array.validate(['a', 'b', 'a'], (err, value) => {
  console.log(err);
  console.log(value);
 });

 console.log(Joi.describe(array).items);
 