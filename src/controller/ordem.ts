import { Request, Response, response } from "express";
import ordemDB from "../db/ordem";

const _ordemDB = new ordemDB();

class OrdemController {
    async delete(req: Request, res: Response){
        const id = req.params.id;
        if(typeof id !== "string")
            return res.status(400).json({message: "id não é uma string"});
        const response = await _ordemDB.delete({ordemId:id});
        return res.json(response)
    }
    async getById(req: Request, res: Response){
        const id = req.params.id;
        if(typeof id !== "string")
            return res.status(400).json({message: "id não é uma string"});
        const response = await _ordemDB.getById(id);
        return res.json(response)
    }
}

export default OrdemController;