import React from 'react';
import { Clock, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

const FormationsSection = () => {
  const formations = [
    {
      id: 1,
      title: "CAP Maintenance des Véhicules",
      subtitle: "Option Voitures Particulières",
      duration: "24 mois",
      level: "CAP - Niveau 3",
      students: "120 places",
      price: "Financement possible",
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Formation théorique et pratique",
        "Stage en entreprise 12 semaines",
        "Matériel professionnel fourni",
        "Suivi personnalisé"
      ],
      popular: true
    },
    {
      id: 2,
      title: "Bac Pro Maintenance",
      subtitle: "des Véhicules Option A",
      duration: "36 mois",
      level: "Bac Pro - Niveau 4",
      students: "80 places",
      price: "Financement possible",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Formation complète 3 ans",
        "Stage en entreprise 22 semaines",
        "Préparation management",
        "Débouchés nombreux"
      ]
    },
    {
      id: 3,
      title: "BTS Maintenance",
      subtitle: "des Véhicules Option A",
      duration: "24 mois",
      level: "BTS - Niveau 5",
      students: "40 places",
      price: "Financement possible",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Formation supérieure technique",
        "Management d'équipe",
        "Technologies avancées",
        "Insertion professionnelle garantie"
      ]
    },
    {
      id: 4,
      title: "Module Véhicules Électriques",
      subtitle: "Spécialisation BEV & Technologies",
      duration: "4 mois",
      level: "Spécialisation",
      students: "20 places",
      price: "À partir de 3 200€",
      image: "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Batteries lithium-ion et gestion thermique",
        "Moteurs électriques et onduleurs",
        "Systèmes de charge AC/DC",
        "Habilitation électrique B1VL/B2VL"
      ],
      isNew: true
    },
    {
      id: 5,
      title: "Module Véhicules Hybrides",
      subtitle: "HEV, PHEV & Technologies Mixtes",
      duration: "3 mois",
      level: "Spécialisation",
      students: "18 places",
      price: "À partir de 2 800€",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Architectures hybrides série/parallèle",
        "Batteries NiMH et Li-ion hybrides",
        "Récupération d'énergie au freinage",
        "Diagnostic systèmes hybrides"
      ]
    },
    {
      id: 6,
      title: "Module Véhicules Hydrogène",
      subtitle: "FCEV & Pile à Combustible",
      duration: "2 mois",
      level: "Spécialisation",
      students: "12 places",
      price: "À partir de 3 800€",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Technologie pile à combustible",
        "Stockage hydrogène haute pression",
        "Sécurité et manipulation H2",
        "Maintenance systèmes FCEV"
      ],
      isPremium: true
    },
    {
      id: 7,
      title: "Module Véhicules GPL",
      subtitle: "Bi-carburation & Systèmes Gaz",
      duration: "6 semaines",
      level: "Spécialisation",
      students: "16 places",
      price: "À partir de 1 800€",
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Installation systèmes GPL",
        "Réglages et calibration",
        "Contrôles périodiques obligatoires",
        "Réglementation et homologation"
      ]
    },
    {
      id: 8,
      title: "Formation Diagnostic",
      subtitle: "Véhicules Éthanol E85",
      duration: "4 semaines",
      level: "Spécialisation",
      students: "14 places",
      price: "À partir de 1 500€",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Technologie Flex Fuel",
        "Boîtiers de conversion E85",
        "Adaptation paramètres moteur",
        "Homologation et garantie"
      ]
    },
    {
      id: 9,
      title: "Diagnostic Avancé",
      subtitle: "Toutes Technologies",
      duration: "6 mois",
      level: "Spécialisation",
      students: "24 places",
      price: "À partir de 2 500€",
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Diagnostic thermique/électrique/hybride",
        "Outils professionnels multi-technologies",
        "Oscilloscope et analyse de signaux",
        "Certification multi-constructeurs"
      ]
    },
    {
      id: 10,
      title: "Aides à la Conduite",
      subtitle: "ADAS & Systèmes Intelligents",
      duration: "5 mois",
      level: "Spécialisation",
      students: "20 places",
      price: "À partir de 3 500€",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Systèmes ADAS (AEB, ACC, LKA)",
        "Capteurs radar, lidar et caméras",
        "Calibrage et étalonnage précis",
        "Diagnostic systèmes autonomes"
      ],
      isNew: true
    },
    {
      id: 11,
      title: "Climatisation Moderne",
      subtitle: "Systèmes R1234yf & Pompes à Chaleur",
      duration: "3 mois",
      level: "Spécialisation",
      students: "18 places",
      price: "À partir de 2 200€",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Nouveaux fluides frigorigènes R1234yf",
        "Pompes à chaleur véhicules électriques",
        "Systèmes automatiques multi-zones",
        "Habilitation manipulation fluides"
      ]
    },
    {
      id: 12,
      title: "Coaching Primo-Arrivants",
      subtitle: "Accompagnement Personnalisé & Insertion",
      duration: "12 mois",
      level: "Accompagnement",
      students: "30 places",
      price: "890€ (financement 0% possible)",
      image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Accompagnement individualisé 24h/24",
        "Plateforme e-learning complète",
        "Aide à l'insertion professionnelle",
        "Enseignement général intégré"
      ],
      isNew: true
    },
    {
      id: 13,
      title: "Coaching Garages Pro",
      subtitle: "Formation Équipes & Optimisation",
      duration: "6 mois",
      level: "Professionnel",
      students: "Équipes complètes",
      price: "1 490€/garage (jusqu'à 8 personnes)",
      image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Formation équipe complète incluse",
        "Plateforme e-learning dédiée",
        "Audit et optimisation atelier",
        "Support technique permanent"
      ],
      isPremium: true
    }
  ];

  return (
    <section id="formations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4 mr-2" />
            Formations certifiées
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 text-responsive">
            Nos Formations en
            <span className="text-orange-500"> Mécanique Automobile</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre <strong>catalogue complet de 13 formations certifiantes</strong>, du CAP au BTS, 
            incluant les <em>spécialisations véhicules électriques, hybrides et hydrogène</em>. 
            Formations conçues pour vous préparer aux <strong>métiers d'avenir de l'automobile</strong> 
            avec un <strong>taux d'insertion de 87%</strong>.
          </p>
        </div>

        {/* Formations grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {formations.map((formation) => (
            <div key={formation.id} className="group relative">
              {formation.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Plus populaire
                  </div>
                </div>
              )}
              {formation.isNew && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Nouveau
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 group-hover:border-orange-200">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={formation.image} 
                    alt={formation.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formation.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {formation.students}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-orange-500 font-semibold mb-1">{formation.level}</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{formation.title}</h3>
                    <p className="text-slate-600">{formation.subtitle}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {formation.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-slate-500">Coût de formation</div>
                      <div className="font-semibold text-slate-800">{formation.price}</div>
                    </div>
                    <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 font-medium flex items-center justify-center group">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              
              {formation.isPremium && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    ⭐ Premium
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Besoin d'aide pour choisir votre formation ?
            </h3>
            <p className="text-slate-600 mb-6">
              Nos conseillers pédagogiques vous accompagnent gratuitement dans votre projet de formation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Demander un conseil
              </button>
              <button className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                Télécharger la brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;