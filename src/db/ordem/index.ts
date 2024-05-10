import { Prisma } from "prisma/prisma-client";
import db from "..";
import Correios from "../../lib/correios";
import { delete_ordem } from "./type";

class ordemDB {

    getById(id: string){
        return db.new_ordens.findUniqueOrThrow({
            where: {
                id: id,
            }
        });
    }
    async delete(props:delete_ordem){
        const ordem = await this.getById(props.ordemId);
        return db.new_ordens.delete({
            where: ordem,
        })
    }
}

export default ordemDB;