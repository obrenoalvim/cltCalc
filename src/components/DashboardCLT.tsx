import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  PieChart, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Briefcase,
  Shield,
  Target,
  CreditCard,
  Wallet,
  BarChart3
} from 'lucide-react';
import { CLTData, CalculatedResults } from '../types/clt';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Props {
  data: CLTData;
  results: CalculatedResults;
}

const DashboardCLT: React.FC<Props> = ({ data, results }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'detailed' | 'rescission' | 'rights'>('overview');

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', change }: {
    title: string;
    value: string;
    subtitle?: string;
    icon: any;
    color?: string;
    change?: { value: string; trend: 'up' | 'down' };
  }) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      red: 'bg-red-50 border-red-200 text-red-900',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
    };

    const iconColors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600',
    };

    return (
      <div className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${colorClasses[color as keyof typeof colorClasses]}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Icon className={`w-5 h-5 ${iconColors[color as keyof typeof iconColors]}`} />
              <h3 className="text-sm font-medium opacity-80">{title}</h3>
            </div>
            <p className="text-2xl font-bold mb-1">{value}</p>
            {subtitle && (
              <p className="text-sm opacity-60">{subtitle}</p>
            )}
          </div>
          {change && (
            <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-md ${
              change.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp className={`w-3 h-3 ${change.trend === 'down' ? 'rotate-180' : ''}`} />
              <span>{change.value}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header com informações do funcionário */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{data.nome}</h2>
              <p className="text-gray-600">
                {data.cargo} {data.empresa && `na ${data.empresa}`}
              </p>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>Admissão: {formatDate(data.dataAdmissao)}</span>
                <span>•</span>
                <span>{results.anosCompletos} anos e {results.mesesTrabalhados % 12} meses</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600">Salário Líquido Mensal</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.salarioLiquido)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveSection('overview')}
            className={`flex-1 min-w-0 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeSection === 'overview'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveSection('detailed')}
            className={`flex-1 min-w-0 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeSection === 'detailed'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Detalhado
          </button>
          <button
            onClick={() => setActiveSection('rescission')}
            className={`flex-1 min-w-0 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeSection === 'rescission'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Rescisão
          </button>
          <button
            onClick={() => setActiveSection('rights')}
            className={`flex-1 min-w-0 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeSection === 'rights'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Direitos
          </button>
        </div>
      </div>

      {/* Content based on active section */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Salário Bruto"
            value={formatCurrency(results.salarioBruto)}
            subtitle="Valor base mensal"
            icon={DollarSign}
            color="blue"
          />
          
          <StatCard
            title="Salário Líquido"
            value={formatCurrency(results.salarioLiquido)}
            subtitle="Após descontos"
            icon={Wallet}
            color="green"
          />
          
          <StatCard
            title="Total Descontos"
            value={formatCurrency(results.totalDescontado)}
            subtitle="INSS + IRPF + outros"
            icon={CreditCard}
            color="red"
          />
          
          <StatCard
            title="FGTS Mensal"
            value={formatCurrency(results.fgts)}
            subtitle="8% do salário bruto"
            icon={Shield}
            color="purple"
          />
          
          <StatCard
            title="Total Recebido"
            value={formatCurrency(results.totalRecebidoPeriodo)}
            subtitle={`Em ${results.mesesTrabalhados} meses`}
            icon={TrendingUp}
            color="green"
          />
          
          <StatCard
            title="FGTS Acumulado"
            value={formatCurrency(results.totalFgtsPeriodo)}
            subtitle="Valor total depositado"
            icon={Target}
            color="blue"
          />
          
          <StatCard
            title="INSS Recolhido"
            value={formatCurrency(results.totalInssRecolhido)}
            subtitle="Total contribuído"
            icon={Building}
            color="yellow"
          />
          
          <StatCard
            title="13º Proporcional"
            value={formatCurrency(results.direitos.decimoTerceiro.valorProporcional)}
            subtitle={`${results.direitos.decimoTerceiro.diasAdquiridos}/12 meses`}
            icon={Calendar}
            color="purple"
          />
        </div>
      )}

      {activeSection === 'detailed' && (
        <div className="space-y-6">
          {/* Breakdown mensal */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Breakdown Mensal</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Receitas */}
              <div>
                <h4 className="font-medium text-green-700 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Receitas</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Salário Bruto</span>
                    <span className="font-medium text-green-600">{formatCurrency(results.salarioBruto)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Vale Refeição</span>
                    <span className="font-medium text-green-600">{formatCurrency(data.valeRefeicao)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Vale Transporte</span>
                    <span className="font-medium text-green-600">{formatCurrency(data.valeTransporte)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Outros Benefícios</span>
                    <span className="font-medium text-green-600">{formatCurrency(data.planoSaude + data.valeAlimentacao + data.auxilioCreche + data.outrosBeneficios)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-green-200 font-semibold">
                    <span className="text-gray-900">Total Receitas</span>
                    <span className="text-green-600">{formatCurrency(results.totalRecebido)}</span>
                  </div>
                </div>
              </div>
              
              {/* Descontos */}
              <div>
                <h4 className="font-medium text-red-700 mb-4 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Descontos</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">INSS ({((results.inss / results.salarioBruto) * 100).toFixed(2)}%)</span>
                    <span className="font-medium text-red-600">-{formatCurrency(results.inss)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">IRPF</span>
                    <span className="font-medium text-red-600">-{formatCurrency(results.irpf)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Vale Transporte (6%)</span>
                    <span className="font-medium text-red-600">-{formatCurrency(Math.min(data.valeTransporte, results.salarioBruto * 0.06))}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Outros Descontos</span>
                    <span className="font-medium text-red-600">-{formatCurrency(data.sindicato + data.associacao + data.emprestimos + data.outrosDescontos)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-red-200 font-semibold">
                    <span className="text-gray-900">Total Descontos</span>
                    <span className="text-red-600">-{formatCurrency(results.totalDescontado)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Salário Líquido</span>
                <span className="text-2xl font-bold text-blue-600">{formatCurrency(results.salarioLiquido)}</span>
              </div>
            </div>
          </div>

          {/* Projeções Anuais */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Projeção Anual</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">13º Salário</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(results.decimoTerceiro)}</p>
                <p className="text-xs text-purple-700">Valor integral anual</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Férias + 1/3</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(results.ferias + results.tercoFerias)}</p>
                <p className="text-xs text-blue-700">Incluindo terço constitucional</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Total Anual</span>
                </div>
                <p className="text-xl font-bold text-green-600">{formatCurrency(results.totalAnual)}</p>
                <p className="text-xs text-green-700">Salário + 13º + Férias</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'rescission' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Simulação de Rescisão</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demissão sem justa causa */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-900">Demissão sem Justa Causa</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Saldo de Salário + Férias + 13º</span>
                    <span className="font-medium">{formatCurrency(results.rescisao.demissaoSemJustaCausa - results.rescisao.fgtsDisponivel - results.rescisao.multaFgts)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>FGTS Disponível</span>
                    <span className="font-medium">{formatCurrency(results.rescisao.fgtsDisponivel)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Multa FGTS (40%)</span>
                    <span className="font-medium">{formatCurrency(results.rescisao.multaFgts)}</span>
                  </div>
                  <div className="border-t border-red-300 pt-2">
                    <div className="flex justify-between font-bold text-red-900">
                      <span>Total a Receber</span>
                      <span>{formatCurrency(results.rescisao.demissaoSemJustaCausa)}</span>
                    </div>
                  </div>
                </div>
                
                {results.rescisao.seguroDesemprego.elegivel && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Seguro Desemprego</h5>
                    <p className="text-sm text-blue-700">
                      {results.rescisao.seguroDesemprego.parcelas} parcelas de {formatCurrency(results.rescisao.seguroDesemprego.valorParcela)}
                    </p>
                    <p className="text-sm font-medium text-blue-800">
                      Total: {formatCurrency(results.rescisao.seguroDesemprego.totalReceber)}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Pedido de Demissão */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-900">Pedido de Demissão</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Saldo de Salário + Férias + 13º</span>
                    <span className="font-medium">{formatCurrency(results.rescisao.pedidoDemissao - results.rescisao.fgtsDisponivel)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>FGTS Disponível</span>
                    <span className="font-medium">{formatCurrency(results.rescisao.fgtsDisponivel)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Sem multa FGTS</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="border-t border-yellow-300 pt-2">
                    <div className="flex justify-between font-bold text-yellow-900">
                      <span>Total a Receber</span>
                      <span>{formatCurrency(results.rescisao.pedidoDemissao)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700">
                    <strong>Atenção:</strong> No pedido de demissão não há direito ao seguro desemprego nem à multa de 40% do FGTS.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Demissão por Justa Causa */}
            <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Demissão por Justa Causa</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{formatCurrency(results.rescisao.demissaoJustaCausa)}</p>
                  <p className="text-sm text-gray-500">Apenas saldo de salário</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{formatCurrency(results.rescisao.fgtsDisponivel)}</p>
                  <p className="text-sm text-gray-500">FGTS sem multa</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">R$ 0,00</p>
                  <p className="text-sm text-red-500">Sem 13º, férias ou seguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'rights' && (
        <div className="space-y-6">
          {/* Direitos Adquiridos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Direitos Adquiridos</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Férias */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Férias</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Período aquisitivo</span>
                    <span className="font-medium">{Math.floor(results.mesesTrabalhados / 12)} ano(s) completo(s)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Dias adquiridos</span>
                    <span className="font-medium">{results.direitos.ferias.diasAdquiridos} dias</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Valor das férias</span>
                    <span className="font-medium">{formatCurrency(results.direitos.ferias.valorFerias)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>1/3 constitucional</span>
                    <span className="font-medium">{formatCurrency(results.direitos.ferias.valorTercoFerias)}</span>
                  </div>
                  <div className="border-t border-blue-300 pt-2">
                    <div className="flex justify-between font-bold text-blue-900">
                      <span>Total Férias</span>
                      <span>{formatCurrency(results.direitos.ferias.valorFerias + results.direitos.ferias.valorTercoFerias)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 13º Salário */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>13º Salário</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Meses trabalhados no ano</span>
                    <span className="font-medium">{results.direitos.decimoTerceiro.diasAdquiridos}/12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Base de cálculo</span>
                    <span className="font-medium">{formatCurrency(results.salarioBruto)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Percentual adquirido</span>
                    <span className="font-medium">{((results.direitos.decimoTerceiro.diasAdquiridos / 12) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="border-t border-purple-300 pt-2">
                    <div className="flex justify-between font-bold text-purple-900">
                      <span>Valor Proporcional</span>
                      <span>{formatCurrency(results.direitos.decimoTerceiro.valorProporcional)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Informações Importantes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Informações Importantes</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">FGTS - Fundo de Garantia</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Depósito mensal de 8% do salário bruto</li>
                    <li>• Disponível em caso de demissão sem justa causa</li>
                    <li>• Pode ser sacado na aposentadoria ou compra da casa própria</li>
                    <li>• Rende juros de 3% ao ano + TR</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Seguro Desemprego</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Disponível em demissão sem justa causa</li>
                    <li>• De 3 a 5 parcelas conforme tempo trabalhado</li>
                    <li>• Valor baseado nos últimos 3 salários</li>
                    <li>• Carência mínima de 12 meses trabalhados</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">Aviso Prévio</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• 30 dias + 3 dias por ano trabalhado</li>
                    <li>• Pode ser indenizado ou trabalhado</li>
                    <li>• No pedido de demissão, funcionário deve cumprir</li>
                    <li>• Máximo de 90 dias</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-2">Prazo para Pagamento</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Até o 1º dia útil após término do contrato</li>
                    <li>• Multa por atraso: 1 salário por dia</li>
                    <li>• Homologação obrigatória se mais de 1 ano</li>
                    <li>• Sindicato ou Ministério do Trabalho</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCLT;