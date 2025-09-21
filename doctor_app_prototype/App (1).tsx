import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { PatientAccessScreen } from './components/PatientAccessScreen';
import { PatientHistoryScreen } from './components/PatientHistoryScreen';
import { PrescriptionFormScreen } from './components/PrescriptionFormScreen';

type Screen = 'login' | 'home' | 'patientAccess' | 'patientHistory' | 'prescriptionForm';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLogin = () => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleLanguageSelect = () => {
    // Cycle through languages for demo purposes
    const languages = ['English', 'Hindi', 'Malayalam'];
    const currentIndex = languages.indexOf(selectedLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setSelectedLanguage(languages[nextIndex]);
  };

  const handlePatientAccess = () => {
    setCurrentScreen('patientAccess');
  };

  const handlePrescriptionForm = () => {
    setCurrentScreen('prescriptionForm');
  };

  const handleAccessHistory = () => {
    setCurrentScreen('patientHistory');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onLanguageSelect={handleLanguageSelect}
            selectedLanguage={selectedLanguage}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onPatientAccess={handlePatientAccess}
            onPrescriptionForm={handlePrescriptionForm}
            onLogout={handleLogout}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        );
      case 'patientAccess':
        return (
          <PatientAccessScreen
            onBack={handleBackToHome}
            onAccessHistory={handleAccessHistory}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        );
      case 'patientHistory':
        return (
          <PatientHistoryScreen
            onBack={handleBackToHome}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        );
      case 'prescriptionForm':
        return (
          <PrescriptionFormScreen
            onBack={handleBackToHome}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        );
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onLanguageSelect={handleLanguageSelect}
            selectedLanguage={selectedLanguage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}