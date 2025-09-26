import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
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
import VoiceRecorder from './components/VoiceRecorder';
import CertificationsSection from './components/CertificationsSection';
import DIYRepairModule from './components/DIYRepairModule';
import RemoteDiagnosticModule from './components/RemoteDiagnosticModule';
import ClarifiedPricing from './components/pricing/ClarifiedPricing';
import SalesFunnelModule from './components/SalesFunnelModule';
import PaymentMethodsAnalysis from './components/PaymentMethodsAnalysis';
import AdvancedChatBot from './components/AdvancedChatBot';
import KnowledgeBase from './components/KnowledgeBase';
import DatabaseStatus from './components/DatabaseStatus';
import StudentDashboard from './components/dashboard/StudentDashboard';
import StripeTestComponent from './components/payment/StripeTestComponent';
import { useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { user } = useAuth();

  // Si l'utilisateur est connecté, afficher le dashboard
  if (user) {
    return <StudentDashboard />;
  }

  // Sinon, afficher le site public
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" role="main">
        <Hero />
      </main>
      <StatsSection />
      <FormationsSection />
      <ProgrammeSection />
      <ClarifiedPricing />
      <CertificationsSection />
      <TestimonialsSection />
      <ResourcesPlatform />
      <DIYRepairModule />
      <RemoteDiagnosticModule />
      <SalesFunnelModule />
      <PaymentMethodsAnalysis />
      <KnowledgeBase />
      <NewsSection />
      <ContactSection />
      <div className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <StripeTestComponent />
        </div>
      </div>
      <Footer />
      <AdvancedChatBot />
      <VoiceRecorder />
      <DatabaseStatus />
    </div>
  );
};
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;