import { Prisma } from "prisma/prisma-client"
import db from "../../db";

interface PeopleResponse {
    id: string
    name: string,
    cpf: string,
    address: {
        road: string,
        cep: string,
        city: string,
        stateUf: string,
        number: string,
        district: string,
    },
    filiais: string[],
    isAtivo: boolean,
}

class People {
    select: Prisma.PeoplesSelect
    constructor() {
        this.select = {
            id: true,
            active: true,
            name: true,
            cpf: true,
            logradouro: true,
            cep: true,
            bairro: true,
            houseNumber: true,
            stateUf: true,
            city: {
                select: {
                    name: true
                }
            },
            updatedAt: true,
            createdAt: true,
            technicianGroupIds: true,
        }
    }

    private async _getCreatedAt(init: string, fin: string, isAtivo?:boolean) {
        return await db.peoples.findMany({
            where: {
                createdAt: {
                    lte: new Date(fin),
                    gte: new Date(init)
                },
                AND: {
                    active: isAtivo
                }
            },
            select: this.select
        })
    }

    private async _getUptadedAt(init: string, fin: string, isAtivo?:boolean) {
        return await db.peoples.findMany({
            where: {
                updatedAt: {
                    lte: new Date(fin),
                    gte: new Date(init)
                },
                AND: {
                    active: isAtivo
                }
            },
            select: this.select
        })
    }

    async makeResponse(peoples: any) {
        const response: PeopleResponse[] = []
        const promises: Promise<any>[] = [];
        const groups = await db.technicianGroup.findMany({
            select: {
                peoplesIds: true,
                filial: {
                    select: {
                        id:true
                    }
                }
            }
        });
        for (let el of peoples) {
            const _res = {} as PeopleResponse;
            _res.address = {} as PeopleResponse["address"];
            _res.address.cep = el.cep
            _res.address.road = el.logradouro
            _res.address.number = el.houseNumber
            _res.address.district = el.bairro
            _res.address.city = el.city.name
            _res.address.stateUf = el.stateUf
            _res.cpf = el.cpf;
            _res.name = el.name;
            _res.id = el.id;
            // promises.push(db.technicianGroup.findMany({
            //     where: {
            //         peoplesIds: {
            //             has: el.id
            //         }
            //     },
            //     select: { filial: {
            //         select: {
            //             id:true,
            //         }
            //     } }
            // })
            //     .then(e => {
            //         const a = e.map(e => e.filial[0]?.id || "")
            //         _res.filiais = a.filter(e => e != "");
            //         return e;
            //     }))
            // response.push(_res);
            const a = groups.filter(e => e.peoplesIds.includes(el.id));
            const b = a.map(e => e.filial.map(e => e.id)[0] || "");
            _res.filiais = b.filter(e => (e != ""));
            response.push(_res);
            _res.isAtivo = el.active;
        }

        await Promise.all(promises);

        return response;
    }

    async getAll(isAtivo?: boolean) {
        const peoples = await db.peoples.findMany({
            where: {
                active: isAtivo
            },
            select: this.select
        })
        const response = this.makeResponse(peoples);
        return response;
    }

    async getCreatedAt(init: string, fin: string, isAtivo?: boolean) {
        const peoples = await this._getCreatedAt(init, fin, isAtivo);
        const response = this.makeResponse(peoples);
        return response;
    }

    async getUpdatedAt(init: string, fin: string, isAtivo?: boolean) {
        const peoples = await this._getUptadedAt(init, fin, isAtivo);
        const response = this.makeResponse(peoples);
        return response;
    }
}

export default People;