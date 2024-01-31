import { Prisma } from "prisma/prisma-client"
import db from "../../db";

interface FilialResponse {
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
    }
}

class Filial {
    select: Prisma.filialSelect;
    constructor() {
        this.select = {
            id: true,
            name: true,
            logradouro: true,
            cep: true,
            bairro: true,
            houseNumber: true,
            stateUf: true,
            city: {
                select: {
                    name: true
                }
            }
        }
    }

   
    private async _getById(id: string) {
        return await db.filial.findUniqueOrThrow({
            where: {
                id
            },
            select: this.select
        })
    }

    async makeResponse(peoples: any) {
        const response: FilialResponse[] = []
        for(let el of peoples){
            const _res = {} as FilialResponse;
            _res.address = {} as FilialResponse["address"];
            _res.address.cep = el.cep
            _res.address.road = el.logradouro
            _res.address.number = el.houseNumber
            _res.address.district = el.bairro
            _res.address.city = el.city.name
            _res.address.stateUf = el.stateUf
            _res.name = el.name;
            _res.id = el.id;
            response.push(_res);
        }
        return response;
    }

    async getAll() {
        const filial = await db.filial.findMany({
            select: this.select
        })
        const response = this.makeResponse(filial);
        return response;
    }

    async getById(id: string) {
        console.log(id)
        const filial = await this._getById(id);
        const response = this.makeResponse([filial]);
        return response
    }
}

export default Filial;