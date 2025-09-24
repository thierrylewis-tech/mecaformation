import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, AlertTriangle, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TableStatus {
  name: string;
  exists: boolean;
  rowCount?: number;
  error?: string;
}

const DatabaseStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const expectedTables = [
    'automotive_knowledge',
    'general_education', 
    'diagnostic_codes',
    'vehicle_systems',
    'maintenance_procedures',
    'chat_conversations',
    'user_progress',
    'learning_modules'
  ];

  const checkTables = async () => {
    setLoading(true);
    const statuses: TableStatus[] = [];

    for (const tableName of expectedTables) {
      try {
        // Essayer de compter les lignes dans la table
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          statuses.push({
            name: tableName,
            exists: false,
            error: error.message
          });
        } else {
          statuses.push({
            name: tableName,
            exists: true,
            rowCount: count || 0
          });
        }
      } catch (err) {
        statuses.push({
          name: tableName,
          exists: false,
          error: 'Erreur de connexion'
        });
      }
    }

    setTableStatuses(statuses);
    setLastCheck(new Date());
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      checkTables();
    }
  }, [isOpen]);

  const getTableIcon = (status: TableStatus) => {
    if (status.exists) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTableDescription = (tableName: string) => {
    const descriptions: { [key: string]: string } = {
      'automotive_knowledge': 'Articles techniques automobile',
      'general_education': 'Cours enseignement général',
      'diagnostic_codes': 'Codes défauts et solutions',
      'vehicle_systems': 'Systèmes véhicules',
      'maintenance_procedures': 'Procédures maintenance',
      'chat_conversations': 'Historique conversations',
      'user_progress': 'Progression utilisateurs',
      'learning_modules': 'Modules apprentissage'
    };
    return descriptions[tableName] || 'Table inconnue';
  };

  const totalTables = expectedTables.length;
  const existingTables = tableStatuses.filter(t => t.exists).length;
  const totalRows = tableStatuses.reduce((sum, t) => sum + (t.rowCount || 0), 0);

  return (
    <>
      {/* Database Status Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-20 right-6 z-50 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 ${
          isOpen ? 'hidden' : 'block'
        }`}
        title="Vérifier l'état de la base de données"
      >
        <Database className="h-5 w-5" />
      </button>

      {/* Database Status Panel */}
      {isOpen && (
        <div className="fixed top-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-bold text-lg">État Base de Données</h3>
                  <p className="text-slate-300 text-sm">Vérification tables Supabase</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                {isOpen ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">{existingTables}/{totalTables}</div>
                  <div className="text-xs text-slate-500">Tables</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalRows.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Enregistrements</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${existingTables === totalTables ? 'text-green-600' : 'text-orange-600'}`}>
                    {existingTables === totalTables ? '✅' : '⚠️'}
                  </div>
                  <div className="text-xs text-slate-500">Statut</div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-slate-500">
                {lastCheck ? `Dernière vérification: ${lastCheck.toLocaleTimeString()}` : 'Pas encore vérifié'}
              </div>
              <button
                onClick={checkTables}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Vérification...' : 'Actualiser'}
              </button>
            </div>

            {/* Tables Status */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {tableStatuses.map((table, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  table.exists ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getTableIcon(table)}
                      <span className="font-medium text-slate-800 ml-2">{table.name}</span>
                    </div>
                    {table.exists && table.rowCount !== undefined && (
                      <span className="text-sm font-medium text-slate-600">
                        {table.rowCount.toLocaleString()} lignes
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-1">
                    {getTableDescription(table.name)}
                  </p>
                  {table.error && (
                    <p className="text-xs text-red-600 mt-1">
                      Erreur: {table.error}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              {existingTables === 0 ? (
                <div className="text-center">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-orange-800 font-medium">
                      Aucune table détectée
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      Cliquez sur "Connect to Supabase" pour configurer la base de données
                    </p>
                  </div>
                </div>
              ) : existingTables < totalTables ? (
                <div className="text-center">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-yellow-800 font-medium">
                      Configuration incomplète
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      {totalTables - existingTables} table(s) manquante(s)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800 font-medium">
                      Base de données opérationnelle
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Toutes les tables sont présentes et fonctionnelles
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DatabaseStatus;