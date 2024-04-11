import { Router } from 'express'
import ProductManager from '../ProductManager.js';
const router = Router();
import { json } from 'express';

const productManager = new ProductManager('./Products.json');
const products = await productManager.getProducts();
const PStatus = true

router.use(json());

router.get('/products', async (req, res) =>{
    const limit = parseInt(req.query.limit);
    const product = await productManager.getProducts();

    if(!isNaN(limit) && limit > 0){
        const limitedProducts = product.slice(0, limit);
        res.status(200).json(limitedProducts);
    }else{
        res.status(200).json(product);
        console.log('productos',product);
    }
});

router.get('/products/:pid', async (req, res) => {
    const {pid} = req.params;
    const product = await productManager.getProductsById(pid);
      if(product){
       res.json(product);
       console.log(product)
      }else{
        res.json({ error: 'Producto no encontrado'})
      }
  });

router.post('/products', async (req, res) =>{
    const products = productManager.getProducts();
    const { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
        
        return res.send({status: 'error', error: 'Todos los campos son requeridos'});
    }
    
    const newProduct = {
        title,
        description,
        price,
        status: PStatus,
        thumbnail,
        code,
        stock,
    }
    if (products.find((productManager) => productManager.code === code)) 
        return res.send({status: 'error', error: `ya existe un producto con el code: ${code}`});
    const productsaved = [...products, newProduct];
    productManager.saveJson(productsaved);
    res.status(201).send(newProduct);
});

router.put('/:pid',(res , req) =>{
    
});


export default router;