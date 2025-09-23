import React, { useState } from 'react';
import { Book, Wrench, Users, Award, ChevronDown, ChevronRight } from 'lucide-react';

const ProgrammeSection = () => {
  const [activeModule, setActiveModule] = useState(0);

  const specializedPrograms = [
    {
      title: "Formation en Électrification Automobile",
      objectives: "Apprendre les bases des véhicules électriques et hybrides, comprendre les systèmes de propulsion électrique, et maîtriser les techniques de maintenance.",
      subjects: [
        "Batteries et systèmes de stockage d'énergie",
        "Moteurs électriques et onduleurs",
        "Systèmes de recharge AC/DC",
        "Diagnostic de pannes spécialisé"
      ],
      skills: "Capacité à effectuer des interventions de maintenance et de réparation sur des véhicules électriques et hybrides.",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const modules = [
    {
      icon: Book,
      title: "Enseignement Général",
      duration: "400h",
      description: "Mathématiques, français, histoire-géographie, anglais",
      details: [
        "Mathématiques appliquées au secteur professionnel",
        "Communication écrite et orale",
        "Culture générale et expression",
        "Langue vivante (anglais technique automobile)"
      ]
    },
    {
      icon: Wrench,
      title: "Enseignement Professionnel",
      duration: "800h",
      description: "Mécanique, électronique, diagnostic, réparation",
      details: [
        "Technologie des systèmes automobiles",
        "Diagnostic et maintenance préventive",
        "Réparation des systèmes mécaniques",
        "Électronique embarquée et multiplexage"
      ]
    },
    {
      icon: Users,
      title: "Formation en Entreprise",
      duration: "12 semaines",
      description: "Stage pratique en garage ou concession",
      details: [
        "Immersion en situation réelle de travail",
        "Encadrement par un tuteur professionnel",
        "Mise en pratique des acquis théoriques",
        "Évaluation continue des compétences"
      ]
    },
    {
      icon: Award,
      title: "Préparation à l'Examen",
      duration: "80h",
      description: "Révisions intensives et examens blancs",
      details: [
        "Révisions thématiques intensives",
        "Examens blancs en conditions réelles",
        "Accompagnement individualisé",
        "Techniques de gestion du stress"
      ]
    }
  ];

  const competences = [
    {
      title: "Maintenance préventive",
      percentage: 85,
      description: "Contrôles périodiques et entretien"
    },
    {
      title: "Diagnostic des pannes",
      percentage: 90,
      description: "Identification et analyse des dysfonctionnements"
    },
    {
      title: "Réparation mécanique",
      percentage: 88,
      description: "Intervention sur les organes mécaniques"
    },
    {
      title: "Électronique automobile",
      percentage: 75,
      description: "Systèmes électriques et électroniques"
    }
  ];

  return (
    <section id="programme" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Book className="h-4 w-4 mr-2" />
            Programme détaillé
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Un Programme
            <span className="text-orange-500"> Complet et Structuré</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Notre formation CAP Maintenance des Véhicules suit un programme officiel 
            riche et progressif, alliant théorie, pratique et expérience terrain.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Specialized Programs Section */}
          <div className="lg:col-span-2 mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Nos Programmes de Formation Spécialisés</h3>
            <div className="grid md:grid-cols-1 gap-8">
              {specializedPrograms.map((program, index) => (
                <div key={index} className={`bg-gradient-to-r ${program.color} rounded-2xl p-8 text-white shadow-xl`}>
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{program.icon}</span>
                    <h4 className="text-2xl font-bold">{program.title}</h4>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3 text-cyan-100">Objectifs</h5>
                      <p className="text-sm leading-relaxed">{program.objectives}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-3 text-cyan-100">Sujets couverts</h5>
                      <ul className="text-sm space-y-1">
                        {program.subjects.map((subject, subIndex) => (
                          <li key={subIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-3 text-cyan-100">Compétences acquises</h5>
                      <p className="text-sm leading-relaxed">{program.skills}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left side - Modules */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Modules de formation</h3>
            <div className="space-y-4">
              {modules.map((module, index) => {
                const IconComponent = module.icon;
                const isActive = activeModule === index;
                
                return (
                  <div
                    key={index}
                    className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'border-orange-500 bg-orange-50 shadow-lg' 
                        : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-md'
                    }`}
                    onClick={() => setActiveModule(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${
                          isActive ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-slate-800">{module.title}</h4>
                            <div className="text-sm font-medium text-orange-500">{module.duration}</div>
                          </div>
                          <p className="text-slate-600 mb-3">{module.description}</p>
                          
                          {isActive && (
                            <div className="space-y-2 mt-4">
                              {module.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center text-sm text-slate-600">
                                  <ChevronRight className="h-4 w-4 text-orange-500 mr-2" />
                                  {detail}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${
                        isActive ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Compétences */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Compétences acquises</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="space-y-8">
                {competences.map((competence, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-slate-800">{competence.title}</h4>
                      <span className="text-sm font-medium text-orange-500">{competence.percentage}%</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{competence.description}</p>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${competence.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certification info */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Certification officielle</h4>
                    <p className="text-sm text-slate-600">Diplôme d'État - CAP niveau 3 inscrit au RNCP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-2">Prêt à commencer ?</h4>
              <p className="text-blue-100 mb-4">
                Rejoignez notre prochaine session de formation et lancez votre carrière dans l'automobile.
              </p>
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                S'inscrire maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammeSection;