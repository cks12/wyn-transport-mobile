import axios, { AxiosInstance } from 'axios';
import {TokenProps} from '../../../../types';
import 'dotenv/config'
export class token {
    private readonly axiosInstance: AxiosInstance;

    constructor() {
      this.axiosInstance = axios.create({
        baseURL: "https://api.correios.com.br/token/v1/autentica",
        headers: {
            "Authorization":`Basic ${Buffer.from(`${process.env.correiosName}:${process.env.correiosToken}`).toString('base64')}`
        }
      });
    }
    async AUTENTICA_CARTAO_POSTAL(numero: string): Promise<TokenProps> {
        const REQUEST = await this.axiosInstance.post<TokenProps>("/cartaopostagem", {numero});
        console.log(REQUEST.data)
        if(REQUEST.status == 201)
            return REQUEST.data;
        throw new Error("Erro ao conseguir logar o usuario")
    }
}
