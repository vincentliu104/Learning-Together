const Joi = require('@hapi/joi');
const boolean = Joi.boolean();

boolean.validate(1, (err, value) => { 
  console.log(err);
  console.log(value);
}); // Invalid

boolean.validate(true, (err, value) => { 
  console.log(err);
  console.log(value);
}); // Valid

boolean.validate(false, (err, value) => { 
  console.log(err);
  console.log(value);
}); // Valid

boolean.validate("true", (err, value) => { 
  console.log(err);
  console.log(value);
}); // Valid

boolean.validate("false", (err, value) => { 
  console.log(err);
  console.log(value);
}); // Valid