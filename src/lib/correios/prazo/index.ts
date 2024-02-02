import axios, { AxiosInstance } from "axios";
import { contrato_type, loteParmPrazoNacional, loteParmsPrazoNacionalResponse_200, parametroPrazoUnitario, prazo_makeRequest } from "../../../../types";

class prazo {
    private readonly axiosInstance: AxiosInstance;
    constructor ( token: string ) {
        this.axiosInstance = axios.create({
            baseURL: "https://api.correios.com.br/prazo/v1",
            headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "application/json"
            }
        });
    }
    public async lote ( props: prazo_makeRequest ) {
        const data = {} as loteParmPrazoNacional;
        data.idLote = "1";
        data.parametrosPrazo = props.cepsDeDestino.map((e, index) => ({cepDestino: e, cepOrigem:props.cepDeOrigem, coProduto: `${props.co}`, nuRequisicao:`${index}`}))
        console.log(data)
        const request = await this.axiosInstance.post<loteParmsPrazoNacionalResponse_200[]>("/nacional", data);
        
        if(request.status != 200)
            throw new Error("Erro ao obter o prazos");
        return request.data;
    }

    public async unitario(props: parametroPrazoUnitario):Promise<any> {
        const request = await this.axiosInstance.get<loteParmsPrazoNacionalResponse_200[]>(`/nacional/${props.co}`, {
            params: {
                cepOrigem: props.cepOrigem,
                cepDestino: props.cepDestino,
            }
        });
        if(request.status != 200)
            throw new Error("Erro ao obter o prazo");
        return request.data;
    }

}
export default prazo;