import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Login Page
    login: 'Login',
    aadhaarNumber: 'Aadhaar Number',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Send OTP',
    otpSent: 'OTP sent successfully!',
    enterOtp: 'Enter OTP',
    
    // Home Page
    welcome: 'Welcome',
    healthcareApp: 'Healthcare App',
    healthcarePolicies: 'Healthcare Policies & Schemes',
    healthcarePoliciesDesc: 'View available health schemes and policies',
    profile: 'Profile',
    profileDesc: 'View your health records and personal information',
    familyMembers: 'Family Members',
    familyMembersDesc: 'Manage family member profiles',
    
    // Healthcare Policies
    availableSchemes: 'Available Health Schemes',
    howToApply: 'How to Apply',
    back: 'Back',
    
    // Profile
    personalInfo: 'Personal Information',
    prescriptions: 'Prescriptions',
    healthReports: 'Health Reports',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    bloodGroup: 'Blood Group',
    
    // Family Members
    addFamilyMember: 'Add Family Member',
    familyMembersList: 'Family Members List',
    relation: 'Relation',
    addMember: 'Add Member',
    memberAdded: 'Family member added successfully!',
    
    // Common
    male: 'Male',
    female: 'Female',
    son: 'Son',
    daughter: 'Daughter',
    wife: 'Wife',
    husband: 'Husband',
    father: 'Father',
    mother: 'Mother',
    
    // Registration
    register: 'Register',
    basicInfo: 'Basic Information',
    contactDetails: 'Contact Details',
    aadhaarVerification: 'Aadhaar Verification',
    faceRegistration: 'Face Registration',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    alternateNumber: 'Alternate Number',
    email: 'Email',
    currentAddress: 'Current Address',
    permanentAddress: 'Permanent Address',
    nameAsPerAadhaar: 'Name as per Aadhaar',
    
    // Chatbot
    healthAssistant: 'Health Assistant',
    askHealthQuestion: 'Ask your health question...',
    youCanSpeakOrType: 'You can speak or type your questions',
    startChat: 'Start Chat',
  },
  hi: {
    // Login Page
    login: 'लॉगिन',
    aadhaarNumber: 'आधार नंबर',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'ओटीपी भेजें',
    otpSent: 'ओटीपी सफलतापूर्वक भेजा गया!',
    enterOtp: 'ओटीपी दर्ज करें',
    
    // Home Page
    welcome: 'स्वागत',
    healthcareApp: 'स्वास्थ्य ऐप',
    healthcarePolicies: 'स्वास्थ्य नीतियां और योजनाएं',
    healthcarePoliciesDesc: 'उपलब्ध स्वास्थ्य योजनाएं और नीतियां देखें',
    profile: 'प्रोफाइल',
    profileDesc: 'अपने स्वास्थ्य रिकॉर्ड और व्यक्तिगत जानकारी देखें',
    familyMembers: 'परिवार के सदस्य',
    familyMembersDesc: 'परिवारजनों की प्रोफाइल का प्रबंधन करें',
    
    // Healthcare Policies
    availableSchemes: 'उपलब्ध स्वास्थ्य योजनाएं',
    howToApply: 'आवेदन कैसे करें',
    back: 'वापस',
    
    // Profile
    personalInfo: 'व्यक्तिगत जानकारी',
    prescriptions: 'नुस्खे',
    healthReports: 'स्वास्थ्य रिपोर्ट',
    name: 'नाम',
    age: 'उम्र',
    gender: 'लिंग',
    bloodGroup: 'रक्त समूह',
    
    // Family Members
    addFamilyMember: 'परिवार का सदस्य जोड़ें',
    familyMembersList: 'परिवार के सदस्यों की सूची',
    relation: 'रिश्ता',
    addMember: 'सदस्य जोड़ें',
    memberAdded: 'परिवार का सदस्य सफलतापूर्वक जोड़ा गया!',
    
    // Common
    male: 'पुरुष',
    female: 'महिला',
    son: 'बेटा',
    daughter: 'बेटी',
    wife: 'पत्नी',
    husband: 'पति',
    father: 'पिता',
    mother: 'माता',
    
    // Registration
    register: 'पंजीकरण',
    basicInfo: 'बुनियादी जानकारी',
    contactDetails: 'संपर्क विवरण',
    aadhaarVerification: 'आधार सत्यापन',
    faceRegistration: 'चेहरा पंजीकरण',
    fullName: 'पूरा नाम',
    dateOfBirth: 'जन्म की तारीख',
    alternateNumber: 'वैकल्पिक नंबर',
    email: 'ईमेल',
    currentAddress: 'वर्तमान पता',
    permanentAddress: 'स्थायी पता',
    nameAsPerAadhaar: 'आधार के अनुसार नाम',
    
    // Chatbot
    healthAssistant: 'स्वास्थ्य सहायक',
    askHealthQuestion: 'अपना स्वास्थ्य प्रश्न पूछें...',
    youCanSpeakOrType: 'आप बोल सकते हैं या टाइप कर सकते हैं',
    startChat: 'चैट शुरू करें',
  },
  ml: {
    // Login Page
    login: 'ലോഗിൻ',
    aadhaarNumber: 'ആധാർ നമ്പർ',
    mobileNumber: 'മൊബൈൽ നമ്പർ',
    sendOtp: 'OTP അയയ്‌ക്കുക',
    otpSent: 'OTP വിജയകരമായി അയച്ചു!',
    enterOtp: 'OTP നൽകുക',
    
    // Home Page
    welcome: 'സ്വാഗതം',
    healthcareApp: 'ആരോഗ്യ ആപ്പ്',
    healthcarePolicies: 'ആരോഗ്യ നയങ്ങളും പദ്ധതികളും',
    healthcarePoliciesDesc: 'ലഭ്യമായ ആരോഗ്യ പദ്ധതികളും നയങ്ങളും കാണുക',
    profile: 'പ്രൊഫൈൽ',
    profileDesc: 'നിങ്ങളുടെ ആരോഗ്യ രേഖകളും വ്യക്തിഗത വിവരങ്ങളും കാണുക',
    familyMembers: 'കുടുംബാംഗങ്ങൾ',
    familyMembersDesc: 'കുടുംബാംഗങ്ങളുടെ പ്രൊഫൈലുകൾ നിയന്ത്രിക്കുക',
    
    // Healthcare Policies
    availableSchemes: 'ലഭ്യമായ ആരോഗ്യ പദ്ധതികൾ',
    howToApply: 'എങ്ങനെ അപേക്ഷിക്കാം',
    back: 'തിരികെ',
    
    // Profile
    personalInfo: 'വ്യക്തിഗത വിവരങ്ങൾ',
    prescriptions: 'കുറിപ്പുകൾ',
    healthReports: 'ആരോഗ്യ റിപ്പോർട്ടുകൾ',
    name: 'പേര്',
    age: 'പ്രായം',
    gender: 'ലിംഗം',
    bloodGroup: 'രക്തഗ്രൂപ്പ്',
    
    // Family Members
    addFamilyMember: 'കുടുംബാംഗം ചേർക്കുക',
    familyMembersList: 'കുടുംബാംഗങ്ങളുടെ പട്ടിക',
    relation: 'ബന്ധം',
    addMember: 'അംഗം ചേർക്കുക',
    memberAdded: 'കുടുംബാംഗം വിജയകരമായി ചേർത്തു!',
    
    // Common
    male: 'പുരുഷൻ',
    female: 'സ്ത്രീ',
    son: 'മകൻ',
    daughter: 'മകൾ',
    wife: 'ഭാര്യ',
    husband: 'ഭർത്താവ്',
    father: 'അച്ഛൻ',
    mother: 'അമ്മ',
    
    // Registration
    register: 'രജിസ്റ്റർ',
    basicInfo: 'അടിസ്ഥാന വിവരങ്ങൾ',
    contactDetails: 'സമ്പർക്ക വിവരങ്ങൾ',
    aadhaarVerification: 'ആധാർ സ്ഥിരീകരണം',
    faceRegistration: 'മുഖ രജിസ്ട്രേഷൻ',
    fullName: 'പൂർണ്ണ നാമം',
    dateOfBirth: 'ജനനത്തീയതി',
    alternateNumber: 'ബദൽ നമ്പർ',
    email: 'ഇമെയിൽ',
    currentAddress: 'നിലവിലെ വിലാസം',
    permanentAddress: 'സ്ഥിര വിലാസം',
    nameAsPerAadhaar: 'ആധാർ പ്രകാരം പേര്',
    
    // Chatbot
    healthAssistant: 'ആരോഗ്യ സഹായി',
    askHealthQuestion: 'നിങ്ങളുടെ ആരോഗ്യ ചോദ്യം ചോദിക്കുക...',
    youCanSpeakOrType: 'നിങ്ങൾക്ക് സംസാരിക്കാം അല്ലെങ്കിൽ ടൈപ് ചെയ്യാം',
    startChat: 'ചാറ്റ് ആരംഭിക്കുക',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}