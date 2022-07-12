const { ObjectId } = require('mongodb');
const Products = require('../models/ProductsModels');

const INVALID = 'invalid_data';
const NAME5CAR = '"name" length must be at least 5 characters long';
const QNUM = '"quantity" must be a number';
const LARGER = '"quantity" must be larger than or equal to 1';

const getNewProducts = ({ id, name, quantity }) => ({
    _id: id,
    name,
    quantity,
  });

  const validaMany = (name, quantity) => {
  if (name.length < 5) return { code: 422, err: { code: INVALID, message: NAME5CAR } };
  if (!Number.isInteger(quantity)) return { code: 422, err: { code: INVALID, message: QNUM } };
  if (quantity < 0 || quantity === 0) return { code: 422, err: { code: INVALID, message: LARGER } };
  return true;
  };

const create = async (name, quantity) => {
  const validEtapOne = await Products.nameNotRepeat();
  const validEtapTwo = validEtapOne.find((r) => r.name === name);
   
  if (validEtapTwo) return { code: 422, err: { code: INVALID, message: 'Product already exists' } };
  if (validaMany(name, quantity).code) return validaMany(name, quantity);
    const { insertedId } = await Products.create(name, quantity);
    const result = getNewProducts({
      id: insertedId,
      name,
      quantity,
    });
    return { code: 201, result };
};

const getAll = async () => {
  const allProducts = await Products.getAll();
  return { products: [...allProducts] };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  const result = await Products.findById(id);
   if (!result) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
   return result;
};

const update = async (id, name, quantity) => {
  if (name.length < 5) return { code: 422, err: { code: INVALID, message: NAME5CAR } };
  if (!Number.isInteger(quantity)) return { code: 422, err: { code: INVALID, message: QNUM } };
  if (quantity < 0 || quantity === 0) return { code: 422, err: { code: INVALID, message: LARGER } };

  await Products.update(id, name, quantity);
  const object = getNewProducts({
    id,
    name,
    quantity,
  });

  return { code: 200, object };
};

const del = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  const product = await Products.findById(id); 
  const tryDel = await Products.del(id);
  if (!tryDel) {
    return { code: 200, product };
  }  

    return { code: 422, err: { code: 'invalid_data', message: 'fdfdf' } };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  del,
};
