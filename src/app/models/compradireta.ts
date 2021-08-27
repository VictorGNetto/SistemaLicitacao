export interface Compradireta {
  // Informações gerais de um documento
  id: [string, number];  // ["JYH", 2021]
  servidor: string;
  status: string;
  criacao: string;

  // Inputs do documento de Compra Direta
  // Objeto - inputs de texto
  i1_descricaoObjeto: string;
  i1_justificativaServicoExecucaoContinuada: string;
  i1_justificativaAdjudicacaoLote: string;
  // Objeto - inputs de radio button
  i1_tipoContratacao: string;
  i1_prestacaoServicoContinuada: string;
  i1_caracterizacaoObjeto: string;
  i1_adjudicacao: string;
  i1_criterioJulgamentoPropostas: string;
  
}
