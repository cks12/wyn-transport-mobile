import axios, { AxiosInstance } from "axios";
import 'dotenv/config'
import { token } from "./token";
import fatura from "./relatorio";
import prazo from './prazo'
import preco from "./preco";
import db from "../../db";

class Correios {
    token: token;
    fatura: fatura | null;
    s_token: string;
    prazos: prazo | null
    preco: preco | null;
    constructor() {
        this.token = new token();
        this.s_token = "";
        this.fatura = null;
        this.prazos = null;
        this.preco = null;
    }

    public async create_n_token(userId: string | undefined, FilialId: SVGStringList) {
        const u_token = await db.correiosToken.findFirst({
            where: {
                userId: userId || "system",
                    expiraEm: {
                        gte: new Date().toISOString()
                    },
            }
        })
    }
    public async create_token(userID: string | undefined) {
        // const date = 
        const u_token = await db.correiosToken.findFirst({
            where: {
                userId: userID || "system",
                AND: {
                    expiraEm: {
                        gte: new Date().toISOString()
                    }
                }
            }
        })
        let s_token = ""
        if (u_token)
            s_token = u_token.token;
        else {
            console.log("> CRIANDO TOKEN")
            const token = await this.token.AUTENTICA_CARTAO_POSTAL(process.env.postal || "");
            await db.correiosToken.create({
                data: {
                    userId: userID || "system",
                    token: token.token,
                    expiraEm: new Date(token.expiraEm).toISOString(),
                    emissao: new Date(token.emissao).toISOString(),
                }
            }).catch(err => console.log(err))
            s_token = token.token;
        }

        this.create_prazos(s_token);
        this.create_precos(s_token);
        this.s_token = s_token;
    }
    cotarAndPazoPerCep(a:any) {}
    cotar(a: any){}
    prazo(a: any){}
    private create_precos(token: string) {
        this.preco = new preco(token)
    }
    private async create_prazos(token: string) {
        this.prazos = new prazo(token);
    }


}

export default Correios;