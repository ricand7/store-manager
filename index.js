const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const Products = require('./controllers/ProductsController');
const Sales = require('./controllers/SalesController');

app.use(bodyParser.json());


app.get('/', (_request, response) => {
  response.send();
});


app.post('/products', Products.create);

app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);


app.put('/products/:id', Products.update);


app.delete('/products/:id', Products.del);


app.post('/sales/', Sales.createSales);


app.get('/sales/:id', Sales.findById);
app.get('/sales', Sales.getAll);


app.put('/sales/:id', Sales.update);


app.delete('/sales/:id', Sales.delSales);
 
app.listen(PORT, () => {
  console.log(`teste na porta ${PORT}`);
});


