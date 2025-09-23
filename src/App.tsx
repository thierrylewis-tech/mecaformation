import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FormationsSection from './components/FormationsSection';
import ProgrammeSection from './components/ProgrammeSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResourcesPlatform from './components/ResourcesPlatform';
import ChatBot from './components/ChatBot';
import VoiceRecorder from './components/VoiceRecorder';
import AIAvatar from './components/AIAvatar';
import CertificationsSection from './components/CertificationsSection';
import DIYRepairModule from './components/DIYRepairModule';
import RemoteDiagnosticModule from './components/RemoteDiagnosticModule';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" role="main">
        <Hero />
      </main>
      <StatsSection />
      <FormationsSection />
      <ProgrammeSection />
      <CertificationsSection />
      <TestimonialsSection />
      <ResourcesPlatform />
      <DIYRepairModule />
      <RemoteDiagnosticModule />
      <NewsSection />
      <ContactSection />
      <Footer />
      <ChatBot />
      <VoiceRecorder />
      <AIAvatar />
    </div>
  );
}

export default App;