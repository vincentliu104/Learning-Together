const Joi = require('@hapi/joi');

let schema = Joi.string().valid('a').insensitive();
let result = schema.validate('A');
console.log(result);
result = schema.validate('a');
console.log(result);

schema = Joi.string().min(2);
result = schema.validate('好');
console.log(result);
schema = Joi.string().min(2, 'utf8').required()
result = schema.validate('棒');
console.log(result);
schema = Joi.string().max(2);
result = schema.validate('好');
console.log(result);
schema = Joi.string().max(2, 'utf8').required()
result = schema.validate('xo');
console.log(result);

schema = Joi.string().max(2).truncate();
result = schema.validate('xo         ');
console.log(result);

schema = Joi.string().length(2);
result = schema.validate('好棒');
console.log(result);
schema = Joi.string().length(3, 'utf8').required()
result = schema.validate('棒');
console.log(result);

schema = Joi.string().regex(/^[abc]+$/);
result = schema.validate('cba');
console.log(result);
const inlineNamedSchema = Joi.string().regex(/^[0-9]+$/, 'numbers');
result = inlineNamedSchema.validate('123');
console.log(result);
const namedSchema = Joi.string().regex(/^[0-9]+$/, { name: 'numbers'});
result = namedSchema.validate('123');
console.log(result);
const invertedSchema = Joi.string().regex(/^[a-z]+$/, { invert: true });
result = invertedSchema.validate('LOWERCASE');
console.log(result);
const invertedNamedSchema = Joi.string().regex(/^[a-z]+$/, { name: 'alpha', invert: true });
result = invertedNamedSchema.validate('LOWERCASE');
console.log(result);