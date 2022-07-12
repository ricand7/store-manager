const Sales = require('../services/Sales');

const createSales = async (req, res) => {
  const pack = req.body;
  const result = await Sales.createSales(pack);
  if (result.err) {
    return res.status(422).json({ err: { code: result.err.code, message: result.err.message } });
  } 
 
  res.status(200).json(result);
};
     
const getAll = async (req, res) => {
  const sales = await Sales.getAll();
  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { code, sale, err } = await Sales.findById(id);
   if (!sale) return res.status(code).json({ err });
   return res.status(code).json(sale);
};

const update = async (req, res) => {
 const { id } = req.params;
 const packBody = req.body;
 const result = await Sales.update(id, packBody);
 if (result.err) {
  return res.status(422).json({ err: { code: result.err.code, message: result.err.message } });
} 
res.status(200).json(result);
};

const delSales = async (req, res) => {
  const { id } = req.params;
  const { sales, err } = await Sales.delSales(id);
  console.log(sales);
  if (!sales) return res.status(422).json({ err });
  return res.status(200).json(sales);
};

module.exports = {
  createSales,
  findById,
  getAll,
  update,
  delSales,
};
