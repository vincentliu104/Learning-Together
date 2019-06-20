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

const any = Joi.any();
const anyResult = any.validate('a', (err, value) => { });
console.log(anyResult);


const getSchema = Joi.string();
console.log(getSchema.schemaType);


const generateUsername = (context) => {

  return context.firstname.toLowerCase() + '-' + context.lastname.toLowerCase();
};
generateUsername.description = 'generated username';

const defaultSchema = {
    username: Joi.string().default(generateUsername),
    firstname: Joi.string(),
    lastname: Joi.string(),
    created: Joi.date().default(Date.now, 'time of creation'),
    status: Joi.string().default('registered')
};

Joi.validate({
    firstname: 'Jane',
    lastname: 'Doe'
}, defaultSchema, (err, value) => {
    console.log(value);

    // value.status === 'registered'
    // value.username === 'jane-doe'
    // value.created will be the time of validation
});

let emptySchema = Joi.string().empty('');
let emptyResult = emptySchema.validate(''); // returns { error: null, value: undefined }
console.log(emptyResult);

emptySchema = emptySchema.empty();
emptyResult= emptySchema.validate(''); // returns { error: "value" is not allowed to be empty, value: '' }
console.log(emptyResult.error);

const timestampSchema = Joi.date().timestamp();
let rawResult = timestampSchema.validate('12376834097810'); // { error: null, value: Sat Mar 17 2362 04:28:17 GMT-0500 (CDT) }
console.log(rawResult);

const rawTimestampSchema = Joi.date().timestamp().raw();
rawResult = rawTimestampSchema.validate('12376834097810'); // { error: null, value: '12376834097810' }
console.log(rawResult);
