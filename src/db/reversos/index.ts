import { Prisma } from "prisma/prisma-client";
import db from "..";
import { ReversoResponseById, UserResponse } from "./responses";
import { IreversoResponseInApp, get_by_filial_id } from "./type";
import Correios from "../../lib/correios";

class reversosDB {
    async get_not_validates(query: get_by_filial_id): Promise<IreversoResponseInApp> {
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

        const promises: Promise<any>[] = [reversos, count];
        const [reversosData, countData] = await Promise.all(promises);
        res.count = countData;
        res.data = reversosData;
        res.data = reversosData.filter((e: any)=> e.isValidate != true)
        return res;
    }

    async get_by_id(id: string) {
        const reverso = await db.reverso.findFirst({
            where: {
                id: id,
            },
            select: ReversoResponseById,
        });
        return reverso;
    }

    async createReverso(data: Prisma.reversoCreateInput) {
        const reverso = await db.reverso.create({
            data: data,
            select: ReversoResponseById,
        });
        return reverso;
    }

    async update_by_id(id: string, peso: string, userId: string): Promise<any> {
        const correios = new Correios();
        await correios.create_token(userId);
        const recverso = await this.get_by_id(id);
        console.log(recverso)
        const filial = await db.filial.findUnique({
            where: {
                id: recverso?.filial?.id,
            }
        })

        const price = await correios.preco?.PRECO_REQUEST(recverso?.codServico || "", {
            cepDestino: filial?.cep || "",
            // @ts-ignore
            cepOrigem: recverso?.tecnico.cep,
            psObjeto: peso
        })
        const reverso = await db.reverso.update({
            where: {
                id: id,
            },
            data: {
                validatedBy: {
                    connect: {
                        id: userId
                    }
                },
                freteValor: Number(price?.data.pcFinal.replace(",", ".")) || 1,
                peso: Number(peso.replace(",", ".")),
                isValidate: true,
                validateAt: new Date().toISOString(),
            },
            select: {
                id: true,
            }
        });
        console.log(reverso)
        return reverso;
    }
}

export default reversosDB;