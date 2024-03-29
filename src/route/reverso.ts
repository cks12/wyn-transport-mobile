import { Router, request } from 'express'
import ReversosController from '../controller/reversos';

const reversoRouter = Router();
const reversoController = new ReversosController();

reversoRouter.get('/list/:id', reversoController.list)
reversoRouter.post('/update/:id', reversoController.update_by_id)
reversoRouter.get('/:id', reversoController.get_byId)

export default reversoRouter;