import { Prisma } from "prisma/prisma-client";

export const UserResponse: Prisma.reversoSelect = {
    id: true,
    filial: {
        select: {
            name: true,
        }
    },
    Romaneio: true,
    tecnico: {
        select: {
            name: true,
            id: true,
        },
    },
    createdAt: true,
}

export const ReversoResponseById: Prisma.reversoSelect = {
    id: true,
    filial: {
        select: {
            name: true,
            id: true,
        }
    },
    Romaneio: true,
    tecnico: {
        select: {
            name: true,
            id: true,
            cep: true,
            city: {
                select: {
                    name: true,
                    stateUf: true,
                }
            }
        },
    },
    peso: true,
    createdAt: true,
    codServico: true,
}