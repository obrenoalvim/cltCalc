import React, { useState } from 'react';
import { User, Building, DollarSign, Calendar, Gift, Minus, Save, Calculator } from 'lucide-react';
import { CLTData } from '../types/clt';

interface Props {
  onSubmit: (data: CLTData) => void;
  initialData?: CLTData | null;
}

const FormularioCLT: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CLTData>({
    nome: initialData?.nome || '',
    cpf: initialData?.cpf || '',
    dependentes: initialData?.dependentes || 0,
    salarioBruto: initialData?.salarioBruto || 0,
    dataAdmissao: initialData?.dataAdmissao || '',
    cargo: initialData?.cargo || '',
    empresa: initialData?.empresa || '',
    tipoContrato: initialData?.tipoContrato || 'clt',
    valeRefeicao: initialData?.valeRefeicao || 0,
    valeTransporte: initialData?.valeTransporte || 0,
    planoSaude: initialData?.planoSaude || 0,
    valeAlimentacao: initialData?.valeAlimentacao || 0,
    auxilioCreche: initialData?.auxilioCreche || 0,
    outrosBeneficios: initialData?.outrosBeneficios || 0,
    sindicato: initialData?.sindicato || 0,
    associacao: initialData?.associacao || 0,
    emprestimos: initialData?.emprestimos || 0,
    outrosDescontos: initialData?.outrosDescontos || 0,
    horasTrabalhadas: initialData?.horasTrabalhadas || 44,
    diasTrabalhados: initialData?.diasTrabalhados || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof CLTData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dados para Cálculo CLT</h2>
            <p className="text-sm text-gray-600">Preencha os dados para calcular todos os seus direitos trabalhistas</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
              <User className="w-5 h-5 text-blue-600" />
              <span>Dados Pessoais</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="000.000.000-00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dependentes IR
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.dependentes}
                  onChange={(e) => handleInputChange('dependentes', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Dados do Contrato */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
              <Building className="w-5 h-5 text-blue-600" />
              <span>Dados do Contrato</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salário Bruto Mensal *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.salarioBruto || ''}
                    onChange={(e) => handleInputChange('salarioBruto', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Admissão *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.dataAdmissao}
                    onChange={(e) => handleInputChange('dataAdmissao', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Contrato
                </label>
                <select
                  value={formData.tipoContrato}
                  onChange={(e) => handleInputChange('tipoContrato', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="clt">CLT Efetivo</option>
                  <option value="temporario">Contrato Temporário</option>
                  <option value="experiencia">Contrato de Experiência</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo/Função
                </label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => handleInputChange('cargo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Seu cargo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => handleInputChange('empresa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nome da empresa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horas/Semana
                </label>
                <input
                  type="number"
                  min="1"
                  max="44"
                  value={formData.horasTrabalhadas}
                  onChange={(e) => handleInputChange('horasTrabalhadas', parseInt(e.target.value) || 44)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
              <Gift className="w-5 h-5 text-green-600" />
              <span>Benefícios</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vale Refeição
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valeRefeicao || ''}
                    onChange={(e) => handleInputChange('valeRefeicao', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vale Transporte
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valeTransporte || ''}
                    onChange={(e) => handleInputChange('valeTransporte', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plano de Saúde
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.planoSaude || ''}
                    onChange={(e) => handleInputChange('planoSaude', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vale Alimentação
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valeAlimentacao || ''}
                    onChange={(e) => handleInputChange('valeAlimentacao', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auxílio Creche
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.auxilioCreche || ''}
                    onChange={(e) => handleInputChange('auxilioCreche', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outros Benefícios
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.outrosBeneficios || ''}
                    onChange={(e) => handleInputChange('outrosBeneficios', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Descontos Adicionais */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
              <Minus className="w-5 h-5 text-red-600" />
              <span>Descontos Adicionais</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sindicato
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.sindicato || ''}
                    onChange={(e) => handleInputChange('sindicato', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Associação
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.associacao || ''}
                    onChange={(e) => handleInputChange('associacao', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empréstimos
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.emprestimos || ''}
                    onChange={(e) => handleInputChange('emprestimos', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outros Descontos
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.outrosDescontos || ''}
                    onChange={(e) => handleInputChange('outrosDescontos', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botão Submit */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5" />
              <span>Calcular Direitos CLT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCLT;