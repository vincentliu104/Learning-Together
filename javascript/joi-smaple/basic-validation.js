const Joi = require('@hapi/joi');

const schema = {
  a: Joi.number()
};

const value = {
  a: '123'
};

Joi.validate(value, schema, (err, value) => { });
// err -> null
// value.a -> 123 (number, not string)

// or
const result = Joi.validate(value, schema);
console.log(Joi.describe(schema));
console.log(result);

// result.error -> null
// result.value -> { "a" : 123 }

// or
const promise = Joi.validate(value, schema);
promise.then((value) => {
  // value -> { "a" : 123 }
});

console.log(Joi.assert('4', Joi.number()));

// Joi.attempt('x', Joi.number()); // throws error
const assertResult = Joi.attempt('4', Joi.number()); // result -> 4
console.log(assertResult);


const refSchema = Joi.object({
  a: Joi.ref('b.c'),
  b: {
      c: Joi.any()
  },
  c: Joi.ref('$x')
});

const refResult = Joi.validate({ a: 5, b: { c: 5 } }, refSchema, { context: { x: 5 } }, (err, value) => {});
// console.log(refSchema);
// console.log(refResult);


const reachSchema = Joi.object({ foo: Joi.object({ bar: Joi.number() }) });
const reachNumber = Joi.reach(reachSchema, 'foo.bar');
// console.log(reachSchema);
// console.log(reachNumber);

//or
const reachResult = Joi.reach(reachSchema, ['foo', 'bar']); //same as number
// console.log(reachResult);