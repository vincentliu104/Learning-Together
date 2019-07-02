const Joi = require('@hapi/joi');

const array = Joi.array().items(Joi.string().valid('a', 'b'));
const reslut = array.validate(['a', 'b', 'a'], (err, value) => {
  console.log(err);
  console.log(value);
 });

 console.log(Joi.describe(array).items);
 

let service = Joi.object().keys({
  serviceNo: Joi.number().required(),
  serviceName: Joi.string().required(),
}).unknown()

let services = Joi.array().items(service);

let test = Joi.validate(
  [{ serviceNo: 0, serviceName: 'service1' }, { serviceNo: 1, serviceName: 'service2', xxx: 's' }],
  services,
)

console.log(test);
