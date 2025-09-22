import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  ChevronRight,
  Play,
  Eye,
  Award,
  Wrench,
  Zap,
  Settings,
  Car,
  Battery,
  Gauge
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'cours' | 'video' | 'exercice' | 'evaluation' | 'document';
  level: 'CAP' | 'BAC_PRO' | 'BTS';
  category: string;
  subcategory: string;
  duration?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  views: number;
  rating: number;
  description: string;
  tags: string[];
  thumbnail?: string;
  isNew?: boolean;
  isPremium?: boolean;
}

const ResourcesPlatform = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const levels = [
    { id: 'all', name: 'Tous niveaux', color: 'bg-slate-100' },
    { id: 'CAP', name: 'CAP MVA', color: 'bg-green-100 text-green-700' },
    { id: 'BAC_PRO', name: 'Bac Pro MVA', color: 'bg-blue-100 text-blue-700' },
    { id: 'BTS', name: 'BTS MVA', color: 'bg-purple-100 text-purple-700' }
  ];

  const categories = [
    { id: 'all', name: 'Toutes catégories', icon: BookOpen },
    { id: 'moteur', name: 'Moteur & Transmission', icon: Settings },
    { id: 'electrique', name: 'Systèmes Électriques', icon: Zap },
    { id: 'electronique', name: 'Électronique Embarquée', icon: Gauge },
    { id: 'hybride', name: 'Véhicules Hybrides/Électriques', icon: Battery },
    { id: 'chassis', name: 'Châssis & Suspension', icon: Car },
    { id: 'diagnostic', name: 'Diagnostic & Maintenance', icon: Wrench },
    { id: 'securite', name: 'Sécurité & Réglementation', icon: Award }
  ];

  const resources: Resource[] = [
    // CAP MVA Resources
    {
      id: '1',
      title: 'Nouveau Référentiel CAP MVA 2024 - Guide Complet',
      type: 'document',
      level: 'CAP',
      category: 'diagnostic',
      subcategory: 'Référentiel officiel',
      difficulty: 2,
      views: 2847,
      rating: 4.8,
      description: 'Document officiel du nouveau référentiel CAP MVA avec toutes les compétences et savoirs associés.',
      tags: ['référentiel', 'officiel', '2024', 'compétences'],
      isNew: true
    },
    {
      id: '2',
      title: 'Technologie des Moteurs Thermiques - Cours Complet',
      type: 'cours',
      level: 'CAP',
      category: 'moteur',
      subcategory: 'Moteurs essence et diesel',
      duration: '2h30',
      difficulty: 3,
      views: 1523,
      rating: 4.6,
      description: 'Cours détaillé sur le fonctionnement des moteurs thermiques, cycles, composants et maintenance.',
      tags: ['moteur', 'thermique', 'essence', 'diesel', 'maintenance'],
      thumbnail: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Diagnostic Électronique - Méthodes et Outils',
      type: 'video',
      level: 'CAP',
      category: 'diagnostic',
      subcategory: 'Outils de diagnostic',
      duration: '45min',
      difficulty: 4,
      views: 3241,
      rating: 4.9,
      description: 'Vidéo pratique sur l\'utilisation des outils de diagnostic électronique modernes.',
      tags: ['diagnostic', 'électronique', 'outils', 'pratique'],
      thumbnail: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true
    },
    {
      id: '4',
      title: 'Systèmes de Freinage - Exercices Pratiques',
      type: 'exercice',
      level: 'CAP',
      category: 'chassis',
      subcategory: 'Freinage',
      duration: '1h15',
      difficulty: 3,
      views: 987,
      rating: 4.4,
      description: 'Série d\'exercices pratiques sur les systèmes de freinage : disques, tambours, ABS.',
      tags: ['freinage', 'exercices', 'ABS', 'sécurité']
    },

    // BAC PRO Resources
    {
      id: '5',
      title: 'Véhicules Hybrides - Architecture et Fonctionnement',
      type: 'cours',
      level: 'BAC_PRO',
      category: 'hybride',
      subcategory: 'Systèmes hybrides',
      duration: '3h20',
      difficulty: 4,
      views: 2156,
      rating: 4.7,
      description: 'Cours approfondi sur les différentes architectures hybrides et leur fonctionnement.',
      tags: ['hybride', 'électrique', 'architecture', 'fonctionnement'],
      thumbnail: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: true
    },
    {
      id: '6',
      title: 'Multiplexage et Réseaux Embarqués',
      type: 'video',
      level: 'BAC_PRO',
      category: 'electronique',
      subcategory: 'Réseaux CAN',
      duration: '1h50',
      difficulty: 5,
      views: 1834,
      rating: 4.8,
      description: 'Comprendre les réseaux CAN, LIN et FlexRay dans les véhicules modernes.',
      tags: ['multiplexage', 'CAN', 'LIN', 'réseaux', 'communication'],
      thumbnail: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true
    },
    {
      id: '7',
      title: 'Évaluation - Maintenance Préventive',
      type: 'evaluation',
      level: 'BAC_PRO',
      category: 'diagnostic',
      subcategory: 'Maintenance préventive',
      duration: '2h00',
      difficulty: 3,
      views: 756,
      rating: 4.5,
      description: 'Évaluation complète sur les procédures de maintenance préventive selon le référentiel.',
      tags: ['évaluation', 'maintenance', 'préventive', 'procédures']
    },

    // BTS Resources
    {
      id: '8',
      title: 'Gestion d\'Atelier et Relation Client',
      type: 'cours',
      level: 'BTS',
      category: 'diagnostic',
      subcategory: 'Management',
      duration: '4h00',
      difficulty: 4,
      views: 1245,
      rating: 4.6,
      description: 'Formation complète sur la gestion d\'atelier, planification et relation clientèle.',
      tags: ['gestion', 'atelier', 'management', 'client', 'planification']
    },
    {
      id: '9',
      title: 'Véhicules Électriques - Haute Tension',
      type: 'video',
      level: 'BTS',
      category: 'hybride',
      subcategory: 'Sécurité haute tension',
      duration: '2h30',
      difficulty: 5,
      views: 1876,
      rating: 4.9,
      description: 'Formation sécurité pour l\'intervention sur véhicules électriques haute tension.',
      tags: ['électrique', 'haute tension', 'sécurité', 'habilitation'],
      thumbnail: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPremium: true,
      isNew: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesLevel && matchesCategory && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cours': return BookOpen;
      case 'video': return Video;
      case 'exercice': return FileText;
      case 'evaluation': return Award;
      case 'document': return Download;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cours': return 'bg-blue-100 text-blue-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'exercice': return 'bg-green-100 text-green-700';
      case 'evaluation': return 'bg-purple-100 text-purple-700';
      case 'document': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

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

  return (
    <section id="ressources" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4 mr-2" />
            Plateforme de ressources MVA
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Ressources Pédagogiques
            <span className="text-orange-500"> Complètes</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Accédez à notre bibliothèque complète de ressources pédagogiques conformes au nouveau référentiel MVA, 
            du CAP au BTS Maintenance des Véhicules Automobiles.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtres
            </button>
          </div>

          {/* Filter options */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Level filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Niveau</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>

              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Type filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Tous types</option>
                  <option value="cours">Cours</option>
                  <option value="video">Vidéos</option>
                  <option value="exercice">Exercices</option>
                  <option value="evaluation">Évaluations</option>
                  <option value="document">Documents</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Level tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedLevel === level.id
                  ? 'bg-orange-500 text-white'
                  : `${level.color} hover:bg-orange-100`
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-600">
            {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} trouvée{filteredResources.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map(resource => {
            const TypeIcon = getTypeIcon(resource.type);
            const levelInfo = levels.find(l => l.id === resource.level);
            
            return (
              <div key={resource.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Thumbnail or icon */}
                <div className="relative h-48 bg-slate-100">
                  {resource.thumbnail ? (
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <TypeIcon className="h-16 w-16 text-slate-400" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {resource.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Nouveau
                      </span>
                    )}
                    {resource.isPremium && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(resource.type)}`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </div>
                  </div>

                  {/* Play button for videos */}
                  {resource.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <Play className="h-8 w-8" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Level and category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelInfo?.color}`}>
                      {levelInfo?.name}
                    </span>
                    <span className="text-xs text-slate-500">{resource.subcategory}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center space-x-4">
                      {resource.duration && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.duration}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {resource.views}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                      {resource.rating}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-500">Difficulté:</span>
                    <div className="flex items-center">
                      {getDifficultyStars(resource.difficulty)}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-slate-400 text-xs">+{resource.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Action button */}
                  <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center justify-center group">
                    Accéder à la ressource
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Aucune ressource trouvée</h3>
            <p className="text-slate-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Accès Premium</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Débloquez l'accès à toutes nos ressources premium, vidéos HD, évaluations corrigées 
            et contenus exclusifs conformes au nouveau référentiel MVA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Découvrir Premium
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold">
              Essai gratuit 7 jours
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPlatform;