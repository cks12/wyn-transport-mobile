import { reverso } from "prisma/prisma-client"

export interface get_by_filial_id {
    filialID: string,
}
export interface IreversoListInApp {
    id: string,
    filial: {
        name: string,
    },
    Romaneio: string,
    tecnico: {
        name: string,
        id: string,
    },
    createdAt: Date,
}

export interface IreversoResponseInApp {
    count: number
    data: IreversoListInApp[] 
}