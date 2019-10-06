const Joi = require('@hapi/joi');

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

let stripSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().strip()
});

let stripResult = stripSchema.validate({ username: 'test', password: 'hunter2' }, (err, value) => {
  // value = { username: 'test' }
  console.log(err);
  console.log(value);
});

stripSchema = stripSchema = Joi.array().items(Joi.string(), Joi.any().strip());
console.log(Joi.describe(stripSchema));


stripResult = stripSchema.validate(['one', 'two', true, false, 1, 2], (err, value) => {
  // value = ['one', 'two']
  console.log(err);
  console.log(value);
});

const tagSchema = Joi.any().tags(['api', 'user']);
console.log(Joi.describe(tagSchema));

const unitSchema = Joi.number().unit('milliseconds');
console.log(Joi.describe(unitSchema));

const validSchema = {
  a: Joi.any().valid('a'),
  b: Joi.any().valid('b', 'B'),
  c: Joi.any().valid(['c', 'C'])
};
console.log(Joi.describe(validSchema).children);