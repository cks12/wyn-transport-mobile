import axios, { AxiosInstance } from "axios";
import { precoRequestApi, propsPrecoRequest } from "../../../../types";
import 'dotenv/config'

class preco {
    axiosInstance: AxiosInstance
    constructor(token: string) {
        this.axiosInstance = axios.create({
            baseURL: "https://api.correios.com.br/preco/v1",
            headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "application/json"
            }
        });
    }

    public async PRECO_LOTE(co: string, cepOrigem: string, lote: { cepDestino: string, ps:string }[] ) {
        const maped = lote.map((e, index) => {
            return {
                cepOrigem: cepOrigem.replace("-",""),
                cepDestino: e.cepDestino.replace("-",""),
                psObjeto: Number(e.ps.toString().replace(",",".")) * 1000,
                nuRequisicao: index,
            }
        })
        const r = this.axiosInstance.post("nacional", maped);
        return r;
    }
    public async PRECO_REQUEST(co: string, parms: propsPrecoRequest) {
        const p = {} as precoRequestApi;
        p.cepOrigem =  parms.cepOrigem.replace("-",""),
        p.cepDestino = parms.cepDestino.replace("-",""),
        p.psObjeto = Number(parms.psObjeto.toString().replace(",",".")) * 1000,
        p.nuDR = process.env.correiosNUDR || "";
        p.nuContrato = process.env.correiosContrato || "";
        const r = this.axiosInstance(`nacional/${co}`, {
            params: p
        }).catch(err => { console.log(JSON.stringify(err)) })
        return r;
    }
}
export default preco;