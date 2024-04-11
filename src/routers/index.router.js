import { Router } from 'express'

const router = Router();

router.get('/', async(req, res) =>{
    res.status(200).send( {message: 'Bienvenidos al servidor en express js'})
})

export default router;