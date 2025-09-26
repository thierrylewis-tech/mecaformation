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
  const [dbStats, setDbStats] = useState<any>(null);

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

  const loadDatabaseStats = async () => {
    try {
      const { getDatabaseStats } = await import('../lib/supabase');
      const stats = await getDatabaseStats();
      setDbStats(stats);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

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
    
    // Charger les statistiques si toutes les tables existent
    const allTablesExist = statuses.every(s => s.exists);
    if (allTablesExist) {
      await loadDatabaseStats();
    }
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
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6 border border-blue-200">
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
              
              {/* Statistiques détaillées */}
              {dbStats && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3 text-sm">Contenu de la base :</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Articles techniques:</span>
                      <span className="font-semibold text-blue-600">{dbStats.automotive_articles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cours enseignement:</span>
                      <span className="font-semibold text-green-600">{dbStats.education_courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Codes diagnostic:</span>
                      <span className="font-semibold text-orange-600">{dbStats.diagnostic_codes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Modules formation:</span>
                      <span className="font-semibold text-purple-600">{dbStats.learning_modules}</span>
                    </div>
                  </div>
                </div>
              )}
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
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg p-6 mb-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-lg text-orange-800 font-bold mb-2">
                      🚨 Configuration Supabase Requise
                    </p>
                    <p className="text-sm text-orange-700 mb-4">
                      Pour activer toutes les fonctionnalités (ChatBot IA, recherche, comptes utilisateur), 
                      vous devez configurer Supabase.
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h4 className="font-bold text-orange-800 mb-2">📋 Étapes simples :</h4>
                      <ol className="text-sm text-orange-700 space-y-1 text-left">
                        <li>1. Cliquez sur ⚙️ <strong>Settings</strong> (en haut à droite)</li>
                        <li>2. Sélectionnez <strong>"Supabase"</strong></li>
                        <li>3. Cliquez <strong>"Connect to Supabase"</strong></li>
                        <li>4. Suivez les instructions</li>
                      </ol>
                    </div>
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
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-lg text-green-800 font-bold mb-2">
                      🎉 Base de Données Opérationnelle !
                    </p>
                    <p className="text-sm text-green-700 mb-4">
                      Félicitations ! Votre base de données est configurée avec {totalRows.toLocaleString()} enregistrements.
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2">✅ Fonctionnalités Activées :</h4>
                      <ul className="text-sm text-green-700 space-y-1 text-left">
                        <li>• ChatBot IA avec base de connaissances</li>
                        <li>• Recherche intelligente (1000+ articles)</li>
                        <li>• Comptes utilisateur sécurisés</li>
                        <li>• Codes diagnostic réels (500+)</li>
                        <li>• Formations structurées</li>
                      </ul>
                    </div>
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