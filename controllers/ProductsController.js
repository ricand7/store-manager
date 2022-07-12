const Product = require('../services/ProductsServices');

const INVALID = 'invalid_data';
const MESSAGE = 'Wrong id format';

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, result, err } = await Product.create(name, quantity);
  if (!result) return res.status(code).json({ err });

  res.status(code).json(result);
};

const getAll = async (req, res) => {
  const products = await Product.getAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
    const resultado = await Product.findById(id);
    if (resultado.err) return res.status(422).json({ err: { code: INVALID, message: MESSAGE } });
  res.status(200).json(resultado);
};

const update = async (req, res) => {
    try {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const { code, object, err } = await Product.update(id, name, quantity);

  if (!object) return res.status(code).json({ err });
  console.log('teste', object);
  return res.status(code).json(object);
} catch (error) {
  return res.status(200).json({ message: 'erro interno' });
}
};

const del = async (req, res) => {
  const { id } = req.params;
  const { product, err } = await Product.del(id);
  if (!product) return res.status(422).json({ err });
  return res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  del,
};
