const { ObjectId } = require('mongodb');
const Sales = require('../models/SalesModels');

const INVALID = 'invalid_data';
const MESSAGEWRONG = 'Wrong product ID or invalid quantity';

 const getAll = async () => {
  const allSales = await Sales.getAll();

  return { sales: [...allSales] };
};

const validaMany = (p) => {
  for (let i = 0; i < p.length; i += 1) {
    if (!Number.isInteger(p[i].quantity) || p[i].quantity < 0 || p[i].quantity === 0) return false;
    }
    return true;
};

 const createSales = async (pack) => {
    if (!validaMany(pack)) {
      return { code: 422, err: { code: 'invalid_data', message: MESSAGEWRONG } };
  }
    const { insertedId } = await Sales.createSalesOthers(pack);
    return { _id: insertedId,
      itensSold: [
        ...pack,
      ],
    };    
 };

const findById = async (id) => {
  const sale = await Sales.findById(id);
  if (!sale) return { code: 404, err: { code: 'not_found', message: 'Sale not found' } };
   return { code: 200, sale };
 };

const update = async (id, pack) => { 
  if (!validaMany(pack)) {
    return { code: 422, err: { code: 'invalid_data', message: MESSAGEWRONG } };
}
   await Sales.update(id, pack);
   
   return {
     _id: id,
     itensSold: [
      ...pack,
    ],
   };
};

const delSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  const findId = await Sales.findById(id);
  const sales = findId;
  if (findId) {
    await Sales.delSales(id);
    return { code: 200, sales };    
  }   
   return { code: 422, err: { code: INVALID, message: 'Wrong sale ID format' } };
};

module.exports = {
  getAll,
  createSales,
  findById,
  update,
  delSales, 
 };
