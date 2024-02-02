import axios, { AxiosInstance } from "axios";
import { Fatura, ProcessoAssincrono, faturaSearch, process_fatura } from "../../../../types";

class fatura {
    private readonly axiosInstance: AxiosInstance;
    constructor(token: string) {
        this.axiosInstance = axios.create({
            baseURL: "https://api.correios.com.br/faturas/v1",
            headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "application/json'"
            }
        });
    }

    public async list_fatura(parms: faturaSearch): Promise<Fatura[]> {
        const REQUEST = await this.axiosInstance.get<Fatura[]>("/faturas", {
            params: parms
        });

        if (REQUEST.status == 200)
            return REQUEST.data;

        throw new Error("Erro ao conseguir as faturas");
    }

    public async req_proc_fat(parms: process_fatura): Promise<ProcessoAssincrono> {
        const REQUEST = await this.axiosInstance.post<ProcessoAssincrono>(`/faturas/${parms.fatura}/analitico`, {
            params: {
                tipoDocumento: parms.tipoDocumento,
                drFatura: parms.drFatura,
                itemFatura: parms.itemFatura
            }
        });

        if (REQUEST.status == 200)
            return REQUEST.data;
        throw new Error("Erro ao processar a fatura");
    }

    public async get_process_fat(idProcessamento: string): Promise<ProcessoAssincrono> {
        const REQUEST = await this.axiosInstance.get<ProcessoAssincrono>(`processamentos/${idProcessamento}`, {
            headers: {
                accept: '*/*'
            }
        })

        if (REQUEST.status == 200)
            return REQUEST.data;
        throw new Error("Erro ao processar a fatura");
    }
    public async get_file(idProcessamento: string): Promise<string> {
        const REQUEST = await this.axiosInstance.get(`processamentos/${idProcessamento}/file`)

        if (REQUEST.status == 200)
            return REQUEST.data;
        throw new Error("Erro ao processar a fatura");
    }
    // public async prev()
}

export default fatura;