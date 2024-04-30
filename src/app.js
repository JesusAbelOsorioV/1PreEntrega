import express from 'express'
// import indexRouter from './routers/index.router.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () =>{
    console.log('Servidor Corriendo en el puerto 8080.');
});

const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter);
app.use('/api', productsRouter);
app.use('/api', cartsRouter);

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
})
