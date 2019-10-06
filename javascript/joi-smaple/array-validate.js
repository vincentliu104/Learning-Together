const Joi = require('@hapi/joi');

const array = Joi.array().items(Joi.string().valid('a', 'b'));
const reslut = array.validate(['a', 'b', 'a'], (err, value) => {
  // console.log(err);
  // console.log(value);
 });

// console.log(Joi.describe(array).items);

const bodySchema = Joi.object({
  unit: Joi.number().min(0).max(1).required(),
  price: Joi.number().min(100).max(1000).required(),
  exp: Joi.number().min(0).max(11).required(),
  area: Joi.array().items(Joi.number()).required(),
  onsiteOpts: Joi.array().items(Joi.number().min(0).max(2)).required(),
  clientCats: Joi.array().items(Joi.number().min(0).max(5)).required(),
  priority: Joi.array().items(Joi.number().min(1).max(6)).required(),
  desc: Joi.string().allow(''),
}).required()

let service = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  cats: Joi.array().items(Joi.number()).required(),
  body: bodySchema,
  catTag: Joi.array().items(Joi.string()).required(),
}).unknown()

const serviceData = [
  { id: 0, 
    title: 'service1',
    cats: [123, 456],
    body: {
      unit: 0,
      price: 999,
      exp: 5,
      area: [123, 456],
      onsiteOpts: [0, 1, 2],
      clientCats: [0, 1, 2, 3, 4, 5],
      priority: [1, 2, 3, 4, 5, 6],
      desc: '',
    },
    catTag: [],
  },
  { id: 1, title: 'service2', xxx: 's' }
];

let test = Joi.validate(serviceData[0], service)
console.log(test);


let services = Joi.array().items(service);
test = Joi.validate(serviceData, services)
// console.log(test);
