const Joi = require('@hapi/joi');

Joi.alternatives().try(
    Joi.object().keys({
        a: Joi.string().min(1),
        b: Joi.string().only('')
    }),
    Joi.object().keys({
        a: Joi.string().only(''),
        b: Joi.string().min(1)
    })

const datas =[
  {
    id: '123',
    phone: '123',
  },
  {
    id: '123',
    name: '123',
  },
  {
    phone: '123',
    name: '123',
  }
]

datas.forEach((data, i) =>{
  console.log(i, Joi.validate(data, schema)['error']);
  
})
