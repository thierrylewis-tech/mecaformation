import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formation: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+33 6 89 45 72 31", "WhatsApp 24h/7j"],
      color: "text-blue-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@mecaformation.fr", "Réponse sous 2h"],
      color: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Adresses",
      details: ["Siège social : 45 Avenue de la République", "75011 Paris • Formation à distance"],
      color: "text-orange-500"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun-Ven: 8h-18h", "Sam: 9h-13h"],
      color: "text-purple-500"
    }
  ];

  const formations = [
    "CAP Maintenance des Véhicules",
    "Bac Pro Maintenance Automobile",
    "Formation Diagnostic Électronique",
    "Formation Véhicules Électriques",
    "Coaching Primo-Arrivants",
    "Coaching Garages Pro",
    "Autre formation"
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Phone className="h-4 w-4 mr-2" />
            Contactez-nous
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Une Question ?
            <span className="text-orange-500"> Parlons-en !</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nos conseillers pédagogiques sont là pour vous accompagner dans votre projet de formation. 
            N'hésitez pas à nous contacter pour obtenir toutes les informations dont vous avez besoin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Nos coordonnées</h3>
            
            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                      info.color === 'text-blue-500' ? 'bg-blue-100' :
                      info.color === 'text-green-500' ? 'bg-green-100' :
                      info.color === 'text-orange-500' ? 'bg-orange-100' :
                      'bg-purple-100'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className={`text-slate-600 ${detailIndex === 0 ? 'font-medium' : 'text-sm'}`}>
                        {detail}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="bg-slate-100 rounded-xl p-8 text-center">
              <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-700 mb-2">Formation à distance</h4>
              <p className="text-slate-500 mb-4">Accessible depuis toute la France</p>
              <button className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                En savoir plus
              </button>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div>
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Demande d'information</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Message envoyé !</h4>
                  <p className="text-slate-600">
                    Merci pour votre demande. Nous vous recontacterons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  {/* Contact fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="votre@email.fr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>

                  {/* Formation selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Formation d'intérêt *
                    </label>
                    <select
                      name="formation"
                      required
                      value={formData.formation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Choisissez une formation</option>
                      {formations.map((formation, index) => (
                        <option key={index} value={formation}>{formation}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Décrivez votre projet, vos questions..."
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer ma demande
                  </button>

                  <p className="text-sm text-slate-500 text-center">
                    * Champs obligatoires. Vos données sont traitées de manière confidentielle.
                  </p>
                </form>
              )}
            </div>

            {/* Quick contact */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h4 className="text-lg font-bold mb-2">Besoin d'une réponse immédiate ?</h4>
              <p className="text-blue-100 mb-4">
                Contactez-nous sur WhatsApp, nos conseillers sont disponibles 24h/7j.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="font-semibold">+33 6 89 45 72 31</span>
                </div>
                <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;