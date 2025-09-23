import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Video, 
  FileText, 
  Award, 
  Clock, 
  Star, 
  Eye, 
  Download,
  Zap,
  Car,
  Settings,
  Wrench,
  Calculator,
  Globe,
  ChevronRight,
  Database,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';
import { supabase, AutomotiveKnowledge, GeneralEducation } from '../lib/supabase';

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  content: string;
  type: 'automotive' | 'education';
  difficulty_level: number;
  duration_minutes?: number;
  views_count: number;
  rating: number;
  keywords: string[];
  level?: string;
  subject?: string;
}

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'automotive' | 'education'>('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Toutes catégories', icon: BookOpen },
    { id: 'moteur_electrique', name: 'Moteurs Électriques', icon: Zap },
    { id: 'hybride', name: 'Véhicules Hybrides', icon: Car },
    { id: 'diagnostic', name: 'Diagnostic', icon: Search },
    { id: 'electronique', name: 'Électronique', icon: Settings },
    { id: 'adas', name: 'Systèmes ADAS', icon: Target },
    { id: 'climatisation', name: 'Climatisation', icon: Settings },
    { id: 'mathematiques', name: 'Mathématiques', icon: Calculator },
    { id: 'francais', name: 'Français Technique', icon: FileText },
    { id: 'anglais', name: 'Anglais Technique', icon: Globe }
  ];

  const levels = [
    { id: 'all', name: 'Tous niveaux' },
    { id: 'CAP', name: 'CAP MVA' },
    { id: 'BAC_PRO', name: 'Bac Pro MVA' },
    { id: 'BTS', name: 'BTS MVA' }
  ];

  const loadKnowledgeBase = async () => {
    setLoading(true);
    try {
      const promises = [];
      
      // Charger contenu automobile
      if (selectedType === 'all' || selectedType === 'automotive') {
        let automotiveQuery = supabase.from('automotive_knowledge').select('*');
        
        if (searchTerm) {
          automotiveQuery = automotiveQuery.ilike('title', `%${searchTerm}%`);
        }
        
        if (selectedCategory !== 'all' && !['mathematiques', 'francais', 'anglais'].includes(selectedCategory)) {
          automotiveQuery = automotiveQuery.eq('category', selectedCategory);
        }
        
        promises.push(automotiveQuery.limit(20));
      }
      
      // Charger contenu enseignement général
      if (selectedType === 'all' || selectedType === 'education') {
        let educationQuery = supabase.from('general_education').select('*');
        
        if (searchTerm) {
          educationQuery = educationQuery.ilike('title', `%${searchTerm}%`);
        }
        
        if (['mathematiques', 'francais', 'anglais'].includes(selectedCategory)) {
          educationQuery = educationQuery.eq('subject', selectedCategory);
        }
        
        if (selectedLevel !== 'all') {
          educationQuery = educationQuery.eq('level', selectedLevel);
        }
        
        promises.push(educationQuery.limit(20));
      }

      const results = await Promise.all(promises);
      const allItems: KnowledgeItem[] = [];

      // Traiter résultats automobile
      if (results[0]) {
        const automotiveData = results[0].data as AutomotiveKnowledge[];
        if (automotiveData) {
          allItems.push(...automotiveData.map(item => ({
            ...item,
            type: 'automotive' as const
          })));
        }
      }

      // Traiter résultats éducation
      const educationIndex = selectedType === 'automotive' ? 0 : results.length > 1 ? 1 : 0;
      if (results[educationIndex] && selectedType !== 'automotive') {
        const educationData = results[educationIndex].data as GeneralEducation[];
        if (educationData) {
          allItems.push(...educationData.map(item => ({
            ...item,
            type: 'education' as const,
            category: item.subject,
            views_count: 0,
            rating: 4.5
          })));
        }
      }

      setKnowledgeItems(allItems);
    } catch (error) {
      console.error('Erreur chargement base de connaissances:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledgeBase();
  }, [searchTerm, selectedCategory, selectedType, selectedLevel]);

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-slate-300'
        }`}
      />
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'automotive': return 'bg-blue-100 text-blue-700';
      case 'education': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'moteur_electrique': Zap,
      'hybride': Car,
      'diagnostic': Search,
      'electronique': Settings,
      'adas': Target,
      'climatisation': Settings,
      'mathematiques': Calculator,
      'francais': FileText,
      'anglais': Globe
    };
    
    const IconComponent = iconMap[category] || BookOpen;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <section id="base-connaissances" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Database className="h-4 w-4 mr-2" />
            Base de Connaissances Automobile
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Bibliothèque
            <span className="text-blue-500"> Technique Complète</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Base de données exhaustive</strong> avec plus de 1000 articles techniques, 
            codes de diagnostic, procédures de maintenance et cours d'enseignement général. 
            <em>Recherche intelligente</em> et <strong>contenu mis à jour quotidiennement</strong>.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">1000+</div>
            <div className="text-slate-600">Articles Techniques</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">500+</div>
            <div className="text-slate-600">Codes Diagnostic</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">200+</div>
            <div className="text-slate-600">Cours Enseignement</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">24/7</div>
            <div className="text-slate-600">Accès Permanent</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher dans la base de connaissances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtres
            </button>
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type de contenu</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tout le contenu</option>
                  <option value="automotive">Mécanique automobile</option>
                  <option value="education">Enseignement général</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Niveau</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-slate-600">
            {loading ? 'Recherche en cours...' : `${knowledgeItems.length} résultat${knowledgeItems.length > 1 ? 's' : ''} trouvé${knowledgeItems.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Knowledge Items Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {knowledgeItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-slate-100 p-2 rounded-lg mr-3">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                      {item.type === 'automotive' ? 'Mécanique' : 'Enseignement'}
                    </div>
                  </div>
                  {item.level && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {item.level}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                
                {item.subcategory && (
                  <p className="text-sm text-slate-500 mb-2">{item.subcategory}</p>
                )}
              </div>

              {/* Content Preview */}
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {item.content.substring(0, 150)}...
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div className="flex items-center space-x-3">
                    {item.duration_minutes && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.duration_minutes}min
                      </div>
                    )}
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {item.views_count}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                      {item.rating.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-500">Difficulté:</span>
                  <div className="flex items-center">
                    {getDifficultyStars(item.difficulty_level)}
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.keywords.slice(0, 3).map(keyword => (
                    <span key={keyword} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                  {item.keywords.length > 3 && (
                    <span className="text-slate-400 text-xs">+{item.keywords.length - 3}</span>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center group">
                  Consulter l'article
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && knowledgeItems.length === 0 && (
          <div className="text-center py-12">
            <Database className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Aucun contenu trouvé</h3>
            <p className="text-slate-500 mb-4">Essayez de modifier vos critères de recherche.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
                setSelectedLevel('all');
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Recherche dans la base de données...</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Accès Complet à la Base de Connaissances</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Débloquez l'accès à tous nos contenus techniques, codes de diagnostic exclusifs, 
            procédures détaillées et cours d'enseignement général complets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Accès Premium - 22€/mois
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold">
              Essai Gratuit 7 Jours
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;