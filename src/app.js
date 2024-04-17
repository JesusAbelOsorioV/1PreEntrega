import express from 'express'
import indexRouter from './routers/index.router.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import { __dirname } from './utils.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/api', productsRouter);
app.use('/api', cartsRouter);


app.listen(8080, () =>{
    console.log('Servidor Corriendo en el puerto 8080.');
});