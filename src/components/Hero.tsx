import React from 'react';
import { Play, CheckCircle, Users, Award } from 'lucide-react';
import AnimatedAvatar3D from './AnimatedAvatar3D';

const Hero = () => {
  return (
    <>
    <section id="accueil" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white overflow-hidden" itemScope itemType="https://schema.org/EducationalOrganization">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                <span itemProp="accreditation">Formations certifiantes reconnues par l'État</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-responsive" itemProp="name">
                Devenez Expert en
                <span className="text-orange-400 block">Mécanique Automobile</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed" itemProp="description">
                <strong>Formez-vous aux métiers d'avenir de l'automobile</strong> avec nos programmes complets : 
                <em>CAP Maintenance Véhicules, Bac Pro, formations véhicules électriques et hybrides</em>. 
                Plus de <strong>3000 apprenants formés avec succès</strong>, <strong>95% de taux de réussite</strong> 
                et <strong>87% d'insertion professionnelle</strong>.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[
                'Formation 100% à distance - Accessible partout en France',
                'Accompagnement personnalisé 24h/7j par des experts certifiés',
                'Matériel professionnel dernière génération mis à disposition',
                'Stages en entreprise garantis dans notre réseau de 500+ partenaires'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold text-lg hover:scale-105 shadow-lg will-change-transform"
                aria-label="Découvrir toutes nos formations certifiantes"
                onClick={() => document.getElementById('formations')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir nos formations
              </button>
              <button 
                className="flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold text-lg will-change-transform"
                aria-label="Regarder la vidéo de présentation"
              >
                <Play className="h-5 w-5 mr-2" />
                Voir la vidéo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8" itemScope itemType="https://schema.org/EducationalOrganization">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400" itemProp="successRate">95%</div>
                <div className="text-sm text-blue-200">Taux de réussite aux examens</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400" itemProp="alumniCount">3000+</div>
                <div className="text-sm text-blue-200">Étudiants diplômés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400" itemProp="employmentRate">87%</div>
                <div className="text-sm text-blue-200">Insertion professionnelle</div>
              </div>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            {/* Avatar animé 3D */}
            <AnimatedAvatar3D />
          </div>
        </div>

        {/* Test Inscription Form */}
        <div id="test-inscription" style={{background: '#f0f8ff', padding: '20px', margin: '20px', borderRadius: '8px'}}>
          <h3>🚀 Test Machine Automatisée</h3>
          <form id="form-test">
            <input type="text" id="nom" placeholder="Nom" required style={{margin: '5px', padding: '10px'}} />
            <input type="email" id="email" placeholder="Email" required style={{margin: '5px', padding: '10px'}} />
            <select id="niveau" required style={{margin: '5px', padding: '10px'}}>
              <option value="">Choisir niveau</option>
              <option value="Apprenti">Apprenti</option>
              <option value="CAP">CAP</option>
              <option value="BTS">BTS</option>
              <option value="Garage">Garage</option>
            </select>
            <button type="submit" style={{margin: '5px', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px'}}>
              🚀 TESTER AUTOMATION
            </button>
          </form>
          <div id="result"></div>
        </div>

        {/* Diagnostic Garage Form */}
        <div id="diagnostic-garage" style={{background: '#fff3cd', padding: '20px', margin: '20px', borderRadius: '8px'}}>
          <h3>🔧 Diagnostic Garage Express - 15€</h3>
          <p><strong>Problème automobile ? Solution en 2 minutes !</strong></p>
          
          <form id="form-diagnostic">
            <input type="text" id="garage-name" placeholder="Nom du garage" required style={{margin: '5px', padding: '10px', width: '200px'}} />
            <input type="email" id="garage-email" placeholder="Email" required style={{margin: '5px', padding: '10px', width: '200px'}} />
            
            <select id="vehicle-brand" required style={{margin: '5px', padding: '10px'}}>
              <option value="">Marque véhicule</option>
              <option value="Renault">Renault</option>
              <option value="Peugeot">Peugeot</option>
              <option value="Citroën">Citroën</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
            </select>
            
            <input type="text" id="vehicle-model" placeholder="Modèle" required style={{margin: '5px', padding: '10px'}} />
            
            <textarea id="problem-description" placeholder="Décrivez le problème..." required 
                      style={{margin: '5px', padding: '10px', width: '300px', height: '80px'}}></textarea>
            
            <select id="urgency" required style={{margin: '5px', padding: '10px'}}>
              <option value="">Urgence</option>
              <option value="1">Faible</option>
              <option value="3">Moyenne</option>
              <option value="5">Critique</option>
            </select>
            
            <button type="submit" style={{margin: '10px', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px'}}>
              💰 DIAGNOSTIC 15€
            </button>
          </form>
          <div id="diagnostic-result"></div>
        </div>
      </div>
    </section>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.addEventListener('DOMContentLoaded', function() {
          document.getElementById('form-diagnostic').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const diagnosticData = {
              type: 'diagnostic_garage',
              garage_name: document.getElementById('garage-name').value,
              email: document.getElementById('garage-email').value,
              vehicle: {
                brand: document.getElementById('vehicle-brand').value,
                model: document.getElementById('vehicle-model').value
              },
              problem: document.getElementById('problem-description').value,
              urgency: document.getElementById('urgency').value,
              timestamp: new Date().toISOString(),
              prix_attendu: 15
            };
            
            const webhookURL = 'TON_WEBHOOK_URL_DIAGNOSTIC';
            
            try {
              document.getElementById('diagnostic-result').innerHTML = '🔧 Analyse en cours...';
              
              const response = await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(diagnosticData)
              });
              
              if (response.ok) {
                document.getElementById('diagnostic-result').innerHTML = \`
                  <div style="background: #d4edda; padding: 15px; margin-top: 10px; border-radius: 4px;">
                    ✅ <strong>Diagnostic envoyé !</strong><br>
                    💳 <strong>Lien de paiement envoyé par email</strong><br>
                    ⏱️ <strong>Solution dans les 2 minutes après paiement</strong>
                  </div>
                \`;
              }
            } catch (error) {
              document.getElementById('diagnostic-result').innerHTML = '❌ Erreur : ' + error.message;
            }
          });
        });
      `
    }} />
    </>
  );
};

export default Hero;