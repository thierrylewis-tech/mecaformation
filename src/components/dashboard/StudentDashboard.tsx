import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award, 
  Calendar, 
  MessageCircle, 
  Download,
  Play,
  CheckCircle,
  Star,
  Target,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProgress, getTrainingModules } from '../../lib/supabase';

interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  currentStreak: number;
  nextExam?: Date;
}

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    currentStreak: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load user progress
      const { data: progressData } = await getUserProgress(user.id);
      
      // Load training modules
      const { data: modulesData } = await getTrainingModules();
      
      // Calculate stats
      const totalCourses = modulesData?.length || 0;
      const completedCourses = progressData?.filter(p => p.progress_percentage === 100).length || 0;
      const totalHours = progressData?.reduce((sum, p) => sum + (p.time_spent_minutes / 60), 0) || 0;
      
      setStats({
        totalCourses,
        completedCourses,
        totalHours: Math.round(totalHours),
        currentStreak: 7 // Mock data
      });

      // Mock recent activity
      setRecentActivity([
        {
          id: '1',
          type: 'course_completed',
          title: 'Diagnostic Véhicules Électriques',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          score: 95
        },
        {
          id: '2',
          type: 'quiz_passed',
          title: 'Quiz Systèmes Hybrides',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          score: 88
        },
        {
          id: '3',
          type: 'module_started',
          title: 'Formation ADAS',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        }
      ]);

      // Mock upcoming events
      setUpcomingEvents([
        {
          id: '1',
          title: 'Webinaire Véhicules Hydrogène',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          type: 'webinar'
        },
        {
          id: '2',
          title: 'Examen Blanc CAP MVA',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          type: 'exam'
        }
      ]);

    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'quiz_passed': return <Award className="h-4 w-4 text-blue-500" />;
      case 'module_started': return <Play className="h-4 w-4 text-orange-500" />;
      default: return <BookOpen className="h-4 w-4 text-slate-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Bonjour {user?.firstName} ! 👋
              </h1>
              <p className="text-slate-600">Continuez votre formation automobile</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-slate-600 hover:text-slate-800 transition-colors">
                <Settings className="h-5 w-5 mr-2" />
                Paramètres
              </button>
              <button 
                onClick={logout}
                className="flex items-center text-slate-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{stats.completedCourses}</div>
                <div className="text-xs text-slate-500">/ {stats.totalCourses}</div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-700">Cours Terminés</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stats.completedCourses / stats.totalCourses) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.totalHours}h</div>
            </div>
            <div className="text-sm font-medium text-slate-700">Temps d'Étude</div>
            <div className="text-xs text-slate-500 mt-1">Ce mois-ci</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.currentStreak}</div>
            </div>
            <div className="text-sm font-medium text-slate-700">Jours Consécutifs</div>
            <div className="text-xs text-slate-500 mt-1">Série actuelle</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">87%</div>
            </div>
            <div className="text-sm font-medium text-slate-700">Moyenne Générale</div>
            <div className="text-xs text-slate-500 mt-1">Toutes évaluations</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Activité Récente</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{activity.title}</h4>
                      <p className="text-sm text-slate-500">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{activity.score}%</div>
                        <div className="text-xs text-slate-500">Score</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Continuer l'Apprentissage</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Diagnostic Véhicules Hybrides',
                    progress: 65,
                    timeLeft: '2h 30min',
                    type: 'Cours'
                  },
                  {
                    title: 'Systèmes ADAS Avancés',
                    progress: 30,
                    timeLeft: '4h 15min',
                    type: 'Module'
                  }
                ].map((course, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {course.type}
                      </span>
                      <span className="text-sm text-slate-500">{course.timeLeft} restant</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">{course.title}</h4>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-slate-600">{course.progress}% terminé</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Événements à Venir
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border border-slate-200 rounded-lg p-3">
                    <h4 className="font-medium text-slate-800 text-sm">{event.title}</h4>
                    <p className="text-xs text-slate-500">
                      {event.date.toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                      event.type === 'exam' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.type === 'exam' ? 'Examen' : 'Webinaire'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter un formateur
                </button>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger certificats
                </button>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Réserver un coaching
                </button>
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="text-center">
                <Award className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Félicitations !</h3>
                <p className="text-sm opacity-90">
                  Vous avez terminé 3 modules cette semaine !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;