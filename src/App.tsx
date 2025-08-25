import React, { useState } from 'react';
import { Calculator, FileText, DollarSign, Calendar, User, Building, AlertCircle, CheckCircle, TrendingUp, Info } from 'lucide-react';
import FormularioCLT from './components/FormularioCLT';
import DashboardCLT from './components/DashboardCLT';
import { CLTData, CalculatedResults } from './types/clt';
import { calculateCLTResults } from './utils/calculations';

function App() {
  const [cltData, setCltData] = useState<CLTData | null>(null);
  const [calculatedResults, setCalculatedResults] = useState<CalculatedResults | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard'>('form');

  const handleFormSubmit = (data: CLTData) => {
    setCltData(data);
    const results = calculateCLTResults(data);
    setCalculatedResults(results);
    setActiveTab('dashboard');
  };

  const handleNewCalculation = () => {
    setCltData(null);
    setCalculatedResults(null);
    setActiveTab('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CLT Calculator</h1>
                <p className="text-sm text-gray-600">Sistema Completo de Cálculos Trabalhistas</p>
              </div>
            </div>
            
            {calculatedResults && (
              <button
                onClick={handleNewCalculation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Nova Simulação</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formulário</span>
          </button>
          <button
            onClick={() => calculatedResults && setActiveTab('dashboard')}
            disabled={!calculatedResults}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === 'dashboard' && calculatedResults
                ? 'bg-blue-600 text-white shadow-sm'
                : calculatedResults
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Resultados</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'form' && (
          <FormularioCLT onSubmit={handleFormSubmit} initialData={cltData} />
        )}
        
        {activeTab === 'dashboard' && calculatedResults && cltData && (
          <DashboardCLT data={cltData} results={calculatedResults} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
              <Info className="w-5 h-5" />
              <span className="font-medium">Importante</span>
            </div>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Este sistema é uma ferramenta de cálculo baseada na legislação trabalhista brasileira vigente. 
              Os valores são aproximados e podem variar conforme convenções coletivas e acordos específicos. 
              Para informações precisas, consulte sempre um profissional especializado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;