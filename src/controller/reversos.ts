import { Request, Response } from "express";
import reversosDB from "../db/reversos" 
const _reversosDB = new reversosDB();

class ReversosController {
    async list(req: Request, res: Response) {
        const filialID = req.params.id
        try{
            const list = await _reversosDB.get_not_validates({filialID})
            return res.json(list);
        }
        catch(err){
            console.log(err)
            return res.status(500).json({message: "Erro interno do servidor"}) 
        }
    }

    async get_byId(req: Request, res: Response) {
        try {
            const id = req.params.id
            const reverso = await _reversosDB.get_by_id(id);
            return res.json({reverso})
        }
        catch(err){
            console.log(err)
            return res.status(500).json({message: "Erro interno do servidor"}) 
        }
    }
}

export default ReversosController;