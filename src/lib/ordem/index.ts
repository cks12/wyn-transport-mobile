import { Prisma } from "prisma/prisma-client";
import db from "../../db"

interface Response {
    id: string,
    creatorName: string,
    creatorId: string,
    validatorId: string,
    validatorName: string,
    priceOfFrete: string | number | null,
    peso: string | number | null,
    volume: string | number | null,
    destinationName: string,
    destinationId: string,
    destinationType: "tech" | "filial",
    transportId: string,
    transportName: string,
    romaneio: string,
    nf: string;
    status: "created" | "validated" | "canceled" | "finished",
    filialExtId: string,
    filialExtName: string,
    flag_peso_definido: boolean;
    flag_cube_definido: boolean;
    createdAt: string,
    updateAt: string,
}

class Ordem {
    responseSelection: Prisma.OrdemSelect
    newOrdemSelect: Prisma.new_ordensSelect;
    constructor() {
        this.responseSelection = {
            id: true,
            createBy: {
                select: {
                    id: true,
                    name: true,
                }
            },
            updateBy: {
                select: {
                    name: true,
                    id: true,
                }
            },
            filialRecieverId: true,
            transport: {
                select: {
                    name: true,
                    id: true
                }
            },

            reciver: {
                select: {
                    name: true,
                    id: true,
                }
            },
            filial: {
                select: {
                    name: true,
                    id: true,
                }
            },
            jsonData: true,
            createdAt: true,
            updatedAt: true,
        }

        this.newOrdemSelect = {
            id: true,
            Alt: true,
            Com: true,
            createdAt: true,
            createdBy: true,
            validator: {
                select: {
                    name:true
                }
            },
            filialExtId: true,
            filialRecId: true,
            Lar: true,
            numNf: true,
            validatorId: true,
            filialExt: {
                select: {
                    name: true,
                }
            },
            filialRec: {
                select: {
                    name: true
                }
            },
            userId: true,
            Peso: true,
            Preco: true,
            transportId: true,
            validate: true,
            tech: {
                select: {
                    name:true
                }
            },
            transport: {
                select: {
                    name: true
                }
            },
            numRo: true,
            techId: true,

        }
    }

    private async new_ordens(init: string, finished: string) {
        return await db.new_ordens.findMany({
            select: this.newOrdemSelect,
            where: {
                validate: true,
                AND: {

                    createdAt: {
                        lte: new Date(finished),
                        gte: new Date(init),
                    }
                }
            }
        })
    }

    private async _getByCreateAt(init: string, finished: string) {
        return await db.ordem.findMany({
            select: this.responseSelection,
            where: {
                createdAt: {
                    lte: new Date(finished),
                    gte: new Date(init)
                }
            }
        })
    }

    private normalizedResponse (res:Response) {
        return {
            status: res.status,
            filialExtId: res.filialExtId,
            filialExtName: res.filialExtName,
            creatorId: res.creatorId,
            creatorName: res.creatorName,
            validatorId: res.validatorId,
            validatorName: res.validatorName,
            transportId: res.transportId,
            transportName: res.transportName,
            destinationType: res.destinationType,
            destinationName: res.destinationName,
            destinationId: res.destinationId,
            romaneio: res.romaneio,
            nf:res.nf,
            peso: Number(Number(`${res.peso}`.replace(",",".")).toFixed(2)),
            priceOfFrete:  Number(Number(`${res.priceOfFrete}`.replace(",",".")).toFixed(2)),
            volume: Number(`${res.volume}`),
            flag_peso_definido: res.flag_peso_definido,
            flag_cube_definido: res.flag_cube_definido,
            id: res.id,
            createdAt: res.createdAt,
            updateAt: res.createdAt,
        }
    }

    private async _getByUpdateAt(init: string, finished: string) {
        return await db.ordem.findMany({
            select: this.responseSelection,
            where: {
                updatedAt: {
                    lte: new Date(finished),
                    gte: new Date(init)
                }
            }
        });
    }

    private newResponse(ordems: any) {
        const response: Response[] = [];
        for (let el of ordems) {
            const _res = {} as Response;
            _res.status = "finished";
            _res.createdAt = el.createdAt || ""
            _res.nf = el.numNf
            _res.creatorName = el.createdBy.name
            _res.romaneio = el.numRo
            _res.validatorId = el.validatorId || ""
            _res.validatorName = el.validator?.name || ""
            _res.filialExtId = el.filialExtId || ""
            _res.filialExtName = el.filialExt?.name || ""
            _res.creatorId = el.userId || ""
            _res.transportId = el.transportId || ""
            _res.transportName = el.transport?.name || ""
            _res.flag_peso_definido = el.Peso ? true : false
            _res.flag_cube_definido = el.Alt ? true : false
            _res.peso = el.Peso
            // @ts-ignore
            _res.volume = isNaN(el.Lar * el.Alt * el.Com) ?
                // @ts-ignore
                null : el.Lar * el.Alt * el.Com;
            _res.priceOfFrete = el.Preco;
            _res.destinationId = el.filialRecId || el.techId || ""
            _res.destinationName = el.tech?.name || el.filialRec?.name || ""
            _res.destinationType = el.filialRecId ? "filial" : "tech"
            _res.id = el.id
            _res.createdAt = el.createdAt?.toISOString() || "";
            _res.updateAt = el.createdAt?.toISOString() || "";
            response.push(_res);
        }
        return response;
    }

    private async oldResponse(ordems: any) {
        const promises: Promise<any>[] = [];
        const response: Response[] = [];
        for (let el of ordems) {
            const _res = {} as Response;
            // MUDAR O ESTADO DPS QUE ATUALIZAR O BANCO DE DADOS
            _res.status = "finished";

            _res.filialExtId = el.filial?.id || "Não definido";
            _res.filialExtName = el.filial?.name || "Não definido";

            _res.creatorId = el.createBy?.id || "Não definido";
            _res.creatorName = el.createBy?.name || "Não definido";

            _res.validatorId = el.updateBy?.id || _res.creatorId ||"Não definido";
            _res.validatorName = el.updateBy?.name || _res.creatorName || "Não definido";

            _res.transportId = el.transport?.id || "Não definido";
            _res.transportName = el.transport?.name || "Não definido";

            if (el.filialRecieverId) {
                _res.destinationType = "filial";
                const pr = db.filial.findUnique({
                    where: {
                        id: el.filialRecieverId,
                    },
                    select: {
                        name: true,
                        id: true,
                    }
                }).then(e => {
                    _res.destinationName = e?.name || "Não definido";
                    _res.destinationId = e?.id || "Não definido";
                    return e;
                })
                promises.push(pr)
            }
            else {
                _res.destinationType = "tech";
                _res.destinationName = el.reciver?.name || "Não definido";
                _res.destinationId = el.reciver?.id || "Não definido";
            }

            const valorTotal: number = Number(`${(el.jsonData as any).filter((e: { type: string, value: string }) => e.type == "$_T")[0]?.value}`.replace(",", "."))
            const peso: number = Number(`${(el.jsonData as any).filter((e: { type: string, value: string }) => e.type == "$_W")[0]?.value}`.replace(",", "."))
            const nf = (el.jsonData as any).filter((e: { type: string, value: string }) => e.type == "$_ID")[0]?.value.replace(",", ".")
            const romaneio = (el.jsonData as any).filter((e: { type: string, value: string }) => e.type == "$_ID2")[0]?.value.replace(",", ".")
            const volume = (el.jsonData as any).filter((e: { type: string, value: string }) => e.type == "$_C")[0]?.value.replace(",", ".")
            _res.romaneio = romaneio || null
            _res.nf = nf || null
            _res.peso = Number(peso?.toFixed(2)) || null;
            _res.priceOfFrete = Number(valorTotal?.toFixed(2)) || null;
            _res.volume = Number(volume || 0).toFixed(2) || null;
            _res.flag_peso_definido = (_res.peso) != null;
            _res.flag_cube_definido = (_res.volume) != null;

            _res.id = el.id
            _res.createdAt = el.createdAt.toISOString()
            _res.updateAt = el.updatedAt.toISOString()
            response.push(_res);
        }
        if (promises)
            await Promise.all(promises);

        return response;
    }
    async getByCreatedAt(init: string, finished: string) {
        const _ordems = await this._getByCreateAt(init, finished);
        const new_ordems = await this.new_ordens(init, finished);

        // make a compare, and concat new_ordens 
        const ordems = _ordems.filter(e => !new_ordems.map(el => el.id).includes(e.id));
        const old = await this.oldResponse(ordems);
        const newOrdens = await this.newResponse(new_ordems);
        const n = old.concat(newOrdens);
        return n.map(e => this.normalizedResponse(e));
    }

    async getByUpdateAt(init: string, finished: string) {
        const _ordems = await this._getByCreateAt(init, finished);
        const new_ordems = await this.new_ordens(init, finished);
        // make a compare, and concat new_ordens 
        const ordems = _ordems.filter(e => !new_ordems.map(el => el.id).includes(e.id));
        const old = await this.oldResponse(ordems);
        const newOrdens =  this.newResponse(new_ordems);
        const n = old.concat(newOrdens);
        return n.map(e => this.normalizedResponse(e));
    }
}
export default Ordem
