const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSalesOne = async (productId, quantity) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: [{ productId, quantity }] }));

  const createSalesOthers = async (pack) => connection()
.then((db) => db.collection('sales').insertOne({ itensSold: [...pack] }));

  const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => {
      const element = [];
      for (let index = 0; index < sales.length; index += 1) {
        element.push(sales[index]);
      }
      const obj = element.map((elem) => elem);
       return obj;
    });
 
  const findById = async (id) => {
    try {
    const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
    return sale;
  } catch (error) {
      return null;
    } 
  };

  const update = async (id, pack) => {
   await connection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: pack } }));
};

  const delSales = async (id) => {
    await connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createSalesOne,
  getAll,
  findById,
  update,
  delSales,
  createSalesOthers,
};
