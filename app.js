const express = require('express');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
require('express-async-errors');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', router.productRouter);
app.use('/sales', router.saleRouter);
app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;