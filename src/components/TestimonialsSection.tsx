import React from 'react';
import { Star, Quote, MapPin, Briefcase } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jean Dubois",
      age: 24,
      formation: "Formation Électrification Automobile - Promotion 2023",
      location: "Paris",
      currentJob: "Technicien chez PSA",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      testimonial: "Grâce à cette formation, j'ai pu obtenir un poste dans une concession PSA et je me sens parfaitement préparé pour les défis de la mécanique automobile moderne.",
      highlight: "Embauché directement chez PSA"
    },
    {
      id: 2,
      name: "Marie Leroux",
      age: 26,
      formation: "CAP MVA - Promotion 2022",
      location: "Lyon",
      currentJob: "Mécanicienne spécialisée véhicules électriques",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      testimonial: "Les instructeurs sont très compétents et le contenu de la formation est très pertinent pour le marché du travail actuel.",
      highlight: "Formation parfaitement adaptée au marché"
    },
    {
      id: 3,
      name: "Pierre Martin",
      age: 28,
      formation: "Formation Véhicules Électriques - Promotion 2023",
      location: "Marseille",
      currentJob: "Expert en véhicules électriques et hybrides",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      testimonial: "Cette formation m'a permis de devenir un expert en véhicules électriques et hybrides. Je recommande vivement ce programme à tous ceux qui souhaitent se spécialiser dans ce domaine.",
      highlight: "Devenu expert en électrification automobile"
    },
    {
      id: 4,
      name: "Sophie Tremblay",
      age: 23,
      formation: "Stage Privilégié PSA - Promotion 2023",
      location: "Toulouse",
      currentJob: "Technicienne diagnostic chez PSA",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      testimonial: "Les stages privilégiés avec PSA ont été une expérience inestimable. J'ai pu appliquer ce que j'ai appris en classe dans un environnement professionnel.",
      highlight: "Stage privilégié transformé en CDI"
    },
    {
      id: 5,
      name: "Thomas Dubois",
      age: 22,
      formation: "CAP MVA - Promotion 2023",
      location: "Lyon",
      currentJob: "Mécanicien chez Peugeot",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      testimonial: "Excellente formation ! Les formateurs sont vraiment compétents et à l'écoute. J'ai décroché mon emploi directement après mon stage. Je recommande vivement cette école à tous ceux qui veulent se former sérieusement.",
      highlight: "Embauché directement après le stage"
    },
    {
      id: 6,
      name: "Alexandre Martin",
      age: 20,
      formation: "CAP MVA - Promotion 2023",
      location: "Marseille",
      currentJob: "Technicien diagnostic électronique",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      testimonial: "Formation très complète avec du matériel moderne. Les cours de diagnostic électronique m'ont particulièrement plu. Ça m'a ouvert les portes d'un poste spécialisé que je ne pensais pas accessible avec un CAP.",
      highlight: "Spécialisation réussie en diagnostic électronique"
    }
  ];

  const stats = [
    {
      number: "95%",
      label: "Taux de satisfaction",
      description: "des anciens étudiants"
    },
    {
      number: "87%",
      label: "Insertion professionnelle",
      description: "dans les 6 mois"
    },
    {
      number: "4.8/5",
      label: "Note moyenne",
      description: "sur les avis Google"
    }
  ];

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Témoignages étudiants
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 text-responsive">
            Ils ont Réussi
            <span className="text-orange-500"> Leur Carrière</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les <strong>parcours inspirants de nos anciens étudiants</strong> qui ont transformé 
            leur passion pour la mécanique en une <em>carrière épanouissante et bien rémunérée</em>. 
            <strong>95% de nos diplômés recommandent notre formation</strong> à leurs proches.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-slate-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-slate-800 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-orange-200 h-full">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-orange-500 opacity-20" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-slate-700 leading-relaxed mb-6 italic">
                  "{testimonial.testimonial}"
                </p>

                {/* Highlight */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                  <div className="text-sm font-medium text-orange-800">
                    ✨ {testimonial.highlight}
                  </div>
                </div>

                {/* Author info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-600 mb-1">{testimonial.formation}</div>
                    <div className="flex items-center text-xs text-slate-500 space-x-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {testimonial.age} ans
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current job */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-sm text-slate-600">Poste actuel :</div>
                  <div className="font-medium text-slate-800">{testimonial.currentJob}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Vous aussi, écrivez votre success story !
            </h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Rejoignez nos formations et donnez un nouvel élan à votre carrière dans l'automobile. 
              Nos conseillers vous accompagnent dans votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                Demander une information
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold">
                Télécharger la brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;