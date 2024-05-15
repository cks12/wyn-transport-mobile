import { Router, request } from 'express'
import OrdemController from '../controller/ordem';

const ordemRouter = Router();
const reversoController = new OrdemController();

ordemRouter.delete("/:id", reversoController.delete);
ordemRouter.get("/:id", reversoController.getById);

export default ordemRouter;