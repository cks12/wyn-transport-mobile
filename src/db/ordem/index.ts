import db from "..";
import { delete_ordem } from "./type";

class ordemDB {

    getById(id: string){
        return db.new_ordens.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: {
                createdBy: {
                    select: {
                        name: true,
                    }
                },
                tech: {
                    select: {
                        name: true,
                    }
                },
                filialExt: {
                    select: {
                        id:true,
                        name: true,
                    },
                },
                filialRec: {
                    select: {
                        id:true,
                        name: true,
                    },
                },
                transport: {
                    select: {
                        id:true,
                        name: true,
                    }
                },
                validator: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
    }
    async delete(props:delete_ordem){
        const ordem = await this.getById(props.ordemId);
        return db.new_ordens.delete({
            where: {
                id: ordem.id,
            },
        })
    }
}

export default ordemDB;