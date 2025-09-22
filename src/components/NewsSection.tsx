import React from 'react';
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Nouvelle formation en électrification automobile",
      excerpt: "Découvrez notre nouveau module de formation dédié aux véhicules électriques et hybrides, technologies d'avenir du secteur automobile.",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Formation",
      date: "15 Janvier 2024",
      readTime: "3 min",
      featured: true
    },
    {
      id: 2,
      title: "Partenariat avec les concessions PSA",
      excerpt: "Nos étudiants bénéficient désormais de stages privilégiés dans le réseau PSA grâce à notre nouveau partenariat.",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Partenariat",
      date: "10 Janvier 2024",
      readTime: "2 min"
    },
    {
      id: 3,
      title: "Taux de réussite exceptionnel",
      excerpt: "98% de réussite aux examens CAP pour la promotion 2023, un record pour notre centre de formation !",
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Résultats",
      date: "5 Janvier 2024",
      readTime: "1 min"
    }
  ];

  const events = [
    {
      date: "25 FÉV",
      title: "Journée portes ouvertes",
      time: "9h - 17h",
      location: "Tous nos centres"
    },
    {
      date: "15 MAR",
      title: "Salon de l'automobile",
      time: "10h - 18h",
      location: "Paris Expo"
    },
    {
      date: "20 MAR",
      title: "Conférence métiers auto",
      time: "14h - 16h",
      location: "En ligne"
    }
  ];

  return (
    <section id="actualites" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Actualités & Événements
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Restez Informés de
            <span className="text-orange-500"> l'Actualité</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières nouvelles de notre centre de formation, 
            nos événements à venir et les évolutions du secteur automobile.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News articles - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {news.map((article, index) => (
                <article key={article.id} className={`group ${
                  article.featured ? 'order-first' : ''
                }`}>
                  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    article.featured ? 'border-2 border-orange-200' : 'border border-slate-200'
                  }`}>
                    <div className={`${
                      article.featured ? 'lg:flex lg:items-center' : 'block'
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        article.featured ? 'lg:w-1/2' : 'w-full'
                      }`}>
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                            article.featured ? 'h-64 lg:h-80' : 'h-48'
                          }`}
                        />
                        {article.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              À la une
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={`p-6 ${
                        article.featured ? 'lg:w-1/2' : 'w-full'
                      }`}>
                        {/* Meta */}
                        <div className="flex items-center space-x-4 mb-4 text-sm text-slate-500">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            <span className="text-orange-500 font-medium">{article.category}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {article.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.readTime} de lecture
                          </div>
                        </div>

                        {/* Title and excerpt */}
                        <h3 className={`font-bold text-slate-800 mb-3 group-hover:text-orange-500 transition-colors ${
                          article.featured ? 'text-2xl' : 'text-xl'
                        }`}>
                          {article.title}
                        </h3>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Read more */}
                        <button className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium group">
                          Lire la suite
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* View all news */}
            <div className="text-center mt-8">
              <button className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                Voir toutes les actualités
              </button>
            </div>
          </div>

          {/* Sidebar - Events - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Upcoming events */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                  Événements à venir
                </h3>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
                      <div className="text-center bg-white rounded-lg p-2 shadow-sm min-w-[60px]">
                        <div className="text-xs font-semibold text-orange-500 uppercase">{event.date}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 mb-1">{event.title}</h4>
                        <p className="text-sm text-slate-600">{event.time}</p>
                        <p className="text-sm text-slate-500">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Newsletter
                </h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Recevez nos dernières actualités et conseils directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email"
                    className="w-full px-4 py-3 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    S'abonner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;