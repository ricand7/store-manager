const { ObjectId } = require('mongodb');
const connection = require('./connection');


  const nameNotRepeat = async () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((products) => products);



const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const getAll = async () => {
  const con = await connection();
  const resultado = await con.collection('products').find({}).toArray();
  return resultado;
};

const findById = async (id) => {  
    const oneProduct = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    return oneProduct;
};

// re3 
const update = async (id, name, quantity) => {
 console.log(id);
   await connection()
  .then((db) => db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

  const del = async (id) => {
     await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  };

module.exports = {
  create,
  nameNotRepeat,
  getAll,
  findById,
  update,
  del,
};
