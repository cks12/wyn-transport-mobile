import { Prisma, WeightRange } from "@prisma/client"

export interface userFindProps {
    term: string,
}

export interface user_login_props {
    cpf: string,
    password: string,
}

export interface user_update_filial_props {
    id: string;
    stateUf: string;
    name: string
}

export interface user_update_parms_props {
    name?: string,
    password: string,
    cpf: string,
    filiaisId: user_update_filial_props[],
    active: boolean,
}

export interface transport_get_info_by_id {
    id: string;
}

export interface user_update_props {
    id: string,
    updateParms: user_update_parms_props,
}

export interface transport_update_props {
    id: string,
    updateParms: Prisma.TransportUpdateInput,
}

export interface user_get_by_id_props {
    id: string,
}

export interface transport_get_by_id_props {
    id: string,
}

export interface people_update_props {
    id: string,
    updateParms: Prisma.PeoplesUpdateInput,
}

export interface user_delete_props {
    id: string | number,
}

export interface user_get_pagination {
    page: string | number,
    perPage: string | number
}

export interface pagination {
    count: number,
    totalPages: number,
    page: number | string,
}

export interface user_get_pagination_props extends pagination {
    data: Prisma.UserUncheckedCreateInput[],
}

export interface transport_get_pagination_props extends pagination {
    data: Prisma.TransportUncheckedCreateInput[],
}

export interface state_get_pagination_props extends pagination {
    data: Prisma.StateUncheckedCreateInput[],
}

export interface city_get_pagination_props extends pagination {
    data: Prisma.CityUncheckedCreateInput[],
}

export interface filial_get_pagination_props extends pagination {
    data: Prisma.filialUncheckedCreateInput[],
}

export interface peoples_get_pagination_props extends pagination {
    data: Prisma.PeoplesUncheckedCreateInput[],
}

export interface pagination_request_props {
    searchTearm?: string,
    page?: string | number,
    perPage?: string | number,
    all?: boolean;
    filial?: string
    userId?: string;
}

export interface filial_pagination_request_props extends pagination_request_props {

}

export interface transport_get_by_city_props extends pagination_request_props {
    ibge_code: string,
    filial?: string,
}

export interface transport_request_city_type_props {
    name: string,
    ibge_code: string,
}

export interface transport_request_range_props {
    max: number;
    min: number;
    fee: number;
    excessFee: number;
    cityType: string;
}

export interface request_create_cityType {
    name: string,
    citiesID: string[]
}

export interface transport_request_create_props {
    name: string;
    cnpj: string;
    city_type: request_create_cityType[];
    fee: fee_groups_props[];
    cubicRange?: transport_request_range_props[];
    WeightRange?: transport_request_range_props[];
}

export interface state_get_props extends pagination_request_props {
}

export interface filial_get_by_id {
    id: string;
}

export interface address {
    stateUf: string;
    cep: string;
    logradouro: string;
    bairro: string;
    complemento: string;
    houseNumber: string;
    cityId: string;
}

export interface filial_create extends address {
    stateUf: string;
    name: string;
}

export interface cites_get_by_state extends pagination_request_props {
    stateUF: string;
    all?: boolean
}

export interface people_get_by_state extends pagination_request_props {
    groupName: string
}

export interface people_get_by_ibge_code extends pagination_request_props {
    ibgeCode: string
}

export interface ordem_get_by_user extends pagination_request_props {
    creatorID: string,
}

export interface ordem_add_validade_props {
    transportID: string,
    reciverID: string,
    creatorId: string,
    updatorId: string,
    filialdestinyId?: string,
    ibge_code: string,
    filialId: string,
    json_data: string,
    uid: string,
}

export interface list_input_field_props {
    autocompleteValue: string;
    value: string;
}

export interface fee_groups_props {
    fee: Prisma.FeeTypeUncheckedCreateInput;
    rules: fee_groups_rule_props[];
    equation: string,
    equation_default: string,
    equation_result: string,
}

export interface request_fee_groups_props extends fee_groups_props {
    cityType: string;
}

export interface fee_groups_rule_props {
    rule?: Prisma.RulesUncheckedCreateInput;
    valor?: string;
}

export interface transport_state_cities_props {
    name: string;
    citiesID: string[];
}

export interface transport_state_props {
    name: string;
    cnpj: string;
    err: string;
    cityType: transport_state_cities_props[],
    fee: fee_groups_props[],
    weight_range_generate: boolean,
    cubic_range_generate: boolean,
    weight_range: transport_request_range_props[]
    cubic_range: transport_request_range_props[],
}

export interface application_state_props {
    loading: boolean;
    msgView: boolean;
    userRoles: string[];
}

export interface file_excel_parsed {
    city_typed: transport_state_cities_props[];
    weight_range: any[];
}

export interface via_cep_response {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
}

export interface create_ordem {
    userId: string; // ok 
    transportId: string; // ok 
    filialId: string; // ok
    jsonData: string; // ok
    uiid: string; // ok 
    ibge_code: string; // ok 
    reciverId?: string; // ok
    filialdestinyId?: string, //ok
}

export interface transport_get_info_by_id_response {
    transport: {
        name: string,
        id: string,
        active: boolean;
    },
    states: {
        count: number,
        data: {
            name: string,
            uf: string,
            id: string,
            ibge_code: string,
        }[],
    },
    cities: number,
}

export interface transport_city_type {
    transportId: string,
}


export interface information_city_type_by_id {
    id: string,
}

export interface city_type_list {
    count: number,
    cityTypes: {
        name: string,
        id: string,
    }[]
}

export interface city_type_FeeType {
    feeName: string;
    equation: string;
    id: string;
}

export interface city_type_TransportFee {
    equation: string;
    feeType: city_type_FeeType;
    id: string;
}

export interface city_type_range {
    isNew?: boolean;
    id?: string;
    max?: number;
    min?: number;
    fee?: number;
    excessFee?: number;
}

export interface CityType_info_response {
    name: string;
    id: string;
    transportFee: city_type_TransportFee[];
    weightRange: city_type_range[];
    cubicRange: city_type_range[]; // Mesmo tipo que weightRange
    cities: number;
}

export interface weight_range_update_props {
    id: string;
    cityTypeId: string;
    data: {
        excessFee: string | number,
        fee: string | number,
        min: string | number,
        max: string | number,
    }
}

export interface weight_range_delete_props {
    id: string,
}

export interface get_inputs_in_transport {
    transportID: string
}

export interface get_input_props {
    icon: string;
    id: string;
    name: string;
}

export interface get_input_by_transportID_props {
    inputs: {
        id: string,
        name: string,
    }[]
}

export interface change_input_in_transport_props {
    transportId: string,
    inputId: string,
    action: "active" | "disable"
}

export interface update_fee_type_props {
    id: string,
    equation: string,
}

export interface list_ordem_pagination extends pagination_request_props {
    de?: string;
    ate?: string,
    filial: string | undefined,
    transportId: string
}

export interface lsit_ordem_data_response {
    createBy: {
        name: string,
        id: string,
    },
    reciver: {
        name: string,
        id: string,
    },
    jsonData: {
        name: string,
        type: string,
        value: string
    }[],
    romaneio: string,
    peso: string | number,
    cubage: string | number
}

export interface list_ordem_response extends pagination {
    data: lsit_ordem_data_response;
}

export interface counts_ordem_response {
    ordens: number;
    total: number;
    users: number;
    peoples: number;
}

export interface chart_ordem_response {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        backgroundColor: string[],
        borderColor: string | string[],
        borderWidth: number,
    }[]
}

export interface user_change_password {
    id: string,
    oldPassword: string,
    newPassword: string,
}

export interface range_get_pros {
    transportId: string,
    ibge_code: string,
}


/* PAC AG */  /* PAC REVERSO */   /* SEDEX AG */  /* SEDEX REVERSO */
export type contrato_type = "03298" | "03301" | "03220" | "03247"

export interface parametroPrazoUnitario {
    co: contrato_type,
    cepOrigem: string,
    cepDestino: string
}

export interface parametrosPrazo {
    coProduto?: contrato_type,
    nuRequisicao?: string,
    dtEvento?: string,
    cepOrigem?: string,
    cepDestino?: string
}

export interface loteParmPrazoNacional {
    idLote: string,
    parametrosPrazo: parametrosPrazo[]
}

export interface loteParmsPrazoNacionalResponse_200 {
    coProduto?: string,
    nuRequisicao?: string,
    prazoEntrega?: 0,
    dataMaxima?: string,
    txErro?: string,
    entregaDomiciliar?: string,
    entregaSabado?: string,
    msgPrazo?: string
}

export interface prazo_makeRequest {
    cepsDeDestino: string[],
    cepDeOrigem: string,
    co:contrato_type,
}

export interface TokenProps {
    ambiente: "PRODUCAO" | "HOMOLOGACAO" | "DESENVOLVIMENTO" | "LOCAL";
    id: string;
    ip: string;
    perfil: "S" | "A" | "PJ" | "PF";
    cnpj: string;
    pjInternacional: number;
    cpf: string;
    cie: string;
    cartaoPostagem: {
        numero: string;
        contrato: string;
        dr: number;
        api: number[];
    };
    contrato: {
        numero: string;
        dr: number;
        api: number[];
    };
    api: number[];
    paths: string[];
    emissao: string; // Use um tipo de data apropriado, como Date, se preferir.
    expiraEm: string; // Use um tipo de data apropriado, como Date, se preferir.
    zoneOffset: string;
    token: string;
}
// Tipagem para ProcessoAssincrono
export interface ProcessoAssincrono {
    id: string;
    tipoProcessamento: 'EXTRATO_ANALITICO' | 'PREVIA_SINTETICO' | 'PREVIA_ANALITICO' | 'EXTRATO_ANALITICO_PDF';
    status: 'SOLICITADO' | 'EM_EXECUCAO' | 'ERRO' | 'SUCESSO' | 'EXCLUIDO';
    dataSolicitacao: string; // Formato de data e hora
    dataInicioProcessamento: string; // Formato de data e hora
    dataFimProcessamento: string; // Formato de data e hora
    nomeArquivo: string;
    tiporquivo: string;
    parametros: Record<string, string>;
    erro: string;
}

// Tipagem para Fatura
export interface Fatura {
    id: number;
    contrato: string;
    nomeContrato: string;
    centroCusto: number;
    nomeCentroCusto: string;
    razaoSocial: string;
    cnpjCentroCusto: string;
    status: string;
    vencimento: string; // Formato de data
    valor: number;
    itemFatura: string;
    drFatura: string;
    valorEmAberto: string;
    tipoDocumento: string;
    dataCancelamento: string; // Formato de data
    drContrato: string;
    dataFechamento: string; // Formato de data
    sedexLogico: string;
    dataPagamento: string; // Formato de data
    fatura: string;
    dr: string;
    nmCentroCustos: string;
    codigoCliente: number;
    tipoPagamento: string;
    an8Cliente: number;
    lote: string;
}

// Tipagem para Divergencia
export interface Divergencia {
    tipoPendencia: string;
    codigoObjeto: string;
    dataPostagem: string; // Formato de data e hora
    dataPendencia: string; // Formato de data e hora
    codigoServico: string;
    cepContabilizado: string;
    cepEntrega: string;
    pesoTarifadoFinanceiro: string;
    comprimentoFinanceiro: string;
    larguraFinanceiro: string;
    alturaFinanceiro: string;
    pesoCubicoFinanceiro: string;
    pesoRealMectri: string;
    comprimentoMectri: string;
    larguraMectri: string;
    alturaMectri: string;
    pesoCubicoMectri: string;
    pesoTarifadoMectri: string;
    valorTarifadoFinanceiro: number;
    valorTarifadoSgpb: number;
    diferencaValorFinanceiroSgpb: number;
}

// Tipagem para MessageResponse
export interface MessageResponse {
    msgs: string[];
    date: string; // Formato de data e hora
    method: string;
    path: string;
    causa: string;
    stackTrace: string;
}

export interface faturaSearch {
    contrato: string,
    dr: string,
    dataInicial: string,
    dataFinal: string,
}

export interface process_fatura {
    fatura: string | number,
    tipoDocumento: string,
    drFatura: string,
    itemFatura: string,
}

export interface propsPrecoRequest {
    cepOrigem: string;
    cepDestino: string;
    psObjeto: string | number;
}

export interface precoRequestApi extends propsPrecoRequest {
    nuDR: string;
    nuContrato: string
}

export interface createReversoProps {
    co: string,
    techId: string,
    filialId: string,
    romaneio: string,
}

export interface reversoValidateProps {
    id: string,
    userId: string,
    peso: string,
}

export interface createTechUser {
    techId: string
}

export interface techUserLoginProps {
    techId: string;
    password: string;
}

export interface listByTechProps {
    techId: string,
}
export interface aproveReverso{
    userId: string,
    reversoId: string,
}
