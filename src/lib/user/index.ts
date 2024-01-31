import { Prisma } from "prisma/prisma-client"
import db from "../../db";

interface UserResponse {
    id: string
    name: string,
    cpf: string,
    filiaisIds: string[],
}

class User {
    select: Prisma.UserSelect
    constructor() {
        this.select = {
            id: true,
            active: true,
            name: true,
            cpf: true,
            filiaisIds: true,
            updatedAt: true,
            createdAt: true,
        }
    }

    private async _getCreatedAt(init: string, fin: string) {
        return await db.user.findMany({
            where: {
                createdAt: {
                    lte: new Date(fin),
                    gte: new Date(init)
                }
            },
            select: this.select
        })
    }
    private async _getById(id: string) {
        return await db.user.findUniqueOrThrow({
            where: {
                id
            },
            select: this.select
        })
    }
    private async _getUptadedAt(init: string, fin: string) {
        return await db.user.findMany({
            where: {
                updatedAt: {
                    lte: new Date(fin),
                    gte: new Date(init)
                }
            },
            select: this.select
        })
    }

    async makeResponse(peoples: any) {
        const response: UserResponse[] = []
        for (let el of peoples) {
            const _res = {} as UserResponse;
            _res.cpf = el.cpf;
            _res.filiaisIds = el.filiaisIds;
            _res.name = el.name;
            _res.id = el.id;
            response.push(_res);
        }
        return response;
    }

    async getAll() {
        const users = await db.user.findMany({
            select: this.select
        })
        const response = this.makeResponse(users);
        return response;
    }

    async getCreatedAt(init: string, fin: string) {
        const peoples = await this._getCreatedAt(init, fin);
        const response = this.makeResponse(peoples);
        return response;
    }

    async getUpdatedAt(init: string, fin: string) {
        const peoples = await this._getUptadedAt(init, fin);
        const response = this.makeResponse(peoples);
        return response;
    }

    async getById(id: string) {
        const user = await this._getById(id);
        return user;
    }
}

export default User;