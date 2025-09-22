import React from 'react';
import { Trophy, Users, Clock, MapPin } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "3000+",
      label: "Étudiants formés",
      description: "depuis notre création"
    },
    {
      icon: Trophy,
      number: "95%",
      label: "Taux de réussite",
      description: "aux examens officiels"
    },
    {
      icon: Clock,
      number: "15 ans",
      label: "D'expérience",
      description: "dans la formation"
    },
    {
      icon: MapPin,
      number: "12",
      label: "Centres de formation",
      description: "partout en France"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-blue-700 group-hover:text-orange-500 transition-colors duration-300" />
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-slate-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-500">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;