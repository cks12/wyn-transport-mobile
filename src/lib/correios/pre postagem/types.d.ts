interface RequestPrePostagemDTO {
    idCorreios?: string; // Identificador do usuário no IDCorreios. Obrigatório apenas para credenciais INTERNAS.
    remetente: RemetenteDTO;
    destinatario: DestinatarioDTO;
    codigoServico: string; // Código do serviço a ser pré-postado.
    precoServico?: string; // Preço somente do serviço, sem os adicionais. Utilizado apenas em credenciais INTERNAS.
    precoPrePostagem?: string; // Preço total da pré-postagem. Utilizado apenas em credenciais INTERNAS.
    numeroNotaFiscal?: string; // Número da nota fiscal que acompanhará o objeto pré-postado.
    numeroCartaoPostagem?: string; // Número do cartão de postagem - somente para credencial interna.
    chaveNFe?: string; // Chave da Nota Fiscal Eletrônica.
    listaServicoAdicional?: any[]; // Define a estrutura apropriada para esse campo.
    itensDeclaracaoConteudo?: any[]; // Define a estrutura apropriada para esse campo.
    pesoInformado?: string; // Peso em gramas do objeto que será pré-postado.
    codigoFormatoObjetoInformado?: string; // Código do formato do objeto a ser pré-postado.
    alturaInformada?: string; // Dimensão altura do objeto a ser pré-postado.
    larguraInformada?: string; // Dimensão largura do objeto a ser pré-postado.
    comprimentoInformado?: string; // Dimensão comprimento do objeto a ser pré-postado.
    diametroInformado?: string; // Dimensão diâmetro do objeto a ser pré-postado.
    ncmObjeto?: string; // Código NCM (Nomenclatura Comum do Mercosul) do produto que está sendo pré-postado.
    rfidObjeto?: string; // Código SSCC associado à TAG RFID afixado no objeto que está sendo pré-postado.
    cienteObjetoNaoProibido?: string; // Flag que indica se o objeto é proibido no fluxo postal.
    idAtendimento?: string; // ID do atendimento. Utilizado apenas em credenciais INTERNAS.
    solicitarColeta?: 'S' | 'N'; // Indica se o objeto vai ter uma coleta gerada.
    codigoObjeto?: string; // Código identificador do objeto.
    dataPrevistaPostagem?: string; // Data provável da postagem.
    observacao?: string; // Informações complementares.
    modalidadePagamento?: '1' | '2' | '3' | '4'; // Modalidade de pagamento.
    logisticaReversa?: 'S' | 'N'; // Indicador se possui ou não logística reversa.
    dataValidadeLogReversa?: string; // Data de validade da logística reversa.
  }