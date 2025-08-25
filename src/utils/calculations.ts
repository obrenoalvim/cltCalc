import { CLTData, CalculatedResults, FaixaINSS, FaixaIRPF } from '../types/clt';

// Tabelas de 2024
const FAIXAS_INSS: FaixaINSS[] = [
  { min: 0, max: 1412.00, aliquota: 0.075 },
  { min: 1412.01, max: 2666.68, aliquota: 0.09 },
  { min: 2666.69, max: 4000.03, aliquota: 0.12 },
  { min: 4000.04, max: 7786.02, aliquota: 0.14 }
];

const FAIXAS_IRPF: FaixaIRPF[] = [
  { min: 0, max: 2112.00, aliquota: 0, deducao: 0 },
  { min: 2112.01, max: 2826.65, aliquota: 0.075, deducao: 158.40 },
  { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 370.40 },
  { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 651.73 },
  { min: 4664.69, max: Infinity, aliquota: 0.275, deducao: 884.96 }
];

const DEDUCAO_DEPENDENTE_IR = 189.59;
const TETO_FGTS = 7786.02;
const SALARIO_MINIMO = 1412.00;

export function calculateCLTResults(data: CLTData): CalculatedResults {
  const salarioBruto = data.salarioBruto;
  
  // Calcular INSS
  let inss = 0;
  let salarioRestante = salarioBruto;
  
  for (const faixa of FAIXAS_INSS) {
    if (salarioRestante <= 0) break;
    
    const valorFaixa = Math.min(salarioRestante, faixa.max - faixa.min + 0.01);
    if (valorFaixa > 0) {
      inss += valorFaixa * faixa.aliquota;
      salarioRestante -= valorFaixa;
    }
  }
  
  // Base para IRPF (salário bruto - INSS)
  const baseIRPF = salarioBruto - inss;
  const deducaoDependentes = data.dependentes * DEDUCAO_DEPENDENTE_IR;
  const baseCalculoIRPF = Math.max(0, baseIRPF - deducaoDependentes);
  
  // Calcular IRPF
  let irpf = 0;
  for (const faixa of FAIXAS_IRPF) {
    if (baseCalculoIRPF >= faixa.min && baseCalculoIRPF <= faixa.max) {
      irpf = Math.max(0, (baseCalculoIRPF * faixa.aliquota) - faixa.deducao);
      break;
    }
  }
  
  // FGTS
  const fgts = Math.min(salarioBruto, TETO_FGTS) * 0.08;
  
  // Vale Transporte (desconto máximo de 6% do salário)
  const descontoValeTransporte = Math.min(data.valeTransporte, salarioBruto * 0.06);
  
  // Total de descontos
  const outrosDescontos = data.sindicato + data.associacao + data.emprestimos + data.outrosDescontos;
  const totalDescontado = inss + irpf + descontoValeTransporte + outrosDescontos;
  
  // Benefícios
  const totalBeneficios = data.valeRefeicao + data.valeTransporte + data.planoSaude + 
                         data.valeAlimentacao + data.auxilioCreche + data.outrosBeneficios;
  const beneficiosLiquidos = totalBeneficios - descontoValeTransporte;
  
  // Salário líquido
  const salarioLiquido = salarioBruto - totalDescontado + beneficiosLiquidos;
  const totalRecebido = salarioBruto + beneficiosLiquidos;
  
  // Cálculos de tempo
  const dataAdmissao = new Date(data.dataAdmissao);
  const hoje = new Date();
  const mesesTrabalhados = Math.floor((hoje.getTime() - dataAdmissao.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  const anosCompletos = Math.floor(mesesTrabalhados / 12);
  
  // Cálculos anuais
  const decimoTerceiro = salarioBruto;
  const ferias = salarioBruto;
  const tercoFerias = salarioBruto / 3;
  const totalAnual = (salarioLiquido * 12) + decimoTerceiro + ferias + tercoFerias;
  
  // Totais acumulados
  const totalRecebidoPeriodo = totalRecebido * mesesTrabalhados;
  const totalFgtsPeriodo = fgts * mesesTrabalhados;
  const totalInssRecolhido = inss * mesesTrabalhados;
  const totalIrpfRecolhido = irpf * mesesTrabalhados;
  
  // Direitos proporcionais
  const mesesAnoAtual = ((hoje.getMonth() + 1) + (hoje.getDate() >= dataAdmissao.getDate() ? 0 : -1));
  const diasFeriasAdquiridos = Math.min(30, Math.floor(mesesTrabalhados * 2.5));
  const decimoTerceiroProporcional = (salarioBruto / 12) * Math.max(1, mesesAnoAtual);
  
  // Cálculos de rescisão
  const fgtsDisponivel = totalFgtsPeriodo;
  const multaFgts = fgtsDisponivel * 0.40;
  
  const saldoSalario = salarioBruto; // Assumindo rescisão no início do mês
  const feriasProporcionais = (salarioBruto / 12) * (mesesTrabalhados % 12);
  const tercoFeriasProporcionais = feriasProporcionais / 3;
  
  const demissaoSemJustaCausa = saldoSalario + decimoTerceiroProporcional + 
                               feriasProporcionais + tercoFeriasProporcionais + 
                               fgtsDisponivel + multaFgts;
  
  const pedidoDemissao = saldoSalario + decimoTerceiroProporcional + 
                        feriasProporcionais + tercoFeriasProporcionais + 
                        fgtsDisponivel; // Sem multa do FGTS
  
  const demissaoJustaCausa = saldoSalario + fgtsDisponivel; // Apenas saldo e FGTS
  
  // Seguro Desemprego
  const elegivel = mesesTrabalhados >= 12;
  const parcelas = mesesTrabalhados >= 24 ? 5 : mesesTrabalhados >= 18 ? 4 : 3;
  const mediaSalarios = salarioBruto; // Simplificado
  const valorParcela = Math.max(SALARIO_MINIMO, Math.min(mediaSalarios * 0.8, 2313.74));
  const totalSeguroDesemprego = valorParcela * parcelas;
  
  return {
    salarioBruto,
    salarioLiquido,
    inss,
    irpf,
    fgts,
    totalBeneficios,
    beneficiosLiquidos,
    totalRecebido,
    totalDescontado,
    decimoTerceiro,
    ferias,
    tercoFerias,
    totalAnual,
    mesesTrabalhados,
    anosCompletos,
    totalRecebidoPeriodo,
    totalFgtsPeriodo,
    totalInssRecolhido,
    totalIrpfRecolhido,
    rescisao: {
      demissaoSemJustaCausa,
      pedidoDemissao,
      demissaoJustaCausa,
      aposentadoria: demissaoSemJustaCausa,
      fgtsDisponivel,
      multaFgts,
      seguroDesemprego: {
        elegivel,
        parcelas,
        valorParcela,
        totalReceber: totalSeguroDesemprego
      }
    },
    direitos: {
      ferias: {
        diasAdquiridos: diasFeriasAdquiridos,
        diasVencidos: Math.max(0, diasFeriasAdquiridos - 30),
        valorFerias: feriasProporcionais,
        valorTercoFerias: tercoFeriasProporcionais
      },
      decimoTerceiro: {
        diasAdquiridos: mesesAnoAtual,
        valorProporcional: decimoTerceiroProporcional
      }
    }
  };
}