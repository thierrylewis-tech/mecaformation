import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock, DollarSign, Wrench, Star, Database } from 'lucide-react';
import { getDiagnosticCode, DiagnosticCode } from '../lib/supabase';

const DiagnosticCodeLookup = () => {
  const [searchCode, setSearchCode] = useState('');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticCode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const commonCodes = [
    { code: 'P0300', description: 'Ratés de combustion détectés', severity: 'medium' },
    { code: 'P0420', description: 'Efficacité catalyseur', severity: 'high' },
    { code: 'P0171', description: 'Mélange trop pauvre', severity: 'medium' },
    { code: 'P0401', description: 'Débit EGR insuffisant', severity: 'medium' },
    { code: 'B1234', description: 'Capteur température', severity: 'low' },
    { code: 'U0100', description: 'Perte communication ECU', severity: 'critical' }
  ];

  const handleSearch = async () => {
    if (!searchCode.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: dbError } = await getDiagnosticCode(searchCode);
      
      if (dbError) {
        setError('Code non trouvé dans notre base de données');
        setDiagnosticResult(null);
      } else if (data) {
        setDiagnosticResult(data);
      }
    } catch (err) {
      setError('Erreur lors de la recherche');
      setDiagnosticResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Clock className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Database className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Recherche Code Diagnostic</h3>
        <p className="text-slate-600">Base de données complète avec 500+ codes de diagnostic</p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Entrez un code (ex: P0300, B1234, U0100)"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            maxLength={5}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !searchCode.trim()}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Common Codes */}
      <div className="mb-8">
        <h4 className="font-semibold text-slate-800 mb-4">Codes fréquents :</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {commonCodes.map(code => (
            <button
              key={code.code}
              onClick={() => {
                setSearchCode(code.code);
                handleSearch();
              }}
              className="text-left p-3 bg-slate-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-semibold text-slate-800">{code.code}</span>
                  <p className="text-sm text-slate-600">{code.description}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(code.severity)}`}>
                  {getSeverityIcon(code.severity)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Diagnostic Result */}
      {diagnosticResult && (
        <div className="border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-slate-800 font-mono">{diagnosticResult.code}</h4>
              <p className="text-slate-600">{diagnosticResult.description}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold flex items-center ${getSeverityColor(diagnosticResult.severity)}`}>
              {getSeverityIcon(diagnosticResult.severity)}
              <span className="ml-2 capitalize">{diagnosticResult.severity}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Symptoms */}
            <div>
              <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                Symptômes
              </h5>
              <ul className="space-y-2">
                {diagnosticResult.symptoms.map((symptom, index) => (
                  <li key={index} className="text-sm text-slate-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Causes */}
            <div>
              <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                <Search className="h-4 w-4 mr-2 text-blue-500" />
                Causes possibles
              </h5>
              <ul className="space-y-2">
                {diagnosticResult.possible_causes.map((cause, index) => (
                  <li key={index} className="text-sm text-slate-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Diagnostic Steps */}
          <div className="mt-6">
            <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
              <Wrench className="h-4 w-4 mr-2 text-green-500" />
              Étapes de diagnostic
            </h5>
            <ol className="space-y-2">
              {diagnosticResult.diagnostic_steps.map((step, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Tools and Estimates */}
          <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
            <div>
              <h5 className="font-semibold text-slate-800 mb-2">🔧 Outils requis</h5>
              <div className="space-y-1">
                {diagnosticResult.tools_required.map((tool, index) => (
                  <div key={index} className="text-sm text-slate-600 bg-slate-50 rounded px-2 py-1">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h5 className="font-semibold text-slate-800 mb-2">⏱️ Temps estimé</h5>
              <div className="text-2xl font-bold text-blue-600">
                {diagnosticResult.estimated_time_hours}h
              </div>
            </div>
            
            <div className="text-center">
              <h5 className="font-semibold text-slate-800 mb-2">💰 Coût estimé</h5>
              <div className="text-2xl font-bold text-green-600">
                {diagnosticResult.estimated_cost_euros}€
              </div>
            </div>
          </div>

          {/* Brands */}
          {diagnosticResult.brands.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h5 className="font-semibold text-slate-800 mb-2">🚗 Marques concernées</h5>
              <div className="flex flex-wrap gap-2">
                {diagnosticResult.brands.map((brand, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagnosticCodeLookup;