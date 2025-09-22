import React, { useEffect, useRef } from 'react';
import { Zap, Battery, Settings, Cpu, Eye, Play } from 'lucide-react';

const AnimatedAvatar3D = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation de rotation continue pour l'avatar
    const avatar = avatarRef.current;
    const vehicle = vehicleRef.current;
    
    if (avatar && vehicle) {
      let rotation = 0;
      const animate = () => {
        rotation += 0.5;
        vehicle.style.transform = `rotateY(${rotation}deg) rotateX(10deg)`;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-2xl overflow-hidden">
      {/* Background tech pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ff88" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-cyan-400 animate-pulse" 
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative h-full flex items-center justify-center p-8">
        {/* Avatar technicien */}
        <div ref={avatarRef} className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="relative">
            {/* Corps du technicien */}
            <div className="w-24 h-32 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-full relative animate-bounce" style={{ animationDuration: '3s' }}>
              {/* Tête */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full border-4 border-white">
                {/* Yeux */}
                <div className="absolute top-4 left-3 w-2 h-2 bg-slate-800 rounded-full animate-blink"></div>
                <div className="absolute top-4 right-3 w-2 h-2 bg-slate-800 rounded-full animate-blink"></div>
                {/* Sourire */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-slate-800 rounded-full"></div>
              </div>
              
              {/* Casque de sécurité */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-yellow-400 rounded-t-full border-2 border-yellow-500">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-500 rounded animate-pulse"></div>
              </div>
              
              {/* Bras avec outil de diagnostic */}
              <div className="absolute top-4 -right-8 w-16 h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full transform rotate-45">
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-2 bg-orange-500 rounded animate-pulse">
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-green-400 rounded animate-ping"></div>
                </div>
              </div>
            </div>
            
            {/* Jambes */}
            <div className="w-24 h-16 bg-gradient-to-b from-slate-600 to-slate-800 rounded-b-lg"></div>
          </div>
          
          {/* Bulle de dialogue */}
          <div className="absolute -top-16 -right-20 bg-white rounded-xl p-3 shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
            <div className="text-xs font-semibold text-slate-800 mb-1">Diagnostic en cours...</div>
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
              <div className="text-xs text-green-600">Batterie: 87%</div>
            </div>
            <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </div>
        </div>

        {/* Voiture électrique moderne en vue éclatée 3D */}
        <div ref={vehicleRef} className="relative transform-gpu perspective-1000" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Carrosserie principale - Design moderne SUV électrique */}
          <div className="relative w-96 h-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl shadow-2xl transform" style={{ transform: 'translateZ(0px)' }}>
            {/* Carrosserie supérieure */}
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-90 shadow-inner">
              {/* Toit panoramique */}
              <div className="absolute top-2 left-8 right-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg opacity-60"></div>
              
              {/* Phares LED avant futuristes */}
              <div className="absolute -left-2 top-6 w-8 h-4 bg-gradient-to-r from-white to-blue-200 rounded-r-full animate-pulse">
                <div className="absolute inset-1 bg-cyan-400 rounded-r-full animate-ping"></div>
              </div>
              <div className="absolute -left-2 top-12 w-8 h-4 bg-gradient-to-r from-white to-blue-200 rounded-r-full animate-pulse" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-1 bg-cyan-400 rounded-r-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Feux arrière LED */}
              <div className="absolute -right-2 top-6 w-6 h-4 bg-gradient-to-l from-red-500 to-red-600 rounded-l-full animate-pulse">
                <div className="absolute inset-1 bg-red-300 rounded-l-full"></div>
              </div>
              <div className="absolute -right-2 top-12 w-6 h-4 bg-gradient-to-l from-red-500 to-red-600 rounded-l-full animate-pulse" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-1 bg-red-300 rounded-l-full"></div>
              </div>
              
              {/* Grille avant fermée (style électrique) */}
              <div className="absolute -left-1 top-16 w-12 h-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-r-lg">
                <div className="absolute inset-2 bg-slate-600 rounded grid grid-cols-3 gap-1 p-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-slate-500 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Roues modernes avec jantes aérodynamiques */}
            <div className="absolute -bottom-6 left-12 w-16 h-16 bg-slate-800 rounded-full animate-spin shadow-lg" style={{ animationDuration: '2s' }}>
              <div className="absolute inset-2 bg-slate-600 rounded-full">
                <div className="absolute inset-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full">
                  {/* Rayons aérodynamiques */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transform rotate-45">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transform rotate-90">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 right-12 w-16 h-16 bg-slate-800 rounded-full animate-spin shadow-lg" style={{ animationDuration: '2s' }}>
              <div className="absolute inset-2 bg-slate-600 rounded-full">
                <div className="absolute inset-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full">
                  {/* Rayons aérodynamiques */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transform rotate-45">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transform rotate-90">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pack batterie moderne (éclaté vers le bas) */}
          <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-80 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-xl animate-float" style={{ transform: 'translateZ(-20px)' }}>
            <div className="absolute inset-3 bg-gradient-to-r from-green-300 to-green-500 rounded-lg flex items-center justify-center">
              <Battery className="h-10 w-10 text-white animate-pulse mr-3" />
              <div className="text-white font-bold">
                <div className="text-lg">Li-ion</div>
                <div className="text-sm">75 kWh</div>
              </div>
            </div>
            {/* Modules de batterie */}
            <div className="absolute -top-3 left-8 w-6 h-6 bg-green-300 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-3 left-20 w-6 h-6 bg-green-300 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -top-3 left-32 w-6 h-6 bg-green-300 rounded animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute -top-3 right-32 w-6 h-6 bg-green-300 rounded animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -top-3 right-20 w-6 h-6 bg-green-300 rounded animate-pulse" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute -top-3 right-8 w-6 h-6 bg-green-300 rounded animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>

          {/* Moteur électrique avant (éclaté vers la gauche) */}
          <div className="absolute top-16 -left-40 w-28 h-28 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-xl animate-pulse" style={{ transform: 'translateZ(10px)' }}>
            <div className="absolute inset-3 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full flex flex-col items-center justify-center">
              <Settings className="h-10 w-10 text-white animate-spin mb-1" style={{ animationDuration: '3s' }} />
              <div className="text-white font-bold text-xs">150kW</div>
            </div>
            {/* Bobinages électriques */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-copper-400 rounded animate-pulse"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-copper-400 rounded animate-pulse"></div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-3 bg-copper-400 rounded animate-pulse"></div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-3 bg-copper-400 rounded animate-pulse"></div>
          </div>

          {/* Onduleur/Contrôleur moderne (éclaté vers la droite) */}
          <div className="absolute top-12 -right-36 w-24 h-32 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '4s', transform: 'translateZ(15px)' }}>
            <div className="absolute inset-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex flex-col items-center justify-center">
              <Cpu className="h-8 w-8 text-white animate-pulse mb-2" />
              <div className="text-xs text-white font-bold text-center">
                <div>Onduleur</div>
                <div>800V</div>
              </div>
            </div>
            {/* Circuits intégrés */}
            <div className="absolute top-3 left-2 w-2 h-10 bg-yellow-400 animate-pulse"></div>
            <div className="absolute top-3 right-2 w-2 h-10 bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Système de refroidissement liquide (éclaté vers le haut) */}
          <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-40 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl shadow-xl animate-float" style={{ transform: 'translateZ(5px)' }}>
            <div className="absolute inset-2 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-center">
                <div className="text-sm">Refroidissement</div>
                <div className="text-xs">Liquide</div>
              </div>
            </div>
            {/* Radiateur */}
            <div className="absolute -top-2 left-4 w-3 h-12 bg-cyan-300 rounded animate-pulse"></div>
            <div className="absolute -top-2 left-8 w-3 h-12 bg-cyan-300 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-2 right-8 w-3 h-12 bg-cyan-300 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -top-2 right-4 w-3 h-12 bg-cyan-300 rounded animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Câbles haute tension modernes (animés) */}
          <div className="absolute top-24 left-20 w-2 h-40 bg-gradient-to-b from-red-500 to-orange-500 animate-pulse transform rotate-12 rounded-full"></div>
          <div className="absolute top-20 right-24 w-2 h-36 bg-gradient-to-b from-yellow-500 to-red-500 animate-pulse transform -rotate-12 rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-2 h-32 bg-gradient-to-b from-blue-500 to-purple-500 animate-pulse rounded-full" style={{ animationDelay: '1s' }}></div>

          {/* Particules d'énergie électrique */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
              style={{
                top: `${24 + i * 18}px`,
                left: `${120 + Math.sin(i * 0.8) * 60}px`,
                animationDelay: `${i * 0.25}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}

          {/* Flux d'énergie */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"
              style={{
                top: `${40 + i * 25}px`,
                left: `${140 + Math.cos(i * 1.2) * 40}px`,
                animationDelay: `${i * 0.4}s`,
                transform: `rotate(${i * 30}deg)`
              }}
            ></div>
          ))}
        </div>

        {/* Panneau de diagnostic moderne */}
        <div className="absolute bottom-8 right-8 bg-slate-800 rounded-xl p-4 shadow-2xl border border-cyan-400">
          <div className="text-cyan-400 text-sm font-bold mb-2 flex items-center">
            <Eye className="h-4 w-4 mr-2 animate-pulse" />
            Diagnostic Temps Réel
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-green-400">
              <span>Batterie:</span>
              <span className="animate-pulse">87% ✓</span>
            </div>
            <div className="flex justify-between text-blue-400">
              <span>Moteur:</span>
              <span className="animate-pulse">Optimal ✓</span>
            </div>
            <div className="flex justify-between text-purple-400">
              <span>Onduleur:</span>
              <span className="animate-pulse">Normal ✓</span>
            </div>
            <div className="flex justify-between text-cyan-400">
              <span>Température:</span>
              <span className="animate-pulse">23°C ✓</span>
            </div>
            <div className="flex justify-between text-orange-400">
              <span>Charge:</span>
              <span className="animate-pulse">75 kWh ✓</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-600">
            <div className="text-green-400 text-xs font-bold animate-pulse">
              ✓ Diagnostic Complet
            </div>
          </div>
        </div>

        {/* Bouton Play pour interaction */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-xl animate-bounce hover:animate-none transition-all duration-300 hover:scale-110">
            <Play className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Titre de la section */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-2">
          <h3 className="text-white font-bold text-lg">Formation Diagnostic Véhicules Électriques</h3>
          <p className="text-cyan-400 text-sm">Technologie 3D Interactive • Réalité Augmentée</p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAvatar3D;