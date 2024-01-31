import { Prisma } from "prisma/prisma-client";
import db from "..";
import { ReversoResponseById, UserResponse } from "./responses";
import { IreversoResponseInApp, get_by_filial_id } from "./type";

class reversosDB {
    async get_not_validates(query: get_by_filial_id):Promise<IreversoResponseInApp> {
        const res = {} as IreversoResponseInApp;
        const where: Prisma.reversoWhereInput = {
            filial: {
                id: query.filialID,
            },
            AND: {
                createdAt: {
                    gt: new Date(new Date().setDate(new Date().getDate() - 30)),
                }
            }
        }

        const reversos = db.reverso.findMany({
            where: where,
            select: UserResponse,
            orderBy: {
                createdAt: "desc"
            }
        });

        const count = db.reverso.count({
            where: where,
        })

        const promises: Promise<any>[] = [reversos,count ]; 
        const [reversosData, countData] = await Promise.all(promises);
        res.count = countData;
        res.data = reversosData;
        return res;
    }

    async get_by_id(id: string): Promise<any> {
        const reverso = await db.reverso.findFirst({
            where: {
                id: id,
            },
            select: ReversoResponseById,
        });
        return reverso; 
    }
}

export default reversosDB;