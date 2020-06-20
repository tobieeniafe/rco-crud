import Joi from '@hapi/joi';

export const productSchema = Joi.object({
  refNo: Joi.string().label('Reference number').required(),
  name: Joi.string().label('Product name').required(),
  image: Joi.string().label('Product image').required(),
  price: Joi.number().label('Product price').required(),
  quantity: Joi.number().label('Product quantity').required(),
  // createdBy: Joi.string().label('Product owner').required(),
});

export const productUpdateSchema = Joi.object({
  email: Joi.string().label('Email Address').email().required(),
});
