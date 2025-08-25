export interface CLTData {
  // Dados Pessoais
  nome: string;
  cpf?: string;
  dependentes: number;
  
  // Dados do Contrato
  salarioBruto: number;
  dataAdmissao: string;
  cargo?: string;
  empresa?: string;
  tipoContrato: 'clt' | 'temporario' | 'experiencia';
  
  // Benefícios
  valeRefeicao: number;
  valeTransporte: number;
  planoSaude: number;
  valeAlimentacao: number;
  auxilioCreche: number;
  outrosBeneficios: number;
  
  // Descontos Adicionais
  sindicato: number;
  associacao: number;
  emprestimos: number;
  outrosDescontos: number;
  
  // Configurações
  horasTrabalhadas: number; // horas por semana
  diasTrabalhados: number; // dias por semana
}

export interface CalculatedResults {
  // Salário
  salarioBruto: number;
  salarioLiquido: number;
  
  // Descontos Obrigatórios
  inss: number;
  irpf: number;
  fgts: number;
  
  // Benefícios Líquidos
  totalBeneficios: number;
  beneficiosLiquidos: number;
  
  // Totais Mensais
  totalRecebido: number;
  totalDescontado: number;
  
  // Anuais
  decimoTerceiro: number;
  ferias: number;
  tercoFerias: number;
  totalAnual: number;
  
  // Tempo de trabalho
  mesesTrabalhados: number;
  anosCompletos: number;
  
  // Totais Acumulados
  totalRecebidoPeriodo: number;
  totalFgtsPeriodo: number;
  totalInssRecolhido: number;
  totalIrpfRecolhido: number;
  
  // Rescisão
  rescisao: {
    demissaoSemJustaCausa: number;
    pedidoDemissao: number;
    demissaoJustaCausa: number;
    aposentadoria: number;
    fgtsDisponivel: number;
    multaFgts: number;
    seguroDesemprego: {
      elegivel: boolean;
      parcelas: number;
      valorParcela: number;
      totalReceber: number;
    };
  };
  
  // Direitos
  direitos: {
    ferias: {
      diasAdquiridos: number;
      diasVencidos: number;
      valorFerias: number;
      valorTercoFerias: number;
    };
    decimoTerceiro: {
      diasAdquiridos: number;
      valorProporcional: number;
    };
  };
}

export interface FaixaINSS {
  min: number;
  max: number;
  aliquota: number;
}

export interface FaixaIRPF {
  min: number;
  max: number;
  aliquota: number;
  deducao: number;
}