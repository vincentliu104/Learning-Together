const Joi = require('@hapi/joi');
const moment = require('moment');

const dates = [
  moment().toISOString(),
  moment().subtract(8, 'days').format(),
  moment().subtract(16, 'years').toISOString(),
  '1987-06-11',
]

console.log(`date should less than ${moment().subtract(15, 'years').format()}`);

const dateSchema = Joi.date().iso().less(moment().subtract(15, 'years').format());

dates.forEach((date, i) => {
  console.log(i, date, Joi.validate(date, dateSchema)['error']);
});
