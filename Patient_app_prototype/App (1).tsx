import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { HomePage } from './components/HomePage';
import { HealthcarePoliciesPage } from './components/HealthcarePoliciesPage';
import { SchemeDetailsPage } from './components/SchemeDetailsPage';
import { ProfilePage } from './components/ProfilePage';
import { FamilyMembersPage } from './components/FamilyMembersPage';
import { ChatbotPage } from './components/ChatbotPage';
import { LanguageProvider } from './components/LanguageContext';

export type Page = 'login' | 'register' | 'home' | 'policies' | 'scheme-details' | 'profile' | 'family' | 'chatbot';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedSchemeId, setSelectedSchemeId] = useState<number>(1);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage 
          onLogin={() => setCurrentPage('home')} 
          onRegister={() => setCurrentPage('register')}
        />;
      case 'register':
        return <RegistrationPage 
          onComplete={() => setCurrentPage('login')}
          onBack={() => setCurrentPage('login')}
        />;
      case 'home':
        return (
          <HomePage
            onNavigate={(page: Page) => setCurrentPage(page)}
          />
        );
      case 'policies':
        return <HealthcarePoliciesPage 
          onBack={() => setCurrentPage('home')} 
          onApplyScheme={(schemeId: number) => {
            setSelectedSchemeId(schemeId);
            setCurrentPage('scheme-details');
          }}
        />;
      case 'scheme-details':
        return <SchemeDetailsPage 
          onBack={() => setCurrentPage('policies')} 
          schemeId={selectedSchemeId}
        />;
      case 'profile':
        return <ProfilePage onBack={() => setCurrentPage('home')} />;
      case 'family':
        return <FamilyMembersPage onBack={() => setCurrentPage('home')} />;
      case 'chatbot':
        return <ChatbotPage onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onNavigate={(page: Page) => setCurrentPage(page)} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        {renderPage()}
      </div>
    </LanguageProvider>
  );
}